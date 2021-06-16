module.exports = (client, message, query) => {
    message.channel.send(`:warning: ${query}에 대한 결과가 YouTube에 없습니다!`);
};