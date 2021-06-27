const express = require('express');/*เรียก module express*/
        bodyparser = require("body-parser"),
        mongoose =require('mongoose'),
        passport = require('passport'),
        LocalStrategy = require('passport-local'),
        User  = require('./models/user'),
        moment = require('moment');

const app = express();
mongoose.connect('mongodb://localhost/Movieweb');
app.use(express.static('public')); //ห้ามลบ เดะ css หายยย
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended : true}));
var collectionSchema = new mongoose.Schema({
        name: String,
        image: String,
        date: Date,
        category:String,
        desc:String
        
});

var ticketSchema = new mongoose.Schema({
        moviename : String,
        movieimg : String,
        moviedate : Date,
        moviecategory : String,
        theater : String,
        seatnumber : String,
        time :  Date

});

var Collection = mongoose.model('Collection', collectionSchema);
var Ticket = mongoose.model('Ticket',ticketSchema)


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

app.get('/TicketMovie/:id', function(req, res){
        Collection.findById(req.params.id, function(err, foundCollection){
                if(err){
                      console.log(err);
                }else {
                        res.render('TicketMovie.ejs',{collections: foundCollection});
                }
        });
    });

app.post('/Movie', function(req,res){
        var name = req.body.name;
        var image = req.body.image;
        var date = req.body.date;
        var category = req.body.category;
        var desc = req.body.desc;
        var newCollection = { name:name , image: image,category:category,date:date,desc:desc};
        Collection.create(newCollection, function(err,newlyCreated){
                if(err){
                        console.log(err);
                }else{
                        res.redirect('/Movie');
                }
        });
});

app.post('/Movie', function(req,res){
        var name = req.body.name;
        var image = req.body.image;
        var date = req.body.date;
        var category = req.body.category;
        var desc = req.body.desc;
        var newCollection = { name:name , image: image,category:category,date:date,desc:desc};
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

app.get('/TicketComplete', function(req,res){
        res.render('ticket.ejs');
});

app.post('/Movie/ComingSoon', function(req,res){
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

app.get('/Movie/TicketMovie', function(req,res){
        res.render('TicketMovie.ejs');
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

app.get('/Admin/Boxoffice',function(req,res){
        res.render('AdminBoxoffice.ejs');
});

app.get('/Admin/PromotionH',function(req,res){
        res.render('AdminPromotionH.ejs');
});

app.get('/Admin/News',function(req,res){
        res.render('AdminNews.ejs');
});

app.get('/Admin/NowShowing',function(req,res){
      
        Collection.find({},function(err,allCollections){
                if(err){
                        console.log(err);
                }else{
                        res.render('AdminShowing.ejs',{collections: allCollections});
                }
        });
        
});

app.get('/Admin/comingSoon',function(req,res){
        res.render('Admincomingsoon.ejs');
});

app.get('/Admin/Theater',function(req,res){
        res.render('theateradmin.ejs');
});

app.get('/Admin/Promotion',function(req,res){
        res.render('AdminPro.ejs');
});

app.listen('3000',function(req,res){
    console.log('Server is running on')});
