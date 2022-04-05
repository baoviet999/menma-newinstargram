export const TOKEN = 'token';

export const URL =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000'
        : 'https://heroku-instagram.herokuapp.com';
