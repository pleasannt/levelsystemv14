const db = require('croxydb');

module.exports = {
    name: 'sıralama',
    description: 'Sunucudaki seviye sıralamasını gösterir.',
    async run(client, interaction) {

        
        const serverID = interaction.guild.id;
        const users = interaction.guild.members.cache;
        let siralamaisteamk = [];
        users.forEach(member => {
            const uyeXP = db.get(`${serverID}_${member.user.id}_xp`) || 0;
            const uyeSevıye = db.get(`${serverID}_${member.user.id}_level`) || 1;

            siralamaisteamk.push({
                user: member.user.username,
                level: uyeSevıye,
                xp: uyeXP
            });
        });
                 //   D E V E L O P E D   B Y   P L E A S A N T   //

        siralamaisteamk.sort((a, b) => (b.level - a.level) || (b.xp - a.xp));

        let stringlerPleasantXD = '';
        siralamaisteamk.slice(0, 10).forEach((entry, index) => {
            stringlerPleasantXD += `${index + 1}. ${entry.user} - Seviye: ${entry.level}, XP: ${entry.xp}\n`;
        });

                 //   D E V E L O P E D   B Y   P L E A S A N T   //

        await interaction.reply(`Liderlik Tablosu:\n\n${stringlerPleasantXD}`);
    }
};
