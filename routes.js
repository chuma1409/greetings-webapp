module.exports = function route(greetings){
const counter =  function (req, res) {

    res.render('index');
  
  };
  const greeted = async function(req,res){
    var greetedNames = await greetings.getGreetNames();
 
     
    res.render('greeted', {name: greetedNames});
 };
 const reset = async function(req, res){
    await greetings.resetB();
 
    res.render('index')
  }
  const home =  function (req, res) {
    req.flash('info', 'Welcome');
    res.render('index', {
      title: 'Home'
    })
  };
  const flash =  function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
  };
  const greeting =  async function (req, res) {
  
    const name =  req.body.userName
    const language =  req.body.language
    
  
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
else if(isNaN(name) === false ){
    req.flash('errMsg','name should not be a number')
}
else {
    console.log(isNaN(name));
  await greetings.setGreetNames(name);
  var languages = await greetings.languages(language, name)
  var greetNameCounter = await greetings.greetNameCounter();
}
    res.render('index', {
        languages: languages,
        greetNameCounter: greetNameCounter
  
    });
  
  };
  const personCounter =  async function(req, res){
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
 }
return{
    counter,
    greeted,
    reset,
    home,
    flash,
    greeting,
    personCounter

}
}