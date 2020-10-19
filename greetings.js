const { Pool } = require("pg");

module.exports = function Greetings(pool) {

	const namesGreeted = {};

async function setGreetNames(name){
	var regNames = /^[a-zA-Z]+$/;
		newRegex = new  RegExp(regNames);
		regexTest = newRegex.test(name);
	var newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
	
	const Dname = await pool.query(`SELECT name FROM greet  
		WHERE name = $1`,[newName]);
		if ( Dname.rowCount === 0){
			const insertName = await pool.query(`INSERT INTO greet(name, counter) VALUES ($1, 1)`,[newName]);
		}else {
	 const counter = await pool.query(`UPDATE greet 
		SET counter= counter+1
		WHERE name =$1`,[newName]);
			}	
		}		
		


	 function languages(lang, name) {
		if (lang === "English") {
			return "Hello, " + name + "!";
		}
		if (lang === "Afrikaans") {
			return "Halo, " + name + "!";
		}
		if (lang === "isiXhosa") {
			return "Molo, " + name + "!";
		}
		
	}


	 function errorHandler(lang, name){
		 if(name !== '' & isNaN(name)){
			 return "name should not be a number"
		 }
		if(!lang && !name){
			
			return "please enter your name and select a language";
		}
		if(!lang){
			
			return "please select a language";
		}
		if(!name){
			
			return "please enter your name";
		}
		
	}
	 async function greetNameCounter() {
		var listOfNames = await pool.query(`SELECT counter FROM greet`)
		return listOfNames.rowCount
	}

	 async function getGreetNames() {
var namesG = await pool.query(`SELECT name FROM greet`)
console.log(namesG.rows)
		return namesG.rows;
	}
	async function UserMsg(theName){
		var counted = await pool.query(`SELECT counter FROM greet WHERE name =$1`,[theName]);
		console.log(counted.rows)
		return counted.rows[0]
	}

	 function regFunction(name){
		var regNames = /^[a-zA-Z]+$/;
		newRegex = new  RegExp(regNames);
		regexTest = newRegex.test(name);
		// var enteredName = name.replace(regNames, "")

		if(regexTest){
			var newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
	
			return newName;
		}
		return "";
	 }
	async function resetB(){
		 var res = await pool.query(`delete from greet`)
		 return res
	 }
	
	return {
		setGreetNames,
		languages,
		greetNameCounter,
		getGreetNames,
		errorHandler,
		regFunction,
		UserMsg,
		resetB
	}
}