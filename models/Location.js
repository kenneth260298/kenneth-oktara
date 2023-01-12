const { Schema, model } = require('mongoose');

const LocationSchema = Schema({
    name: {
        type: String
    },
    isAvailable: {
        type: Boolean
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    }
});

LocationSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()

    object.id = _id;
    return object;
});

module.exports = model('Location', LocationSchema);