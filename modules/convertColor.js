const color = require('color');

function parseColor(input) {
    // console.log("input : " ,input);
    if (typeof input === 'string') {

        // Check if it's a hex color
        if (input.startsWith('#')) {
            return hexToRGB(input);
        }

        // Check if it's an RGB color
        const rgbMatch = input.match(/^rgb\((\d+),?(\d+),?(\d+)\)$/);
        if (rgbMatch) {
            const [, r, g, b] = rgbMatch.map(Number);
            return [r, g, b];
        }

        // Use color library to parse named colors
        try {
            const namedColor = color(input).rgb().array();
            return namedColor;
        } catch (error) {
            // Ignore the error if color parsing fails
        }
    }

    return null; // Invalid input
}

// Function to convert hex color to [r, g, b] format
function hexToRGB(hex) {
    hex = hex.replace(/^#/, '');

    // Parse hex values to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
}

module.exports = {
    parseColor,
};
