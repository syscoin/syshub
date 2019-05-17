import axios from 'axios';

const getRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err || err.message);
      });
  });
};

const postRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err || err.message);
      });
  });
};

const putRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err || err.message);
      });
  });
};

const deleteRequest = url => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err || err.message);
      });
  });
};

export default {
  onlyGet: (url, params) =>
    getRequest(url, params)
      .then(data => data)
      .catch(err => {
        throw err;
      }),
  post: (url, body, actionType) => {
    return dispatch =>
      postRequest(url, body)
        .then(data => {
          if (actionType != null) {
            dispatch({
              type: actionType,
              data: data
            });
          }

          return data;
        })
        .catch(err => {
          throw err;
        });
  },

  get: (url, params, actionType) => {
    return dispatch =>
      getRequest(url, params)
        .then(data => {
          if (actionType != null) {
            dispatch({
              type: actionType,
              data: data
            });
          }

          return data;
        })
        .catch(err => {
          throw err;
        });
  },

  put: (url, params, actionType) => {
    return dispatch =>
      putRequest(url, params)
        .then(data => {
          if (actionType != null) {
            dispatch({
              type: actionType,
              data: data
            });
          }

          return data;
        })
        .catch(err => {
          throw err;
        });
  },

  delete: (url, actionType) => {
    return dispatch =>
      deleteRequest(url)
        .then(data => {
          if (actionType != null) {
            dispatch({
              type: actionType,
              data: data
            });
          }

          return data;
        })
        .catch(err => {
          throw err;
        });
  }
};
