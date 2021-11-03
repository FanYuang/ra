const MongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');
const conn = mongoose.createConnection(

    'mongodb://localhost:27017/ra', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

conn.on('open', () => {
  console.log('mongo connected!');
})
conn.on('err', (err) => {
  console.log('err:' + err);
})
conn.on('close', () => {
  console.log('mongo disconnected!');
})
let Metareviewschema=new mongoose.Schema({
  name:String,
  product_title:String,
  product_score:String,
  date:String,
  review_score:Number,

  body:String,
  helpful:String

}) 

let Timeschema=new mongoose.Schema({
    setuptime:Number,
    querytime:Number,
    method:String,
    distribution:String,
    num:Number,
    prop:Object
})
let Gameuserschema=new mongoose.Schema({
  name:String,
  num:Number,
  review:Array

})

let Gamereviewschema=new mongoose.Schema({
  name:String,
  
  review:Object

})

let Metauserschema=new mongoose.Schema({
  name:String,
  
  game_info:Object,
  game_review:Array,
  tv_info:Object,
  tv_review:Array,
  movie_info:Object,
  movie_review:Array,
  music_info:Object,
  music_review:Array
})
let Metaschema=new mongoose.Schema({
  title:String,
  user_review:Array

})

let Gameschema=new mongoose.Schema({
  name:String,
  player_review:Array

})

let Spotschema=new mongoose.Schema({
  name:String,
  title:String,
system:String,

score:String,

helpful:String,

url:String,

date:String,
})

let Time=conn.model('Time', Timeschema);
let Game=conn.model('Game', Gameschema);
let Meta=conn.model('Meta', Metaschema);
let Gameuser=conn.model('Gameuser', Gameuserschema);
let Metauser=conn.model('Metauser', Metauserschema);
let Gamereview=conn.model('Gamereview',Gamereviewschema);
let Metamusic=conn.model('Metamusic',Metareviewschema);
let Metatv=conn.model('Metatv',Metareviewschema);
let Metamovie=conn.model('Metamovie',Metareviewschema);
let Metagame=conn.model('Metagame',Metareviewschema);
let Cleangame=conn.model('Cleangame',Metareviewschema);
let Cleanmusic=conn.model('Cleanmusic',Metareviewschema);
let Cleantv=conn.model('Cleantv',Metareviewschema);
let Cleanmovie=conn.model('Cleanmovie',Metareviewschema);
let Cleanspot=conn.model('Cleanspot',Spotschema);
module.exports = {
  conn: conn,
  Time:Time,
  Game:Game,
  Meta:Meta,
  Metauser:Metauser,
  Gameuser:Gameuser,
  Gamereview:Gamereview,
  Metamusic:Metamusic,
  Metamovie:Metamovie,
  Metatv:Metatv,
  Metagame:Metagame,
  Cleangame:Cleangame,
  Cleanmovie:Cleanmovie,
  Cleantv:Cleantv,
  Cleanmusic:Cleanmusic,
  Cleanspot:Cleanspot
};