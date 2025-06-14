const router = require('express').Router()
const taskRepo = require('../repos').taskRepo

const Task = require('../models/task')

router.get('/', (req, res) => {
    res.json(taskRepo.getAll());
});

router.post('/', (req, res) => {
    const { title, completed = false, projectId } = req.body;

    if (!title || !projectId) return res.status(400).json({ error: 'Invalid data' });

    const task = new Task(null, title, completed, projectId);

    res.json(taskRepo.create(task));
});

router.put('/:id', (req, res) => {
    const updated = taskRepo.update(parseInt(req.params.id), req.body);

    if (updated) res.json(updated);
    else res.status(404).json({ error: 'Not found' });
});

router.delete('/:id', (req, res) => {
    const deleted = taskRepo.delete(parseInt(req.params.id));

    if (deleted) res.json({ success: true });
    else res.status(404).json({ error: 'Not found' });
});

module.exports = router