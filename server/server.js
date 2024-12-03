const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./config/dbConnections");
const taskRoutes = require('./routes/taskRoutes');

// Middleware for parsing JSON
app.use(express.json());

// Enable cors
app.use(cors(
    {
        origin: [""],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
));
app.use(bodyParser.json());

// Routes
app.use('/api', taskRoutes);

// Connect MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect Port
app.listen(port, () => {
    console.log('Server is listen on port 8000');
})
