const Package = require("../models/Package");

const getPackages = async (req, res) => {

    try {
        const packages = await Package.find();

        res.status(200).json({
            packages
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Cannot get packages',
            error
        })
    }
};


module.exports = {
    getPackages
}