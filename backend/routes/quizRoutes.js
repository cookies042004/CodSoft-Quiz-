    const express = require('express');
    const Quiz = require('../models/quizModel');
    const router = express.Router();

    // Create a new quiz
    router.post('/', async (req, res) => {
    try {
        const newQuiz = new Quiz(req.body);
        await newQuiz.save();
        res.status(201).send(newQuiz);
    } catch (error) {
        res.status(400).send(error);
    }
    });

    module.exports = router;
