import axios from 'axios';

export default axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610',
});