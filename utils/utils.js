const crypto = require('crypto');

let utils = {
    algoritmo: "aes256",
    secret: "wingardiumleviosa",
    type: "hex",
    encrypt: (data) => {
        const cipher = crypto.createCipher(utils.algoritmo, utils.secret);
        cipher.update(data);
        return cipher.final(utils.type);
    },
    decrypt: (data) => {
        const decipher = crypto.createDecipher(utils.algoritmo, utils.secret);
        decipher.update(data, utils.type);
        return decipher.final();
    },
    compare: (data, encryptedData) => {
        if(data != utils.decrypt(encryptedData)){
            return false;
        }else{
            return true;
        }
            
    }
}

module.exports = utils;