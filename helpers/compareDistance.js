const compareDistance = (a, b) => {
    if (a.kmFromMainWarehouse < b.kmFromMainWarehouse) {
        return -1;
    }
    if (a.kmFromMainWarehouse > b.kmFromMainWarehouse) {
        return 1;
    }
    return 0;
}

module.exports = {
    compareDistance
}