var MAIN_URL = 'http://dev.indiit.solutions/foodforlife/api/';
var MAIN_URL_PORT = '';
//var MAIN_URL_PORT = '3003';
var SOCKET_URL_PORT = '3002';

export const config = {
    API_URL : MAIN_URL,
    ENC_SALT: 'gd58_N9!ysS',
    BASE_URL: MAIN_URL+'/',
    IMAGES_URL: MAIN_URL+'/public/uploads/',
    IMAGE_EXTENSIONS: ['image/png','image/jpg','image/jpeg','image/gif','image/bmp','image/webp'],
    errors: ['', null, undefined, 'undefined', 'null']
};



export const social_config = {
    FACEBOOK_ID: '1258918517636754',
    GOOLGLE_CLIENT_ID: '6931280620-93qt1j81vl7n3k9j25339ji5uqdsj1h2.apps.googleusercontent.com'
};

export const socket_config = {
    SOCKET_URL: MAIN_URL+':'+SOCKET_URL_PORT,
}; 

