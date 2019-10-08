const _sodium = require('libsodium-wrappers');

var secretKey = null; 
var publicKey = null; 

(async() => {
    await _sodium.ready
    if(secretKey == null) {       
        var test = await _sodium.crypto_sign_keypair();
        secretKey = test.privateKey;
        publicKey = test.publicKey;
    }
})();

const verifyingKey = async() => {
    await _sodium.ready;
    return publicKey;
};

const sign = async(msg) => {
    await _sodium.ready;
    var signedMessage =await _sodium.crypto_sign(msg, secretKey);
    console.log(signedMessage);
    return signedMessage;
};


module.exports = {
    "verifyingKey": verifyingKey,
    "sign": sign
};
