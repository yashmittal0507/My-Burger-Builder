import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-builder-app-4c229.firebaseio.com/'
});

export default instance;