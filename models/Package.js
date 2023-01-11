const { Schema, model } = require('mongoose');

const PackageSchema = Schema({
    name: {
        type: String
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    status: {
        type: String
    },
});

PackageSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()

    object.id = _id;
    return object;
});

module.exports = model('Package', PackageSchema);