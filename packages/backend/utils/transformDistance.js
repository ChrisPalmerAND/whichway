const transformDistance = (distance) => {
    const calculatedDistance = distance / 1600;
    return calculatedDistance.toFixed(2);
};
export default transformDistance;
