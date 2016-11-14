const dal = require('./DAL/no-sql.js');

const personData = [{

  firstName: "Dan",
  lastName: "TheMan",
  class: "touring",
  maker: "Honda",
  year: "2016",
  instock: "yes",
  cost: "20,000"


function callback (msgHeader) {
  return function (err, response) {
    if (err) return console.log('ERROR:\n', err.message)
    return console.log(msgHeader, response)
  }
}

personData.forEach(function(person) {
  dal.createPerson(person, callback('PERSON CREATED:\n'))
})
