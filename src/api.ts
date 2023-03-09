import axios from 'axios';

const backend = process.env.REACT_APP_BACKEND_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT || '5000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL || 'http';

const backendApiEndpoint = protocol + '://' + backend + ':' + port + '/api';
console.log('Using backend endpoint: ' + backendApiEndpoint);

export const api = axios.create({
    baseURL: backendApiEndpoint
  });
  