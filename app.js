require('dotenv').config();
let config = require('./config');
const express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    passport = require('passport'),
    passportConfig = require('./config/passport')

const app = express();
app.use(express.urlencoded({ extended: true }));
// Define express body parser
app.use(express.json());
// Prevent CORS Policy Errors
app.use(cors());

// Use local and jwt strategy for passport
passport.use(passportConfig.localStrategy);
passport.use(passportConfig.jwtStrategy);

let userConnected = {};

app.set('views', path.join(__dirname,( 'views')))
app.set('view engine', 'ejs')

// connect MangoDb
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });


// Require all the routing
require('./routes/auth')(app);
require('./routes/products')(app);

/*

app.post('/auth', (req, res) => {
    userConnected.firstname = req.body.firstname;
    userConnected.lastname = req.body.lastname;
    res.render('auth', {
        title: 'Connexion'
    })
    console.log('auth')
})

app.get('/', (req, res) => {
    if(userConnected.firstname && userConnected.lastname) {
        res.render('index',
            {
                title: 'Page Accueil',
                firstname: userConnected.firstname,
                lastname: userConnected.lastname,
            }
        );
    }
    else {
        res.redirect('/auth');
    }
})
*/

// Define default route
app.get('/errors', (req, res, next) => {
    if (req.originalUrl.includes(process.env.API_PATH)) {
        return res.status(404).json({err: 'Ressource introuvable' });
    } else {
        return res.render('errors');
    }
});

app.use((req, res, next) => {
    return res.redirect('/products');
});

// Check if we have a user in DB else add one
const User = require('./models/user');
User
    .find()
    .exec((err, users) => {
        if(err) {
            return console.error(err);
        }

        if(users.length === 0) {
            new User({
                username: 'anone',
                email: 'anonewk0@gmail.com',
                firstname: 'anone',
                lastname: 'lastname'
            }).save();
        }
    });
// all request
/*app.use((req, res) => {
    return res.render('404', {
        title: 'Erreur 404'
    })
})*/

console.log(__dirname)
app.listen(config.PORT, () => {
        console.log('Server running on ', config.PORT)
    }
)
