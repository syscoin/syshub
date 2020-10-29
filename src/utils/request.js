import axios from 'axios';

// const API_URI = 'http://localhost:3000'
const API_URI = 'http://198.211.117.144:3000'
// const API_URI = process.env.REACT_APP_SYS_API_URI

/** MasterNodes **/
export const list = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/list`).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const getInfo = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/getinfo`).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const getMiningInfo = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/getmininginfo`).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const getGovernanceInfo = async () => {
  try {
    return await axios.get(`${API_URI}/masternode/getgovernanceinfo`).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const getSuperBlockBudget = async (params) => {
  try {
    return await axios.get(`${API_URI}/masternode/getsuperblockbudget`).catch(err => {
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
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const getUserMasterNodes = async (token) => {
  try {
    return await axios.get(`${API_URI}/masternode`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    throw err
  }
};

export const createMasterNode = async (token, data) => {
  try {
    return await axios.post(`${API_URI}/masternode`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    throw err;
  }
};

export const updateMasterNode = async (token, id, data) => {
  try {
    return await axios.put(`${API_URI}/masternode/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const destroyMasterNode = async (token, id) => {
  try {
    return await axios.delete(`${API_URI}/masternode/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

/** Proposal **/
export const checkProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/check`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const prepareProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/prepare`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const submitProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/submit`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const voteProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/vote`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};


export const getOneProposal = async (id) => {
  try {
    return await axios.get(`${API_URI}/proposal/${id}`, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const createProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
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
    return await axios.put(`${API_URI}/proposal/${id}`, data, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const destroyProposal = async (id) => {
  try {
    return await axios.delete(`${API_URI}/proposal/${id}`, {
      headers: {
        Authorization: `Bearer ${'AQUI EL TOKEN'}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

/** Auth **/
export const login = async (data) => {
  try {
    return await axios.post(`${API_URI}/auth/login`, data).catch(err => {
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
    return await axios.post(`${API_URI}/auth/register`, data).catch(err => {
      throw err;
    })
  } catch (err) {
    throw err;
  }
}
/** User **/

export const getUserInfo = async (token, id) => {
  try {
    return await axios.get(`${API_URI}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
}

export const updateUser = async (token, id, data) => {
  return new Promise((resolve, reject) => {
    axios.put(`${API_URI}/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateActionsUser = async (token, id, data) => {
  return new Promise((resolve, reject) => {
    axios.put(`${API_URI}/user/extend/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}


export const deleteUser = async (token, id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URI}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}
