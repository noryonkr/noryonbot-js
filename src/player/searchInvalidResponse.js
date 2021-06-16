module.exports = (client, message, query, tracks, content, collector) => {
    if (content === '취소'||content==='cancle') {
        collector.stop();
        return message.channel.send(`:white_check_mark: 선택이 **취소**되었습니다!`);
    } else message.channel.send(`${this.client.config.emotjis.error} **1**에서 **${tracks.length}** 사이의 유효한 번호를 보내야합니다!`);
};