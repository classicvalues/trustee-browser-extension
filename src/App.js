import React, {useState} from 'react'

import WalletConnectScreen from './routes/WalletConnectScreen/WalletConnectScreen'

import HomeScreen from './routes/HomeScreen/HomeScreen'

function App() {
    const [walletAddressList, setWalletAddressList] = useState()

    if (typeof walletAddressList === 'undefined' || !walletAddressList || walletAddressList.length === 0) {
        return <WalletConnectScreen setWalletAddressList={setWalletAddressList}/>
    } else {
        return <HomeScreen walletAddressList={walletAddressList}/>
    }
}

export default App