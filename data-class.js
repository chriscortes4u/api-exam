
const dal = require('./DAL/no-sql.js');


const classData = [
    {
        class: "touring",
        class: "sportbike",
        class: "scooter",
        class: "cruiser"
    }
]

function callback(msgHeader) {
    return function(err, response) {
        if (err)
            return console.log('ERROR:\n', err.message)
        return console.log(msgHeader, response)
    }
}


classData.forEach(function(classData) {
    dal.createClass(classData, callback('CLASS CREATED:\n'))
});
