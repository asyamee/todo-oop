const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

const allowedOrigin = 'https://todo-oop-nine.vercel.app'

const corsOptions = {
    origin: allowedOrigin,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task')
const projectRoutes = require('./routes/project')

app.use('/user', userRoutes)
app.use('/task', taskRoutes)
app.use('/project', projectRoutes)

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server started on PORT: " + PORT)
})
