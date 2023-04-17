# Google-Sheets-based-ChatGPT-Conversation-Manager
OpenAI の ChatGPT で会話をシミュレートし、短期記憶と長期記憶を管理し、Google スプレッドシートを使用して会話データを保存します。


This repository contains a Google Apps Script code that enables users to simulate interactive conversations using OpenAI's ChatGPT API and store the conversation data in a Google Sheet. The system maintains short-term and long-term memories to improve the continuity and relevance of the conversation.

## Features
Utilizes OpenAI's ChatGPT API to generate context-aware responses
Manages short-term memory to maintain conversation flow
Updates long-term memory based on conversation analysis
Stores conversation data in a Google Sheet for easy management and review
## How it works
The code consists of several functions that work together to create a seamless conversation experience.

- chatGPT: Sends user and system prompts to the ChatGPT API and returns the generated response.
- settingSheet: Defines and returns the Google Sheet used to store conversation data.
- makeConversation: Retrieves character, character name, constraints, user prompt, and other necessary information, then generates a response using the ChatGPT API.

The script also checks if the previous conversation's total tokens exceed a certain threshold, and if so, it removes a part of the short-term memory to make room for new content. If the current conversation's total tokens exceed another threshold, the script updates the long-term memory with a summary of recent conversations.

Finally, the script appends the new conversation data to the Google Sheet.

## Setup
To use this code, follow these steps:

1.  Create a new Google Sheet.
2.  Go to Extensions > Apps Script to open the script editor.
3.  Copy and paste the code from this repository into the script editor.
4.  Replace API_KEY with your OpenAI API key.
5.  Customize the variables and settings to match your desired conversation parameters.
6.  Save the script and run the makeConversation function to start a conversation.
