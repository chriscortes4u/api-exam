const dal = require('./DAL/no-sql.js');

const personData = [{
    firstName: "Joe",
    lastName: "neighbor",
    class: "touring",
    maker: "Honda",
    year: "2003",
    instock: true,
    cost: "3,000"
  },{
    firstName: "Matt",
    lastName: "Rightside",
    class: "cruiser",
    maker: "Harley Davidson",
    year: "2010",
    instock: true,
    cost: "13,000"
  },{
    firstName: "Josh",
    lastName: "Farside",
    class: "scooter",
    maker: "Honda",
    year: "2015",
    instock: true,
    cost: "8,000"
  },{
    firstName: "Kendra",
    lastName: "Kitkat",
    class: "scooter",
    maker: "Vespa",
    year: "2011",
    instock: true,
    cost: "5,000"
  },{
    firstName: "Cameron",
    lastName: "KillaCam",
    class: "cruiser",
    maker: "Harley Davidson",
    year: "2008",
    instock: true,
    cost: "5,000"
  },{
    firstName: "Jared",
    lastName: "frontside",
    class: "sportbike",
    maker: "suzuki",
    year: "2014",
    instock: false,
    cost: "15,000"
  },{
    firstName: "Derek",
    lastName: "Guruada",
    class: "scooter",
    maker: "Vespa",
    year: "2010",
    instock: false,
    cost: "6,000"
  },{
    firstName: "Andrea",
    lastName: "Ohio",
    class: "sportbike",
    maker: "suzuki",
    year: "2016",
    instock: true,
    cost: "20,000"
  },{
    firstName: "Alex",
    lastName: "Longhair",
    class: "touring",
    maker: "Honda",
    year: "2009",
    instock: false,
    cost: "5,500"
  },{
    firstName: "Chris",
    lastName: "Cortes",
    class: "sportbike",
    maker: "suzuki",
    year: "2016",
    instock: true,
    cost: "18,000"
}]



function callback(msgHeader) {
    return function(err, response) {
        if (err)
            return console.log('ERROR:\n', err.message)
        return console.log(msgHeader, response)
    }
}

personData.forEach(function(person) {
  dal.createPerson(person, callback('PERSON CREATED:\n'))
})
