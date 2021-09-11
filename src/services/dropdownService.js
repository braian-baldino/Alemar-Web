import axios from 'axios';
import env from '../env';

const instance = axios.create();

instance.defaults.baseURL = env + '/dropdown';
instance.defaults.headers.common['Accept'] = 'application/json';
instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
