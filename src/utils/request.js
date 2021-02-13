import axios from 'axios';
import {firebase} from "../context/user-context";
import {getToken} from "./auth-token";
import {decryptVotingKey, encryptVotingKey} from "./encryption";

// const API_URI = 'http://localhost:3000'
// const API_URI = 'http://198.211.117.144:3000'
const API_URI = process.env.REACT_APP_SYS_API_URI

/* MasterNodes and Governance */

/**
 * get the list of masternodes
 * @function
 * @param {*} cancelToken the token used to cancel the request
 */
export const list = async (cancelToken) => {
  try {
    return await axios.get(`${API_URI}/statsInfo/list`, {
      headers: {
        'appclient': process.env.REACT_APP_CLIENT
      },
      cancelToken: cancelToken
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

/**
 * provides information about the current state of the block chain.
 * @function
 * @param {*} cancelToken the token used to cancel the request
 */
export const getInfo = async (cancelToken) => {
  try {
    return await axios.get(`${API_URI}/statsInfo/getinfo`, {
      headers: {
        'appclient': process.env.REACT_APP_CLIENT
      },
      cancelToken: cancelToken
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

/**
 * provides mining-related information.
 * @function
 */
export const getMiningInfo = async () => {
  try {
    return await axios.get(`${API_URI}/statsInfo/getmininginfo`, {
      headers: {
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

/**
 * returns an object containing governance parameters.
 * @function
 * @param {*} cancelToken the token used to cancel the request
 */
export const getGovernanceInfo = async (cancelToken) => {
  try {
    return await axios.get(`${API_URI}/statsInfo/getgovernanceinfo`, {
      headers: {
        'appclient': process.env.REACT_APP_CLIENT
      },
      cancelToken: cancelToken
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

/**
 * gets information about superblocks budget
 * @function
 * @param {*} cancelToken the token used to cancel the request
 */
export const getSuperBlockBudget = async (cancelToken) => {
  try {
    return await axios.get(`${API_URI}/statsInfo/getsuperblockbudget`, {
      headers: {
        'appclient': process.env.REACT_APP_CLIENT
      },
      cancelToken: cancelToken
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

/**
 * gets one masternode information
 * @function
 * @param {*} id the id of the masternode
 */
export const getOneMasterNode = async (id) => {
  try {
    let {token} = getToken()
    return await axios.get(`${API_URI}/address/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

/**
 * returns a list of the masternodes or one masternode of the user
 * @function
 * @param {string} [hash] the hash of the masternode in case of a single search
 * @param {*} cancelToken the token used to cancel the request
 */
export const getUserVotingAddress = async ({hash, cancelToken}) => {
  try {
    let newDataRes = [];
    await firebase.refreshInRequest()
    let {token} = getToken()
    let newData = await axios.get(typeof hash !== "undefined" ?
      `${API_URI}/address?hash=${hash}` :
      `${API_URI}/address`
      , {
        headers: {
          Authorization: `Bearer ${token}`,
          'appclient': process.env.REACT_APP_CLIENT
        },
        cancelToken: cancelToken
      }).catch(err => {
      throw err
    })
    if (newData.data) {
      newData.data.nodes.map((item) => {
        newDataRes.push(decryptVotingKey(item))
      })
      newData.data.nodes = [...newDataRes]
      return newData
    } else {
      return newData
    }
  } catch (err) {
    throw err
  }
};

/**
 * To add a masternode to the user masternodes list
 * @function
 * @param {*} data data of the masternode to add
 */
export const createVotingAddress = async (data) => {
  try {
    let newData;
    const newDataMany = [];
    await firebase.refreshInRequest()
    if (data.listMN) {
      JSON.parse(data.listMN).forEach(item => {
        newDataMany.push(encryptVotingKey(item))
      })
    } else {
      newData = encryptVotingKey(data)
    }
    let {token} = getToken()
    return await axios.post(`${API_URI}/address`, data.listMN ? {listMN: newDataMany} : newData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    throw err;
  }
};

/**
 * To update a masternode of the user masternodes list
 * @function
 * @param {*} id id of the masternode to update
 * @param {*} data data of the masternode to update
 */
export const updateVotingAddress = async (id, data) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    let newData=encryptVotingKey(data)
    return await axios.put(`${API_URI}/address/${id}`, {data:newData}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

/**
 * To remove a masternode of the user masternodes list
 * @function
 * @param {*} id id of the masternode to remove
 */
export const destroyVotingAddress = async (id) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.delete(`${API_URI}/address/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    throw err;
  }
};

/**
 * Not used
 * @param {*} id
 * @param {*} data
 */
export const voteIn = async (id, data) => {
  await firebase.refreshInRequest()
  let {token} = getToken()
  return new Promise((resolve, reject) => {
    axios.post(`${API_URI}/masternode/voteIn/${id}`
      , data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'appclient': process.env.REACT_APP_CLIENT
        }
      }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * function to calculate the payment dates of the syscoin governance
 * @function
 * @param {*} [nPayment] number of payments
 * @param {*} startEpoch the epoch of start of the proposal
 * @param {*} endEpoch the epoch of end of the proposal
 * @returns {Array} the array of calculated dates
 */
export const calculatePaymentDates = async (nPayment, startEpoch, endEpoch) => {
  try {
    const dates = [];
    const nowEpoch = Math.round(new Date().getTime() / 1000)
    let chainInfo = await getInfo().catch(err => {
      throw err
    })

    let governanceInfo = await getGovernanceInfo().catch(err => {
      throw err
    })

    const {blocks} = chainInfo;
    const {lastsuperblock, nextsuperblock, superblockcycle} = governanceInfo;

    const superBlocksGapSeconds = superblockcycle * 60;
    const nextSuperBlockGapSeconds = (nextsuperblock - blocks) * 60;
    const lastSuperBlockGapSeconds = (blocks - lastsuperblock) * 60;
    const votingDeadlinesGap = 3 * 24 * 60 * 60;
    const nextSuperBlockEpoch = nowEpoch + nextSuperBlockGapSeconds;
    // eslint-disable-next-line
    const lastSuperBlockEpoch = nowEpoch - lastSuperBlockGapSeconds;

    dates.unshift(lastsuperblock);
    while (startEpoch <= dates[0] - votingDeadlinesGap) {
      const previousSuperBlock = dates[0] - superBlocksGapSeconds;
      dates.unshift(previousSuperBlock);
    }
    dates.shift();
    if (dates.length === 0) {
      dates.unshift(nextSuperBlockEpoch);
    }
    while (endEpoch >= dates[dates.length - 1]) {
      const nextSuperBlock = dates[dates.length - 1] + superBlocksGapSeconds;
      dates.push(nextSuperBlock);
    }
    dates.pop();

    return dates;
  } catch (err) {
    // console.log(err)
  }
};

/**
 * function to get the info about next governance reward
 * @function
 * @param {*} cancelToken the token to cancel the request
 * @returns {Object} the next governance reward info
 */
export const nextGovernanceRewardInfo = async (cancelToken) => {
  try {
    const date = new Date();
    const {BlockChainInfo} = await new Promise((resolve, reject) => {
      getInfo(cancelToken).then(res => {
        let {data} = res;
        return resolve(data)
      }).catch(err => {
        return reject(err)
      })
    })
    // console.log(chainInfo)
    const governanceInfo = await new Promise((resolve, reject) => {
      getGovernanceInfo(cancelToken).then(res => {
        let {data} = res;
        return resolve(data)
      }).catch(err => {
        return reject(err)
      })
    })

    // console.log(governanceInfo)
    const {nextsuperblock, superblockcycle} = governanceInfo;

    const {lbs, nbs} = await new Promise((resolve, reject) => {
      getSuperBlockBudget(cancelToken).then(res => {
        let {data} = res;
        return resolve(data)
      }).catch(err => {
        return reject(err)
      })
    })

    const blockHeight = BlockChainInfo.blocks;
    const blockGenerationCycle = 60; // Defined by the chain White_paper doc.
    const votingDeadlineGap = 3;
    const superblockCycleEpoch = superblockcycle * blockGenerationCycle;
    const nextRewardInSeconds = blockGenerationCycle * (nextsuperblock - blockHeight);
    date.setSeconds(nextRewardInSeconds);
    const rewardDateEpoch = Math.round(date.getTime() / 1000);
    const rewardDate = date.toDateString();
    date.setDate(date.getDate() - votingDeadlineGap);
    const votingDeadLineEpoch = Math.round(date.getTime() / 1000);
    const votingDeadline = date.toDateString();
    return {
      rewardDate,
      votingDeadline,
      rewardDateEpoch,
      votingDeadLineEpoch,
      superblockCycleEpoch,
      lastSuperBlockBudget: lbs,
      nextSuperBlockBudget: nbs
    }
  } catch (err) {
    // console.log(err)
  }
}

/* Proposal */

/**
 * function that checks if the proposal has all the valid data previous its preparation
 * @function
 * @param {Object} data data of the proposal to check in the api
 */
export const checkProposal = async (data) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.post(`${API_URI}/proposal/check`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    throw err
  }
};

/**
 * function to request the creation of the prepare command of the proposal
 * @function
 * @param {Object} data the proposal previously checked and valid
 */
export const prepareProposal = async (data) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.post(`${API_URI}/proposal/prepare`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    throw err
  }
};

/**
 * function to submit the proposal
 * @function
 * @param {string} id id of the proposal
 * @param {Object} data data of the proposal
 */
export const submitProposal = async (id, data) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.put(`${API_URI}/proposal/submit/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

/**
 * function to vote in a proposal
 * @function
 * @param {*} data
 */
export const voteProposal = async (data) => {
  await firebase.refreshInRequest()
  let {token} = getToken()
  return new Promise((resolve, reject) => {
    axios.post(`${API_URI}/proposal/vote`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
};

/**
 * function to obtain a single proposal from the api
 * @function
 * @param {string} id id of the single proposal
 */
export const getOneProposal = async (id) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.get(`${API_URI}/proposal/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

/**
 * function to check if the user has a not completed proposal in the database
 * @function
 * @param {*} cancelToken cancel token of the request
 */
export const notCompletedProposal = async (cancelToken) => {
  await firebase.refreshInRequest()
  let {token} = getToken()
  return new Promise((resolve, reject) => {
    axios.get(`${API_URI}/proposal/pending/recover`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      },
      cancelToken: cancelToken
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * function to create a proposal
 * @function
 * @param {Object} data data of the proposal
 */
export const createProposal = async (data) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.post(`${API_URI}/proposal`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

/**
 * function to update a proposal with new data
 * @function
 * @param {string} id id of the proposal
 * @param {Object} data data of the proposal
 */
export const updateProposal = async (id, data) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.put(`${API_URI}/proposal/${id}`, {data: data}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    throw err;
  }
}

/**
 * function to delete a proposal from the database
 * @function
 * @param {string} id id of the proposal
 */
export const destroyProposal = async (id) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.delete(`${API_URI}/proposal/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    throw err
  }
}

/* Auth */

/**
 * function to login in the app
 * @function
 * @param {Object} data data of the user to log in
 */
export const login = async (data) => {
  try {
    return await axios.post(`${API_URI}/auth/login`, data, {
      headers: {
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    if (err.response) {
      return {status: err.response.status, error: err.response.data}
    } else {
      throw err
    }
  }
}

/**
 * function to sign up a new user
 * @function
 * @param {Object} data data of the new user to sign up
 */
export const register = async (data) => {
  try {
    return await axios.post(`${API_URI}/auth/register`, data, {
      headers: {
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err;
    })
  } catch (err) {
    throw err;
  }
}

/* User */

/**
 * function that request the user info from the api
 * @function
 * @param {string} id id of the user
 * @param {*} cancelToken the cancelation token
 */
export const getUserInfo = async (id, cancelToken) => {
  await firebase.refreshInRequest()
  let {token} = getToken()
  return new Promise((resolve, reject) => {
    axios.get(`${API_URI}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      },
      cancelToken: cancelToken
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

/**
 * function that gets the two factor authorization info of the user from the api
 * @function
 * @param {string} id id of the user
 */
export const get2faInfoUser = async (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URI}/user/verify2fa/${id}`, {
      headers: {
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(({data}) => {
      let {user} = data;
      resolve(user)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * request to update the user data and credentials
 * @function
 * @param {string} uid uid of the user to update
 * @param {Object} data data to update
 */
export const updateUser = async (id, data) => {
  await firebase.refreshInRequest()
  let {token} = getToken()
  return new Promise((resolve, reject) => {
    axios.put(`${API_URI}/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * request to update the two factor authorization data
 * @function
 * @param {string} id id of the user
 * @param {*} data data of the user
 */
export const updateActionsUser = async (id, data) => {
  await firebase.refreshInRequest()
  let {token} = getToken()
  return new Promise((resolve, reject) => {
    axios.put(`${API_URI}/user/extend/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * function to remove the user from the database and delete his account
 * @function
 * @param {string} uid the user uid to delete
 */
export const deleteUser = async (id) => {
  await firebase.refreshInRequest()
  let {token} = getToken()
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URI}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

/* F.A.Q. */
export const getPublicFaqs = async (cancelToken) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URI}/faq/forall`, {
      headers: {
        'appclient': process.env.REACT_APP_CLIENT
      },
      cancelToken: cancelToken
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const getAllFaqs = async (page, cancelToken) => {
  await firebase.refreshInRequest();
  let {token} = getToken();
  return new Promise((resolve, reject) => {
    axios.get(`${API_URI}/faq/?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      },
      cancelToken: cancelToken
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}
export const getSingleFaq = async (uid, cancelToken) => {
  await firebase.refreshInRequest();
  let {token} = getToken();
  return new Promise((resolve, reject) => {
    axios.get(`${API_URI}/faq/${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      },
      cancelToken: cancelToken
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const createFaq = async (data) => {
  await firebase.refreshInRequest();
  let {token} = getToken();
  return new Promise((resolve, reject) => {
    axios.post(`${API_URI}/faq`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const updateFaq = async (uid, data) => {
  await firebase.refreshInRequest();
  let {token} = getToken();
  return new Promise((resolve, reject) => {
    axios.put(`${API_URI}/faq/${uid}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const deleteFaq = async (uid) => {
  await firebase.refreshInRequest();
  let {token} = getToken();
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URI}/faq/${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

/* ADMIN */

export const getAllUsers = async (page, email = '', cancelToken) => {
  await firebase.refreshInRequest();
  let {token} = getToken();
  return new Promise((resolve, reject) => {
    axios.get(`${API_URI}/user/?page=${page}&email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      },
      cancelToken: cancelToken
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const makeAdmin = async (data) => {
  await firebase.refreshInRequest();
  let {token} = getToken();
  return new Promise((resolve, reject) => {
    axios.post(`${API_URI}/admin/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const deleteAdmin = async (uid) => {
  await firebase.refreshInRequest();
  let {token} = getToken();
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URI}/admin/${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}


export const getAllHiddenProposals = async (page, cancelToken) => {
  await firebase.refreshInRequest();
  let {token} = getToken();
  return new Promise((resolve, reject) => {
    axios.get(`${API_URI}/proposal/hiddenproposal/all/?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      },
      cancelToken: cancelToken
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const createHiddenProposal = async (data) => {
  await firebase.refreshInRequest();
  let {token} = getToken();
  return new Promise((resolve, reject) => {
    axios.post(`${API_URI}/proposal/hiddenproposal`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const deleteHiddenProposal = async (hash) => {
  await firebase.refreshInRequest();
  let {token} = getToken();
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URI}/proposal/hiddenproposal/${hash}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}