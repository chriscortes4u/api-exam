const dal = require('./DAL/no-sql.js');

const makerData = [{
  maker: "suzuki",
  maker: "Honda",
  maker: "Vespa",
  maker: "Harley Davidson"
}];

function callback(msgHeader) {
return function(err, response) {
    if (err)
        return console.log('ERROR:\n', err.message)
    return console.log(msgHeader, response)
}
}

makerData.forEach(function(makerData) {
    dal.createMaker(makerData, callback('Maker CREATED:\n'))
});
