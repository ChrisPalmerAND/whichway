const calculateBusDuration = (distance, duration) => {
  if (distance < 5000) {
    return duration * 1.2;
  } else if (distance >= 5000 && distance <= 10000) {
    return duration * 1.4;
  } else {
    return duration * 1.66;
  }
};

const calculateTrainDuration = (distance, duration) => {
  if (distance < 5000) {
    return duration * 0.9;
  } else if (distance >= 5000 && distance <= 10000) {
    return duration * 0.8;
  } else {
    return duration * 0.7;
  }
};

export { calculateBusDuration, calculateTrainDuration };
