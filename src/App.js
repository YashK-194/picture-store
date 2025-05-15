import React, { useState, useEffect } from "react";
import "./App.css";
import PictureList from "./components/PictureList";
import ShoppingCart from "./components/ShoppingCart";
import WalletConnect from "./components/WalletConnect";
import picturesData from "./data/picturesData";
import useCart from "./hooks/useCart";
import { ethers } from "ethers";
import {
  APP_TITLE,
  APP_DESCRIPTION,
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "./utils/constants";

function App() {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [txStatus, setTxStatus] = useState("");
  const [txHash, setTxHash] = useState("");

  // Add event listener for account changes
  useEffect(() => {
    if (window.ethereum) {
      // Handle account changes
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setAccount(null);
          console.log("Wallet disconnected");
        } else {
          // User switched accounts
          setAccount(accounts[0]);
          console.log("Wallet account changed:", accounts[0]);
        }
      };

      // Subscribe to account change events
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Clean up the event listener on component unmount
      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, []);

  const connectWallet = async () => {
    // If wallet is already connected, disconnect it
    if (account) {
      setAccount(null);
      return;
    }

    setIsLoading(true);
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // Only set the account if we actually got one back (user didn't reject)
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } else {
        alert("MetaMask is required to connect");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      // Show a user-friendly message based on the error
      if (error.code === 4001) {
        // User rejected the request
        console.log("User rejected the connection request");
      } else if (error.code === -32002) {
        // Request already pending
        alert(
          "You have a pending connection request in MetaMask. Please check your MetaMask extension."
        );
      }
    } finally {
      // Always reset loading state, whether successful or not
      setIsLoading(false);
    }
  };

  // Check if wallet is connected
  const isWalletConnected = !!account;

  const {
    cartItems,
    soldPictures,
    addToCart,
    removeFromCart,
    completePurchase,
    totalPrice,
  } = useCart();

  const handlePurchase = async () => {
    if (!isWalletConnected) {
      setTxStatus("Please connect your wallet first");
      setTimeout(() => setTxStatus(""), 3000);
      return;
    }

    if (!totalPrice || totalPrice <= 0) {
      alert("Please add items to your cart first");
      return;
    }

    // Reset transaction hash at the beginning of each purchase
    setTxHash("");
    setIsProcessing(true);
    setTxStatus("Connecting to wallet...");

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to make purchases");
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];

      setTxStatus("Preparing transaction...");

      // Create a provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create contract instance
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const priceString = totalPrice.toFixed(18);

      // Convert price from ETH to Wei
      const priceInWei = ethers.utils.parseEther(priceString);

      setTxStatus("Confirming transaction...");

      // Call the purchasePicture function
      const tx = await contract.purchasePicture({
        value: priceInWei,
        gasLimit: 300000,
      });

      // Store the transaction hash
      setTxHash(tx.hash);

      setTxStatus("Transaction submitted! Waiting for confirmation...");

      // Wait for transaction confirmation
      await tx.wait();

      setTxStatus("Purchase successful!");

      // Complete the purchase in the cart
      completePurchase();

      // Don't clear the transaction hash or status immediately
      setTimeout(() => {
        setTxStatus("");
        // Keep the transaction hash visible for much longer
        setTimeout(() => {
          setTxHash("");
        }, 30000); // Keep hash visible for 30 more seconds after status is cleared
      }, 5000);
    } catch (error) {
      console.error("Purchase error:", error);
      setTxStatus("Transaction failed. Please try again.");
      setTxHash(""); // Clear hash on error

      // Clear the error message after a delay
      setTimeout(() => {
        setTxStatus("");
      }, 5000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{APP_TITLE}</h1>
        <p>{APP_DESCRIPTION}</p>
        <WalletConnect
          account={account}
          onConnect={connectWallet}
          isLoading={isLoading}
        />
      </header>

      <div className="store-container">
        <PictureList
          pictures={picturesData}
          onAddToCart={addToCart}
          soldPictures={soldPictures}
        />

        <ShoppingCart
          cartItems={cartItems}
          onRemoveFromCart={removeFromCart}
          onCheckout={handlePurchase}
          totalPrice={totalPrice}
          isProcessing={isProcessing}
          txStatus={txStatus}
          txHash={txHash}
          isWalletConnected={isWalletConnected}
        />
      </div>
    </div>
  );
}

export default App;
