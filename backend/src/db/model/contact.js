const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },

});

contactSchema.pre('save', function (next) {
    this.fullname = `${this.firstname} ${this.lastname}`;
    next();
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;