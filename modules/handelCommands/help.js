const { Console } = require("console");
const discord = require("discord.js");

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.MessageContent,
        discord.GatewayIntentBits.GuildMembers,
    ],
});

const commandsArray = [
    {
        name: "\nhelp",
        commandLine: "!help [command]",
        description: "Get information about commands that are available or a specific one. \nIf there is no specified command, all available commands will be displayed.",
    },
    {
        name: "add",
        commandLine: "!addRole RoleName ColorValue [@userMention]",
        description: "Create a role with the specified name and color and assign it to mentioned user. \nIf the role is already present on the server with another color, the mentioned user will be given the previous color. The role name should be without any white space",
    },
    {
        name: "remove",
        commandLine: "!removeRole RoleName [@userMention]",
        description: "Remove a role from the mentioned user.",
    }
];

function help(message) {

    // Extracting words after !help into an array
    const commandsArrayFromUser = message.content.split(' ');
    commandsArrayFromUser.shift();

    let commandsToManage = [];

    if ( commandsArrayFromUser.length !== 0) {
        commandsArray.forEach(element => {
            if (commandsArrayFromUser.includes(element.name)) {
                commandsToManage.push(element);
            }
        });
    } else {
        commandsToManage = commandsArray ;
    }

    const formattedCommands = commandsToManage.map(command =>
        `Command: ${command.name} \nUse: ${command.commandLine} \nDescription: ${command.description}`
    ).join('\n\n\n');

    // // Reply with the formatted string
    message.reply(`${formattedCommands}`);

}

// Export the execute function
module.exports = {
    help,
};
