import axios from 'axios';

const backend = process.env.REACT_APP_BACKEND_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT;
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL || 'http';

let backendApiEndpoint: string = ''

if (port === undefined) {
  backendApiEndpoint = protocol + '://' + backend + '/api';
} else {
  backendApiEndpoint = protocol + '://' + backend + ':' + 5000 + '/api';
}

console.log('Using backend endpoint: ' + backendApiEndpoint);

export const api = axios.create({
  baseURL: backendApiEndpoint
});
