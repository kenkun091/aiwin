const axios = require('axios');

async function f() {
    res = await axios.get('https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=0xc2BC7a2d5784768BDEd98436f2522A4931e2FBb4')
    console.log(res.data.result)
}

f()