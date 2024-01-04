const discord = require('discord.js');


const client = new discord.Client({
    intents: [
      discord.GatewayIntentBits.Guilds,
      discord.GatewayIntentBits.GuildMessages,
      discord.GatewayIntentBits.MessageContent,
      discord.GatewayIntentBits.GuildMembers,
    ],
});

const token = 'MTE5MjIwMTkyNjE0Njc5MzU5Mg.GK-Cdy.g-23b53diLv3q7oYzkk5eUSnTXstJCvjWwfrNc';

// Import modules
const handelAddCommand = require('./modules/handelCommands/addCommand');
const handeRemoveCommand = require('./modules/handelCommands/removeCommand');
const help = require('./modules/handelCommands/help');



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {

    if (message.author.bot) return; // Ignore messages from bots

    // Check if the message starts with a specific command
    if (message.content.startsWith('!addRole')) {
        handelAddCommand.handelAddRoleCommand(message)

    } else if (message.content.startsWith('!removeRole')) {
        handeRemoveCommand.handleRemoveRoleCommand(message);

    } else if (message.content.startsWith('!help')) {
        help.help(message);
    }
});

client.login(token);
