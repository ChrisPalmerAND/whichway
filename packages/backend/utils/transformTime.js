import moment from 'moment';
const transformTime = (time) => {
    console.log('time', time);
    return moment.utc(time * 1000).format('HH:mm:ss');
};

export default transformTime;
