const express = require('express');
const app = express();

// Middleware pour vérifier l'heure
const workingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay(); // 0 = dimanche, 6 = samedi
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send("<h1>Application disponible uniquement du lundi au vendredi, de 9h à 17h</h1>");
  }
};

// Middleware global
app.use(workingHours);

// Template engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
