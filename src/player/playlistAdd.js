module.exports = (client, message, queue, playlist) => {
    message.channel.send(`:musical_note: ${playlist.title}이 대기열에 추가되었습니다 (** ${playlist.tracks.length} ** 곡)!`);
};