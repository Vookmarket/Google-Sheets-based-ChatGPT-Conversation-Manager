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
