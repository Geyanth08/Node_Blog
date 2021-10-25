const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// Express App
const app = express();

// Mongodb Connection
const dbURI = 'mongodb+srv://Geyanth:Tool1234@nodeblogs.d8oje.mongodb.net/NodeBlogs?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then(() => app.listen(3000))
    .catch((err) => console.log(err))

// Register View Engine
app.set('view engine', 'ejs');
// app.set('views','folder_name') - when we different folder name other than views

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));

app.get('/', (req,res) => {
    // In Express   👇👇👇
    // res.send('<h1>Home Page</h1>');
    //res.sendFile('./views/index.html', { root : __dirname });

    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    res.render('about', { title : 'About'});
});

app.use('/blogs', blogRoutes);

// 404 Page
app.use((req,res) => {
    res.status(404).render('404',{ title : 404 });
});
