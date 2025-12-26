const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ================= MIDDLEWARE HEURES =================
const workingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay(); // 0 dimanche
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send("<h1>Application disponible du lundi au vendredi, de 9h à 17h</h1>");
  }
};

app.use(workingHours);

// ================= VIEW ENGINE =================
app.set('view engine', 'ejs');
app.use(express.static('public'));

// ================= ROUTES =================
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('✅ Connected to MongoDB');
});

// ================= SERVER =================
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
