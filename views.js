const dal= require('./DAL/no-sql.js');

var designDoc = {
  _id: '_design/person',
  views: {
    'person':{
      map: function(doc) {
        if (doc.type === "person"){
          emit(doc.name);
          }
      }.toString()
    }
  }
}

var designDoc2 = {
  _id: '_design/class',
  views:{
    'class':{
      map: function(doc) {
        if (doc.type === "class"){
          emit(doc.class + doc_id);
        }
      }.toString()
    }
  }
}

var designDoc3 ={
  _id: '_design/maker',
  views:{
    'maker':{
      map: function(doc){
        if (doc.type === "maker"){
          emmit(doc.maker + doc._id);
        }
      }.toString()
    }
  }
}
dal.createView(designDoc, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})

dal.createView(designDoc2, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})


dal.createView(designDoc3, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})
