import React from "react";
import "./WalletConnect.css";

const WalletConnect = ({ account, onConnect, isLoading }) => {
  // Format the account address for display
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <div className="wallet-connect">
      {account ? (
        <div className="wallet-info">
          <button className="disconnect-button" onClick={onConnect}>
            Connected: {formatAddress(account)}
          </button>
        </div>
      ) : (
        <button
          className="connect-button"
          onClick={onConnect}
          disabled={isLoading}
        >
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
