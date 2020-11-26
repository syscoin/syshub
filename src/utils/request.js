import axios from 'axios';
import {firebase} from "../context/user-context";
import {getToken} from "./auth-token";

// const API_URI = 'http://localhost:3000'
// const API_URI = 'http://198.211.117.144:3000'
const API_URI = process.env.REACT_APP_SYS_API_URI

/** MasterNodes **/
export const list = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/list`, {
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

export const getInfo = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/getinfo`, {
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

export const getMiningInfo = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/getmininginfo`, {
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

export const getGovernanceInfo = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/getgovernanceinfo`, {
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

export const getSuperBlockBudget = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/getsuperblockbudget`, {
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

export const getOneMasterNode = async (id) => {
  try {
    return await axios.get(`${API_URI}/masternode/${id}`, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const getUserMasterNodes = async (hash) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.get(typeof hash !== "undefined" ?
      `${API_URI}/masternode?hash=${hash}` :
      `${API_URI}/masternode`
      , {
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

export const createMasterNode = async (data) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.post(`${API_URI}/masternode`, data, {
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

export const updateMasterNode = async (id, data) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.put(`${API_URI}/masternode/${id}`, data, {
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

export const destroyMasterNode = async (id) => {
  try {
    await firebase.refreshInRequest()
    let {token} = getToken()
    return await axios.delete(`${API_URI}/masternode/${id}`, {
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

/** Proposal **/
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

export const notCompletedProposal = async () => {
  await firebase.refreshInRequest()
  let {token} = getToken()
  return new Promise((resolve, reject) => {
    axios.get(`${API_URI}/proposal/pending/recover`, {
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

/** Auth **/
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

/** User **/

export const getUserInfo = async (id) => {
  await firebase.refreshInRequest()
  let {token} = getToken()
  return new Promise((resolve, reject) => {
    axios.get(`${API_URI}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'appclient': process.env.REACT_APP_CLIENT
      }
    }).then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

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
    console.log(err)
  }
};

export const nextGovernanceRewardInfo = async () => {
  try {
    const date = new Date();
    const chainInfo = await new Promise((resolve, reject) => {
      getInfo().then(res => {
        let {data} = res;
        return resolve(data)
      }).catch(err => {
        return reject(err)
      })
    })
    // console.log(chainInfo)
    const governanceInfo = await new Promise((resolve, reject) => {
      getGovernanceInfo().then(res => {
        let {data} = res;
        return resolve(data)
      }).catch(err => {
        return reject(err)
      })
    })

    // console.log(governanceInfo)
    const {nextsuperblock, superblockcycle} = governanceInfo;

    const {lsb, nbs} = await new Promise((resolve, reject) => {
      getSuperBlockBudget().then(res => {
        let {data} = res;
        return resolve(data)
      }).catch(err => {
        return reject(err)
      })
    })

    const blockHeight = chainInfo.blocks;
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
      lastSuperBlockBudget: lsb,
      nextSuperBlockBudget: nbs
    }
  } catch (err) {
    console.log(err)
  }
}
