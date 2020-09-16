const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Greetings = require("./greetings");

const greetings = Greetings()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// app.engine('handlebars', exphbs({
//     layoutsDir: './views/layouts'
// }));

app.use(express.static('public'));
;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

  // initialise session middleware - flash-express depends on it
  app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

  // initialise the flash middleware
  app.use(flash());

app.get('/counter', function(){


})


app.get('/', function (req, res) {

    res.render('index');
  
  });



  app.get('/greeted',function(req,res){
    var greetedNames = greetings.getGreetNames();
 
     
    res.render('greeted', {name: greetedNames});
 });
 app.get('/', function (req, res) {
  req.flash('info', 'Welcome');
  res.render('index', {
    title: 'Home'
  })
});
app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});
  app.post('/greetings', function (req, res) {
  
    const name = req.body.userName
    const language = req.body.language
    greetings.setGreetNames(name);

    var languages = greetings.languages(language, name)
    var greetNameCounter = greetings.greetNameCounter();
    // req.flash('info', 'Flash Message Added');
if(name === "" && language === undefined){
req.flash('errMsg','please enter your name and select a language')
}
else if(language === undefined){
  req.flash('errMsg','please select a language')
}
else if(name === ""){
  req.flash('errMsg','please enter your name')
}
    res.render('index', {
        languages: languages,
        greetNameCounter: greetNameCounter
  
    });
  
  });

  app.get('/counter/:username', function(req, res){
     let username = req.params.username;
     var greetedNames = greetings.getGreetNames();

    var msg = "Hi, " + username + " you been greeted " + greetedNames[username] + " times" + "!"

    res.render('counter', {
      message : msg
    })
  })



const PORT = process.env.PORT || 3014;


app.listen(PORT, function(){
    console.log("App started at port:", PORT)
});