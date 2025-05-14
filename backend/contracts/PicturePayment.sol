// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PicturePayment
 * @dev Contract for handling picture payments on the Picture Store
 */
contract PicturePayment {
    address public owner;

    // Events to log payment activities
    event PicturePurchased(address indexed buyer, uint256 price);

    constructor() {
        owner = msg.sender; // Set the contract deployer as owner
    }

    /**
     * @dev Purchase a picture by sending ETH
     */
    function purchasePicture() external payable {
        require(msg.value > 0, "Payment must be greater than 0");

        // Transfer the payment to the owner
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Failed to transfer payment");

        // Emit the purchase event
        emit PicturePurchased(msg.sender, msg.value);
    }

    /**
     * @dev Get the contract balance (for testing purposes)
     */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
