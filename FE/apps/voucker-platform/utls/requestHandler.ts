//process.env.APP_URL
import axios from 'axios';

const url = process.env.BACKEND_URL || 'https://localhost:7000';

const attchToken = (token: string = '') => {
  const https = require('https');
  return axios.create({
    baseURL: url,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
};

export default {
  attchToken,
};
