module.exports = (client, message, track) => {
    message.channel.send(`:musical_note: 이제 ${track.title}을 ${message.member.voice.channel}으로 재생합니다...`);
};