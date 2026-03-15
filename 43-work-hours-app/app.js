const express = require('express');
const app = express();
const path = require('path');

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware: allow only Monday-Friday 9:00-17:00
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();

//   if (day === 0 || day === 6 || hour < 9 || hour >= 17) {
//     return res.send('<h1>Sorry, the site is only available during working hours (Mon-Fri, 9-17)</h1>');
//   }

  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});