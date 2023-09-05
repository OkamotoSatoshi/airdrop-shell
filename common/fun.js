import CryptoJS from "crypto-js";
import exeSQL from "../common/mysql.js";

const key = CryptoJS.enc.Utf8.parse("qwertyuiopqwertyuioppoiuytrewqpoiuytrewq")  //40个字符
const iv = CryptoJS.enc.Utf8.parse("ASDFGHJ1234")


/**
 * 存入数据库的资料
 * @param {private_info 字段的参数} pramas 
 * @returns 
 */
export async function insert(pramas){
    let sql = `INSERT INTO private_info (device,type,name,value,create_time,status) VALUES (
        "${pramas.device}","${pramas.type}","${pramas.name}","${pramas.value}","${pramas.create_time}",1
    )`
    return await exeSQL(sql)
}

export async function mysqlValue(device,type,name){
    let sql = `select * from private_info where device="${device}" and type ="${type}" and name="${name}" and status = 1`
    return (await exeSQL(sql))[0]
}


export function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}


export function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}

