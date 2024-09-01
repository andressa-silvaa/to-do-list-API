require('dotenv').config();

const express = require("express");
const rotas = require("./rotas");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*', 
}));
app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});
app.use(rotas);

app.listen(process.env.PORT, () => {
  console.log(`Server online on port ${process.env.PORT} 🚀`);
});