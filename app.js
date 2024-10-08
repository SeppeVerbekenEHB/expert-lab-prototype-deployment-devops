const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

// Sample data
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

// GET root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// GET all items
app.get('/items', (req, res) => {
    res.json(items);
});

// GET a single item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found.');
    res.json(item);
});

// POST to create a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// DELETE an item by ID
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id); // Parse the ID from the URL
    // Filter out the item with the given ID
    items = items.filter(item => item.id !== id);
    
    res.status(204).send(); // No content response
});


// Export the app and listen function
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };