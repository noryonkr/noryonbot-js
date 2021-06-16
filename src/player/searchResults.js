module.exports = (client, message, query, tracks) => {
    const {MessageEmbed} = require("discord.js")
    const embed = new MessageEmbed()
    .setTitle(`\`${query}\`에 대한 검색 결과입니다`)
    .setColor(client.config.color)
    .setDescription(`${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`)
    .setFooter("취소 또는 cancle을 치시면 취소할 수 도있어요.")
    .setTimestamp()
    message.channel.send(embed)
};