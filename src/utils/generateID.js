const crypto = require("crypto");

const generateID = () => {
    return crypto.randomBytes(8).toString("hex").toUpperCase();
    }

module.exports = generateID;