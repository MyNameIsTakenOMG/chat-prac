const { chat_completion } = require('./simple-chat');
const { ChatAssistant } = require('./chat-assistant');

// chat_completion.then((response) => {
//   console.log(response.data.choices[0].message);
// });

const chat_assistant = new ChatAssistant();
chat_assistant.start();
