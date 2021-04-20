const express = require('express');//เรียก module express
let app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('home.ejs');
});

app.get('/Movie', function(req,res){
        res.render('Movie.ejs');
});

app.get('/Theater', function(req,res){
        res.render('Theater.ejs');
});









//app.get('/:hero', function(req,res){
//    let hero = req.params; //variable
//    res.render('hero.ejs', hero); //ส่งตัวแปร  hero ไปหา hero.ejs
//});  
//app.get('/list/member1', function(req,res){
//    res.render('member1.ejs',{name:'Tony', codename:'Ironman'});
//});
//app.get('/list/member2', function(req,res){
//    member=[
 //       {name:'Tony', codename:'Ironman'},
 //       {name:'Steve', codename:'peter'},
  //      {name:'Peter', codename:'captain'}
  //  ]
 //   res.render('member2.ejs',{member:member});
//});
app.listen('3000', function(req,res){
    console.log('Server is running');
});
