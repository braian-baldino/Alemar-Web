import axios from 'axios';
import env from './../env';

const instance = axios.create();

instance.defaults.baseURL = env + '/currency';
instance.defaults.headers.common['Accept'] = 'application/json';
instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
