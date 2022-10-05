const express = require('express')
const mongoose = require('mongoose');
const mongo = require('./environment/mongo');
const axios = require('axios');
var cheerio = require('cheerio');
var _ = require('lodash');

const { get, identity } = require('lodash');

const app = express()
const port = 3002
var targeturl="";
var proxy={
    host:"8.8.8.8",
    port:80,
    auth:{

    }
}

  
  
var user=["wanrend","Jiangyo56197856","yvannacolor","nurpeking","weichan33",
        "powell8900","WyattDon1","DavidKe36564685","Daniel93403368","lucy131420",
    "Paul89480586","DavidKe36564685","ghjhg798","Daniel93403368","wayubi",
    "fWH2YFXxtmC5c6F","i788gg94","Stanley11567109","AlexLee5917","ZhangCh64515564",
    "Roxxane05470991","j7OI8UrasgGCFOA","Ayaka68429502","Rob57813350","Frankki69525145",
    "HarryMasibay","Chris78069630","Jamiepete7","kamila59625496","Stevens9090",
    "risforr","TommyGood777","turikko_mogura","qq95zcb","jiangseng1",
    "yu15767743","Shakira7007","chenxq5212","wangjin53552649","malongyun807",
    "pepinolaja","xxyz2023","teresa81988","oota59406827","TieDreamer",
    "awk1001","budaizouyuncai","yuko980915","echoo_cheong","kangche78678187"];
let arr = [];
let array = [];
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8"); next();
});
app.get('/', (req, res) => {

    res.send('Hello World!')
})

app.get('/gettwitter', (req, res) => {
    async function get() {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('http://books.toscrape.com/');
        await page.waitFor(1000);
        // Scrape
        browser.close();
        return result;
      }
    res.send('ok');
})

let gamedata=[];
app.get("/storedata",(req,res)=>{
    console.log(gamedata);
    gamedata.map((el)=>{
        let o=new mongo.Analysis(el);
        o.save();
    });
    res.send('Hello World!')
})
var mongogame=[];
let mongogame_1;
        let mongogame_2;
        let mongogame_3;
        let mongogame_4;
        let mongogame_5;

        let mongogame_6;
        let mongogame_7;
        let mongogame_8;
        let mongogame_9;
        let mongogame_10;
app.get('/getmongo',(req,res)=>{
    function get(num) {
        console.log(num);
        mongo.Cleangame.find({}).exec((err, doc) => {
        mongogame=doc;
        
         mongogame_1=doc.slice(0,43000);
         mongogame_2=doc.slice(43000,86000);
         mongogame_3=doc.slice(86000,43000*3);
        mongogame_4=doc.slice(43000*3,43000*4);
       mongogame_5=doc.slice(43000*4,43000*5);

         mongogame_6=doc.slice(43000*5,43000*6);
         mongogame_7=doc.slice(43000*6,43000*7);
         mongogame_8=doc.slice(43000*7,43000*8);
         mongogame_9=doc.slice(43000*8,43000*9);
     mongogame_10=doc.slice(43000*9);

        console.log(mongogame);
        
        })
        
    }
    get(0);
    res.send('ok');
})

app.get('/getmetauser', (req, res) => {

    function get(num) {
        mongo.Meta.findOne({}).skip(num).exec((err, doc) => {

            if (doc && doc.user_review && doc.user_review.length > 0)
                doc.user_review.map(el => {
                    let obj = {};
                    obj.name = el.name;
                    if (arr.indexOf(el.name) == -1) {
                        let data = new mongo.Metauser(obj);
                        data.save();

                        arr.push(el.name);
                    }

                    console.log(el.name);

                })
            get(num + 1);
        })
    }
    get(0);
    res.send("ok");
})

app.get('/interview', (req, ress) => {

    axios.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en')
        .then(function (res) {
            console.log(res.data.humidity.data);
            console.log(res.data.temperature.data);
            let min = _.maxBy(res.data.temperature.data, function (o) { return o.value; });
            let max = _.minBy(res.data.temperature.data, function (o) { return o.value; });
            console.log(min, max);

            console.log(res.data.uvindex.data);
            ress.send({
                min_temp: min.value,
                max_temp: max.value,
                humidity: res.data.humidity.data[0].value,
                uvindex: res.data.uvindex.data[0].value
            })
        })
        .catch(function (error) {
            console.log(error);
        });

})




app.get("/store", (req, res) => {
    arr = Array.from(new Set(arr));
    array = Array.from(new Set(array));
    arr.map(el => {
        let data = new mongo.Metauser(el);
        data.save();
        console.log(el.name);

    })
    array.map(el => {
        let data = new mongo.Gameuser(el);
        data.save();
        console.log(el.name);
    })
    res.send("ok");
})


app.get('/analysis',(req,res)=>{
    let month=7;
    let day=8;
    let year=2020;

    function getnext(obj){
        let day=obj.day;
        let month=obj.month;
        let year=obj.year;
        let next={};
        if ((month==1||month==3||month==5||month==7||month==8||month==10)&&day==31)
        {
            next.month=month+1;
            next.day=1;
            next.year=year;
        }
        else if (month==12&&day==31)
        {
            next.month=1;
            next.day=1;
            next.year=year+1;
        }
        else if ((month==4||month==6||month==9||month==11)&&day==30)
        {
            next.month=month+1;
            next.day=1;
            next.year=year;
        }

        else if (month==2&&day==28&&year==2021)
        {
            next.month=month+1;
            next.day=1;
            next.year=year;
        }
        else if (month==2&&day==29&&year==2020)
        {
            next.month=month+1;
            next.day=1;
            next.year=year;
        }
        else 
        {
            next.month=month;
            next.day=day+1;
            next.year=year;
        }
        
       
        return next;
         
    }
    function getdate(obj){
        let day=obj.day;
        let month=obj.month;
        let year=obj.year;
        let string="";
        if (month==1)
        {
            string="Jan"
        }
        else if(month==2)
        {
            string="Feb"
        }
        else if(month==3)
        {
            string="Mar"
        }
        else if(month==4)
        {
            string="Apr"
        }
        else if(month==5)
        {
            string="May"
        }
        else if(month==6)
        {
            string="Jun"
        }
        else if(month==7)
        {
            string="Jul"
        }
        else if(month==8)
        {
            string="Aug"
        }
        else if(month==9)
        {
            string="Sep"
        }
        else if(month==10)
        {
            string="Oct"
        }
        else if(month==11)
        {
            string="Nov"
        }
        else if(month==12)
        {
            string="Dec"
        }
        if (day<10)
        {
            string=string+"  "+day.toString();
        }
        else
        {
            string=string+" "+day.toString();
        }
        string=string+", "+year.toString();
        return string;
    }
    async function getlatermusic(year,month,day){

        console.log("kaishi"+year+month+" "+day+"music");
        let obj_1={};
        obj_1.year=year;
        obj_1.day=day;
        obj_1.month=month;

        let arr=[];

        arr.push(obj_1);
        let obj_2=getnext(obj_1);
        arr.push(obj_2);
        let obj_3=getnext(obj_2);
        arr.push(obj_3);
        let obj_4=getnext(obj_3);
        arr.push(obj_4);
        let obj_5=getnext(obj_4);
        arr.push(obj_5);
        let obj_6=getnext(obj_5);
        arr.push(obj_6);
        let obj_7=getnext(obj_6);
        arr.push(obj_7);
        let array=[];
        await Promise.all(arr.map(async (el)=>{
            let doc=await mongo.Cleanmusic.find({date:getdate(el)});
            array=_.unionWith(array,doc,_.isEqual);
           
            return el;
        })


        );
        
        let startdate=year.toString()+"/"+month.toString()+"/"+day.toString();
        let size=array.length;
        if (size>0)
        {
        let group=_.groupBy(array,'name');
        let mean_comment=size/Object.keys(group).length;
        let score=Object.values(group).map((el)=>{
            return _.meanBy(el,'review_score');

        });
        let mean_score=_.mean(score);
        
        let obj={};
        obj.mean_score=mean_score;
        obj.mean_comment=mean_comment;
        obj.startdate=startdate;
        obj.prop="music";
        let data=new mongo.Analysis(obj);
        data.save();
        }
        else{
            let obj={};
        obj.mean_score=0;
        obj.mean_comment=0;
        obj.startdate=startdate;
        obj.prop="music";
        let data=new mongo.Analysis(obj);
        data.save();
        }
        let nweek=getnext(obj_7);
       
        if (year==2021&&month==7&&day>=8)
        {
            console.log("结束了");
        }
        else
        getlatermusic(nweek.year,nweek.month,nweek.day);

    }
    async function getlatermovie(year,month,day){

        console.log("kaishi"+year+month+" "+day+"movie");
        let obj_1={};
        obj_1.year=year;
        obj_1.day=day;
        obj_1.month=month;

        let arr=[];

        arr.push(obj_1);
        let obj_2=getnext(obj_1);
        arr.push(obj_2);
        let obj_3=getnext(obj_2);
        arr.push(obj_3);
        let obj_4=getnext(obj_3);
        arr.push(obj_4);
        let obj_5=getnext(obj_4);
        arr.push(obj_5);
        let obj_6=getnext(obj_5);
        arr.push(obj_6);
        let obj_7=getnext(obj_6);
        arr.push(obj_7);
        let array=[];
        await Promise.all(arr.map(async (el)=>{
            let doc=await mongo.Cleanmovie.find({date:getdate(el)});
            array=_.unionWith(array,doc,_.isEqual);
          
            return el;
        })


        );
        
        let startdate=year.toString()+"/"+month.toString()+"/"+day.toString();
        let size=array.length;
        if (size>0)
        {
        let group=_.groupBy(array,'name');
        let mean_comment=size/Object.keys(group).length;
        let score=Object.values(group).map((el)=>{
            return _.meanBy(el,'review_score');

        });
        let mean_score=_.mean(score);
        
        let obj={};
        obj.mean_score=mean_score;
        obj.mean_comment=mean_comment;
        obj.startdate=startdate;
        obj.prop="movie";
        let data=new mongo.Analysis(obj);
        data.save();
        }
        else{
            let obj={};
        obj.mean_score=0;
        obj.mean_comment=0;
        obj.startdate=startdate;
        obj.prop="movie";
        let data=new mongo.Analysis(obj);
        data.save();
        }
        let nweek=getnext(obj_7);
       
        if (year==2021&&month==7&&day>=8)
        {
            console.log("结束了");
        }
        else
        getlatermovie(nweek.year,nweek.month,nweek.day);

    }
    async function getlatertv(year,month,day){

        console.log("kaishi"+year+month+" "+day+"tv");
        let obj_1={};
        obj_1.year=year;
        obj_1.day=day;
        obj_1.month=month;

        let arr=[];

        arr.push(obj_1);
        let obj_2=getnext(obj_1);
        arr.push(obj_2);
        let obj_3=getnext(obj_2);
        arr.push(obj_3);
        let obj_4=getnext(obj_3);
        arr.push(obj_4);
        let obj_5=getnext(obj_4);
        arr.push(obj_5);
        let obj_6=getnext(obj_5);
        arr.push(obj_6);
        let obj_7=getnext(obj_6);
        arr.push(obj_7);
        let array=[];
        await Promise.all(arr.map(async (el)=>{
            let doc=await mongo.Cleantv.find({date:getdate(el)});
            array=_.unionWith(array,doc,_.isEqual);
          
            return el;
        })


        );
        
        let startdate=year.toString()+"/"+month.toString()+"/"+day.toString();
        let size=array.length;
        if (size>0)
        {
        let group=_.groupBy(array,'name');
      
        let mean_comment=size/Object.keys(group).length;
       
        
        let score=Object.values(group).map((el)=>{
            return _.meanBy(el,'review_score');

        });
        let mean_score=_.mean(score);
        let obj={};
        obj.mean_score=mean_score;
        obj.mean_comment=mean_comment;
        obj.startdate=startdate;
        obj.prop="tv";
        let data=new mongo.Analysis(obj);
        data.save();
        }
        else
        {
            
            let obj={};
            obj.mean_score=0;
            obj.mean_comment=0;
            obj.startdate=startdate;
            obj.prop="tv";
            let data=new mongo.Analysis(obj);
            data.save();
        }
       
        let nweek=getnext(obj_7);
        if (year==2021&&month==7&&day>=8)
        {
            console.log("结束了");
        }
        else
        getlatertv(nweek.year,nweek.month,nweek.day);

    }
    async function getlatergame(year,month,day){

        console.log("kaishi"+year+month+" "+day+"game");
        let obj_1={};
        obj_1.year=year;
        obj_1.day=day;
        obj_1.month=month;

        let arr=[];

        arr.push(obj_1);
        let obj_2=getnext(obj_1);
        arr.push(obj_2);
        let obj_3=getnext(obj_2);
        arr.push(obj_3);
        let obj_4=getnext(obj_3);
        arr.push(obj_4);
        let obj_5=getnext(obj_4);
        arr.push(obj_5);
        let obj_6=getnext(obj_5);
        arr.push(obj_6);
        let obj_7=getnext(obj_6);
        arr.push(obj_7);
        let array=[];
        await Promise.all(arr.map(async (el)=>{
            let doc=_.filter(mongogame_1,{'date':getdate(el)})
                
            array=_.unionWith(array,doc,_.isEqual);
            doc=_.filter(mongogame_2,{'date':getdate(el)})
                
            array=_.unionWith(array,doc,_.isEqual);
            doc=_.filter(mongogame_3,{'date':getdate(el)})
                
            array=_.unionWith(array,doc,_.isEqual);
            doc=_.filter(mongogame_4,{'date':getdate(el)})
                
            array=_.unionWith(array,doc,_.isEqual);
            doc=_.filter(mongogame_5,{'date':getdate(el)})
                
            array=_.unionWith(array,doc,_.isEqual);
            doc=_.filter(mongogame_6,{'date':getdate(el)})
                
            array=_.unionWith(array,doc,_.isEqual);
            doc=_.filter(mongogame_7,{'date':getdate(el)})
                
            array=_.unionWith(array,doc,_.isEqual);
            doc=_.filter(mongogame_8,{'date':getdate(el)})
                
            array=_.unionWith(array,doc,_.isEqual);
             doc=_.filter(mongogame_9,{'date':getdate(el)})
                
            array=_.unionWith(array,doc,_.isEqual);
            doc=_.filter(mongogame_9,{'date':getdate(el)})
                
            array=_.unionWith(array,doc,_.isEqual);
             doc=_.filter(mongogame_10,{'date':getdate(el)})
                
            array=_.unionWith(array,doc,_.isEqual);


                console.log(array.length);
           
            
          
            return el;
        })


        );
 
        
        let startdate=year.toString()+"/"+month.toString()+"/"+day.toString();
        let size=array.length;
        console.log(size);
        if (size>0)
        {
        let group=_.groupBy(array,'name');
        let mean_comment=size/Object.keys(group).length;
        let score=Object.values(group).map((el)=>{
            return _.meanBy(el,'review_score');

        });
        let mean_score=_.mean(score);
        
        let obj={};
        obj.mean_score=mean_score;
        obj.mean_comment=mean_comment;
        obj.startdate=startdate;
        obj.prop="game";
        
        gamedata.push(obj);
        
        }
        else{
            let obj={};
        obj.mean_score=0;
        obj.mean_comment=0;
        obj.startdate=startdate;
        obj.prop="game";

        gamedata.push(obj);
        }
        let nweek=getnext(obj_7);
        if (year==2021&&month==7&&day>=8)
        {
            console.log("结束了");
        }
        else
        
        getlatergame(nweek.year,nweek.month,nweek.day);

    }
    //getlatergame(2019,7,3);
    getlatermovie(2019,7,3);
    getlatermusic(2019,7,3);
    getlatertv(2019,7,3);
    res.send("ok");
})



app.get('/getgameuser', (req, res) => {
    function get(num) {
        mongo.Game.findOne({}).skip(num).exec((err, doc) => {
            if (doc && doc.player_review && doc.player_review.length > 0)
                doc.player_review.map(el => {
                    let obj = {};
                    obj.name = el.auther;
                    if (array.indexOf(el.auther) == -1) {
                        let data = new mongo.Gameuser(obj);
                        data.save();

                        array.push(el.auther);
                    }


                    console.log(el.auther);

                })
            get(num + 1);
        })
    }
    get(0);
    res.send("ok");
})
app.get('/dshi',(req,res)=>{
    
    function get(num) {
        console.log(num);
        mongo.Cleanshi.findOne({}).skip(num).exec((err, doc) => {
           if (num<42001)
           {
            let data = new mongo.Cleana(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 42000)
                get(num + 1);
            });
           }
           else if (num>42000&&num<84001)
           {
            let data = new mongo.Cleanb(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 84000)
                get(num + 1);
            });
           }
           else if (num>84000&&num<127754)
           {
            let data = new mongo.Cleanc(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 127754)
                get(num + 1);
            });
           }
        })
    }
    
    
    get(0);
    get(42001);
    get(84001);
    res.send("ok");
})
app.get('/dyi',(req,res)=>{
    
    function get(num) {
        console.log(num);
        mongo.Cleanshi.findOne({}).skip(num).exec((err, doc) => {
           if (num<43001)
           {
            let data = new mongo.Cleand(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 43000)
                get(num + 1);
            });
           }
           
           else if (num>43000&&num<86488)
           {
            let data = new mongo.Cleanc(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 86488)
                get(num + 1);
            });
           }
        })
    }
    
    
    get(0);
    get(43001);

    res.send("ok");
})
app.get("/diverse",(req,res)=>{
    function get(num) {
        console.log(num);
        mongo.Cleangame.findOne({}).skip(num).exec((err, doc) => {
           if (doc.review_score<=1)
           {
            let data = new mongo.Cleanyi(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 429297)
                get(num + 1);
            });
           }
           else if(doc.review_score<=2)
           {
            let data = new mongo.Cleaner(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 429297)
                get(num + 1);
            });
           }
           else if(doc.review_score<=3)
           {
            let data = new mongo.Cleansan(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 429297)
                get(num + 1);
            });
           }
           else if(doc.review_score<=4)
           {
            let data = new mongo.Cleansi(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 429297)
                get(num + 1);
            });
           }
           else if(doc.review_score<=5)
           {
            let data = new mongo.Cleanwu(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 429297)
                get(num + 1);
            });
           }
           else if(doc.review_score<=6)
           {
            let data = new mongo.Cleanliu(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 429297)
                get(num + 1);
            });
           }
           else if(doc.review_score<=7)
           {
            let data = new mongo.Cleanqi(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 429297)
                get(num + 1);
            });
           }
           else if(doc.review_score<=8)
           {
            let data = new mongo.Cleanba(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 429297)
                get(num + 1);
            });
           }
           else if(doc.review_score<=9)
           {
            let data = new mongo.Cleanjiu(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 429297)
                get(num + 1);
            });
           }
           else if(doc.review_score<=10)
           {
            let data = new mongo.Cleanshi(_.omit(doc, ['_id']));
            data.save().then(() => {
                if (num < 429297)
                    get(num + 1);
            });
           }
        })
    
        
    }
    get(0);
    res.send("ok");
})
app.get("/getgame", (req, res) => {

    function get(num) {
        mongo.Gameuser.findOne({}).skip(num).exec((err, doc) => {
            console.log("开始：" + num);
            console.log("开始爬" + doc.name);
            axios.get('https://www.gamespot.com/profile/' + doc.name + "/reviews/")
                .then(function (res) {
                    $ = cheerio.load(res.data);

                    let number = $('.paginate__item').last().prev().text();
                    console.log(number);
                    mongo.Gameuser.updateOne({ name: doc.name }, { num: number }).exec(() => {
                        if (num < 1584)
                            get(num + 10);
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        })

    }
    for (let i = 0; i < 10; i++)
        get(0 + i);




    res.send("ok");
})
app.get("/cleandata", (req, res) => {
    function getgame(num) {
        console.log("kaishi:" + num);
        mongo.Metagame.findOne({}).skip(num).exec((err, doc) => {
            mongo.Cleangame.findOne({ name: doc.name, product_title: doc.product_title,review_score:doc.review_score }).exec((err, docu) => {
                if (!docu && doc.name != "" && doc.product_title != "") {
                   
                    let data = new mongo.Cleangame(_.omit(doc, ['_id']));
                    data.save().then(() => {
                        if (num < 445452)
                            getgame(num + 1);
                    });

                }
                else {
                    if (num < 445452)
                        getgame(num + 1);
                }
            })
        })
    }
    function gettv(num) {
        console.log("kaishi:" + num);
        mongo.Metatv.findOne({}).skip(num).exec((err, doc) => {
            mongo.Cleantv.findOne({ name: doc.name, product_title: doc.product_title,review_score:doc.review_score }).exec((err, docu) => {
                if (!docu && doc.name != "" && doc.product_title != "") {
                    let data = new mongo.Cleantv(_.omit(doc, ['_id']));
                    data.save().then(() => {
                        if (num < 11117)
                            gettv(num + 1);
                    });

                }
                else {
                    if (num < 11117)
                        gettv(num + 1);
                }
            })
        })
    }
    function getmusic(num) {
        console.log("kaishi:" + num);
        mongo.Metamusic.findOne({}).skip(num).exec((err, doc) => {
            mongo.Cleanmusic.findOne({ name: doc.name, product_title: doc.product_title,review_score:doc.review_score }).exec((err, docu) => {
                if (!docu && doc.name != "" && doc.product_title != "") {
                    let data = new mongo.Cleanmusic(_.omit(doc, ['_id']));
                    data.save().then(() => {
                        if (num < 5967)
                            getmusic(num + 1);
                    });

                }
                else {
                    if (num < 5967)
                        getmusic(num + 1);
                }
            })
        })
    }
    function getmovie(num) {
        console.log("kaishi:" + num);
        mongo.Metamovie.findOne({}).skip(num).exec((err, doc) => {
            mongo.Cleanmovie.findOne({ name: doc.name, product_title: doc.product_title,review_score:doc.review_score }).exec((err, docu) => {
                if (!docu && doc.name != "" && doc.product_title != "") {
                    let data = new mongo.Cleanmovie(_.omit(doc, ['_id']));
                    data.save().then(() => {
                        if (num < 48460)
                            getmovie(num + 1);
                    });

                }
                else {
                    if (num < 48460)
                        getmovie(num + 1);
                }
            })
        })
    }
    function getspot(num){
        console.log("kaishi:" + num);
        mongo.Gamereview.findOne({}).skip(num).exec((err, doc) => {
            mongo.Cleanspot.findOne({ name: doc.name, title: doc.review.title,score:doc.review.score }).exec((err, docu) => {
                if (!docu && doc.name != "" && doc.review.title != ""&& doc.review.score != "") {
                    let obj=doc.review;
                    obj.name=doc.name;
                    let data = new mongo.Cleanspot(obj);
                    data.save().then(() => {
                        if (num < 82914)
                        getspot(num + 1);
                    });

                }
                else {
                    if (num < 82914)
                    getspot(num + 1);
                }
            })
        })
    }
    getgame(0);
    getmovie(0);
    getmusic(0);
    gettv(0);
    getspot(0);
    res.send("ok");
})
app.get("/getspot", (req, res) => {
    function get(num) {
        mongo.Gameuser.findOne({}).skip(num).exec((err, doc) => {
            console.log("开始：" + num);
            console.log("开始爬" + doc.name);
            if (doc.num == null) {
                axios.get('https://www.gamespot.com/profile/' + doc.name + "/reviews/")
                    .then(function (res) {
                        $ = cheerio.load(res.data);


                        Promise.all($('.media-game').map((i, el) => {
                            let obj = {};
                            obj.title = $(el).find(".media-title").text();
                            obj.system = $(el).find(".system").text();
                            obj.score = $(el).find(".media-well--review-user").find("strong").text();
                            obj.helpful = $(el).find(".userReview-list__positiveCount").text();
                            let dates = $(el).find(".userReview-list__byline").text().split("|");
                            obj.url = $(el).find(".userReview-list__deck").find("a").attr("href");
                            obj.date = dates[1];

                            mongo.Gameuser.updateOne({ name: doc.name }, { $push: { review: obj } }).exec();


                        })).then((res) => {
                            if (num < 1584)
                                get(num + 10);
                        })

                    })
                    .catch(function (err) {
                        console.log(err);
                        console.log("卡住了" + num);
                        setTimeout(() => {
                            get(num)
                        }, 5000);
                    });
            }
            else {
                function getpage(page) {
                    axios.get('https://www.gamespot.com/profile/' + doc.name + "/reviews/?page=" + page)
                        .then(function (res) {
                            $ = cheerio.load(res.data);



                            Promise.all($('.media-game').map((i, el) => {
                                let obj = {};
                                obj.title = $(el).find(".media-title").text();
                                obj.system = $(el).find(".system").text();
                                obj.score = $(el).find(".media-well--review-user").find("strong").text();
                                obj.helpful = $(el).find(".userReview-list__positiveCount").text();
                                let dates = $(el).find(".userReview-list__byline").text().split("|");
                                obj.url = $(el).find(".userReview-list__deck").find("a").attr("href");
                                obj.date = dates[1];
                                mongo.Gameuser.updateOne({ name: doc.name }, { $push: { review: obj } }).exec();


                            })).then((res) => {
                                console.log(doc.name + "总共" + doc.num + "成功" + page + "页");
                                if (page < doc.num)
                                    getpage(page + 1);
                                if (num < 1584 && page == doc.num)
                                    get(num + 10);
                            })

                        })
                        .catch(function (err) {
                            console.log(err);
                            console.log("卡住了" + num);
                            if (num == 870)
                                get(num + 10);
                            else if (num == 128 && page == 9)
                                getpage(page + 1);
                            else
                                setTimeout(() => {
                                    getpage(page);
                                }, 5000);
                        });


                }
                getpage(1);
            }
        })

    }
    for (let i = 0; i < 10; i++)
        get(0 + i);
    res.send("ok");
})
app.get("/getmeta", (req, ress) => {
    function getgame(num) {
        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始爬第" + num + "个" + doc.name);
            axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Game")
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let obj = {};
                    obj.positive = $('.score_distribution').find(".data").first().text();
                    obj.mixed = $('.score_distribution').find(".score_count").last().prev().find(".data").text();
                    obj.negative = $('.score_distribution').find(".data").last().text();

                    obj.review_average = $('.userscore_summary').find('.summary_data').text();
                    obj.highscore = $('.highest_review').find('.score_wrap').text();
                    obj.hightitle = $('.highest_review').find('.product_title').text();
                    obj.lowscore = $('.lowest_review').find('.score_wrap').text();
                    obj.lowtitle = $('.lowest_review').find('.product_title').text();
                    obj.num = $('.page_nav').find(".page_num").last().text();
                    mongo.Metauser.updateOne({ name: doc.name }, { game_info: obj }).exec();
                    Promise.all($(".review_content").map((i, el) => {

                        let object = {};
                        object.product_title = $(el).find(".product_title").text();
                        object.product_score = $(el).find(".product_score").find(".data").text();
                        object.date = $(el).find(".date").text();
                        object.review_score = $(el).find(".review_score").text();
                        object.body = $(el).find(".blurb_expanded").text();
                        object.helpful = $(el).find(".review_helpful").find(".helpful_summary").text();
                        mongo.Metauser.updateOne({ name: doc.name }, { $push: { game_review: object } }).exec();

                    })).then((res) => {
                        console.log("成功第" + num + "个" + doc.name);
                        if (num < 163181)
                            getgame(num + 2);
                    })

                })
                .catch(function (error) {



                    console.log("卡住了" + num);
                    if (!error.response)
                        console.log(error);
                    if (error.response && error.response.status == 404)
                        getgame(num + 2);
                    else
                        setTimeout(() => {
                            getgame(num);
                        }, 5000);
                });
        })

    }

    function gettv(num) {

        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始爬第" + num + "个" + doc.name);
            axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=TvShow")
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let obj = {};
                    obj.positive = $('.score_distribution').find(".data").first().text();
                    obj.mixed = $('.score_distribution').find(".score_count").last().prev().find(".data").text();
                    obj.negative = $('.score_distribution').find(".data").last().text();

                    obj.review_average = $('.userscore_summary').find('.summary_data').text();
                    obj.highscore = $('.highest_review').find('.score_wrap').text();
                    obj.hightitle = $('.highest_review').find('.product_title').text();
                    obj.lowscore = $('.lowest_review').find('.score_wrap').text();
                    obj.lowtitle = $('.lowest_review').find('.product_title').text();
                    obj.num = $('.page_nav').find(".page_num").last().text();

                    mongo.Metauser.updateOne({ name: doc.name }, { tv_info: obj }).exec();
                    Promise.all($(".review_content").map((i, el) => {

                        let object = {};
                        object.product_title = $(el).find(".product_title").text();
                        object.product_score = $(el).find(".product_score").find(".data").text();
                        object.date = $(el).find(".date").text();
                        object.review_score = $(el).find(".review_score").text();
                        object.body = $(el).find(".blurb_expanded").text();
                        object.helpful = $(el).find(".review_helpful").find(".helpful_summary").text();
                        mongo.Metauser.updateOne({ name: doc.name }, { $push: { tv_review: object } }).exec();

                    })).then((res) => {
                        console.log("成功第" + num + "个" + doc.name);
                        if (num < 163181)
                            gettv(num + 2);
                    })

                })
                .catch(function (error) {



                    console.log("卡住了" + num);
                    if (!error.response)
                        console.log(error);

                    if (error.response && error.response.status == 404)
                        gettv(num + 2);
                    else
                        setTimeout(() => {
                            gettv(num);
                        }, 5000);
                })

        })

    }

    function getmovie(num) {

        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始爬第" + num + "个" + doc.name);
            axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Movie")
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let obj = {};
                    obj.positive = $('.score_distribution').find(".data").first().text();
                    obj.mixed = $('.score_distribution').find(".score_count").last().prev().find(".data").text();
                    obj.negative = $('.score_distribution').find(".data").last().text();

                    obj.review_average = $('.userscore_summary').find('.summary_data').text();
                    obj.highscore = $('.highest_review').find('.score_wrap').text();
                    obj.hightitle = $('.highest_review').find('.product_title').text();
                    obj.lowscore = $('.lowest_review').find('.score_wrap').text();
                    obj.lowtitle = $('.lowest_review').find('.product_title').text();
                    obj.num = $('.page_nav').find(".page_num").last().text();


                    mongo.Metauser.updateOne({ name: doc.name }, { movie_info: obj }).exec();
                    Promise.all($(".review_content").map((i, el) => {

                        let object = {};
                        object.product_title = $(el).find(".product_title").text();
                        object.product_score = $(el).find(".product_score").find(".data").text();
                        object.date = $(el).find(".date").text();
                        object.review_score = $(el).find(".review_score").text();
                        object.body = $(el).find(".blurb_expanded").text();
                        object.helpful = $(el).find(".review_helpful").find(".helpful_summary").text();
                        mongo.Metauser.updateOne({ name: doc.name }, { $push: { movie_review: object } }).exec();

                    })).then((res) => {
                        console.log("成功第" + num + "个" + doc.name);
                        if (num < 163181)
                            getmovie(num + 2);
                    })

                })
                .catch(function (error) {



                    console.log("卡住了" + num);
                    if (!error.response)
                        console.log(error);
                    if (error.response && error.response.status == 404)
                        getmovie(num + 2);

                    else
                        setTimeout(() => {
                            getmovie(num);
                        }, 5000);
                })
        })


    }

    function getmusic(num) {

        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始爬第" + num + "个" + doc.name);
            axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Album")
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let obj = {};
                    obj.positive = $('.score_distribution').find(".data").first().text();
                    obj.mixed = $('.score_distribution').find(".score_count").last().prev().find(".data").text();
                    obj.negative = $('.score_distribution').find(".data").last().text();

                    obj.review_average = $('.userscore_summary').find('.summary_data').text();
                    obj.highscore = $('.highest_review').find('.score_wrap').text();
                    obj.hightitle = $('.highest_review').find('.product_title').text();
                    obj.lowscore = $('.lowest_review').find('.score_wrap').text();
                    obj.lowtitle = $('.lowest_review').find('.product_title').text();
                    obj.num = $('.page_nav').find(".page_num").last().text();

                    mongo.Metauser.updateOne({ name: doc.name }, { music_info: obj }).exec();
                    Promise.all($(".review_content").map((i, el) => {

                        let object = {};
                        object.product_title = $(el).find(".product_title").text();
                        object.product_score = $(el).find(".product_score").find(".data").text();
                        object.date = $(el).find(".date").text();
                        object.review_score = $(el).find(".review_score").text();
                        object.body = $(el).find(".blurb_expanded").text();
                        object.helpful = $(el).find(".review_helpful").find(".helpful_summary").text();
                        mongo.Metauser.updateOne({ name: doc.name }, { $push: { music_review: object } }).exec();

                    })).then((res) => {
                        console.log("成功第" + num + "个" + doc.name);
                        if (num < 163181)
                            getmusic(num + 2);
                    })

                })
                .catch(function (error) {



                    console.log("卡住了" + num);
                    if (!error.response)
                        console.log(error);
                    if (error.response && error.response.status == 404)
                        getmusic(num + 2);
                    else
                        setTimeout(() => {
                            getmusic(num);
                        }, 5000);
                });
        })

    }
    for (let i = 0; i < 2; i++) {
        getmovie(0 + i);
        gettv(0 + i);
        getmusic(0 + i);
        getgame(0 + i);


    }

    ress.send("ok");
})

app.get("/getmetareview", (req, ress) => {
    function getgame(num) {

        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {
            console.log("开始爬第" + num + "个" + doc.name);

            if (!doc.game_info || doc.game_info.num == "") {
                if (num < 163180)
                    getgame(num + 3);
            }
            else {
                let page_num = parseInt(doc.game_info.num);
                function getpage(page) {
                    axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Game&page=" + page)
                        .then(function (res) {
                            $ = cheerio.load(res.data);


                            Promise.all($(".review_content").map((i, el) => {

                                let object = {};
                                object.product_title = $(el).find(".product_title").text();
                                object.product_score = $(el).find(".product_score").find(".data").text();
                                object.date = $(el).find(".date").text();
                                object.review_score = $(el).find(".review_score").text();
                                object.body = $(el).find(".blurb_expanded").text();
                                object.helpful = $(el).find(".review_helpful").find(".helpful_summary").text();
                                mongo.Metauser.updateOne({ name: doc.name }, { $push: { game_review: object } }).exec();

                            })).then((res) => {
                                console.log("成功第" + num + "个" + doc.name + "第" + page + "页");
                                if (page < page_num - 1)
                                    getpage(page + 1);
                                if (num < 163180 && page == page_num - 1)
                                    getgame(num + 3);
                            })

                        })
                        .catch(function (error) {



                            console.log("卡住了" + num);
                            if (!error.response)
                                console.log(error);
                            if (error.response && error.response.status == 404 && page < page_num - 1)
                                getpage(page + 1);
                            else if (error.response && error.response.status == 404 && num < 163180 && page == page_num - 1) {
                                getgame(num + 3);
                            }
                            else
                                setTimeout(() => {
                                    getpage(page);
                                }, 5000);
                        });
                }
                getpage(1);
            }
        })



    }

    function getmovie(num) {
        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {
            console.log("开始爬第" + num + "个" + doc.name);
            if (!doc.movie_info || doc.movie_info.num == "") {
                if (num < 163180)
                    getmovie(num + 3);
            }
            else {
                let page_num = parseInt(doc.movie_info.num);
                function getpage(page) {
                    axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Movie&page=" + page)
                        .then(function (res) {
                            $ = cheerio.load(res.data);

                            Promise.all($(".review_content").map((i, el) => {

                                let object = {};
                                object.product_title = $(el).find(".product_title").text();
                                object.product_score = $(el).find(".product_score").find(".data").text();
                                object.date = $(el).find(".date").text();
                                object.review_score = $(el).find(".review_score").text();
                                object.body = $(el).find(".blurb_expanded").text();
                                object.helpful = $(el).find(".review_helpful").find(".helpful_summary").text();
                                mongo.Metauser.updateOne({ name: doc.name }, { $push: { movie_review: object } }).exec();

                            })).then((res) => {
                                console.log("成功第" + num + "个" + doc.name + "第" + page + "页");
                                if (page < page_num - 1)
                                    getpage(page + 1);
                                if (num < 163180 && page == page_num - 1)
                                    getmovie(num + 3);
                            })

                        })
                        .catch(function (error) {



                            console.log("卡住了" + num);
                            if (!error.response)
                                console.log(error);
                            if (error.response && error.response.status == 404 && page < page_num - 1)
                                getpage(page + 1);
                            else if (error.response && error.response.status == 404 && num < 163180 && page == page_num - 1) {
                                getmovie(num + 3);
                            }
                            else
                                setTimeout(() => {
                                    getpage(page);
                                }, 5000);
                        });
                }
                getpage(1);
            }
        })



    }

    function gettv(num) {
        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {
            console.log("开始爬第" + num + "个" + doc.name);
            if (!doc.tv_info || doc.tv_info.num == "") {
                if (num < 163180)
                    gettv(num + 3);
            }
            else {
                let page_num = parseInt(doc.tv_info.num);
                function getpage(page) {
                    axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=TvShow&page=" + page)
                        .then(function (res) {
                            $ = cheerio.load(res.data);

                            Promise.all($(".review_content").map((i, el) => {

                                let object = {};
                                object.product_title = $(el).find(".product_title").text();
                                object.product_score = $(el).find(".product_score").find(".data").text();
                                object.date = $(el).find(".date").text();
                                object.review_score = $(el).find(".review_score").text();
                                object.body = $(el).find(".blurb_expanded").text();
                                object.helpful = $(el).find(".review_helpful").find(".helpful_summary").text();
                                mongo.Metauser.updateOne({ name: doc.name }, { $push: { tv_review: object } }).exec();

                            })).then((res) => {
                                console.log("成功第" + num + "个" + doc.name + "第" + page + "页");
                                if (page < page_num - 1)
                                    getpage(page + 1);
                                if (num < 163180 && page == page_num - 1)
                                    gettv(num + 3);
                            })

                        })
                        .catch(function (error) {



                            console.log("卡住了" + num);
                            if (!error.response)
                                console.log(error);
                            if (error.response && error.response.status == 404 && page < page_num - 1)
                                getpage(page + 1);
                            else if (error.response && error.response.status == 404 && num < 163180 && page == page_num - 1) {
                                gettv(num + 3);
                            }
                            else
                                setTimeout(() => {
                                    getpage(page);
                                }, 5000);
                        });
                }
                getpage(1);
            }
        })



    }

    function getmusic(num) {
        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {
            console.log("开始爬第" + num + "个" + doc.name);
            if (!doc.music_info || doc.music_info.num == "") {
                if (num < 163180)
                    getmusic(num + 3);
            }
            else {
                let page_num = parseInt(doc.music_info.num);
                function getpage(page) {
                    axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Album&page=" + page)
                        .then(function (res) {
                            $ = cheerio.load(res.data);

                            Promise.all($(".review_content").map((i, el) => {

                                let object = {};
                                object.product_title = $(el).find(".product_title").text();
                                object.product_score = $(el).find(".product_score").find(".data").text();
                                object.date = $(el).find(".date").text();
                                object.review_score = $(el).find(".review_score").text();
                                object.body = $(el).find(".blurb_expanded").text();
                                object.helpful = $(el).find(".review_helpful").find(".helpful_summary").text();
                                mongo.Metauser.updateOne({ name: doc.name }, { $push: { music_review: object } }).exec();

                            })).then((res) => {
                                console.log("成功第" + num + "个" + doc.name + "第" + page + "页");
                                if (page < page_num - 1)
                                    getpage(page + 1);
                                if (num < 163180 && page == page_num - 1)
                                    getmusic(num + 3);
                            })

                        })
                        .catch(function (error) {



                            console.log("卡住了" + num);
                            if (!error.response)
                                console.log(error);
                            if (error.response && error.response.status == 404 && page < page_num - 1)
                                getpage(page + 1);
                            else if (error.response && error.response.status == 404 && num < 163180 && page == page_num - 1) {
                                getmusic(num + 3);
                            }
                            else
                                setTimeout(() => {
                                    getpage(page);
                                }, 5000);
                        });
                }
                getpage(1);
            }
        })



    }



    for (let i = 0; i < 3; i++) {
        getmovie(0 + i);
        gettv(0 + i);
        getmusic(0 + i);
        getgame(0 + i);


    }

    ress.send("ok");
})
app.get("/getgamereview", (req, res) => {
    function get(num) {
        mongo.Gameuser.findOne({}).skip(num).exec((err, doc) => {





            function getfull(i) {
                let obj = {};
                console.log("开始操作：" + num + doc.name + i);
                obj.name = doc.name;
                obj.review = doc.review[i];

                if (doc.review[i].url == null) {
                    let data = new mongo.Gamereview(obj);
                    data.save().then(
                        () => {
                            console.log(doc.name + "成功" + i);
                            if (i < doc.review.length - 1)
                                getfull(i + 1);
                            else if (num < 1584)
                                get(num + 10);
                        }
                    );
                }
                else {
                    function getreview(url) {
                        axios.get('https://www.gamespot.com' + url)
                            .then(function (res) {
                                $ = cheerio.load(res.data);
                                obj.review.review_title = $(".userReview-hdr__title").text();
                                obj.review.body = $(".userReview-body").text();
                                let data = new mongo.Gamereview(obj);
                                data.save().then(() => {
                                    console.log(doc.name + "成功" + i);
                                    if (i < doc.review.length - 1)
                                        getfull(i + 1);
                                    else if (num < 1584)
                                        get(num + 10);
                                });


                            }).catch(function (err) {
                                console.log(err);
                                console.log("卡住了" + num);
                                setTimeout(() => {
                                    getreview(url);
                                }, 5000);
                            });
                    }
                    getreview(doc.review[i].url)
                }

            }
            if (doc.review && doc && doc.review.length > 0)
                getfull(0);
            else
                get(num + 10);









        })
    }

    for (let i = 0; i < 10; i++)
        get(0 + i);
    res.send("ok");
})
app.get("/getmetaformysql", (req, res) => {
    function get(num) {
        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始操作：" + num + doc.name);
            if (doc && doc.game_review && doc.game_review.length > 0)
                doc.game_review.map(el => {
                    let obj = {};
                    obj = el;
                    obj.name = doc.name;
                    let data = new mongo.Metagame(obj);
                    data.save();



                })
            if (doc && doc.music_review && doc.music_review.length > 0)
                doc.music_review.map(el => {
                    let obj = {};
                    obj = el;
                    obj.name = doc.name;
                    let data = new mongo.Metamusic(obj);
                    data.save();



                })
            if (doc && doc.tv_review && doc.tv_review.length > 0)
                doc.tv_review.map(el => {
                    let obj = {};
                    obj = el;
                    obj.name = doc.name;
                    let data = new mongo.Metatv(obj);
                    data.save();



                })
            if (doc && doc.movie_review && doc.movie_review.length > 0)
                doc.movie_review.map(el => {
                    let obj = {};
                    obj = el;
                    obj.name = doc.name;
                    let data = new mongo.Metamovie(obj);
                    data.save();



                })
            if (num < 163182)
                get(num + 1);
        })
    }
    get(0);
    res.send("ok");
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
app.get("/getunimovie",(req,res)=>{
    function get(num) {
        mongo.Cleanmovie.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始操作：" + num + doc.name);
            mongo.Movie.findOne({product_title:doc.product_title}).exec((err,docu)=>{
                if(!docu)
                {
                    let obj = {};
                    
                    obj.product_title = doc.product_title;
                    let data = new mongo.Movie(obj);
                    data.save().then(()=>{
                        if (num < 48426)
                        get(num + 1);
                    });
                }
                else
                {
                    if (num < 48426)
                        get(num + 1);
                }
            })
          
           
        })
    }
    get(0);
    res.send("ok");
})

app.get("/getunitv",(req,res)=>{
    function get(num) {
        mongo.Cleantv.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始操作：" + num + doc.name);
            mongo.Tv.findOne({product_title:doc.product_title}).exec((err,docu)=>{
                if(!docu)
                {
                    let obj = {};
                    
                    obj.product_title = doc.product_title;
                    let data = new mongo.Tv(obj);
                    data.save().then(()=>{
                        if (num < 11114)
                        get(num + 1);
                    });
                }
                else
                {
                    if (num < 11114)
                        get(num + 1);
                }
            })
          
           
        })
    }
    get(0);
    res.send("ok");
})
app.get("/getunimusic",(req,res)=>{
    function get(num) {
        mongo.Cleanmusic.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始操作：" + num + doc.name);
            mongo.Music.findOne({product_title:doc.product_title}).exec((err,docu)=>{
                if(!docu)
                {
                    let obj = {};
                    
                    obj.product_title = doc.product_title;
                    let data = new mongo.Music(obj);
                    data.save().then(()=>{
                        if (num < 5966)
                        get(num + 1);
                    });
                }
                else
                {
                    if (num < 5966)
                        get(num + 1);
                }
            })
          
           
        })
    }
    get(0);
    res.send("ok");
})

app.get("/getmovieinfo",(req,res)=>{
    function getmovieinfo(num){
        mongo.Movie.findOne({}).skip(num).exec((err,doc)=>{
            console.log("开始操作：" + num + doc.product_title);
            
            let link=doc.product_title.replace(/[`:_.~!@#$%^&*()\+=<>?"{}|,\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/g,"");
            link=link.toLowerCase();
            link=link.replace(/\s+/g,"-");
           
            
            mongo.Movie.updateOne({product_title:doc.product_title}, {$set:{link:link}}).exec(()=>{
                console.log(link);
                if (num<6157)
                getmovieinfo(num+1);
            });
          
        })
        
    }
    function gettvinfo(num){
        mongo.Tv.findOne({}).skip(num).exec((err,doc)=>{
            console.log("开始操作：" + num + doc.product_title);
            
            let link=doc.product_title.replace(/[`:_.~!@#$%^&*()\+=<>?"{}|,\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/g,"");
            link=link.toLowerCase();
            link=link.replace(/\s+/g,"-");
           
            
            mongo.Tv.updateOne({product_title:doc.product_title}, {$set:{link:link}}).exec(()=>{
                console.log(link);
                if (num<3094)
                gettvinfo(num+1);
            });
          
        })
        
    }
    function getmusicinfo(num){
        mongo.Music.findOne({}).skip(num).exec((err,doc)=>{
            console.log("开始操作：" + num + doc.product_title);
            
            let link=doc.product_title.replace(/[`:_.-∞~!@#$%^&*()\+=<>?"{}|,\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/g,"");
            link=link.toLowerCase();
            link=link.replace(/\s+/g,"-");
           
            
            mongo.Music.updateOne({product_title:doc.product_title}, {$set:{link:link}}).exec(()=>{
                console.log(link);
                if (num<2287)
                getmusicinfo(num+1);
            });
          
        })
        
    }
    getmovieinfo(0);
    gettvinfo(0);
    getmusicinfo(0);
    res.send("ok");
    
})

app.get("/getmusicdetail",(req,res)=>{
    function get(num) {
        mongo.Music.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始操作：" + num + doc.product_title);

            if (doc.URL&&doc.URL.match(/http/g))
            axios.get(doc.URL+'/details')
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let summary=$(".product_summary").find(".data").text();
                    let record_label=$(".new_details").children().first().find(".data").text();
                    let date=$('.product_data').find('.release').find('.data').text();
                    
                    let genre=[];
                    $(".genres").find(".data").each(function(i, elem) {
                        genre[i] = $(this).text();
                      });
                    let name=[];
                    $(".new_details").children().first().next().next().find(".data").each(function(i, elem) {
                        name[i] = $(this).text();
                      });
                    let credit=[];
                    $(".new_details").children().first().next().next().next().find(".data").each(function(i, elem) {
                        credit[i] = $(this).text();
                      });
                    
                    mongo.Music.updateOne({ product_title: doc.product_title }, {date:date,summary:summary,record_label:record_label,genre:genre,name:name,credit:credit }).exec(() => {
                        if(num==96||num==1334)
                        get(num+10);
                        else if (num < 2281&&num!=2279)
                            get(num + 5);
                    })
                })
                .catch(function (error) {
                    console.log(num+"失败了");
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 2281)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            get(num);
                        }, 5000);
                });
                else
                {
                    if (num < 2281)
                            get(num + 5);
                }
           
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})
const replaceStr = (str) => {
    return str.substring(0, 23) + "com" + str.substring(26);
  }

app.get("/gettvdetail",(req,res)=>{
    function get(num) {
        mongo.Tv.findOne({}).skip(num).exec((err, doc) => {
            let link=doc.product_title.replace(/[`_.~!@#$%^&*()\+=<>?"{}|,\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/g,"");
            link=link.toLowerCase();
            link=link.replace(": ","/");
            link=link.replace(/\s+/g,"-");
            console.log("开始操作：" + num + doc.product_title);
            
       
            if (doc.URL&&doc.URL.match(/http/g))
            axios.get(replaceStr(doc.URL))
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let distributor=$(".distributor").find("a").text();
                    let date=$(".release_date").children().first().next().text();
                    let summary=$(".summary_deck").children().first().next().text();
                    
                    let genre=[];
                    $(".genres").children().first().next().children().each(function(i, elem) {
                        genre[i] = $(this).text();
                      });
                    let creator=[];
                   
                   
                    $(".creator").find("a").each(function(i, elem) {
                        creator[i] = $(this).text();
                      });
                    let star=[];
                    $(".summary_cast").find("a").each(function(i, elem) {
                        star[i] = $(this).text();
                      });
                    mongo.Tv.updateOne({ product_title: doc.product_title }, {star:star,summary:summary,distributor:distributor,genre:genre,creator:creator,date:date }).exec(() => {
                        if (num < 3090)
                            get(num + 5);
                    })
                })
                .catch(function (error) {
                    console.log(num+"失败了");
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 3090)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            console.log(num+"重新开始");
                            get(num);
                        }, 5000);
                });
            else
            {
                if (num < 3090)
                            get(num + 5);
            }
          
           
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})

app.get("/getmoviedetail",(req,res)=>{
    function get(num) {
        mongo.Movie.findOne({}).skip(num).exec((err, doc) => {
           
            console.log("开始操作：" + num + doc.product_title);
            if (doc.product_title=="Censor")
            {
                console.log(doc.URL);
                
            }
                
            if (doc.URL&&doc.URL.match(/http/g))
            axios.get(doc.URL)
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let distributor=$(".distributor").find("a").text();
                    
                    let date=$(".release_date").children().first().next().text();
                    let summary=$(".summary_deck").children().first().next().text();
                    
                    let genre=[];
                    $(".genres").children().first().next().children().each(function(i, elem) {
                        genre[i] = $(this).text();
                      });
                    let director=$(".director").find("a").text();
                    let rating=$(".rating").children().first().next().text();
                    let runtime=$(".runtime").children().first().next().text();
                    let star=[];
                    $(".summary_cast").find("a").each(function(i, elem) {
                        star[i] = $(this).text();
                      });
                    mongo.Movie.updateOne({ product_title: doc.product_title }, {director:director,rating:rating,star:star,summary:summary,distributor:distributor,genre:genre,runtime:runtime,date:date }).exec(() => {
                        if (num==100)
                            get(num+10);
                        else if (num < 6153)
                            get(num + 5);
                    })
                })
                .catch(function (error) {
                    console.log(num+"失败了"+error);
                    if (num==100)
                        get(num+10);
                    else if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 6153)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            console.log(num+"重新开始");
                            get(num);
                        }, 5000);
                });
                else
                {
                    if (num < 6153)
                            get(num + 5);
                }
                
           
        })

    }
    //for (let i=0;i<5;i++)
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})

app.get("/gettvcritic",(req,res)=>{
    function get(num) {
        mongo.Tv.findOne({}).skip(num).exec((err, doc) => {
            let link=doc.product_title.replace(/[`_.~!@#$%^&*()\+=<>?"{}|,\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/g,"");
            link=link.toLowerCase();
            link=link.replace(": ","/");
            link=link.replace(/\s+/g,"-");
            console.log("开始操作：" + num + doc.product_title);
            let str;
            if (doc.URL&&doc.URL.match(/http/g))
                 str=replaceStr(doc.URL);
            if (doc.URL&&doc.URL.match(/http/g))
            axios.get(str+"/critic-reviews")
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let metascore=$(".score_details_module").find(".score_summary").find(".metascore_w").text();
                    let desc=$(".score_details_module").find(".summary").find(".desc").text();
                    let number=$(".score_details_module").find(".summary").find("strong").text();
                    let positive=$(".score_details_module").find(".score_counts").children().first().find(".count").text();
                    let mixed=$(".score_details_module").find(".score_counts").children().first().next().find(".count").text();
                    let negative=$(".score_details_module").find(".score_counts").children().first().next().next().find(".count").text();
                    Promise.all($(".product_reviews").find(".review_content").map(function(i, el) {
                        let object = {};
                            object.href = $(el).find(".full_review").find("a").attr('href');
                            object.source=$(el).find(".source").text();
                            object.author = $(el).find(".author").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".review_grade").text();
                            object.body = $(el).find(".review_body").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Tvcritic(object);
                            data.save();
                      })).then(()=>{
                      
                        mongo.Tv.updateOne({ product_title: doc.product_title }, {metascore:metascore,desc:desc,num:number,positive:positive,mixed:mixed,negative:negative }).exec(() => {
                            if (num < 3090)
                                get(num + 5);
                        })
                      })
                    
                 
                    
                 
                   
                })
                .catch(function (error) {
                    console.log(num+"失败了");
                    console.log(error);
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 3090)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            console.log(num+"重新开始");
                            get(num);
                        }, 5000);
                });
                else
                {
                    if (num < 3090)
                        get(num + 5);
                }
                
          
           
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})
app.get("/gettvcriticnew",(req,res)=>{
    function get(num) {
        mongo.Tv.findOne({}).skip(num).exec((err, doc) => {
            let link=doc.product_title.replace(/[`_.~!@#$%^&*()\+=<>?"{}|,\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/g,"");
            link=link.toLowerCase();
            link=link.replace(": ","/");
            link=link.replace(/\s+/g,"-");
            console.log("开始操作：" + num + doc.product_title);
            let str;
            if (doc.URL&&doc.URL.match(/http/g))
                 str=replaceStr(doc.URL);
            if (doc.URL&&doc.URL.match(/http/g)&&!doc.negative)
            axios.get(str+"/critic-reviews")
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let metascore=$(".simple_summary").find(".metascore_w").text();
                    let desc=$(".simple_summary").find(".score_description").children().first().text();
                    let number=$(".simple_summary").find(".score_description").children().first().next().text();
                    let positive=$(".simple_summary").children().children().last().find(".right").children().first().find(".count").text();
                    //console.log($(".simple_summary").children().children().last().find(".right").html())
                    let mixed=$(".simple_summary").children().children().last().find(".right").children().first().next().find(".count").text();
                    let negative=$(".simple_summary").children().children().last().find(".right").children().first().next().next().find(".count").text();
                    Promise.all($(".critic_reviews").find(".review").map(function(i, el) {
                        let object = {};
                            object.href = $(el).find(".read_full").attr('href');
                            object.source=$(el).find(".source").text();
                            object.author = $(el).find(".author").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".metascore_w").text();
                            object.body = $(el).find(".summary").find(".no_hover").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Tvcritic(object);
                            data.save();
                      })).then(()=>{
                      
                        mongo.Tv.updateOne({ product_title: doc.product_title }, {metascore:metascore,desc:desc,num:number,positive:positive,mixed:mixed,negative:negative }).exec(() => {
                            if (num < 3090)
                                get(num + 5);
                        })
                      })
                    
                 
                    
                 
                   
                })
                .catch(function (error) {
                    console.log(num+"失败了");
                    console.log(error);
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 3090)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            console.log(num+"重新开始");
                            get(num);
                        }, 5000);
                });
                else
                {
                    if (num < 3090)
                        get(num + 5);
                }
                
          
           
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})
app.get("/getmusiccritic",(req,res)=>{
    function get(num) {
        mongo.Music.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始操作：" + num + doc.product_title);
            if (doc.URL&&doc.URL.match(/http/g))
            axios.get(doc.URL+'/critic-reviews')
           
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let metascore=$(".score_details_module").find(".score_summary").find(".metascore_w").text();
                    let desc=$(".score_details_module").find(".summary").find(".desc").text();
                    let number=$(".score_details_module").find(".summary").find("strong").text();
                    let positive=$(".score_details_module").find(".score_counts").children().first().find(".count").text();
                    let mixed=$(".score_details_module").find(".score_counts").children().first().next().find(".count").text();
                    let negative=$(".score_details_module").find(".score_counts").children().first().next().next().find(".count").text();
                    Promise.all($(".product_reviews").find(".review_content").map(function(i, el) {
                        let object = {};
                            object.href = $(el).find(".full_review").find("a").attr('href');
                            object.source=$(el).find(".source").text();
                            object.author = $(el).find(".author").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".review_grade").text();
                            object.body = $(el).find(".review_body").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Musiccritic(object);
                            data.save();
                      })).then(()=>{
                      
                        mongo.Music.updateOne({ product_title: doc.product_title }, {metascore:metascore,desc:desc,num:number,positive:positive,mixed:mixed,negative:negative }).exec(() => {
                            if(num==96||num==1334)
                                get(num+10);
                            else if (num < 2281&&num!=2279)
                                get(num + 5);
                        })
                      })
                    
                 
                    
                 
                   
                })
                .catch(function (error) {
                    console.log(num+"失败了");
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 2281)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            get(num);
                        }, 5000);
                });
                else
                {
                    if (num < 2281)
                            get(num + 5);
                }

          
           
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})

app.get("/getmoviecritic",(req,res)=>{
    function get(num) {
        mongo.Movie.findOne({}).skip(num).exec((err, doc) => {
           
            console.log("开始操作：" + num + doc.product_title);
       
            if (doc.URL&&doc.URL.match(/http/g))
            axios.get(doc.URL+'/critic-reviews')
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let metascore=$(".simple_summary").find(".metascore_w").text();
                    let desc=$(".simple_summary").find(".score_description").children().first().text();
                    let number=$(".simple_summary").find(".score_description").children().first().next().text();
                    let positive=$(".simple_summary").children().children().last().find(".right").children().first().find(".count").text();
                    //console.log($(".simple_summary").children().children().last().find(".right").html())
                    let mixed=$(".simple_summary").children().children().last().find(".right").children().first().next().find(".count").text();
                    let negative=$(".simple_summary").children().children().last().find(".right").children().first().next().next().find(".count").text();
                    Promise.all($(".critic_reviews").find(".review").map(function(i, el) {
                        let object = {};
                            object.href = $(el).find(".read_full").attr('href');
                            object.source=$(el).find(".source").text();
                            object.author = $(el).find(".author").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".metascore_w").text();
                            object.body = $(el).find(".summary").find(".no_hover").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Moviecritic(object);
                            data.save();
                      })).then(()=>{
                    mongo.Movie.updateOne({ product_title: doc.product_title }, {metascore:metascore,desc:desc,num:number,positive:positive,mixed:mixed,negative:negative }).exec(() => {
                        if (num==100)
                            get(num+10);
                        else if (num < 6153)
                            get(num + 5);
                    })
                })
                })
                .catch(function (error) {
                    console.log(num+"失败了"+error);
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 6153)
                            get(num + 5);
                    }
                   
                    else
                        setTimeout(() => {
                            console.log(num+"重新开始");
                            get(num);
                        }, 5000);
                });
                else
                {
                    if (num < 6153)
                            get(num + 5);
                }
          
           
        })
    }
    //for (let i=0;i<5;i++)
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})

app.get("/getmusicuser",(req,res)=>{
    function get(num) {
        mongo.Music.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始操作：" + num + doc.product_title);
            if (doc.URL&&doc.URL.match(/http/g))
            axios.get(doc.URL+'/user-reviews')
            
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let userscore=$(".score_details_module").find(".score_summary").find(".metascore_w").text();
                    let user_desc=$(".score_details_module").find(".summary").find(".desc").text();
                    let user_number=$(".score_details_module").find(".summary").find("strong").text();
                    let user_positive=$(".score_details_module").find(".score_counts").children().first().find(".count").text();
                    let user_mixed=$(".score_details_module").find(".score_counts").children().first().next().find(".count").text();
                    let user_negative=$(".score_details_module").find(".score_counts").children().first().next().next().find(".count").text();
                    let page=$(".pages").find(".last_page").find("a").text();
                    Promise.all($(".product_reviews").find(".user_review").map(function(i, el) {
                        let object = {};
                           
                            
                            object.name = $(el).find(".name").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".review_grade").text();
                            object.body = $(el).find(".review_body").find(".blurb_expanded").text();
                            if (object.body=="")
                            object.body=$(el).find(".review_body").text();
                            object.helpful=$(el).find(".review_helpful").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Musicuser(object);
                            data.save();
                      })).then(()=>{
                      
                        mongo.Music.updateOne({ product_title: doc.product_title }, {page:page,userscore:userscore,user_desc:user_desc,user_number:user_number,user_positive:user_positive,user_mixed:user_mixed,user_negative:user_negative }).exec(() => {
                            if(num==96||num==1334)
                                get(num+10);
                            else if (num < 2281&&num!=2279)
                                get(num + 5);
                        })
                      })
                    
                 
                    
                 
                   
                })
                .catch(function (error) {
                    console.log(num+"失败了");
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 2281)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            get(num);
                        }, 5000);
                });
                else
                {
                    if (num < 2281)
                            get(num + 5);
                }
          
           
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})

app.get("/gettvuser",(req,res)=>{
    function get(num) {
        mongo.Tv.findOne({}).skip(num).exec((err, doc) => {
            let link=doc.product_title.replace(/[`_.~!@#$%^&*()\+=<>?"{}|,\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/g,"");
            link=link.toLowerCase();
            link=link.replace(": ","/");
            link=link.replace(/\s+/g,"-");
            console.log("开始操作：" + num + doc.product_title);
            if (doc.URL&&doc.URL.match(/http/g))
            axios.get(replaceStr(doc.URL)+'/user-reviews')
                .then(function (res) {
                      $ = cheerio.load(res.data);
                    let userscore=$(".score_details_module").find(".score_summary").find(".metascore_w").text();
                    let user_desc=$(".score_details_module").find(".summary").find(".desc").text();
                    let user_number=$(".score_details_module").find(".summary").find("strong").text();
                    let user_positive=$(".score_details_module").find(".score_counts").children().first().find(".count").text();
                    let user_mixed=$(".score_details_module").find(".score_counts").children().first().next().find(".count").text();
                    let user_negative=$(".score_details_module").find(".score_counts").children().first().next().next().find(".count").text();
                    let page=$(".pages").find(".last_page").find("a").text();
                    Promise.all($(".product_reviews").find(".user_review").map(function(i, el) {
                        let object = {};
                           
                            
                            object.name = $(el).find(".name").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".review_grade").text();
                            object.body = $(el).find(".review_body").find(".blurb_expanded").text();
                            if (object.body=="")
                            object.body=$(el).find(".review_body").text();
                            object.helpful=$(el).find(".review_helpful").find(".helpful_summary").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Tvuser(object);
                            data.save();
                      })).then(()=>{
                      
                        mongo.Tv.updateOne({ product_title: doc.product_title }, {page:page,userscore:userscore,user_desc:user_desc,user_number:user_number,user_positive:user_positive,user_mixed:user_mixed,user_negative:user_negative }).exec(() => {
                            if(num < 3090)
                         
                                get(num + 5);
                        })
                      })
                    
                })
                .catch(function (error) {
                    console.log(num+"失败了");
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 3090)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            console.log(num+"重新开始");
                            get(num);
                        }, 5000);
                });
                else
                {
                    if (num < 3090)
                        get(num + 5);
                }
                
           
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})
app.get("/gettvusernew",(req,res)=>{
    function get(num) {
        mongo.Tv.findOne({}).skip(num).exec((err, doc) => {
            let link=doc.product_title.replace(/[`_.~!@#$%^&*()\+=<>?"{}|,\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/g,"");
            link=link.toLowerCase();
            link=link.replace(": ","/");
            link=link.replace(/\s+/g,"-");
            console.log("开始操作：" + num + doc.product_title);
            if (doc.URL&&doc.URL.match(/http/g)&&!doc.user_negative)
            axios.get(replaceStr(doc.URL)+'/user-reviews')
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let userscore=$(".simple_summary").find(".metascore_w").text();
                    let user_desc=$(".simple_summary").find(".score_description").children().first().text();
                    let user_number=$(".simple_summary").find(".score_description").children().first().next().text();
                
                    let user_positive=$(".simple_summary").children().children().last().find(".right").children().first().next().find(".count").text();
                    //console.log($(".simple_summary").children().children().last().find(".right").html())
                    let user_mixed=$(".simple_summary").children().children().last().find(".right").children().first().next().next().find(".count").text();
                    let user_negative=$(".simple_summary").children().children().last().find(".right").children().first().next().next().next().find(".count").text();
                    let page=$(".pages").find(".last_page").find("a").text();
                    Promise.all($(".reviews").find(".review").map(function(i, el) {
                        let object = {};
                           
                            
                            object.name = $(el).find(".author").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".metascore_w").text();
                            object.body = $(el).find(".review_body").find(".blurb_expanded").text();
                            if (object.body=="")
                            object.body=$(el).find(".review_body").text();
                            object.helpful=$(el).find(".helpful").find(".text").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Tvuser(object);
                            data.save();
                      })).then(()=>{
                      
                        mongo.Tv.updateOne({ product_title: doc.product_title }, {page:page,userscore:userscore,user_desc:user_desc,user_number:user_number,user_positive:user_positive,user_mixed:user_mixed,user_negative:user_negative }).exec(() => {
                            if(num < 3090)
                         
                                get(num + 5);
                        })
                      })
                    
                })
                .catch(function (error) {
                    console.log(num+"失败了");
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 3090)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            console.log(num+"重新开始");
                            get(num);
                        }, 5000);
                });
                else
                {
                    if (num < 3090)
                        get(num + 5);
                }
                
           
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})
app.get("/gettvmoreuser",(req,res)=>{
    function get(num) {
        mongo.Tv.findOne({}).skip(num).exec((err, doc) => {
            let link=doc.product_title.replace(/[`_.~!@#$%^&*()\+=<>?"{}|,\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/g,"");
            link=link.toLowerCase();
            link=link.replace(": ","/");
            link=link.replace(/\s+/g,"-");
            console.log("开始操作：" + num + doc.product_title);
            if (!doc.page||!doc.URL||!doc.URL.match(/http/g))
            {
                if (num < 3090)
                    get(num + 5);
            }
            else
            {
            let max=parseInt(doc.page);
            let page=1;
            function getpage(page){
                axios.get(replaceStr(doc.URL)+"/user-reviews?page="+page)
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    
                    Promise.all($(".product_reviews").find(".user_review").map(function(i, el) {
                        let object = {};
                           
                            
                            object.name = $(el).find(".name").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".review_grade").text();
                            object.body = $(el).find(".review_body").find(".blurb_expanded").text();
                            if (object.body=="")
                            object.body=$(el).find(".review_body").text();
                            object.helpful=$(el).find(".review_helpful").find(".helpful_summary").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Tvuser(object);
                            data.save();
                      })).then(()=>{
                        if (page<max-1)
                            getpage(page+1);
                        else if(num < 3090)
                            get(num + 5);
                       
                      })
                    
                })
                .catch(function (error) {
                    console.log(num+"失败了");
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 3090)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            console.log(num+"重新开始");
                            getpage(page);
                        }, 5000);
                });
            }
            getpage(page);
           
            }
          
           
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})
app.get("/gettvmoreusernew",(req,res)=>{
    function get(num) {
        mongo.Tv.findOne({}).skip(num).exec((err, doc) => {
            let link=doc.product_title.replace(/[`_.~!@#$%^&*()\+=<>?"{}|,\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/g,"");
            link=link.toLowerCase();
            link=link.replace(": ","/");
            link=link.replace(/\s+/g,"-");
            console.log("开始操作：" + num + doc.product_title);
            if (!doc.page||!doc.URL||!doc.URL.match(/http/g))
            {
                if (num < 3090)
                    get(num + 5);
            }
            else
            {
            let max=parseInt(doc.page);
            let page=1;
            function getpage(page){
                axios.get(replaceStr(doc.URL)+"/user-reviews?page="+page)
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    
                    Promise.all($(".reviews").find(".review").map(function(i, el) {
                        let object = {};
                           
                            
                            object.name = $(el).find(".author").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".metascore_w").text();
                            object.body = $(el).find(".review_body").find(".blurb_expanded").text();
                            if (object.body=="")
                            object.body=$(el).find(".review_body").text();
                            object.helpful=$(el).find(".helpful").find(".text").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Tvuser(object);
                            data.save();
                      })).then(()=>{
                        if (page<max-1)
                            getpage(page+1);
                        else if(num < 3090)
                            get(num + 5);
                       
                      })
                    
                })
                .catch(function (error) {
                    console.log(num+"失败了");
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 3090)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            console.log(num+"重新开始");
                            getpage(page);
                        }, 5000);
                });
            }
            getpage(page);
           
            }
          
           
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})

app.get("/getmusicmoreuser",(req,res)=>{
    function get(num) {
        mongo.Music.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始操作：" + num + doc.product_title);
            if (!doc.page||!doc.URL||!doc.URL.match(/http/g))
            {
                if(num==96||num==1334)
                    get(num+10);
                else if(num==2279)
                    console.log("结束了");
                if (num < 2281)
                    get(num + 5);
            }
            else
            {
            let max=parseInt(doc.page);
            let page=1;
            function getpage(page){
                axios.get(doc.URL+"/user-reviews?page="+page)
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    
                    Promise.all($(".product_reviews").find(".user_review").map(function(i, el) {
                        let object = {};
                           
                            
                            object.name = $(el).find(".name").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".review_grade").text();
                            object.body = $(el).find(".review_body").find(".blurb_expanded").text();
                            if (object.body=="")
                            object.body=$(el).find(".review_body").text();
                            object.helpful=$(el).find(".review_helpful").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Musicuser(object);
                            data.save();
                      })).then(()=>{
                      
                        
                            if(num==96||num==1334)
                                get(num+10);
                            else if(num==2279)
                                console.log("结束了");
                            else if (page<max-1)
                                getpage(page+1);
                            else if (num < 2281&&num!=2279)
                                get(num + 5);
                        
                      })
                    
                 
                    
                 
                   
                })
                .catch(function (error) {
                    console.log(num+"失败了");
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 2283)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            getpage(page);
                        }, 5000);
                });
            }
            
                getpage(page);
        }
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})

app.get("/getmovieuser",(req,res)=>{
    function get(num) {
        mongo.Movie.findOne({}).skip(num).exec((err, doc) => {
           
            console.log("开始操作：" + num + doc.product_title);
       
            if (doc.URL&&doc.URL.match(/http/g))
            axios.get(doc.URL+'/user-reviews')
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let userscore=$(".simple_summary").find(".metascore_w").text();
                    let user_desc=$(".simple_summary").find(".score_description").children().first().text();
                    let user_number=$(".simple_summary").find(".score_description").children().first().next().text();
                
                    let user_positive=$(".simple_summary").children().children().last().find(".right").children().first().next().find(".count").text();
                    //console.log($(".simple_summary").children().children().last().find(".right").html())
                    let user_mixed=$(".simple_summary").children().children().last().find(".right").children().first().next().next().find(".count").text();
                    let user_negative=$(".simple_summary").children().children().last().find(".right").children().first().next().next().next().find(".count").text();
                    let page=$(".pages").find(".last_page").find("a").text();
                    Promise.all($(".reviews").find(".review").map(function(i, el) {
                        let object = {};
                           
                            
                            object.name = $(el).find(".author").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".metascore_w").text();
                            object.body = $(el).find(".review_body").find(".blurb_expanded").text();
                            if (object.body=="")
                            object.body=$(el).find(".review_body").text();
                            object.helpful=$(el).find(".helpful").find(".text").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Movieuser(object);
                            data.save();
                      })).then(()=>{
                      
                        mongo.Movie.updateOne({ product_title: doc.product_title }, {page:page,userscore:userscore,user_desc:user_desc,user_number:user_number,user_positive:user_positive,user_mixed:user_mixed,user_negative:user_negative }).exec(() => {
                            
                        if (num==100)
                            get(num+10);
                        else if (num < 6153)
                            get(num + 5);
                    })
                })
                }) 
                .catch(function (error) {
                    console.log(num+"失败了");
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 6153)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            console.log(num+"重新开始");
                            get(num);
                        }, 5000);
                });
                else{
                    if (num < 6153)
                    get(num + 5);
                }
                
          
            
        })
    }
    //for (let i=0;i<5;i++)
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})

app.get("/getmoviemoreuser",(req,res)=>{
    function get(num) {
        mongo.Movie.findOne({}).skip(num).exec((err, doc) => {
           
            
            if (!doc.page||!doc.URL||!doc.URL.match(/http/g))
            {
                if (num==100)
                    get(num+10);
                else if (num < 6153)
                    get(num + 5);
            }
            else
            {
            let max=parseInt(doc.page);
            let page=1;
         
            function getpage(page){
            console.log("开始操作：" + num + doc.product_title+page);
            axios.get(doc.URL+'/user-reviews?page='+page)
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    
                    Promise.all($(".reviews").find(".review").map(function(i, el) {
                        let object = {};
                           
                            
                            object.name = $(el).find(".author").find("a").text();
                            object.date = $(el).find(".date").text();
                            object.review_grade = $(el).find(".metascore_w").text();
                            object.body = $(el).find(".review_body").find(".blurb_expanded").text();
                            if (object.body=="")
                            object.body=$(el).find(".review_body").text();
                            object.helpful=$(el).find(".helpful").find(".text").text();
                            object.product_title=doc.product_title;
                        
                            let data = new mongo.Movieuser(object);
                            data.save();
                      })).then(()=>{
                      
                        
                        if (num==100)
                            get(num+10);
                        else if (page<max-1)
                            getpage(page+1);
                        else if (num < 6153)
                            get(num + 5);
                    })
                })
              
                .catch(function (error) {
                    console.log(num+"失败了");
                    if (error&&error.response&&error.response.status == 404)
                    {
                        if (num < 6153)
                            get(num + 5);
                    }
                    else
                        setTimeout(() => {
                            console.log(num+"重新开始");
                            getpage(num);
                        }, 5000);
                });
          
            
        }
        getpage(page);
    }
    })
}
    //for (let i=0;i<5;i++)
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    res.send("ok");
})