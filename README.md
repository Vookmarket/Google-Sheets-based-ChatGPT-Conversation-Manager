# ChatGPT Google Sheets Conversation Manager
This script allows you to manage conversations with ChatGPT, an AI language model, using Google Sheets. It provides character information, conversation constraints, and user prompts to the AI, and manages the conversation's short- and long-term memory to improve the quality and consistency of its responses.

## Features
Manage conversations with ChatGPT through Google Sheets.
Character information and conversation constraints.
Short-term and long-term memory management for improved conversation consistency.
Automatically update the Google Sheet with new conversation data.
## Usage
1. Import the script into a Google Sheets script editor.
2. Set up a Google Sheet with the required columns to store conversation data.
3. Call the makeConversation function to initiate a conversation with ChatGPT.
## Example
```
makeConversation(sheetUrl, sheetName, charactor, charaName, constration, user_prompt, other_reply, API_KEY);
```
## Functions
### `chatGPT(system_prompt_1, system_prompt_2, user_prompt, memory, API_KEY)
- Sends chat data to ChatGPT and returns the conversation response.
- Input: system prompts, user prompt, memory, API key.
### 'settingSheet(sheetUrl, sheetName)
- Retrieves information about the Google Sheet, such as the last row and column.
- Input: sheet URL, sheet name.
### `makeConversation(sheetUrl, sheetName, charactor, charaName, constration, user_prompt, other_reply, API_KEY)
- Manages the conversation memory and sends the chat data to ChatGPT.
- Input: sheet URL, sheet name, character information, conversation constraints, user prompt, other replies, API key.
### `gptTurbo(messages, temperature, apiKey)
- A helper function for making API calls to OpenAI's GPT-3.5 Turbo model.
- Input: messages, temperature, API key.
### `makeContent(role, prompt)
- A helper function for creating content objects for messages.
- Input: role, prompt.
### `makeMessages(...contents)
- A helper function for creating message arrays from the provided contents.
- Input: contents.
## Requirements
- Google Sheets with the Google Apps Script environment.
- OpenAI API key for using the ChatGPT model.
## License
This project is licensed under the MIT License.
