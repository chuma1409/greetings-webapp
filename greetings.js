module.exports = function Greetings() {

	const namesGreeted = {};


 function setGreetNames(name) {
		if (name) {
			if (namesGreeted[name] === undefined) {
				namesGreeted[name] = 0;
			}
			namesGreeted[name]++
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
	 function greetNameCounter() {
		var listOfNames = Object.keys(namesGreeted)
		return listOfNames.length
	}

	 function getGreetNames() {
		return namesGreeted;
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
	return {
		setGreetNames,
		languages,
		greetNameCounter,
		getGreetNames,
		errorHandler,
		regFunction
	}
}