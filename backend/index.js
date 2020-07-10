const { app } = require('./express/expressApp');
const bodyParser = require('body-parser')
const cors = require('cors');

//setings
app.set('port', process.env.PORT || 3002);

app.set('json spaces', 4);
// Middlewares
app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: 'http://localhost:8201' }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});




// iniciar servidor
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})