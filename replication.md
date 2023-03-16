
sudo mkdir data/rs1
sudo mkdir data/rs2
sudo mkdir data/rs3

sudo mongod --port 2001 --dbpath data/rs1 --replSet --aakash --oplogSize 128
sudo mongod --port 2002 --dbpath data/rs2 --replSet --aakash --oplogSize 128
sudo mongod --port 2003 --dbpath data/rs3 --replSet --aakash --oplogSize 128

mongo --port 2001
mongo --port 2002
mongo --port 2003


//this is run over primary
rs.help
rs.help()
rs.status()
rs.initiate()
rs.add("127.0.0.1:2002")
// primary^^^

//Run over secondy to allow replication
db.getMongo().setSlaveOk()

rs.add({_id:4, host:"AAKASH:27017", priority:1});
rs.add({_id:4, host:"AAKASH:27017", priority:0, hidden: true});
rs.addArb("AAKASH:3001")
rs.remove()




////////////
rs.add("localhost:2002")

//Window
mongod --port 2001 --dbpath D:\mongodb\class1 --replSet --aakash --oplogSize 128
mongod --port 2002 --dbpath D:\mongodb\class2 --replSet --aakash --oplogSize 128
mongod --port 2003 --dbpath D:\mongodb\class3 --replSet --aakash --oplogSize 128

mongo --port 2001
mongo --port 2002
mongo --port 2003

// this goes when you have ip problem
mongod --port 2001 --dbpath /mongodb/class1 --replSet --aakash --bind_ip 10.0