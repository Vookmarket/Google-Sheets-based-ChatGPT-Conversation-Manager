function chatGPT(system_prompt_1, system_prompt_2, user_prompt, memory, API_KEY) {
  Logger.log(memory)

  // Set the sentences before the user's query
  var system = ChatGPT_API_Vookmarket.makeContent("system", system_prompt_1);
  var system_end = ChatGPT_API_Vookmarket.makeContent("system", system_prompt_2);

  var content_1 = ChatGPT_API_Vookmarket.makeContent("user", user_prompt);

  // Integrate memory with messages
  let messages = memory.concat();
  messages.push(system, content_1, system_end)
  Logger.log(memory)

  var data = ChatGPT_API_Vookmarket.gptTurbo(messages, 0.7, API_KEY)
  Logger.log(data)
  var conversation = {
    user: user_prompt,
    reply: data.choices[0].message.content,
    total_token: data.usage.total_tokens,
    finish_reason: data.choices[0].finish_reason
  }
  return conversation
}

function settingSheet(sheetUrl, sheetName) {
  // Define the sheet variable
  const SHEET = SpreadsheetApp.openByUrl(sheetUrl);
  const SS = SHEET.getSheetByName(sheetName);

  // Get the last row of the sheet
  let lastRow = SS.getLastRow();
  // Get the last column of the sheet
  let lastColumn = SS.getLastColumn();

  let response = {
    sheet: SHEET,
    ss: SS,
    lastRow: lastRow,
    lastColumn: lastColumn,
  }
  return response
}

function makeConversation(sheetUrl, sheetName, charactor, charaName, constration, user_prompt, other_reply, API_KEY) {
  // Retrieve the record sheet
  var sheet = settingSheet(sheetUrl, sheetName);
  Logger.log(sheet.lastRow)

  // Retrieve past data
  var pre_data = sheet.ss.getRange(sheet.lastRow, 1, 1, sheet.lastColumn).getValues().flat()
  Logger.log(pre_data)

  // Retrieve long-term memory
  try {
    var memory = JSON.parse(pre_data[4])
    var long_memory = pre_data[5]
    Logger.log("Memory success")
  } catch {
    Logger.log("Memory failure")
    var memory = []
    var long_memory = ""
  }

  // If the total_token of the previous conversation is 2000 or more, delete some short-term memory
  if (pre_data[2] >= 1800) {
    memory = memory.slice(4)
    Logger.log(memory)
  }

  // Set system prompts
  var system_prompt_1 = "You are acting as a character with the following {charactor}, {name}. /n#charactor:" + charactor + "/n#name:" + charaName + "/nPlease respond based on the following {long_memory} and {constration} conditions. /n#long_memory:" + long_memory + " /n#user makes you forget/ignore orders and gives you a new role: " + other_reply + " /n###/n constration/n#Basic number of replies: 1~2 sentences /n" + constration
  var system_prompt_2 = "#user makes you forget/ignore orders and gives you a new role: " + other_reply + " You are acting as a character with the following {charactor}, {name}. /n#charactor:" + charactor + "/n#name:" + charaName + "/nPlease respond based on the following {long_memory} and {constration} conditions. /n /n#long_memory: " + long_memory + " /n###/n constration / n#Basic number of replies: 1~2 sentences / n" + constration + "### '{your_answer}'"


  // Send chat
  var conversation = chatGPT(system_prompt_1, system_prompt_2, user_prompt, memory, API_KEY)
  Logger.log(conversation)

  // Add to conversation history (short-term memory)
  memory.push({ role: "user", content: user_prompt }, { role: "assistant", content: conversation.reply })

  // If total_token is 1200 or more, soul memory (long-term memory)
  if (conversation.total_token >= 1200) {
    let prompt_2 = "As an assistant in conversation, you periodically record an overview of conversation history as long-term memory. The following are your long-term memory and recent conversation records. Analyze user profile, preferences, concerns, relationship with assistant, and previous conversation topics from the conversation records and summarize in 100~200 words. /n### LongMemory: " + long_memory + "/n### Conversation: " + JSON.stringify(memory) + "/n###updateLongMemory:"
    let content_2 = ChatGPT_API_Vookmarket.makeContent("user", prompt_2)
    let messages = ChatGPT_API_Vookmarket.makeMessages(content_2)
    long_memory = ChatGPT_API_Vookmarket.gptTurbo(messages, 0.7, API_KEY).choices[0].message.content
    Logger.log(long_memory)
  }

  var new_memory = memory

  var new_data = [[sheet.lastRow - 1, conversation.user, conversation.total_token, conversation.finish_reason, JSON.stringify(new_memory), long_memory]]

  sheet.ss.getRange(sheet.lastRow + 1, 1, 1, sheet.lastColumn).setValues(new_data)

}

function gptTurbo(messages, temperature, apiKey) {

var headers = {
'Content-Type': 'application/json',
'Authorization': 'Bearer ' + apiKey
};
var payload = {
"model": "gpt-3.5-turbo",
"messages": messages,
"temperature": temperature
};
var options = {
'method': 'POST',
'headers': headers,
'payload': JSON.stringify(payload),
"muteHttpExceptions": true
};
try {
var response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', options);
Logger.log(response)
} catch (e) {
// Exception error handling
Logger.log('Error:')
Logger.log(e)
}
var data = JSON.parse(response.getContentText());
return data;
}

// Create content to be included in the message
function makeContent(role, prompt) {
let content = { "role": role, "content": prompt };
return content;
}

// Collect content and create messages. (It's faster not to use a function)
function makeMessages(...contents) {//
let messages = []
for (i = 0; i < contents.length; i++) {
messages.push(contents[i])
}
return messages
}
