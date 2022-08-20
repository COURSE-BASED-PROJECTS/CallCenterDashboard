const calCostTrip = (distance, multiplier) => {
    distance = +distance;
    if (distance === 0) return 0;
    if (distance < 10000) {
        return ((11000 * distance) / 1000) * multiplier;
    } else if (distance < 50000) {
        return (20000 * 10000 + ((distance - 10000) / 1000) * 17600) * multiplier;
    } else {
        return (20000 * 10000 + 25000 * 40000 + ((distance - 50000) / 1000) * 14500) * multiplier;
    }
};

export default calCostTrip;
