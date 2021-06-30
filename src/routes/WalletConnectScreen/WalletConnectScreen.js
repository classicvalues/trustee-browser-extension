import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'

import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";

let CACHE_URI = false
const QRCodeModal2 = {
    open: (uri, options) => {
        CACHE_URI = uri
        return QRCodeModal.open(uri, options)
    },
    close: () => {
        return QRCodeModal.close()
    }
}
const walletConnectProvider = new WalletConnectProvider({
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    qrcodeModal: QRCodeModal2,
    name: 'TrusteeConnect4Tron'
});

export default function WalletConnectScreen(props) {

    const [walletConnectStatus, setWalletConnectStatus] = useState()
    const [walletConnectIsConnected, setWalletConnectIsConnected] = useState()
    const [walletData, setWalletData] = useState()
    useEffect(async () => {
        walletConnectProvider.on("accountsChanged", (data) => {
            try {
                setWalletData(data.join(','))
                props.setWalletAddressList(data)
            } catch (e) {
                setWalletData('connect error ' + e.message)
            }
        });

        walletConnectProvider.on("disconnect", (code, reason) => {
            setWalletConnectStatus('on disconnect ')
            setWalletConnectIsConnected(false)
        });

        await walletConnectProvider.enable();
        if (!walletConnectProvider.connected) {
            setWalletConnectStatus('not connected')
            await walletConnectProvider.createSession();
        } else {
            setWalletConnectIsConnected(true)
            setWalletConnectStatus('connected')
        }
    });

    async function handleDisconnect() {
        await walletConnectProvider.disconnect()
        setWalletConnectIsConnected(false)
        setWalletConnectStatus('disconnected')
    }

    async function handleSubmit() {
        setWalletConnectStatus(walletConnectProvider.uri)
        if (!walletConnectProvider.connected) {
            QRCodeModal.open(CACHE_URI, () => {});
        }
    }

    return (
        <div className='container'>
            <div>
                {walletData}
            </div>
            <div>
                walletConnectStatus: {walletConnectStatus}
            </div>
            {!walletConnectIsConnected ?
                <Button onClick={handleSubmit} block size='lg' type='submit'>
                    Wallet Connect
                </Button>
                :
                <Button onClick={handleDisconnect} block size='lg' type='submit'>
                    Wallet Disconnect
                </Button>
            }
        </div>
    )
}
