const bcrypt = require('bcrypt-nodejs');

const passwordHash = (password) => {

    let salt = bcrypt.genSaltSync(10);
    let encrypted = bcrypt.hashSync(password, salt);
    return encrypted;
}

const passwordDecrypt = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

const jsonResponse = (status, statusText, data, res, message, meta) => {

    var response = {
        message: message
    };
    if (typeof data !== 'undefined') {
        response.data = data;
    }
    if (typeof meta !== 'undefined') {
        response.meta = meta;
    }
    if (typeof statusText !== 'undefined') {
        response.status = statusText;
    }

    return res.status(status).json(response);

}

module.exports = {
    passwordHash,
    passwordDecrypt,
    jsonResponse
}