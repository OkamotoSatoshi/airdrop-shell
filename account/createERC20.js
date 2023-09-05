/**
 * ERC20 钱包的生成&存储&加密
 */

import { ethers } from "ethers";
import { Encrypt ,Decrypt ,insert,mysqlValue } from "../common/fun.js";
import date from "silly-datetime"
import sleep from "sleep-promise";

const dateTime = date.format(new Date())
const number = parseInt(process.argv[2])


createWallet()

/**
 * ERC20 address|key
 * GMAIL account|bak-email
 * DISCORD account|id
 * TWITTER account
 * INFO job|major|name
 * BTC address|publicKey|privateKey
 * DEVICE device-id
 * IP ｜socks5
 */
async function createWallet(){

    for(let i=0;i< number ;i++){
        let wallet = ethers.Wallet.createRandom() 
        let privateKey = wallet.privateKey ;
        let address =  wallet.address ;
        const code = Encrypt(privateKey)
        const device = `设备${i+1}`
        const addrPramas = {
            device:device,
            name:"name",
            type:"ERC20",
            value:address,
            create_time:dateTime
        }

        const keyPramas = {
            device:device,
            name:"key",
            type:"ERC20",
            value:code,
            create_time:dateTime
        }
        let addr_res = await insert(addrPramas)
        let key_res = await insert(keyPramas)
        if(addr_res.affectedRows ==1 && key_res.affectedRows ==1){
            console.log(`${device} 插入成功`)
        }else{
            console.log(`${device} 插入失败`)
        }
        await sleep(50)
    }

}

