const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const db = new PouchDB('http://localhost:5984/api-test');


var dal = {
    listClass: listClass,
    updateClass: updateClass,
    createClass: createClass,
    getClass: getClass,
    listPerson: listPerson,
    getPerson: getPerson,
    createPerson: createPerson,
    updatePerson: updatePerson,
    listMaker: listMaker,
    updateMaker: updateMaker,
    createMaker: createMaker,
    getMaker: getMaker,
    createView: createView,
    getDocByID: getDocByID

};

////////////////////////////
//////Utility functions/////
///////////////////////////
var convertPerson = function(queryRow) {
    query.Row.doc.sortToken = queryRow.key;
    return queryRow.doc;
};

function queryDB(sortBy, startKey, limit, callback) {
    if (typeof startKey == "undefined" || startKey === null) {
        return callback(new Error('Missing search parameter'));
    } else if (typeof limit == "undefined" || limit === null || limit === 0) {
        return callback(new Error('Missing limit parameter'));
    } else {
        limit = startkey === ''
            ? Number(limit)
            : Number(limit) + 1;

        console.log("sortBy:", sortBy, " startkey: ", startkey, " limit: ", limit)

        ////     CALLBACKS ////
        db.query(sortBy, {
            startKey: startkey,
            limit: limit,
            include_docs: true
        }, function(err, result) {
            if (err)
                return callback(err);
            if (result) {
                if (startkey !== '' && result.rows.length > 0) {
                    // remove first item
                    result.rows.shift();
                }
                return callback(null, result.rows.map(convertPerson));
            }
        });
    }
}
var convertClass = function(queryRow) {
    query.Row.doc.sortToken = queryRow.key;
    return queryRow.doc;
};

function queryDBclass(sortBy, startKey, limit, callback) {
    if (typeof startKey == "undefined" || startKey === null) {
        return callback(new Error('Missing search parameter'));
    } else if (typeof limit == "undefined" || limit === null || limit === 0) {
        return callback(new Error('Missing limit parameter'));
    } else {
        limit = startkey === ''
            ? Number(limit)
            : Number(limit) + 1;

        console.log("sortBy:", sortBy, " startkey: ", startkey, " limit: ", limit)

        ////     CALLBACKS ////
        db.query(sortBy, {
            startKey: startkey,
            limit: limit,
            include_docs: true
        }, function(err, result) {
            if (err)
                return callback(err);
            if (result) {
                if (startkey !== '' && result.rows.length > 0) {
                    // remove first item
                    result.rows.shift();
                }
                return callback(null, result.rows.map(convertClass));
            }
        });
    }
}
var convertMaker = function(queryRow) {
    query.Row.doc.sortToken = queryRow.key;
    return queryRow.doc;
};

function queryDBmaker(sortBy, startKey, limit, callback) {
    if (typeof startKey == "undefined" || startKey === null) {
        return callback(new Error('Missing search parameter'));
    } else if (typeof limit == "undefined" || limit === null || limit === 0) {
        return callback(new Error('Missing limit parameter'));
    } else {
        limit = startkey === ''
            ? Number(limit)
            : Number(limit) + 1;

        console.log("sortBy:", sortBy, " startkey: ", startkey, " limit: ", limit)

        ////     CALLBACKS ////
        db.query(sortBy, {
            startKey: startkey,
            limit: limit,
            include_docs: true
        }, function(err, result) {
            if (err)
                return callback(err);
            if (result) {
                if (startkey !== '' && result.rows.length > 0) {
                    // remove first item
                    result.rows.shift();
                }
                return callback(null, result.rows.map(convertMaker));
            }
        });
    }
}







    function getDocByID(id, callback) {
        // Call to couch retrieving a document with the given _id value.
        if (typeof id == "undefined" || id === null) {
            return callback(new Error('400Missing id parameter'));
        } else {
            //////     CALLBACKS
            db.get(id, function(err, data) {
                if (err)
                    return callback(err);
                if (data)
                    return callback(null, data);
                }
            );
        }
    }

    function createView(designDoc, callback) {
        if (typeof designDoc == "undefined" || designDoc === null) {
            return callback(new Error('400Missing design document.'));
        } else {

            ////     CALLBACKS
            db.put(designDoc, function(err, response) {
                if (err)
                    return callback(err);
                if (response)
                    return callback(null, response);
                }
            );
        }
    }

    function updateDoc(data, callback) {
        // Call to couch retrieving a document with the given _id value.
        if (typeof data == "undefined" || data === null) {
            return callback(new Error('400Missing data for update'));
        } else if (data.hasOwnProperty('_id') !== true) {
            return callback(new Error('400Missing id property from data'));
        } else if (data.hasOwnProperty('_rev') !== true) {
            return callback(new Error('400Missing rev property from data'));
        } else {

            //////     CALLBACKS
            db.put(data, function(err, response) {
                if (err)
                    return callback(err);
                if (response)
                    return callback(null, response);
                }
            );
        }
    }
    function deleteDoc(data, callback) {
        if (typeof data == "undefined" || data === null) {
            return callback(new Error('400Missing data for delete'));
        } else if (data.hasOwnProperty('_id') !== true) {
            return callback(new Error('400Missing _id property from data'));
        } else if (data.hasOwnProperty('_rev') !== true) {
            return callback(new Error('400Missing _rev property from data'));
        } else {
            //////     CALLBACKS
            db.remove(data, function(err, response) {
                if (err)
                    return callback(err);
                if (response)
                    return callback(null, response);
                }
            );
        }

    }

    //////////////////////////////////////////////////////////////////////
    //                       Class
    //////////////////////////////////////////////////////////////////////
    function getClass(id, callback) {
        getDocByID(id, callback);
    }
    function listClass(sortBy, startKey, limit, callback) {

        if (typeof sortBy == "undefined" || sortBy === null) {
            return callback(new Error('Missing search parameter'));
        }

        limit = startKey !== ''
            ? limit + 1
            : limit

        db.query(sortBy, {
            startkey: startKey,
            limit: limit
        }, function(err, data) {
            if (err)
                return callback(err)

            if (startKey !== '') {
                data.rows.shift()
            }

            callback(null, data)
        })
    }

    function updateClass(data, callback) {
        updateDoc(data, callback);
    }

    function deleteClass(data, callback) {
        deleteDoc(data, callback);
    }


    function createClass(data, callback) {
        // Call to couch retrieving a document with the given _id value.
        if (typeof data == "undefined" || data === null) {
            return callback(new Error('400Missing data for create'));
        } else if (data.hasOwnProperty('_id') === true) {
            return callback(new Error('400Unnecessary _d property within data. ' +
                'createClass() will generate a unique _id'));
        } else if (data.hasOwnProperty('_rev') === true) {
            return callback(new Error('400Unnecessary rev property within data'));

            data.type = 'class';
            data._id = 'class_' + data.class + data.fistName;

            /////CALLBACK//////
            db.put(data, function(err, response) {
                if (err)
                    return callback(err);
                if (response)
                    return callback(null, response);
                }
            );
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    //                              Person
    ///////////////////////////////////////////////////////////////////////////
    function getPerson(id, callback) {
        getDocByID(id, callback);
    }

    function listPerson(sortBy, startKey, limit, callback) {
        queryDB(sortBy, startKey, limit, callback);

        //validate our params
        if (typeof sortBy == "undefined" || sortBy === null) {
            return callback(new Error('Missing search parameter'));
        }

        limit = startKey !== ''
            ? limit + 1
            : limit

        db.query(sortBy, {
            startkey: startKey,
            limit: limit
        }, function(err, data) {
            if (err)
                return callback(err)

            if (startKey !== '') {
                data.rows.shift()
            }

            callback(null, data)
        })
    }
    function updatePerson(data, callback) {
        updateDoc(data, callback);
    }

    function deletePerson(data, callback) {
        deleteDoc(data, callback);
    }

    function createPerson(data, callback) {
        // Call to couch retrieving a document with the given _id value.
        if (typeof data === "undefined" || data === null) {
            return callback(new Error('400Missing data for create'));
        } else if (data.hasOwnProperty('_id') === true) {
            return callback(new Error('400Unnecessary id property within data.'));
        } else if (data.hasOwnProperty('_rev') === true) {
            return callback(new Error('400Unnecessary rev property within data'));
        } else if (data.hasOwnProperty('lastName') !== true) {
            return callback(new Error('400Missing lastName property within data'));
        } else if (data.hasOwnProperty('firstName') !== true) {
            return callback(new Error('400Missing firstName property within data'));
        } else {

            data.active = true;
            data.type = 'person';
            data._id = 'person_' + data.firstName + data.lastName;

            //////     CALLBACKS
            db.put(data, function(err, response) {
                if (err)
                    return callback(err);
                if (response)
                    return callback(null, response);
                }
            );
        }
    }

    /////////////////////////////
    ////////////////Maker/////////
    /////////////////////////////
    function getMaker(id, callback) {
        getDocByID(id, callback);
    }
    function listMaker(sortBy, startKey, limit, callback) {

        if (typeof sortBy == "undefined" || sortBy === null) {
            return callback(new Error('Missing search parameter'));
        }

        limit = startKey !== ''
            ? limit + 1
            : limit

        db.query(sortBy, {
            startkey: startKey,
            limit: limit
        }, function(err, data) {
            if (err)
                return callback(err)

            if (startKey !== '') {
                data.rows.shift()
            }

            callback(null, data)
        })
    }

    function updateMaker(data, callback) {
        updateDoc(data, callback);
    }

    function deleteMaker(data, callback) {
        deleteDoc(data, callback);
    }

    function createMaker(data, callback) {
        // Call to couch retrieving a document with the given _id value.
        if (typeof data == "undefined" || data === null) {
            return callback(new Error('400Missing data for create'));
        } else if (data.hasOwnProperty('_id') === true) {
            return callback(new Error('400Unnecessary _d property within data. ' +
                'createMaker() will generate a unique _id'));
        } else if (data.hasOwnProperty('_rev') === true) {
            return callback(new Error('400Unnecessary rev property within data'));
            data.type = 'maker';
            data._id = 'maker_' + data.maker + data.firstName;

            /////CALLBACK//////
            db.put(data, function(err, response) {
                if (err)
                    return callback(err);
                if (response)
                    return callback(null, response);
                }
            );
        }
    }

    module.exports = dal;
