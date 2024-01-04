const discord = require("discord.js");

const client = new discord.Client({
  intents: [
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.MessageContent,
    discord.GatewayIntentBits.GuildMembers,
  ],
});

const parseColor = require('../convertColor');



// Function to handle the addcolor command
async function handelAddRoleCommand(message) {

    // Extract the command and arguments
    const [command, roleName, colorValue] = message.content.split(' ');

    // Check if the command is valid
    if (command.toLowerCase() !== '!addrole' || !roleName || !colorValue) {
        message.reply('Invalid command format. Please use: !addRole RoleName ColorValue');
        return;
    }

    // Parse the color value using your parseColor function
    const rgbColor = parseColor.parseColor(colorValue);

    if (!rgbColor) {
        message.reply('Invalid color value. Please provide a valid color.');
        return;
    }
    
    try {
        // Fetch all roles in the server
        const allRolesInServer = message.guild.roles.cache;

        // Check if the role already exists in the server
        const existingRole = allRolesInServer.find(role => role.name === roleName);

        if (!existingRole) {
            // Create a new role with the specified name and color
            const createdRole = await message.guild.roles.create({
                name: roleName,
                color: rgbColor,
                // position: 1 , // position = 1, it's color will be dispalyed in chat 
                // permissions: [], // You can set specific permissions if needed
            });

            // Get the GuildMember object of the user who sent the message
            const member = await message.guild.members.fetch(message.author.id);

            // Add the role to the GuildMember
            await member.roles.add(createdRole);

            message.reply(
                `Role "${createdRole.name}" created and added to "${message.author}".`
            );
        } else {
            // If the role exists in the server, check if the user already has it
            const member = await message.guild.members.fetch(message.author.id);
            const memberAlreadyHasRole = member.roles.cache.has(existingRole.id);
      
            if (!memberAlreadyHasRole) {
                // Add the existing role to the GuildMember
                await member.roles.add(existingRole);
                message.reply(`Role "${existingRole.name}" added to you.`);
            } else {
              message.reply(`You already have the role "${existingRole.name}".`);
            }
        }
    } catch (error) {
        console.error('Error creating or adding role:', error);
        message.reply('An error occurred while creating or adding the role.');
    }

}

// Export the execute function
module.exports = {
    handelAddRoleCommand,
};