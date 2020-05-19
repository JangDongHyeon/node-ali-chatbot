import {
    combineReducers
} from 'redux';
import auth from './auth';
import alert from './alert';
import personal from './personal';
import club from './club';
import dataCol from './dataCol'
import translate from './translate';

export default combineReducers({
    personal,
    auth,
    alert,
    club,
    dataCol,
    translate

});