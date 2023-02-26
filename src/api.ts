import axios from 'axios';
import https from 'https';

const backend = process.env.REACT_APP_BACKEND_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT || '5000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL || 'https';

const backendApiEndpoint = protocol + '://' + backend + ':' + port + '/api';
console.log('Using backend endpoint: ' + backendApiEndpoint);

export const api = axios.create({
    baseURL: backendApiEndpoint,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });
  