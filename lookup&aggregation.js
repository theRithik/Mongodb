
///////LOoKUPS

db.orders.insert([
    {"_id":1, "item":"almonds", "price":12, "quantity":2},
      {"_id":2, "item":"pecans", "price":20, "quantity":1}
])

db.inventors.insert([
    {"id":1, "sku":"alomnds","description":"american alomnds", "instock":120},
      {"id":2, "sku":"bread","description":"american ", "instock":80},
        {"id":3, "sku":"cashews","description":"american alomnds", "instock":60},
          {"id":4, "sku":"alomnds","description":"american alomnds", "instock":70}

])

db.orders.aggregate([
    {
        $lookup:
        {
            from:'inventors',
            localField:'item',
            foreginField:'sku',
            as:"combine_data"
        }
    }
])

/////////////////
db.classes.insert( [ 
    { _id: 1, title: "Reading is ...", enrollmentlist: [ "giraffe2", "pandabear", "artie" ], days: ["M", "W", "F"] }, 
    { _id: 2, title: "But Writing ...", enrollmentlist: [ "giraffe1", "artie" ], days: ["T", "F"] } 
])

db.members.insert( [
     { _id: 1, name: "artie", joined: new Date("2016-05-01"), status: "A" },
      { _id: 2, name: "giraffe", joined: new Date("2017-05-01"), status: "D" },
       { _id: 3, name: "giraffe1", joined: new Date("2017-10-01"), status: "A" }, 
       { _id: 4, name: "panda", joined: new Date("2018-10-11"), status: "A" },
        { _id: 5, name: "pandabear", joined: new Date("2018-12-01"), status: "A" },
         { _id: 6, name: "giraffe2", joined: new Date("2018-12-01"), status: "D" } 
        ])


        db.lookups.aggregate([
            {
                $lookup:
                {
                    from:"members",
                    localField:"enrollmentlist",
                    foreignField:"name",
                    as:"student_info"
                }
              

            }
        ])

        
////////Aggregartion

//  $match
// It is used for filtrting document (condition as like in find) 

// $project 
// It will select some specifi fields from a collection 

// $group 
// it is used to group document on based on some values 

// $sort
//  Its is used to sort the data 

//$skip
// Skip number of documents 

 $limit 
 To retrive number of documents

 $unwind
 Deconstructs an array,like flat the array 
 $out Is to write the document output


////match//
db.students.aggregate([ 
    { 
        $match:{sec:'A'} 
    }, {
         $count:'Total Number of students in sec A' 
        }
     ])

     //////////// 
     db.students.aggregate([ { $group:{ _id:"$sec", total_st:{$sum:1}, max_age:{$max:"$age"} } } ])

//{ "_id" : "B", "total_st" : 3, "max_age" : 40 } { "_id" : "A", "total_st" : 4, "max_age" : 37 }

///////
 db.students.aggregate([ { $match:{age:{$gt:30}} } ])

 //
  db.students.aggregate([ { '$sort':{'age':1} } ])

///////// 
db.students.aggregate([
     { $match:{sec:'B'} }, 
{ 
    $sort:{'age':-1} 
}, { 
    $limit:1
 }
 ])

 /////unwind  it makes to records

 db.students.aggregate([
    {
        $unwind:"$subject"
    }
 ])

 /////////////// db.employees.aggregate([ { $match:{ gender:'female' } } ])

db.employees.aggregate([ 
    { $group:{
        _id:'$department.name' }
    }
])

db.employees.aggregate([ 
    { $group:{ 
        _id:'$department.name', totalEmployees:{$sum:1} 
    }
    } ])

db.employees.aggregate([ 
    { $match:{ gender:'male' } },
    { $group:{ _id:'$department.name', totalEmployees:{$sum:1} }
    } 
]).pretty()

db.employees.aggregate([ 
    { $match:{ gender:'male' } },
    { $group:{ _id:'$department.name', totalEmployees:{$sum:1},
              totalSalary:{$avg:'$salary'}, } } 
]).pretty()

db.employees.aggregate([ 
    { $match:{ gender:'male' } },
                        { $sort:{ firstName:1 } } 
]).pretty()

db.employees.aggregate([ 
    { $match:{ gender:'male' } },
    { $group:{ _id:{deptName:'$department.name'},totalEmployees:{$sum:1}, totalSalary:{$avg:'$salary'}, } },
    { $sort:{ "_id.deptName":-1 } } ]).pretty()
