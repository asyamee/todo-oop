const router = require('express').Router()
const userRepo = require('../repos').userRepo
const projectRepo = require('../repos').projectRepo

const User = require('../models/user')

router.get('/', (req, res) => {
    res.json(userRepo.getAll());
});

router.post('/', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) return res.status(400).json({ error: 'Invalid data' });

    const user = new User(null, name, email);

    res.json(userRepo.create(user));
});

router.get('/:id/projects', (req, res) => {
    res.json(projectRepo.getByUserId(parseInt(req.params.id)));
});

module.exports = router