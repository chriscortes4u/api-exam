var http = require('http');
var express = require('express')
var app = express();
const HTTPError = require('node-http-error');
const port = process.env.PORT || 4000;

const dal = require('../DAL/no-sql.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var jsonParser = bodyParser.json();

///////////////Person//////////////////
app.get('/person/:id', function(req, res, next) {
    const personID = req.params.id
    console.log(personID)

    dal.getPerson(personID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));

        }
        if (data) {
            //      console.log('GET' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(200).send({data});
        }
    })
})

app.post('/person', function(req, res, next) {
    console.log(req.body);

    dal.createPerson(req.body, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('POST' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})
app.put('/person/:id', function(req, res, next) {
    console.log(req.body);

    dal.updatePerson(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('PUT' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})
app.delete('/person/:id', function(req, res, next) {
    const personID = req.params.id;
    dal.getPerson(personID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            dal.deletePerson(data, function callback(deletederr, deleteddata) {
                if (deletederr) {
                    var responseError = BuildResponseError(deletederr);
                    return next(new HTTPError(responseError.status, responseError.message, responseError));
                }
                if (deleteddata) {
                    console.log('DELETE' + req.path, deleteddata)
                    res.append('Content-type', 'application/json');
                    res.status(201).send(deleteddata);
                }
            })
        }
    })
})
app.get('/person/', function(req, res, next){
  const sortByParam = req.query.sortBy || 'person';
  const sortBy = getPersonSortBy(sortByParam, 'nosql')
  const sortToken = req.query.sortToken || "";
  const limit = req.query.limit || 3;

  dal.listPerson(sortBy, sortToken, limit, function callback(err, data) {
    if(err){
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
    }
    if (data) {
        console.log('GET' + req.path, "query:", req.query, data)
        res.append('Content-type', 'application/json');
        res.status(201).send(data);
    }
  })
})
/////////////
/////Class///
////////////

app.get('/class/:id', function(req, res, next) {
    const classID = req.params.id
    console.log(classID)

    dal.getClass(classID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));

        }
        if (data) {
            //      console.log('GET' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(200).send({data});
        }
    })
})

app.post('/class', function(req, res, next) {
    console.log(req.body);

    dal.createClass(req.body, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('POST' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})
app.put('/class/:id', function(req, res, next) {
    console.log(req.body);

    dal.updateClass(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('PUT' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})
app.delete('/class/:id', function(req, res, next) {
    const classID = req.params.id;
    dal.getClass(classID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            dal.deleteClass(data, function callback(deletederr, deleteddata) {
                if (deletederr) {
                    var responseError = BuildResponseError(deletederr);
                    return next(new HTTPError(responseError.status, responseError.message, responseError));
                }
                if (deleteddata) {
                    console.log('DELETE' + req.path, deleteddata)
                    res.append('Content-type', 'application/json');
                    res.status(201).send(deleteddata);
                }
            })
        }
    })
})
app.get('/class', function(req, res, next){
  const sortByParam = req.query.sortBy || 'class';
  const sortBy = getClassSortBy(sortByParam, 'nosql')
  const sortToken = req.query.sortToken || "";
  const limit = req.query.limit || 3;

  dal.listClass(sortBy, sortToken, limit, function callback(err, data) {
    if(err){
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
    }
    if (data) {
        console.log('GET' + req.path, "query:", req.query, data)
        res.append('Content-type', 'application/json');
        res.status(201).send(data);
    }
  })
})
////////////
////Maker///
///////////
app.get('/maker/:id', function(req, res, next) {
    const makerID = req.params.id
    console.log(makerID)

    dal.getMaker(makerID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));

        }
        if (data) {
            //      console.log('GET' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(200).send({data});
        }
    })
})

app.post('/maker', function(req, res, next) {
    console.log(req.body);

    dal.createMaker(req.body, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('POST' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})
app.put('/maker/:id', function(req, res, next) {
    console.log(req.body);

    dal.updateMaker(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('PUT' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})
app.delete('/maker/:id', function(req, res, next) {
    const makerID = req.params.id;
    dal.getMaker(makerID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            dal.deleteMaker(data, function callback(deletederr, deleteddata) {
                if (deletederr) {
                    var responseError = BuildResponseError(deletederr);
                    return next(new HTTPError(responseError.status, responseError.message, responseError));
                }
                if (deleteddata) {
                    console.log('DELETE' + req.path, deleteddata)
                    res.append('Content-type', 'application/json');
                    res.status(201).send(deleteddata);
                }
            })
        }
    })
})
app.get('/maker', function(req, res, next){
  const sortByParam = req.query.sortBy || 'person';
  const sortBy = getMakerSortBy(sortByParam, 'nosql')
  const sortToken = req.query.sortToken || "";
  const limit = req.query.limit || 3;

  dal.listMaker(sortBy, sortToken, limit, function callback(err, data) {
    if(err){
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
    }
    if (data) {
        console.log('GET' + req.path, "query:", req.query, data)
        res.append('Content-type', 'application/json');
        res.status(201).send(data);
    }
  })
})












//////
///////////////Sort function/////////
///////

function getPersonSortBy(type, dalModule) {
    var sortBy;
    var options = {
        'person': function() {
            sortBy = dalModule === 'nosql' ? 'personView' : 'vperson';
        },
        'class': function() {
            //email
            sortBy = dalModule === 'nosql' ? 'classView' : 'vclass';
        },
      'lastName': function() {
          sortBy = dalModule === 'nosql' ? 'lastNameView' : 'vlstnName';
      }
        //'default': function() {
      //      sortBy = dalModule === 'nosql' ? 'teamView' : 'vTeam';
    //    }
    };
    // invoke it
    (options[type] || options['default'])();
    // return a String with chosen sort
    return sortBy;
}

function getClassSortBy(type, dalModule) {
    var sortBy;
    var options = {
        'person': function() {
            sortBy = dalModule === 'nosql' ? 'personView' : 'vperson';
        },
        'class': function() {
            //email
            sortBy = dalModule === 'nosql' ? 'classView' : 'vclass';
        },
      'lastName': function() {
          sortBy = dalModule === 'nosql' ? 'lastNameView' : 'vlstnName';
      }
        //'default': function() {
      //      sortBy = dalModule === 'nosql' ? 'teamView' : 'vTeam';
    //    }
    };
    // invoke it
    (options[type] || options['default'])();
    // return a String with chosen sort
    return sortBy;
}
function getMakerSortBy(type, dalModule) {
    var sortBy;
    var options = {
        'person': function() {
            sortBy = dalModule === 'nosql' ? 'person' : 'vperson';
        },
        'class': function() {
            //email
            sortBy = dalModule === 'nosql' ? 'class' : 'vclass';
        },
      'maker': function() {
          sortBy = dalModule === 'nosql' ? 'maker' : 'vmaker';
      }
        //'default': function() {
      //      sortBy = dalModule === 'nosql' ? 'teamView' : 'vTeam';
    //    }
    };
    // invoke it
    (options[type] || options['default'])();
    // return a String with chosen sort
    return sortBy;
}





//////
///////Error function//////
/////

function BuildResponseError(err) {

  const statuscheck = isNaN(err.message.substring(0, 3)) === true
        ? "400"
        : err.message.substring(0, 3)
    const status = err.status
        ? Number(err.status)
        : Number(statuscheck)
    const message = err.status
        ? err.message
        : err.message.substring(3)
    const reason = message
    const error = status === 400
        ? "Bad Request"
        : err.name
    const name = error

    var errormsg = {}
    errormsg.error = error
    errormsg.reason = reason
    errormsg.name = name
    errormsg.status = status
    errormsg.message = message

    //   { error: 'Bad Request',
    // reason: 'Missing email property within data',
    // name: 'Bad Request',
    // status: 400,
    // message: 'Missing email property within data' }
    //console.log("BuildResponseError-->", errormsg)
    return errormsg
}


app.use(function(err, req, res, next) {
    console.log('error handler')
    console.log(req.method, ' ', req.path, " err: ", err)
    res.status(err.status || 400);
    res.send(err)
});

app.listen(4000, function() {
    console.log('Example app listening on port 4000!');
