const UserRepository = require('./repositories/user')
const ProjectRepository = require('./repositories/project')
const TaskRepository = require('./repositories/task')

module.exports = { 
    userRepo: new UserRepository(), 
    projectRepo: new ProjectRepository(), 
    taskRepo: new TaskRepository(),
}