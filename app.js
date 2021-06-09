const express = require('express');/*เรียก module express*/
        bodyparser = require("body-parser"),
        mongoose =require('mongoose'),
        passport = require('passport'),
        LocalStrategy = require('passport-local'),
        User  = require('./models/user');



const app = express();
mongoose.connect('mongodb://localhost/Movieweb');
app.use(express.static('public')); //ห้ามลบ เดะ css หายยย
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended : true}));


app.use(require('express-session')({
        secret: 'secret is always secret.',
        resave: false,
        saveUninitialized: false
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({usernameField: 'email',},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const flash = require('connect-flash');
app.use(flash());
app.use(function(req,res,next){
        res.locals.currentUser = req.user;
        res.locals.error = req.flash('error');
        res.locals.success = req.flash('success');
        next();
    });


app.get('/', function(req,res){
    res.render('home.ejs');
});

app.get('/Movie', function(req,res){
        res.render('Movie.ejs');
});


app.get('/Movie/ComingSoon', function(req,res){
        res.render('ComingSoon.ejs');
});

app.get('/Theater', function(req,res){
        res.render('Theater.ejs');
});

app.get('/Promotion', function(req,res){
        res.render('Promotion.ejs');
});

app.get('/ContentPromotion', function(req,res){
        res.render('ContentPromotion.ejs');
});


app.get('/News', function(req,res){
        res.render('News.ejs');
});

app.get('/ContentNews', function(req,res){
        res.render('ContentNews.ejs');
});

app.get('/Movie/ContentMovie', function(req,res){
        res.render('ContentMovie.ejs');
});

app.get('/signIn', function(req,res){
        res.render('sign-in.ejs');
});

app.post('/signIn', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/signUp',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully log in',
        failureFlash: 'Invalid username or password'
    }), function(req, res){       
});

app.get('/signUp', function(req,res){
        res.render('sign-up.ejs');
});

app.post('/signUp' , function(req, res){
        var newUser = new User({ username: req.body.email});
        User.register(newUser, req.body.password, function(err, user){
            if(err) {
                console.log(err);
                return res.render('sign-up.ejs');
            }
            passport.authenticate('local')(req, res, function(){
                // req.flash('success', 'Welcome to uCollection ' + user.username);

                res.redirect('/signIn');
            });
        });
    });

    app.get('/logout', function(req, res){
        req.logout();
        req.flash('success', 'Logged you out successfully');
        res.redirect('/');
    });

/* Admin part */
app.get('/Management', function(req,res){
        res.render('Management.ejs');
});


app.listen('3000',function(req,res){
    console.log('Server is running on')});
