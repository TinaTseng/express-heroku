const axios = require('axios');

const getApiUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;
}

const getHistory = async () => {
  let url = getApiUrl() + '/history/';
  let result = await axios.get(url);
  console.log(result)
}

getHistory();