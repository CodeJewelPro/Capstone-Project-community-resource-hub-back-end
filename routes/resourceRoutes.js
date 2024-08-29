const express = require('express');
const Resource = require('../models/Resource');

const router = express.Router();

// GET - Fetch all resources from database
router.get('/resources', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST - Add a new resource, stores in database
router.post('/resources', async (req, res) => {
    const resource = new Resource({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
    });

    try {
        const newResource = await resource.save();
        res.status(201).json(newResource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT - Update an existing resource by its ID
router.put('/resources/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });

        resource.name = req.body.name || resource.name;
        resource.category = req.body.category || resource.category;
        resource.description = req.body.description || resource.description;

        const updatedResource = await resource.save();
        res.json(updatedResource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE - Remove a resource by its ID
router.delete('/resources/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });

        await resource.remove();
        res.json({ message: 'Resource deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;