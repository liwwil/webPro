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
var collectionSchema = new mongoose.Schema({
        name: String,
        image: String,
        date: Date
        
});

var Collection = mongoose.model('Collection', collectionSchema);
// Collection.create(
//         {
//                 name: "Python",
//                 image: "https://i.pinimg.com/736x/ae/27/ac/ae27ac6de908f1b75dbee92a7ed0ddbb.jpg",
//                 desc: "19/06/2021"

//        },
//        function(err, collection){
//                 if(err){
//                         console.log(err);
//                 }
//                 else{
//                         console.log('New Data Added.');
//                         console.log(collection);
//                 }

//        }
// );




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
        Collection.find({},function(err,allCollections){
                if(err){
                        console.log(err);
                }else{
                        res.render("Movie.ejs",{collections: allCollections});
                }
        });
});

app.post('/Movie', function(req,res){
        var name = req.body.name;
        var image = req.body.image;
        var date = req.body.date; 
        var newCollection = { name:name , image: image, date:date};
        Collection.create(newCollection, function(err,newlyCreated){
                if(err){
                        console.log(err);
                }else{
                        res.redirect('/Movie');
                }
        });
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
app.get('/NewShowingCard', function(req,res){
        res.render('NewShowingCard.ejs');
});

app.get('/Admin', function(req,res){
        res.render('Admin.ejs');
});


app.listen('3000',function(req,res){
    console.log('Server is running on')});
