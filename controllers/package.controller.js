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

const registerPackage = async (req, res) => {

    try {
        const package = await Package.create(req.body);
        res.status(200).json({ package });
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Cannot register packages',
            error
        })
    }
};

const deletePackage = async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.packageId);
        res.status(201).json({ message: "Deleted package" });
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Cannot delete the package',
            error
        })
    }
};


module.exports = {
    getPackages,
    registerPackage,
    deletePackage
}