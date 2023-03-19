import axios from "axios";
import { getDomainKeySync, NameRegistryState } from "@bonfida/spl-name-service";
import {  clusterApiUrl, Connection } from "@solana/web3.js";
const endpoint = process.env.REACT_APP_API_EP ?? "";
const xKey = process.env.REACT_APP_API_KEY ?? "";
const rpc = process.env.REACT_APP_RPC_MAINNET ?? "";

export async function getNFTData(network, address) {
  var data = {
    success: false,
    type: "UNKNOWN",
    details: null,
  };
  await axios({
    url: `${endpoint}nft/read`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": xKey,
    },
    params: {
      network: network,
      token_address: address,
    },
  })
    .then((res) => {
      if (res.data.success === true) {
        data = {
          success: true,
          type: "NFT",
          details: res.data.result,
        };
      }
    })
    .catch((err) => {
      console.warn(err);
    });

  return data;
}

export async function getTokenData(network, address) {
  var data = {
    success: false,
    type: "UNKNOWN",
    details: null,
  };
  await axios({
    url: `${endpoint}token/get_info`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": xKey,
    },
    params: {
      network: network,
      token_address: address,
    },
  })
    .then((res) => {
      if (res.data.success === true) {
        data = {
          success: true,
          type: "TOKEN",
          details: res.data.result,
        };
      }
    })
    .catch((err) => {
      console.warn(err);
    });

  return data;
}

export async function getCollectionsData(network, address) {
  var data = {
    success: false,
    type: "UNKNOWN",
    details: null,
  };
  await axios({
    url: `${endpoint}wallet/collections`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      params: {
        network: network,
        wallet_address: address,
      },
  })
    .then((res) => {
      if (res.data.success === true) {
        data = {
          success: true,
          type: "COLLECTIONS",
          details: res.data.result.collections,
        };
      }
    })
    .catch((err) => {
      console.warn(err);
    });

  return data;
}

export async function getWalletData(network, address) {
  var data = {
    success: false,
    type: "UNKNOWN",
    details: null,
  };
  var details = {};
  var errorOccured = false;

  try {
    await axios({
      url: `${endpoint}wallet/balance`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      params: {
        network: network,
        wallet: address,
      },
    })
      .then((res) => {
        if (res.data.success === true) {
          details = { ...details, balance: res.data.result.balance };
        }
      })
      .catch((err) => {
        console.warn(err);
        errorOccured = true;
      });

    await axios({
      url: `${endpoint}wallet/all_tokens`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      params: {
        network: network,
        wallet: address,
      },
    })
      .then((res) => {
        if (res.data.success === true) {
          details = { ...details, tokens: res.data.result };
        }
      })
      .catch((err) => {
        console.warn(err);
        errorOccured = true;
      });

    await axios({
      url: `${endpoint}wallet/collections`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      params: {
        network: network,
        wallet_address: address,
      },
    })
      .then((res) => {
        if (res.data.success === true) {
          details = { ...details, collections: res.data.result.collections };
        }
      })
      .catch((err) => {
        console.warn(err);
        errorOccured = true;
      });
      if(Object.keys(details).length === 0)
      {
        data = {
          success: false,
          type: "UNKNOWN",
          details: details,
        };
      }
      else
      {
        data = {
          success: true,
          type: "WALLET",
          details: details,
        };
      }
    

    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      type: "UNKNOWN",
      details: null,
    };
  }
}

export async function getAllTokens(network, address) {
  var data = {
    success: false,
    type: "UNKNOWN",
    details: null,
  };
  await axios({
    url: `${endpoint}wallet/all_tokens`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": xKey,
    },
    params: {
      network: network,
      wallet: address,
    },
  })
    .then((res) => {
      if (res.data.success === true) {
        data = {
          success: true,
          type: "TOKENS",
          details: res.data.result,
        };
      }
    })
    .catch((err) => {
      console.warn(err);
    });

  return data;
}

// export async function categorizeAddress(network, address) {
//   var data = {
//     success: false,
//     type: "UNKNOWN",
//     details: null,
//   };
//   try {
//     const nftCheck = await getNFTData(network, address);
//     if (nftCheck.type === "NFT") {
//       data = {
//         success: true,
//         type: "NFT",
//         details: nftCheck.details,
//       };
//     } else {
//       const tokenCheck = await getTokenData(network, address);
//       if (tokenCheck.type === "TOKEN") {
//         data = {
//           success: true,
//           type: "TOKEN",
//           details: tokenCheck.details,
//         };
//       } else {
//         const walletCheck = await getWalletData(network, address);
//         if (walletCheck.type === "WALLET") {
//           data = {
//             success: true,
//             type: "WALLET",
//             details: walletCheck.details,
//           };
//         } else {
//           data = {
//             success: false,
//             type: "UNKNOWN",
//             details: null,
//           };
//         }
//       }
//     }

//     return data;
//   } catch (err) {
//     return {
//       success: false,
//       type: "UNKNOWN",
//       details: null,
//     };
//   }
// }

export async function categorizeAddress(network, address) {
  var data = {
    success: false,
    type: "UNKNOWN",
    details: null,
  };
  try {
    const nftCheck = await getNFTData(network, address);
    if (nftCheck.type === "NFT") {
      data = {
        success: true,
        type: "NFT",
        details: nftCheck.details,
      };
    } else {
        const walletCheck = await getWalletData(network, address);
        if (walletCheck.type === "WALLET") {
          data = {
            success: true,
            type: "WALLET",
            details: walletCheck.details,
          };
        } else {
          data = {
            success: false,
            type: "UNKNOWN",
            details: null,
          };
        }
      
    }

    return data;
  } catch (err) {
    return {
      success: false,
      type: "UNKNOWN",
      details: null,
    };
  }
}
export async function getAddressfromDomain(domainName)
{
  
  try {
    const { pubkey } = await getDomainKeySync(domainName);
    //const rpcUrl = clusterApiUrl(network);
    const connection = new Connection(rpc,"confirmed");
    if(!connection)
    {
      return {
        success: false,
        wallet_address: ""
      }
    }
    else
    {
      const owner = (await NameRegistryState.retrieve(connection, pubkey)).registry.owner.toBase58();
      return {
        success: true,
        wallet_address: owner
      }
    }
  } catch (error) {
    return {
      success: false,
      wallet_address: ""
    }
  }
// const domainName = "bonfida";

}