                 //   D E V E L O P E D   B Y   P L E A S A N T   //

// ————————————————————————————————————————————————————————————————————————————————————————————————————————— //
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const db = require('croxydb');
const config = require('./config.json');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


// ————————————————————————————————————————————————————————————————————————————————————————————————————————— //

                 //   D E V E L O P E D   B Y   P L E A S A N T   //

// ————————————————————————————————————————————————————————————————————————————————————————————————————————— //
client.slashCommands = new Map();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.slashCommands.set(command.name, command);
}
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.run(client, interaction);
    } catch (error) {

        await interaction.reply({ content: 'komutta hata var kanks loga düşürmen lazım ayarlarsın onuda.', ephemeral: true });
    }
});


const rest = new REST({ version: '10' }).setToken(config.token);

const commands = [];

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.push({ name: command.name, description: command.description });
}

(async () => {
    try {
        await rest.put(
            Routes.applicationCommands(config.botID),
            { body: commands },
        );
        console.log('Komutlar yüklendi.');
    } catch (error) {
        console.error('Komutları yüklerken bir hata oluştu:', error);
    }
})();



// ————————————————————————————————————————————————————————————————————————————————————————————————————————— //

                 //   D E V E L O P E D   B Y   P L E A S A N T   //

// ————————————————————————————————————————————————————————————————————————————————————————————————————————— //
client.on('messageCreate', message => {
    if (message.author.bot || !message.guild) return;

    const pleasantgg = Math.floor(Math.random() * 15) + 1;
    const uye = message.author.id;
    const serverID = message.guild.id;

    const uyeXP = db.get(`${serverID}_${uye}_xp`) || 0;
    const uyeSevıye = db.get(`${serverID}_${uye}_level`) || 1;

    db.set(`${serverID}_${uye}_xp`, uyeXP + pleasantgg);

    const YeniLevelXP = uyeSevıye * 300;

    if (uyeXP + pleasantgg >= YeniLevelXP) {
        db.set(`${serverID}_${uye}_level`, uyeSevıye + 1);
        db.set(`${serverID}_${uye}_xp`, 0);
        message.channel.send(`${message.author}, tebrikler seviye atladın! Yeni seviyen: ${uyeSevıye + 1}`);
    }
});
// ————————————————————————————————————————————————————————————————————————————————————————————————————————— //

                 //   D E V E L O P E D   B Y   P L E A S A N T   //

client.login(config.token);