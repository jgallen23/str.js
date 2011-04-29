var utils = require("./str");

var f = utils.format("Hey {friend}, my name is {me}", { friend: 'Bob', me: 'Jack' }); 
console.log(f);

var f = utils.format("Hey {0}, my name is {1}", ['Bob', 'Jack']); 
console.log(f);

var person = {
	firstName: 'Jane'
};
var t = utils.template("Name: {!= person.firstName !}", { person: person }); 
console.log(t);
