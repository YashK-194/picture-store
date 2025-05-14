// App text constants
export const APP_TITLE = "Picture Store";
export const APP_DESCRIPTION = "Select and buy your favorite pictures";
export const EMPTY_CART_MESSAGE = "Your cart is empty";
export const PURCHASE_SUCCESS_MESSAGE = "Thank you for your purchase!";
// smart contract constants
export const CONTRACT_ADDRESS = "0xf23f4Aa4A5f1F8d14e62025365395283d0CCAcc3";
export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "PicturePurchased",
    type: "event",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "purchasePicture",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

// Picture states
export const PICTURE_STATUS = {
  AVAILABLE: "available",
  SOLD: "sold",
};
