const express = require('express');
const data = require('./data');

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {data: data.projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res, next) => {

    if (parseInt(req.params.id) > data.projects.length - 1){
        const err = new Error('Page Not Found');
        err.status = 404
        return next(err);
    }
    res.render('project', {id: parseInt(req.params.id), data: data.projects});
});

app.use((req, res, next) => {
    const err = new Error('Cannot find page...');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log(err);
    res.render('error');
});


app.listen(3000, () => {
    console.log('The app is up and running on localhost:3000!');
});