//add a series for _id

db.counters.insert({
    "_id":"cityId",
    "sequence_value":0
})
function generateSeries(sequenceName){
    var sequenceDocument = db.counters.findAndModify({
        query:{_id:sequenceName},
        update:{$inc:{sequence_value:1}},
        new:true
    })
return sequenceDocument.sequence_value
}

db.city.insert({
    "_id": generateSeries('cityId'),
    "name":"Amsterdam",
    "country":"Netherlands"
})

db.city.insert({
    "_id": generateSeries('cityId'),
    "name":"Australia",
    "country":"Netherlands"
})

db.city.insert({
    "_id": generateSeries('cityId'),
    "name":"Helskinki",
    "country":"Finland"
})
