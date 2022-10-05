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
let Userschema=new mongoose.Schema({
  name:String,
  date:String,
  review_grade:String,
  body:String,
  helpful:String,
  product_title:String
})
let Movieschema=new mongoose.Schema({
  product_title:String,
  link:String,
  director:String,
  rating:String,
  star:Array,
  summary:String,
  distributor:String,
  genre:Array,
  runtime:String,
  date:String,
  metascore:String,
  desc:String,
  num:String,
  positive:String,
  mixed:String,
  negative:String,
  userscore:String,
  user_desc:String,
  user_number:String,
  user_positive:String,
  user_mixed:String,
  user_negative:String,
  page:String,
  URL:String,  
  
})
let Musicschema=new mongoose.Schema({
  product_title:String,
  link:String,
  summary:String,
  record_label:String,
  genre:Array,
  name:Array,
  credit:Array,
  date:String,
  metascore:String,
  desc:String,
  num:String,
  positive:String,
  mixed:String,
  negative:String,
  userscore:String,
  user_desc:String,
  user_number:String,
  user_positive:String,
  user_mixed:String,
  user_negative:String,
  page:String,
  URL:String,  
  
})
let Tvschema=new mongoose.Schema({
  product_title:String,
  link:String,
  date:String,
  genre:Array,
  summary:String,
  distributor:String,
  creator:Array,
  star:Array,
  metascore:String,
  desc:String,
  num:String,
  positive:String,
  mixed:String,
  negative:String,
  userscore:String,
  user_desc:String,
  user_number:String,
  user_positive:String,
  user_mixed:String,
  user_negative:String,
  page:String ,
  URL:String,  
})

let criticschema=new mongoose.Schema({
  href:String,
  source:String,
  author:String,
  date:String,
  review_grade:String,
  body:String,
  product_title:String,
  metascore:String,
  desc:String,
  num:String,
  positive:String,
  mixed:String,
  negative:String 
                     
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
let Movie=conn.model('Movie', Movieschema);
let Music=conn.model('Music', Musicschema);
let Tv=conn.model('Tv', Tvschema);
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
let Tvcritic=conn.model('Tvcritic',criticschema);
let Musiccritic=conn.model('Musiccritic',criticschema);
let Moviecritic=conn.model('Moviecritic',criticschema);
let Musicuser=conn.model('Musicuser',Userschema);
let Tvuser=conn.model('Tvuser',Userschema);
let Movieuser=conn.model('Movieuser',Userschema);
module.exports = {
  conn: conn,
  Analysis:Analysis,
  Movie:Movie,
  Tv:Tv,
  Music:Music,
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
  Tvcritic:Tvcritic,
  Musiccritic:Musiccritic,
  Moviecritic:Moviecritic,
  Musicuser:Musicuser,
  Tvuser:Tvuser,
  Movieuser:Movieuser

};