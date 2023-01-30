export const calculateBusDuration = (distance, duration) => {
  if (distance < 5000) {
    return duration * 1.2;
  }
  if (distance >= 5000 && distance <= 10000) {
    return duration * 1.4;
  }
  return duration * 1.66;
};

export const calculateTrainDuration = (distance, duration) => {
  if (distance < 5000) {
    return duration * 0.9;
  }
  if (distance >= 5000 && distance <= 10000) {
    return duration * 0.8;
  }
  return duration * 0.7;
};
