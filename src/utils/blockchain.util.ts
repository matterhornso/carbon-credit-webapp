import { ethers } from 'ethers'
import { disposeEmitNodes } from 'typescript'
import { USER } from '../api/user.api'
import BlockchainCalls from '../blockchain/Blockchain'
import { setAccountAddress, setConnected, setLoadWallet, setMetamask, setAlertMessage, setLoadWalletAlert, resetWallet, setAccountAddressToConnectWith, setShowAddMetaMaskAccountModal, setAccountBalance, setWalletAdded } from '../redux/Slices/walletSlice'
import { store } from '../redux/store'
import { getLocalItem, setLocalItem } from './Storage'
declare let window: any

export const BlockchainListener = () => {

    let check = false
    if (window.ethereum) {


        console.log("🚀 ~ file: blockchain.util.ts ~ line 23 ~ BlockchainListener ~ BlockchainListener")
        window.ethereum.on('chainChanged', () => {
            console.log("🚀 ~ file: blockchain.util.ts ~ line 7 ~ window.ethereum.on ~ chainChanged")
            //logic for modal accordingly
            // window.location.reload()
            // check = true
            store.dispatch(setLoadWallet(false))
            store.dispatch(setLoadWalletAlert(true))
            // alert("Chain/Network is changed! The page will be reloaded.")
            store.dispatch(setAlertMessage('Chain/Network is changed. The page will be reloaded in 2 seconds.'))
            setTimeout(() => {
                window.location.reload()

            }, 2000);

        })
        window.ethereum.on('accountsChanged', () => {
            console.log("🚀 ~ file: blockchain.util.ts ~ line 12 ~ window.ethereum.on ~ accountsChanged")
            check = true
            // store.dispatch(setWalletNetwork(res))
            // store.dispatch(resetWallet())
            store.dispatch(setLoadWalletAlert(true))
            store.dispatch(setAlertMessage('Account is changed. The page will be reloaded in 2 seconds.'))

            store.dispatch(setLoadWallet(false))


            setTimeout(() => {
                window.location.reload()

                store.dispatch(setLoadWallet(check))
            }, 2000);

            // window.location.reload()
        })

        console.log("🚀 ~ file: blockchain.util.ts ~ line 16 ~ window.ethereum.on ~ check", check)

        store.dispatch(setLoadWallet(check))
    }
    store.dispatch(setLoadWallet(false))

    store.dispatch(setLoadWallet(check))
    return check
}

export const checkMetamaskAvailability = async () => {
    return new Promise<boolean>((resolve, reject) => {
        try {

            if (!window.ethereum) {
                store.dispatch(setMetamask(false))
                reject(new Error('Metamask not available'))
            }
            // sethaveMetamask(true)
            store.dispatch(setMetamask(true))
            connectWallet().then((res: any) => {
                resolve(res)
            })
        } catch (e: any) {
            reject(new Error(e.toString()))
            console.log('checkMetamaskAvailability fn :', e)
        }
    })
}


export const onManualConnectClick = async () => {
    // checkMetamaskAvailability().then((res) => {
    const metamaskAvailabilityRes = await checkMetamaskAvailability()
    console.log("🚀 ~ file: blockchain.util.ts ~ line 87 ~ //checkMetamaskAvailability ~ metamaskAvailabilityRes", metamaskAvailabilityRes)
    if (metamaskAvailabilityRes) {
        //call userUpdateApi
        const user_data = getLocalItem('userDetails')
        return USER.updateUserInfo(user_data)
            .then((res: any) => {
                console.log(
                    '🚀 ~ file: LoadWallet.tsx ~ line 105 ~ USER.updateUserInfo ~ res',
                    res
                )
                if (res?.data?.success && res?.data?.data) {
                    // setLocalItem('uuid', res?.data?.data?.uuid)
                    // navigate(pathNames.TWOFA)
                    return res
                } else if (!res?.data?.success) {
                    alert(res?.data?.error)
                }
            })
            .catch((e) =>
                console.log('error checkMetamaskAvailability promise :', e)
            )
    } else {
        return false
    }
    // })
}

export const connectWallet = async () => {
    try {
        BlockchainCalls.connectWallet().then((res: any) => {
            console.log(
                '🚀 ~ file: LoadWallet.tsx ~ line 138 ~ BlockchainCalls.connectWallet ~ res',
                res
            )
            //! uncomment the below line for testing and add your shineKey
            //! DON'T PUSH THE CHANGE AFTER TESTING/DEVELOPMENT
            // res.accountAddress = '0xbde38db937bb7a0ae5b4c82831cfb768c7f9acd7'
            store.dispatch(setAccountAddress(res.accountAddress))
            store.dispatch(setConnected(res.isConnected))
            store.dispatch(setAccountBalance(res?.accountBalance))

            //Commented to remove metamask validation
            // if (getLocalItem('userDetails2')?.shineKey) {
            //     if (!BlockchainCalls.compareShinekeyAndAddress(res.accountAddress)) {
            //         store.dispatch(setLoadWalletAlert(true))
            //         store.dispatch(setAlertMessage("Your ShineKey and your current Wallet Address does not match. Please select the correct address"))
            //     }
            // } else {
                store.dispatch(setAccountAddressToConnectWith(res.accountAddress))
                const wallet_added = getLocalItem("userDetails2")?.wallet_added
                const shineKey = getLocalItem("userDetails2")?.shineKey
                console.log({wallet_added,shineKey})
                if(!wallet_added&&!shineKey){
                    store.dispatch(setShowAddMetaMaskAccountModal(true))
                }
            // }
            return true

        })
    } catch (error: any) {
        store.dispatch(setConnected(false))
        //   setError(error.toString())
    }
}


export const updateUserWithShineKey = async (shineKey: string) => {
    const { user_id } = getLocalItem('userDetails')

    try {
        const user_data = getLocalItem('userDetails2')
        user_data.phone = user_data.phone.toString()
        delete user_data._id
        const updateUserRes = await USER.updateUserInfo({
            ...user_data,
            shineKey,
        })
        if (updateUserRes?.data?.success) {
            if (user_id) {
                const userResponse = await USER.getUsersById(user_id)
                setLocalItem('userDetails2', userResponse?.data)
                store.dispatch(setWalletAdded(userResponse?.data?.wallet_added))
            } else {
                //Couldn't get userId from localStorage
                alert('User id not found')
            }
        }
    } catch (error) {
        console.log('error USER.updateUserInfo api :', error)
    }
}

