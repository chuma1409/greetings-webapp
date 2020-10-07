const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Greetings = require("./greetings");
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://chuma:pg123@localhost:5432/greetings-webapp';
const pool = new Pool({
	connectionString
});
const greetings = Greetings(pool)

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



  app.get('/greeted',async function(req,res){
    var greetedNames = await greetings.getGreetNames();
 
     
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
  app.post('/greetings', async function (req, res) {
  
    const name =  req.body.userName
    const language =  req.body.language
   greetings.setGreetNames(name);

    var languages = await greetings.languages(language, name)
    var greetNameCounter = await greetings.greetNameCounter();
    // req.flash('info', 'Flash Message Added');
if(!name && !language){
req.flash('errMsg','please enter your name and select a language')
}
else if(!language){
  req.flash('errMsg','please select a language')
}
else if(!name){
  req.flash('errMsg','please enter your name')
}
    res.render('index', {
        languages: languages,
        greetNameCounter: greetNameCounter
  
    });
  
  });

  app.get('/counter/:username', async function(req, res){
     let username = req.params.username;
     var greetedNames =await greetings.getGreetNames();
     var counts = await greetings.UserMsg(username);
for (const key in counts) {

    var element = counts[key];
    
  
}
console.log(element)
    var msg = "Hi, " + username + " you been greeted " + element + " times" + "!"

    res.render('counter', {
      message : msg
    })
  })



const PORT = process.env.PORT || 3014;


app.listen(PORT, function(){
    console.log("App started at port:", PORT)
});