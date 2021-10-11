const express = require('express')
const mongoose = require('mongoose');
const mongo = require('./environment/mongo');
const axios = require('axios');
var cheerio = require('cheerio');
const app = express()
const port = 3001
let arr=[];
let array=[];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getmetauser',(req,res)=>{

    function get(num)
    {
        mongo.Meta.findOne({}).skip(num).exec((err,doc)=>{
            
            if (doc&&doc.user_review&&doc.user_review.length>0)
            doc.user_review.map(el=>{
                let obj={};
                obj.name=el.name;
                if (array.indexOf(el.name)==-1)
                {
                    let data=new mongo.Metauser(obj);
                    data.save();
                    
                    arr.push(el.name);
                }
                
                console.log(el.name);

            })
            get(num+1);
        })
    }
    get(0);
    res.send("ok");
})
app.get("/store",(req,res)=>{
    arr=Array.from(new Set(arr));
    array=Array.from(new Set(array));
    arr.map(el=>{
        let data=new mongo.Metauser(el);
        data.save();
        console.log(el.name);

    })
    array.map(el=>{
        let data=new mongo.Gameuser(el);
        data.save();
        console.log(el.name);
    })
    res.send("ok");
})
app.get('/getgameuser',(req,res)=>{
    function get(num)
    {
        mongo.Game.findOne({}).skip(num).exec((err,doc)=>{
            if (doc&&doc.player_review&&doc.player_review.length>0)
            doc.player_review.map(el=>{
                let obj={};
                obj.name=el.auther;
                if (array.indexOf(el.auther)==-1)
                {
                    let data=new mongo.Gameuser(obj);
                    data.save();
                    
                    array.push(el.auther);
                }
        
                
                console.log(el.auther);

            })
            get(num+1);
        })
    }
    get(0);
    res.send("ok");
})

app.get("/getgame",(req,res)=>{

    function get(num)
    {
        mongo.Gameuser.findOne({}).skip(num).exec((err,doc)=>{
            console.log("开始："+num);
            console.log("开始爬"+doc.name);
            axios.get('https://www.gamespot.com/profile/'+doc.name+"/reviews/")
        .then(function (res) {
            $ = cheerio.load(res.data);
          
            let number=$('.paginate__item').last().prev().text();
            console.log(number);
            mongo.Gameuser.updateOne({ name: doc.name },{num:number}).exec(()=>{
               if (num<1584)
                get(num+10);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
        })
       
    }
    for (let i=0;i<10;i++)
    get(0+i);
    

  

    res.send("ok");
})

app.get("/getspot",(req,res)=>{
    
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})