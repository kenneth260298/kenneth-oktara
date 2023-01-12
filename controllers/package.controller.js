const Package = require("../models/Package");
const Location = require("../models/Location");
const Constants = require("../constants/packageStatus");


const getPackages = async (_, res) => {

    try {
        const packages = await Package.find().populate('location');

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
    const { name, location } = req.body;
    const newPackage = {
        name,
        location,
        status: Constants.PENDING
    };
    try {
        //save package
        const package = await Package.create(newPackage);

        //update location status
        const selectedLocation = await Location.findById(location);
        selectedLocation.isAvailable = false;
        await selectedLocation.save();

        res.status(200).json({
            package: {
                ...package._doc,
                location: {
                    name: selectedLocation.name,
                    id: selectedLocation.id,
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Cannot register the package',
            error
        })
    }
};

const deletePackage = async (req, res) => {
    try {
        const package = await Package.findByIdAndDelete(req.params.packageId);
        //update location status
        const selectedLocation = await Location.findById(package.location);
        selectedLocation.isAvailable = true;
        await selectedLocation.save();
        res.status(201).json({ message: "Deleted package", package });
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