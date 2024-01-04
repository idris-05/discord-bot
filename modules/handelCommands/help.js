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
        name: "help",
        commandLine: "!help [command]",
        descreption: "Get information about commands that are available or a specific one.\nIf there is no specified command, all available commands will be displayed.",
    },
    {
        name: "add",
        commandLine: "!addRole RoleName ColorValue",
        descreption: "Create a role with the specified name and color and assign it to a user.\nIf the role is already present on the server with another color, you will be given the previous color.",
    },
    {
        name: "remove",
        commandLine: "!removeRole RoleName",
        description: "Remove a role from a user with the specified name.",
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
    ).join('\n\n');

    // // Reply with the formatted string
    message.reply(`${formattedCommands}`);

}

// Export the execute function
module.exports = {
    help,
};
