import axios from 'axios';

const API_URI = 'http://localhost:3000/'


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

export const getOneMasternode = async (id) => {
  try {
    return await axios.get(`${API_URI}/masternode/getgovernanceinfo`).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const createMasternode = async (data) => {
  try {
    return await axios.post(`${API_URI}/masternode`, data).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const updateMasternode = async (id, data) => {
  try {
    return await axios.put(`${API_URI}/masternode/${id}`, data).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const destroyMasternode = async (id) => {
  try {
    return await axios.delete(`${API_URI}/masternode/getgovernanceinfo${id}`).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

/** Proposal **/
export const checkProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/check`, data).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const prepareProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/prepare`, data).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const submitProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/submit`,data).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

export const voteProposal = async (data) => {
  try {
    return await axios.post(`${API_URI}/proposal/vote`,data).catch(err => {
      throw err
    })
  } catch (err) {
    new Error(err)
  }
};

/** Auth **/




/** User **/
