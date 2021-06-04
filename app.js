var express = require('express'),/*เรียก module express*/
    app = express(),
    bodyParser = require("body-parser")
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MyMovieWeb');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); //ห้ามลบ เดะ css หายยย
app.set('view engine', 'ejs');

var showingSchema = new mongoose.Schema({
        name: String,
        image: String,
        desc: String
});



var NowShowing = mongoose.model('nowShowing',showingSchema);
// var nowshowing = [
//         {name:'Indiana Jones1',image: 'https://i.pinimg.com/originals/81/be/f6/81bef6c3cc7f23090c4f0e587efb98d6.jpg' },
//         {name:'Indiana Jones2',image: 'https://moviehubhd.com/wp-content/uploads/2021/03/poster-40.jpg' },
//         {name:'Indiana Jones3',image: 'https://images-na.ssl-images-amazon.com/images/I/71vYVW4tY0L._AC_SY679_.jpg' },
//         {name:'Indiana Jones4',image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3465bd60-8ab2-4ddb-8553-4dcb7513f443/d4ihz4m-cc4333fe-f6e6-43b5-988e-9cc59157651f.jpg/v1/fill/w_1280,h_1897,q_75,strp/indiana_jones_5_poster_by_marty_mclfy_d4ihz4m-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTg5NyIsInBhdGgiOiJcL2ZcLzM0NjViZDYwLThhYjItNGRkYi04NTUzLTRkY2I3NTEzZjQ0M1wvZDRpaHo0bS1jYzQzMzNmZS1mNmU2LTQzYjUtOTg4ZS05Y2M1OTE1NzY1MWYuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.UBLMTnqknvHHTvW44vkaC6Xbx7KNQiirp9J41Nqcrsk' }
        
// ];

// NowShowing.create(
//         {
//                 name: "iron man",
//                 image: "https://moviehubhd.com/wp-content/uploads/2021/03/poster-40.jpg",
//                 desc: "The indiana mix in iron man."
//         },
//         function(err,nowshowing){
//                 if(err){
//                         console.log(err);
//                 }else{
//                         console.log('New data added.');
//                         console.log(nowshowing);
//                 }
//         }
// );


app.get('/', function(req,res){
    res.render('home.ejs');
});

app.get('/Movie', function(req,res){
     NowShowing.find({},function(err,allnowshowing){
            if(err){
                      console.log(err);

           }else{
               res.render('Movie.ejs',{NowShowing: allnowshowing});
            }
   });
});

app.post('/Movie', function(req,res){
        // var name= req.body.name;
        // var image= req.body.image;
        // var desc= req.body.desc;
        // var newShowing ={name:name, image:image, desc:desc};
        // NowShowing.create(newShowing,function(err,newlyShowing){
        //         if(err){
        //                 console.log(err);
        //         }else{
        //                 res.redirect("/Movie");
        //         }
        // });
});
app.get('/Movie/ComingSoon', function(req,res){
        res.render('ComingSoon');
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

app.get('/signUp', function(req,res){
        res.render('sign-up.ejs');
});

/* Admin part */
app.get('/Management', function(req,res){
        res.render('Management.ejs');
});


app.listen('3000', function(req,res){
    console.log('Server is running');
});
