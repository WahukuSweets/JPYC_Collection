let useraddress;
let complete = 0;


window.onload = async function() {
    $('#wallet-popup').modal('show');
    ethereum.on('chainChanged', (_chainId) => window.location.reload());
}

async function loadwallet(){
    $('#wallet-popup').modal('hide')
    await ethereum.enable();
    web3mm = await new Web3(web3.currentProvider);
    mmaddress = await web3mm.eth.getAccounts();
    useraddress = mmaddress[0];
//    window.alert(useraddress);
    await checkJPYC();
    await checkxDai();
    await checkPolygon();
    document.getElementById('message').innerText = "コンプリート状況 " + complete + " / 3" ;    
    if (complete == 3){ window.alert("フルコンプリートおめでとうございます！")  }
}

async function checkJPYC(){
    const JPYCAddress = "0x2370f9d504c7a6e775bf6e14b3f12846b594cd53";
    jpyccontract = await new web3mm.eth.Contract(abi, JPYCAddress);
    jpycbalance = await jpyccontract.methods.balanceOf(useraddress).call() * 10e-19;
    if ( jpycbalance > 0){
    document.getElementById('jpycstatus').innerText = jpycbalance;
        complete++;
        }
}


async function checkxDai(){
    const xdaiAddress = "0x417602f4fbdd471A431Ae29fB5fe0A681964C11b";
    const web3xdai = new Web3(new Web3.providers.HttpProvider("https://rpc.xdaichain.com/"))
    xdaicontract = await new web3xdai.eth.Contract(abi, xdaiAddress);
    xdaibalance = await xdaicontract.methods.balanceOf(useraddress).call() * 10e-19;
    if ( xdaibalance > 0){
    document.getElementById('xdaistatus').innerText = xdaibalance;
        complete++;
    }
}

async function checkPolygon(){
    const polygonAddress = "0x6AE7Dfc73E0dDE2aa99ac063DcF7e8A63265108c";
    const web3polygon = new Web3(new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com/"));
    polygoncontract = await new web3polygon.eth.Contract(abi, polygonAddress);
    polygonbalance = await polygoncontract.methods.balanceOf(useraddress).call() * 10e-19;    
    if ( polygonbalance > 0){
    document.getElementById('polygonstatus').innerText = polygonbalance;
        complete++;
    }
}