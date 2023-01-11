const Location = require("../models/Location");

const getAvailableLocations = async (_, res) => {

    try {
        const locations = await Location.find().where('isAvailable').equals(true);

        res.status(200).json({
            locations
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Cannot get locations',
            error
        })
    }
};
const getAllLocations = async (_, res) => {

    try {
        const locations = await Location.find();

        res.status(200).json({
            locations
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Cannot get locations',
            error
        })
    }
};

module.exports = {
    getAvailableLocations,
    getAllLocations
}