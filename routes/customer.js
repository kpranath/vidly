const { Customer, validateCustomer } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//getting all the customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

//creating a new customer
router.post('/', async (req, res) => {

    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
});

//updating a given customer
router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }, { new: true });

    if (!customer) return res.status(404).send('The requested id for customer doesnot exists');

    res.send(customer);
});

//deleting the given customer
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The requestd id for customer doesnot exists');

    res.send(customer);
});

//Getting a specific customer by id
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The requested id for customer doesnot exists');

    res.send(customer);
});

module.exports = router;
