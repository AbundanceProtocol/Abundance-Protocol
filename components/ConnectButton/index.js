import React, { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { BiWalletAlt as WalletIcon } from 'react-icons/bi';
import { shortenAddress } from '../../utils/utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Button, Text } from "../Foundation";
import { buttonVariants } from '../Foundation/Button';
import DropdownMenu from '../DropdownMenu';
import useAuth from '../../hooks/useAuth';

const ConnectButton = ({
    isMobile=false, 
    account=null,
    onConnect = () => {}, 
    onDisconnect = () => {}
}) => {
  const [balance, setBalance] = useState('0');

  async function connect() {
    
      try {

        await onConnect();
        
        // const web3Modal = await getWeb3Modal()
        // const connection = await web3Modal.connect()
        // const provider = new ethers.providers.Web3Provider(connection)
        // const accounts = await provider.listAccounts()
        // if (accounts) {
        //   onConnect(accounts)
        // }

      } catch (err) {
        console.error('error:', err)
      }
    }
  
  function disconnect () {
      // setAccount(null)
      onDisconnect();
  }

  const updateBalance = useCallback(async () => {
    if (account) {
      try {
        const provider = new ethers.providers.getDefaultProvider()
        let _balance = await provider.getBalance(account)
        _balance = Number(_balance)

        if (_balance > 0) {
          _balance = `${_balance / (10**18)}`  // TODO: need fix if invalid logic
          const decimals = _balance.split('.')[1].slice(0, 6)
          _balance = _balance.split('.')[0] + '.' + decimals
        }
        setBalance(_balance)
        
      } catch (err) {
        console.error(err);
      }
    }
  }, [account, setBalance])

  useEffect(() => {
    updateBalance()
  }, [updateBalance])
   
    // async function getWeb3Modal() {
    //     const web3Modal = new Web3Modal({
    //       cacheProvider: false,
    //       providerOptions: {
    //         walletconnect: {
    //           package: WalletConnectProvider,
    //           options: {
    //             infuraId: "f7b15f0b1a2d49e2b9f0e9b666842ff1"
    //           },
    //         },
    //       },
    //     })
    //     return web3Modal
    //   }

    const AccountMenuButton = () => {
      return (
        <DropdownMenu 
            options={[
              {element: shortenAddress(account), action: null},  // copy action
              {element: "Balance: $" + balance, action: null}, 
              {element: "Disconnect", action: () => disconnect()}
            ]}
          >
            <Button variant={isMobile ? buttonVariants.icon : buttonVariants.default}>
              {isMobile ? <WalletIcon /> : <Text>{account ? shortenAddress(account) : "Connect"}</Text>}
            </Button>
          </DropdownMenu>
      )
    }

    const MobileConnect = () => {
      if (account) {
        return (
          <AccountMenuButton />
        )
      }

      return (
        <Button onClick={connect} variant={buttonVariants.icon}>
            <WalletIcon />
        </Button>
        
      )
    }
    
    return isMobile ? (
        <MobileConnect />
    ) : (account ? (
        <AccountMenuButton />
      ) : (
        <Button onClick={onConnect} variant={buttonVariants.default}>
          <Text>Connect</Text>
        </Button>
      )
    );
  }

export default ConnectButton;