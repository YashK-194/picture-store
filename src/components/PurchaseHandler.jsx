import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/constants";

const PurchaseHandler = ({ totalPrice, onPurchaseComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [txStatus, setTxStatus] = useState("");

  const handlePurchase = async () => {
    if (!totalPrice || totalPrice <= 0) {
      alert("Please add items to your cart first");
      return;
    }

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

      // Convert price from ETH to Wei
      const priceInWei = ethers.utils.parseEther(totalPrice.toString());

      setTxStatus("Confirming transaction...");

      // Call the purchasePicture function
      const tx = await contract.purchasePicture({
        value: priceInWei,
        gasLimit: 300000,
      });

      setTxStatus("Transaction submitted! Waiting for confirmation...");

      // Wait for transaction confirmation
      await tx.wait();

      setTxStatus("Purchase successful!");

      // Complete the purchase in the cart
      if (onPurchaseComplete && typeof onPurchaseComplete === "function") {
        onPurchaseComplete();
      }
    } catch (error) {
      console.error("Purchase error:", error);
      setTxStatus(`Error: ${error.message || "Transaction failed"}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="purchase-handler">
      <button
        onClick={handlePurchase}
        disabled={isProcessing || !totalPrice || totalPrice <= 0}
        className="pay-button"
      >
        {isProcessing ? "Processing..." : `Pay ${totalPrice.toFixed(4)} ETH`}
      </button>

      {txStatus && <p className="transaction-status">{txStatus}</p>}
    </div>
  );
};

export default PurchaseHandler;
