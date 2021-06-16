module.exports = (client, message, queue) => {
    message.channel.send(`:warning: 대기열에 더 이상 음악이 없어 음악이 중지되었습니다!`);
};