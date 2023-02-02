import transformTime from './transformTime.js';

export const calculateBusDuration = (distance, duration) => {
    if (distance < 5000) {
        console.log('duration', duration);
        const time = duration * 1.2;
        return transformTime(time);
    }
    if (distance >= 5000 && distance <= 10000) {
        console.log('duration', duration);
        const time = duration * 1.4;
        return transformTime(time);
    }

    const time = duration * 1.6;
    return transformTime(time);
};

export const calculateTrainDuration = (distance, duration) => {
    if (distance < 5000) {
        const time = duration * 0.9;
        return transformTime(time);
    }
    if (distance >= 5000 && distance <= 10000) {
        const time = duration * 0.8;
        return transformTime(time);
    }

    const time = duration * 0.7;
    return transformTime(time);
};
