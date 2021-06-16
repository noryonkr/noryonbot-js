module.exports = (client, message, queue, track) => {
    message.channel.send(`:musical_note: \`${track.title}\`이 (가) 대기열에 추가되었습니다!`);
};