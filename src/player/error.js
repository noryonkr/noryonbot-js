module.exports = (client, error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`:warning: 이 서버에서 재생중인 음악이 없습니다!`);
            break;
        case 'NotConnected':
            message.channel.send(`:warning: 음성 채널에 연결되어 있지 않습니다!`);
            break;
        case 'UnableToJoin':
            message.channel.send(`:warning: 음성 채널에 참여할 수 없습니다. 봇 권한을 확인하세요!`);
            break;
        case 'VideoUnavailable':
            message.channel.send(`:warning: ${args[0].title} 이 국가에서는 사용할 수 없습니다! 건너 뛰는 중...`);
            break;
        case 'MusicStarting':
            message.channel.send(`음악이 시작됩니다 ... 잠시 후 다시 시도하세요!`);
            break;
        default:
            message.channel.send(`:warning: 문제가 발생했습니다 ... 오류 : ${error}`);
    };
};
