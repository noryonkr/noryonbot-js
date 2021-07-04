const Discord = require('discord.js');

class Command {
    constructor (client) {
        this.client = client
        this.name = 'help'
        this.aliases = ['도움','도움말']
        this.category = 'genaral'
        this.permissions = ['Everyone']
        this.usage = ''
        this.description = '지금 보고있는게 도움말입니다'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }
    }

    async run ({ message, args}) {
      const p0 = new Discord.MessageEmbed()
      .setColor(this.client.config.color)
      .setDescription(`안녕하세요 ${message.author}님\n[이 링크를 눌러 초대를 해보세요!](http://skybluebot.kro.kr)\n\n이모지에 반응하여 다음페이지로 이동합니다`)
      .setTitle("[ 도움말 ㅣ 설명 (0/5) ]")
      const p1 = new Discord.MessageEmbed()
      .setTitle("[ 도움말 - Owner ‹개발도움/주인 전용› (1/5) ]")
      .setColor(this.client.config.color)
      .setDescription(`안녕하세요 ${message.author}님\n[이 링크를 눌러 초대를 해보세요!](http://skybluebot.kro.kr)\n\n이모지에 반응하여 다음페이지로 이동합니다\n\n \`s!cmd\` (eval, 실행)\n\`s!공식공지\` (식공)\n\`s!notice\` (공지)\n\`s!reload (리로드, ㄹㄹㄷ)\``)
      
      const p2 = new Discord.MessageEmbed()
      .setTitle("[ 도움말 - Genaral ‹시스템› (2/5) ]")
      .setColor(this.client.config.color)
      .setDescription(`안녕하세요 ${message.author}님\n[이 링크를 눌러 초대를 해보세요!](http://skybluebot.kro.kr)\n\n이모지에 반응하여 다음페이지로 이동합니다\n\n \`s!help\` (도움, 도움말)\n\`s!ping\` (핑)\n\`s!uptime\` (업타임)\n\`s!invite\` (초대)\n\`s!support-server\` (서포트서버)`)
      
      const p3 = new Discord.MessageEmbed()
      .setTitle("[ 도움말 - Info ‹정보› (3/5) ]")
      .setColor(this.client.config.color)
      .setDescription(`안녕하세요 ${message.author}님\n[이 링크를 눌러 초대를 해보세요!](http://skybluebot.kro.kr)\n\n이모지에 반응하여 다음페이지로 이동합니다\n\n\`s!serverinfo\` (serinfo, 서버정보)\n\`s!profile\` (pr, 프로필)`)
      



    let pages = [
      p0,p1,p2,p3
  ];
  
  let current = 0;

  let m = await message.channel.send('Loading pages...');
  
  function createEmbed (page) {
      const embed = pages[page]
      
      return embed;
  };
  

  function reactionsNeeded (page) {
      return [
          pages[page - 1],
          pages[page + 1]
      ];
  };
  
  // Next, we'll make another function which will be used to show pages.
  async function showPage (page) {
      let output = createEmbed(page);
      

      await m.edit(null, output);
      
   
      //await m.reactions.remove(m.client.user.id);
      

      let needed = reactionsNeeded(page);
      let left, right;
      



      if (needed[0]) {
        
          await m.react('⬅️');
          await m.react('➡️');
          // We'll quickly create a reaction collector filter so we only collect the right events...
          let filter = (r, u) => r.emoji.name == '⬅️' && u.id == message.author.id;
          
          // ...and then set the variable we made earlier. We'll make sure our collector times out after 60,000ms (60 seconds).
          left = m.createReactionCollector(filter, { time: 60000 });
          
          // We'll now handle the add reaction event.
          left.on('collect', r => {
              // We'll stop listening for any more reactions here...
              if (right) right.stop();
              
              left.stop();
              
              // ...and will then show the new page and update the current page.
              showPage(current - 1);
              current = current - 1;
            
          });


      };
      
      // We'll now do that again for the other reaction. Only minor changes are made.
      if (needed[1]) {
        await m.react('⬅️');
          await m.react('➡️');
          
          let filter = (r, u) => r.emoji.name == '➡️' && u.id == message.author.id;
          right = m.createReactionCollector(filter, { time: 60000 });
          
          right.on('collect', r => {
              if (left) left.stop();
              right.stop();
          
              if(!right) message.channel.send("❌ 이런, 페이지가 넘어가지않아요")
              showPage(current + 1);
              current = current + 1;

          });


      };
  };

  
  
  // Now we've done that, we will now create our page system.
  showPage(current);
    }
}

module.exports = Command