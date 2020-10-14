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
    const INSERT_QUERY = "insert into greet (name, counter) values ($1, $2)";

    beforeEach(async function () {
		await pool.query("delete from greet");
	});

// it("should be able to add users  greeted", async function(){
//     await pool.query(INSERT_QUERY,["esihle", 2]);
//     await pool.query(INSERT_QUERY,["qwerty", 1]);

//     const results = await pool.query("select count(*) from greet");

//     assert.equal(2, results.rows[0].count);
// })
it("should be able to find a greeted name", async function(){
     await pool.query(INSERT_QUERY,["esihle", 2]);

    const results = await pool.query("select * from greet where name=$1", ["esihle"]);

    assert.equal("esihle", results.rows[0].name);
	assert.equal(2, results.rows[0].counter);
})
it("should be able to greet Chuma and Lineo once",async function () {
    let greetings = Greetings(pool)
   await greetings.setGreetNames("Chuma")
   await greetings.setGreetNames("lineo")
    assert.equal(2, await greetings.greetNameCounter());
  });
// it("should be able to count all greeted users", async function(){
//     await pool.query(INSERT_QUERY,["chuma", 2]);
//     await pool.query(INSERT_QUERY,["qwerty", 7]);
//     await pool.query(INSERT_QUERY,["esihle", 9]);
//     await pool.query(INSERT_QUERY,["musa", 6]);
//     await pool.query(INSERT_QUERY,["sibo", 8]);
//     await pool.query(INSERT_QUERY,["loreen", 5]);

//     const results = await pool.query("select count(*) from greet")

//     assert.equal(6, results.rows[0].count);

// })
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