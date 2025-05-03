require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./dbConnection');
const fileRoutes = require('./Router');
const { setGFS } = require('./glb-backend/Controller');

const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(conn => {
  setGFS(conn);
});

app.use('/', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
