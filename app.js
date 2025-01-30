const express = require('express');
const app = express();

app.use(express.json());

let feedbackStore = [];
let nextId = 1;

app.post('/api/feedback', (req, res) => {
    try {
        const { name, petName, rating, comments } = req.body;

        if (!name || !petName || rating === undefined) {
            return res.status(400).json({ error: 'Missing required fields: name, petName, rating' });
        }

        if (typeof name !== 'string' ||
            typeof petName !== 'string' ||
            typeof rating !== 'number') {
            return res.status(400).json({ error: 'Invalid field types' });
        }

        const trimmedName = name.trim();
        const trimmedPetName = petName.trim();
        if (!trimmedName || !trimmedPetName) {
            return res.status(400).json({ error: 'Name and petName cannot be empty' });
        }

        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be an integer between 1-5' });
        }

        if (comments && typeof comments !== 'string') {
            return res.status(400).json({ error: 'Comments must be a string' });
        }

        const feedback = {
            id: nextId++,
            name: trimmedName,
            petName: trimmedPetName,
            rating,
            comments: comments ? comments.trim() : "",
            timestamp: new Date().toISOString()
        };

        feedbackStore.push(feedback);
        res.status(201).json(feedback);

    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/feedback', (req, res) => {
    try {
        res.json({
            feedbacks: feedbackStore
        });
    } catch (error) {
        console.error('Error retrieving feedback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/feedback/:id', (req, res) => {
    try {
        const { id } = req.params;
        const feedback = feedbackStore.find(f => f.id === parseInt(id));

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.json(feedback);

    } catch (error) {
        console.error('Error retrieving feedback by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
