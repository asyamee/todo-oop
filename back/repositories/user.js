module.exports = class UserRepository {
  constructor() {
    this.users = [];
    this.counter = 1;
  }

  getAll() { return this.users; }
  getById(id) { return this.users.find(u => u.id === id); }
  create(user) {
    user.id = this.counter++;
    this.users.push(user);
    return user;
  }
}