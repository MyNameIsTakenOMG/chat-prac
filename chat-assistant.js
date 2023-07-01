require('dotenv').config();
const prompt = require('prompt-sync')({ sigint: true });
const { Configuration, OpenAIApi } = require('openai');

class ChatAssistant {
  #openai;
  SYSTEM_MSG = 'what type of chatbot would you like to create?';
  messages = [];
  prompt;
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.#openai = new OpenAIApi(configuration);
    this.prompt = prompt;
  }

  async start() {
    let userMsg = prompt(this.SYSTEM_MSG);
    let response;
    this.messages.push({ role: 'system', content: userMsg });
    console.log('your new assistant is ready');
    userMsg = prompt('');
    while (userMsg !== 'q') {
      this.messages.push({ role: 'user', content: userMsg });
      response = await this.#openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: this.messages,
      });
      console.log('the reply is: ', response.data.choices[0].message.content);
      this.messages.push({
        role: 'assistant',
        content: response.data.choices[0].message.content,
      });
      userMsg = prompt('');
    }
  }
}

module.exports = { ChatAssistant };
