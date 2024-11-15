require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db/conn');
const app = express();
const port = process.env.PORT || 5000;
const Contact = require('../src/db/model/contact');

app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options('*', cors());



app.get('/all-contact', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post('/add-contact', async (req, res) => {
    const contact = new Contact({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company,
        jobtitle: req.body.jobtitle,
    });

    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.post('/edit-contact', async (req, res) => {
    const { eid, firstname, lastname, email, phone, company, jobtitle } = req.body;

    try {
        const contact = await Contact.findById(eid);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        contact.firstname = firstname || contact.firstname;
        contact.lastname = lastname || contact.lastname;
        contact.email = email || contact.email;
        contact.phone = phone || contact.phone;
        contact.company = company || contact.company;
        contact.jobtitle = jobtitle || contact.jobtitle;

        const updatedContact = await contact.save();

        res.status(200).json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.post('/contact-detail', async (req, res) => {
    const { eid } = req.body;

    try {

        const contact = await Contact.findById(eid);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.post('/delete-contact', async (req, res) => {
    const { eid } = req.body;

    try {

        const contact = await Contact.findByIdAndDelete(eid);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.listen(port, () => {
    console.log("Listening on port " + port);
});