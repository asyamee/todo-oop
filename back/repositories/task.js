module.exports = class TaskRepository {
  constructor() {
    this.tasks = [];
    this.counter = 1;
  }

  getAll() { return this.tasks; }
  getById(id) { return this.tasks.find(t => t.id === id); }
  getByProjectId(projectId) {
    return this.tasks.filter(t => t.projectId === projectId);
  }
  create(task) {
    task.id = this.counter++;
    this.tasks.push(task);
    return task;
  }
  update(id, data) {
    const task = this.getById(id);
    if (task) {
      Object.assign(task, data);
      return task;
    }
    return null;
  }
  delete(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}