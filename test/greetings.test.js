const assert = require("assert")
const Greetings =  require("../greetings")

/**
 *  add name 
 *      - test if 
 *             * name is not passed
 *             * language 
 */
describe("Greeting", function () {
    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://chuma:pg123@localhost:5432/greetingtest';
    const pool = new Pool({
        connectionString
    });
    

    beforeEach(async function () {
		await pool.query("delete from greet");
	});



it("should be able to greet Chuma and Lineo once",async function () {
    let greetings = Greetings(pool)
   await greetings.setGreetNames("Chuma")
   await greetings.setGreetNames("lineo")
    assert.equal(2, await greetings.greetNameCounter());
  });

it("count names stored in local storage", async function () {
    let greetings = Greetings(pool)
   await greetings.greetNameCounter()
    assert.equal(0, await  greetings.greetNameCounter())
  
});
it("should be able to greet Esihle in Afrikaans", async function () {
    
    let greetings = Greetings(pool)
    assert.equal("Halo, Esihle!", await greetings.languages("Afrikaans", "Esihle"));
  });
  it("should be able to greet Chuma in isiXhosa", async function () {
    let greetings = Greetings(pool)
    assert.equal("Molo, chuma!", await greetings.languages("isiXhosa", "chuma"));
  });
  it("should return error message displaying Please select language", async function(){
      let greetings = Greetings(pool)
      assert.equal("Please select language".error, await greetings.errorHandler("Please select language","Chuma"))
  })
  it("should return error message displaying Please enter your name ", async function(){
      let greetings = Greetings(pool)
      assert.equal("Please enter your name ".error, await greetings.errorHandler("English", "Please enter your name "))

      
  })
  it("should be able to greet Chuma once",async function () {
    let greetings = Greetings(pool)
   await greetings.setGreetNames("chuma")
    assert.equal(1,await greetings.greetNameCounter());
  });

after(function() {
    pool.end();
})


})