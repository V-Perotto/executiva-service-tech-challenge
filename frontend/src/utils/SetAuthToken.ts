import axios from 'axios';

const setAuthToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : undefined;
};

export default setAuthToken;