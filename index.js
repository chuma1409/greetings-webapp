const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Greetings = require("./greetings");
const route = require("./routes")
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://chuma:pg123@localhost:5432/greetings-webapp';
const pool = new Pool({
	connectionString
});
const greetings = Greetings(pool)
const routes = route(greetings)

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


app.get('/',routes.counter)


  app.get('/greeted',routes.greeted)
 app.get('/reset',routes.reset)
 app.get('/',routes.home)
app.get('/addFlash',routes.flash)
  app.post('/greetings',routes.greeting)

  app.get('/counter/:username',routes.personCounter)



const PORT = process.env.PORT || 3015;


app.listen(PORT, function(){
    console.log("App started at port:", PORT)
});