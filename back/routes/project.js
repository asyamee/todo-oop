const router = require('express').Router()
const projectRepo = require('../repos').projectRepo
const taskRepo = require('../repos').taskRepo

const Project = require('../models/project')

router.get('/', (req, res) => {
    res.json(projectRepo.getAll());
});

router.post('/', (req, res) => {
    const { name, userId } = req.body;

    if (!name || !userId) return res.status(400).json({ error: 'Invalid data' });

    const project = new Project(null, name, userId);

    res.json(projectRepo.create(project));
});

router.get('/:id/tasks', (req, res) => {
    res.json(taskRepo.getByProjectId(parseInt(req.params.id)));
});

module.exports = router