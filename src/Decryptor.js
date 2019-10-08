const _sodium = require('libsodium-wrappers');

var keySecret = null;

setKey = async(key) => {
    await _sodium.ready;
    keySecret = key;
    return keySecret;
};

decrypt = async(ciphertext, nonce) => {
    await _sodium.ready;
    if(keySecret == null) {
        throw 'no key';
    }

    else { 
    var deciphertext = _sodium.crypto_secretbox_open_easy(ciphertext, nonce, keySecret)
    return deciphertext;
    }
};

module.exports = {
    "setKey": setKey,
    "decrypt": decrypt
}