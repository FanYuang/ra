const MongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');
const conn = mongoose.createConnection(

    'mongodb://localhost:27017/ra', {
      serverSelectionTimeoutMS: 60000,
    
    bufferCommands: false,

    
   
    
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
let analysisschema=new mongoose.Schema({
  mean_score:Number,
  mean_comment:Number,
  startdate:String,
  prop:String

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
Metareviewschema.index({ date: "hashed" });

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
let Analysis=conn.model('Analysis',analysisschema);
let Cleanyi=conn.model('Cleanyi',Metareviewschema);
let Cleaner=conn.model('Cleaner',Metareviewschema);
let Cleansan=conn.model('Cleansan',Metareviewschema);
let Cleansi=conn.model('Cleansi',Metareviewschema);
let Cleanwu=conn.model('Cleanwu',Metareviewschema);
let Cleanliu=conn.model('Cleanliu',Metareviewschema);
let Cleanqi=conn.model('Cleanqi',Metareviewschema);
let Cleanba=conn.model('Cleanba',Metareviewschema);
let Cleanjiu=conn.model('Cleanjiu',Metareviewschema);
let Cleanshi=conn.model('Cleanshi',Metareviewschema);
let Cleana=conn.model('Cleana',Metareviewschema);
let Cleanb=conn.model('Cleanb',Metareviewschema);
let Cleanc=conn.model('Cleanc',Metareviewschema);
let Cleand=conn.model('Cleand',Metareviewschema);
let Cleane=conn.model('Cleane',Metareviewschema);
module.exports = {
  conn: conn,
  Analysis:Analysis,
 
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
  Cleanspot:Cleanspot,
 Cleanyi:Cleanyi,
 Cleaner:Cleaner,
 Cleansan:Cleansan,
 Cleansi:Cleansi,
 Cleanwu:Cleanwu,
 Cleanliu:Cleanliu,
 Cleanqi:Cleanqi,
 Cleanba:Cleanba,
 Cleanjiu:Cleanjiu,
 Cleanshi:Cleanshi,
 Cleana:Cleana,
 Cleanb:Cleanb,
 Cleanc:Cleanc,
 Cleand:Cleand,
 Cleane:Cleane,
};