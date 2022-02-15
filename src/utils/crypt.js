const crypto = require('crypto-js');

const key = crypto.enc.Utf8.parse("HrN2t2nCr6pTkEy20221l2B3dOcPr4j2")

const iv = crypto.enc.Utf8.parse("HrN2t2nCr6pTiV22")

/**
 * Decrypt string passed in parameter
 * @param {string} item - encrypted string
 * @returns {string} decrypted item
 */
export function decryptItem(item){ 
    let cipherParams = crypto.lib.CipherParams.create({ ciphertext: crypto.enc.Base64.parse(item) });
    let decryptedFromText = crypto.AES.decrypt(cipherParams, key, { iv });
    return decryptedFromText.toString(crypto.enc.Utf8)
}

/**
 * Encrypt string passed in parameter
 * @param {string} item
 * @returns {string} encrypted item
 */
export function encryptItem(item){ 
    let encryptedCP = crypto.AES.encrypt(item, key, { iv });
    let cryptText = encryptedCP.toString();
    return cryptText
}