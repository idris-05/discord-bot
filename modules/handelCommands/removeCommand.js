const discord = require("discord.js");

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.MessageContent,
        discord.GatewayIntentBits.GuildMembers,
    ],
});


// Function to handle the removerole command
async function handleRemoveRoleCommand(message) {
    // Extract the command and arguments
    const [command, roleName, userMention] = message.content.split(' ');

    // Check if the command is valid
    if (command.toLowerCase() !== '!removerole' || !roleName) {
        message.reply('Invalid command format. Please use: !removeRole RoleName');
        return;
    }

    try {
        // Extract user ID from mention
        const userId = userMention ? userMention.replace(/[<@!>]/g, '') : null;

        // Fetch the mentioned user or default to the author of the message
        const member = userId ? await message.guild.members.fetch(userId).catch(() => null) : await message.guild.members.fetch(message.author.id);

        if (member === null) {
            console.log("User not found");
            message.reply("The mentioned user does not exist in the server.");
        } else {
            // Find the role with the specified name
            const roleToRemove = message.guild.roles.cache.find(role => role.name === roleName);

            if (!roleToRemove) {
                message.reply(`Role "${roleName}" does not exist in the server.`);
                return;
            }

            // Check if the user has the specified role
            const memberHasRole = member.roles.cache.has(roleToRemove.id);

            if (memberHasRole) {
                // Remove the role from the GuildMember
                await member.roles.remove(roleToRemove);
                message.reply(`Role "${roleToRemove.name}" removed from "${member.displayName}".`);
            } else {
                message.reply(`You do not have the role "${roleToRemove.name}".`);
            }
        }
    } catch (error) {
        console.error('Error removing role:', error);
        message.reply('An error occurred while removing the role.');
    }
}

// Export the execute function
module.exports = {
    handleRemoveRoleCommand,
};
