import { useEffect, useState } from "react";

const API = "https://todo-oop-back.vercel.app/";

type Project = {
  id: number
  name: string
  userId: number
}

type Task = {
  id: number
  title: string
  completed: boolean
  projectId: number
}

type User = {
  id: number
  name: string
  email: string
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newTask, setNewTask] = useState({ title: "", projectId: 0 });

  useEffect(() => {
    const initUser = async () => {
      let res = await fetch(`${API}/user`);
      const users = await res.json();
      if (users.length > 0) {
        setUser(users[0]);
      } else {
        res = await fetch(`${API}/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "First User", email: "user@example.com" })
        });
        const newUser = await res.json();
        setUser(newUser);
      }
    };
    initUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`${API}/project`).then(res => res.json()).then(data => setProjects(data.filter((p: Project) => p.userId === user.id)));
      fetch(`${API}/task`).then(res => res.json()).then(setTasks);
    }
  }, [user]);

  const handleAddProject = async () => {
    if (!newProjectName.trim()) return;
    if (!user) return
    const res = await fetch(`${API}/project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newProjectName, userId: user.id }),
    });
    const project = await res.json();
    setProjects(prev => [...prev, project]);
    setNewProjectName("");
  };

  const handleDeleteProject = async (projectId: number) => {
    await fetch(`${API}/project/${projectId}`, { method: "DELETE" });
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setTasks(prev => prev.filter(t => t.projectId !== projectId));
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;
    const res = await fetch(`${API}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newTask, projectId: newTask.projectId }),
    });
    const task = await res.json();
    setTasks(prev => [...prev, task]);
    setNewTask({ title: "", projectId: 0 });
  };

  const handleToggleTask = async (task: Task) => {
    const res = await fetch(`${API}/task/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    const updated = await res.json();
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  const handleDeleteTask = async (id: number) => {
    await fetch(`${API}/task/${id}`, { method: "DELETE" });
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  if (!user) return <div>Loading user...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {user.name}</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>New Project</h3>
        <input value={newProjectName} onChange={e => setNewProjectName(e.target.value)} placeholder="Project name" />
        <button onClick={handleAddProject}>Add</button>
      </div>

      {projects.map(project => (
        <div key={project.id} style={{ border: '1px solid #aaa', marginBottom: '20px', padding: '10px' }}>
          <h3>
            {project.name}
            <button style={{ marginLeft: '10px' }} onClick={() => handleDeleteProject(project.id)}>Delete</button>
          </h3>

          <div>
            <h4>Tasks</h4>
            <ul>
              {tasks.filter(t => t.projectId === project.id).map(t => (
                <li key={t.id}>
                  <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</span>
                  <button onClick={() => handleToggleTask(t)}>{t.completed ? "Undo" : "Done"}</button>
                  <button onClick={() => handleDeleteTask(t.id)} style={{ marginLeft: '5px' }}>Delete</button>
                </li>
              ))}
            </ul>
            <div>
              <input
                placeholder="New task title"
                value={newTask.title}
                onChange={e => setNewTask({ ...newTask, title: e.target.value, projectId: project.id })}
              />
              <button onClick={handleAddTask}>Add Task</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
