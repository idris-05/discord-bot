const discord = require("discord.js");

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.MessageContent,
        discord.GatewayIntentBits.GuildMembers,
    ],
});

const parseColor = require("../convertColor");

// Function to handle the addcolor command
async function handelAddRoleCommand(message) {
    // Extract the command and arguments
    const [command, roleName, colorValue, userMention] = message.content.split(" ");

    // Check if the command is valid
    if (command.toLowerCase() !== "!addrole" || !roleName || !colorValue) {
        message.reply(
            "Invalid command format. Please use: !addRole RoleName ColorValue"
        );
        return;
    }

    // Parse the color value using your parseColor function
    const rgbColor = parseColor.parseColor(colorValue);

    if (!rgbColor) {
        message.reply("Invalid color value. Please provide a valid color.");
        return;
    }

    try {
        // Fetch all roles in the server
        const allRolesInServer = message.guild.roles.cache;

       
        // Extract user ID from mention
        const userId = userMention ? userMention.replace(/[<@!>]/g, '') : null;

        // Fetch the mentioned user or default to the author of the message
        const member = userId ? await message.guild.members.fetch(userId).catch(() => null) : await message.guild.members.fetch(message.author.id);

        if (member === null) {
            console.log("User not found");
            message.reply("The mentioned user does not exist in the server.");
        } else {

            // Check if the role already exists in the server
            const existingRole = allRolesInServer.find(
                (role) => role.name === roleName
            );

            if (!existingRole) {
                // Create a new role with the specified name and color
                const createdRole = await message.guild.roles.create({
                    name: roleName,
                    color: rgbColor,
                    // permissions: [], // You can set specific permissions if needed
                });

                // Get the ID of the newly created role
                const createdRoleId = createdRole.id;

                // Add the newly created role to the user
                await member.roles.add(createdRoleId);

                // // Set the position of the new role to be the highest between all the user roles
                const highestPositionInUserRoles = Math.max(...message.member.roles.cache.map((role) => role.position));
                await createdRole.setPosition(highestPositionInUserRoles);

                message.reply(
                    `Role "${createdRole.name}" created and added to "${member.displayName}".`
                );
            } else {
                // If the role exists in the server, check if the user already has it
                const memberAlreadyHasRole = member.roles.cache.has(existingRole.id);

                if (!memberAlreadyHasRole) {

                    // Add the existing role to the GuildMember
                    await member.roles.add(existingRole);

                    message.reply(
                        `Role "${existingRole.name}" added to "${member.displayName}".`
                    );
                } else {
                    message.reply(`You already have the role "${existingRole.name}".`);
                }
            }
        }
    } catch (error) {
        console.error("Error creating or adding role:", error);
        message.reply("An error occurred while creating or adding the role.");
    }
}

// Export the execute function
module.exports = {
    handelAddRoleCommand,
};
