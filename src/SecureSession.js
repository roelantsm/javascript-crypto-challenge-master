const _sodium = require('libsodium-wrappers');

    var clientPublicKeyVar = null;
    const clientPrivateKeyVar = null;

    const serverPublicKeyVar = null;
    const serverPrivateKeyVar = null;


    var rx = null;
    var tx = null;


(async() => {
    await _sodium.ready
  
})();

const setClientPublicKey = async(clientPublicKeyVar) => {
    await _sodium.ready;
    if (clientPublicKeyVar == null) 
    clientPublicKeyVar = clientPublicKeyVar
    else 
        throw 'client public key already set'; 
    return clientPublicKeyVar;
};


const serverPublicKey = async() => {
    await _sodium.ready;
    if(serverPublicKeyVar == null) {
        const keypair2 = _sodium.crypto_kx_keypair()
        serverPrivateKeyVar = keypair2.privateKey
        serverPublicKeyVar = keypair2.publicKey 
    }
    return serverPublicKeyVar;
};


const serverSide = async() => {
    if(rx == null) {
        const sharedKeys3 = await _sodium.crypto_kx_server_session_keys(
            serverPublicKeyVar,
            serverPrivateKeyVar,
            clientPublicKeyVar
        )
        rx = sharedKeys3.sharedRx
        tx = sharedKeys3.sharedTx
    }
};

const decrypt = async(ciphertext, nonce) => {
    await _sodium.ready;
   
    serverSide();

    _sodium.crypto_secretbox_open_easy(ciphertext, nonce, rx)
    return deciphertext;
};

const encrypt  = async(msg) => {
    await _sodium.ready;   
    var nonce = _sodium.randombytes_buf(_sodium.crypto_secretbox_NONCEBYTES)

    serverSide();

    var ciphertext = _sodium.crypto_secretbox_easy(msg, nonce, rx)

    var jsonObject = {
        "ciphertext": ciphertext,
        "nonce": nonce
    };
    return jsonObject
};


module.exports = {
    "setClientPublicKey": setClientPublicKey,
    "serverPublicKey": serverPublicKey,
    "decrypt": decrypt,
    "encrypt": encrypt
}
