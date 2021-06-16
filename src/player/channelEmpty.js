module.exports = (client, message, queue) => {
    message.channel.send(`:warning: 음성 채널에 더 이상 멤버가 없어 음악이 멈췄습니다!`);
};