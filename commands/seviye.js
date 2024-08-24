const db = require('croxydb');

module.exports = {
    name: 'level',
    description: 'Şu anki seviyeninizini gösterir.',
    async run(client, interaction) {

                         //   D E V E L O P E D   B Y   P L E A S A N T   //

        const uye = interaction.user.id;
        const serverID = interaction.guild.id;
        const uyeXP = db.get(`${serverID}_${uye}_xp`) || 0;
        const uyeSevıye = db.get(`${serverID}_${uye}_level`) || 1;

                         //   D E V E L O P E D   B Y   P L E A S A N T   //
                         
        await interaction.reply(`Mevcut seviyen: ${uyeSevıye}, XP: ${uyeXP}`);
    }
};