import { useRef, useEffect, useState } from "react";
import { USER } from "../api/user.api";
import BlockchainCalls from "../blockchain/Blockchain";
import { setAccountAddress, setConnected, setLoadWallet, setMetamask, setAlertMessage, setLoadWalletAlert, resetWallet, setAccountAddressToConnectWith, setShowAddMetaMaskAccountModal, setAccountBalance, setWalletAdded } from '../redux/Slices/walletSlice'
import { getLocalItem, setLocalItem } from "../utils/Storage";
import { useAppDispatch } from './reduxHooks'
declare let window: any

export function useBlockchain() {
    const dispatch = useAppDispatch()
    const [check, setCheck] = useState(false)

    useEffect(() => {
        startBlockchainListener();
        dispatch(setLoadWallet(false))
        dispatch(setLoadWallet(check))

    },[])

    const startBlockchainListener = () => {
        if (window.ethereum) {
            console.log("🚀 ~ file: blockchain.util.ts ~ line 23 ~ BlockchainListener ~ BlockchainListener")
            window.ethereum.on('chainChanged', () => {
                console.log("🚀 ~ file: blockchain.util.ts ~ line 7 ~ window.ethereum.on ~ chainChanged")
                //logic for modal accordingly
                // window.location.reload()
                dispatch(setLoadWallet(false))
                dispatch(setLoadWalletAlert(true))
                // alert("Chain/Network is changed! The page will be reloaded.")
                dispatch(setAlertMessage('Chain/Network is changed. The page will be reloaded in 2 seconds.'))
                setTimeout(() => {
                    window.location.reload()

                }, 2000);

            })
            window.ethereum.on('accountsChanged', () => {
                console.log("🚀 ~ file: blockchain.util.ts ~ line 12 ~ window.ethereum.on ~ accountsChanged")
                // check = true
                setCheck(true)
                // dispatch(setWalletNetwork(res))
                // dispatch(resetWallet())
                dispatch(setLoadWalletAlert(true))
                dispatch(setAlertMessage('Account is changed. The page will be reloaded in 2 seconds.'))

                dispatch(setLoadWallet(false))


                setTimeout(() => {
                    window.location.reload()

                    dispatch(setLoadWallet(check))
                }, 2000);

                // window.location.reload()
            })

            console.log("🚀 ~ file: blockchain.util.ts ~ line 16 ~ window.ethereum.on ~ check", check)

            dispatch(setLoadWallet(check))
        }
    }
    const connectWallet = async () => {
        try {
            BlockchainCalls.connectWallet().then((res: any) => {
                console.log(
                    '🚀 ~ file: LoadWallet.tsx ~ line 138 ~ BlockchainCalls.connectWallet ~ res',
                    res
                )
                //! uncomment the below line for testing and add your shineKey
                //! DON'T PUSH THE CHANGE AFTER TESTING/DEVELOPMENT
                // res.accountAddress = '0xbde38db937bb7a0ae5b4c82831cfb768c7f9acd7'
                dispatch(setAccountAddress(res.accountAddress))
                dispatch(setConnected(res.isConnected))
                dispatch(setAccountBalance(res?.accountBalance))

                //Commented to remove metamask validation
                // if (getLocalItem('userDetails2')?.shineKey) {
                //     if (!BlockchainCalls.compareShinekeyAndAddress(res.accountAddress)) {
                //         dispatch(setLoadWalletAlert(true))
                //         dispatch(setAlertMessage("Your ShineKey and your current Wallet Address does not match. Please select the correct address"))
                //     }
                // } else {
                dispatch(setAccountAddressToConnectWith(res.accountAddress))
                const wallet_added = getLocalItem("userDetails2")?.wallet_added
                const shineKey = getLocalItem("userDetails2")?.shineKey
                console.log({ wallet_added, shineKey })
                if (!wallet_added && !shineKey) {
                    dispatch(setShowAddMetaMaskAccountModal(true))
                }
                // }
                return true

            })
        } catch (error: any) {
            dispatch(setConnected(false))
            //   setError(error.toString())
        }
    }


    const checkMetamaskAvailability = async () => {
        return new Promise<boolean>((resolve, reject) => {
            try {

                if (!window.ethereum) {
                    dispatch(setMetamask(false))
                    reject(new Error('Metamask not available'))
                }
                // sethaveMetamask(true)
                dispatch(setMetamask(true))
                connectWallet().then((res: any) => {
                    resolve(res)
                })
            } catch (e: any) {
                reject(new Error(e.toString()))
                console.log('checkMetamaskAvailability fn :', e)
            }
        })
    }

    const onManualConnectClick = async () => {
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

    const updateUserWithShineKey = async (shineKey: string) => {
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
                    dispatch(setWalletAdded(userResponse?.data?.wallet_added))
                } else {
                    //Couldn't get userId from localStorage
                    alert('User id not found')
                }
            }
        } catch (error) {
            console.log('error USER.updateUserInfo api :', error)
        }
    }


    return { check, onManualConnectClick , updateUserWithShineKey}
}