module.exports = class ProjectRepository {
  constructor() {
    this.projects = [];
    this.counter = 1;
  }

  getAll() { return this.projects; }
  getById(id) { return this.projects.find(p => p.id === id); }
  getByUserId(userId) {
    return this.projects.filter(p => p.userId === userId);
  }
  create(project) {
    project.id = this.counter++;
    this.projects.push(project);
    return project;
  }
}