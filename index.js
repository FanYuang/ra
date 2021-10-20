const express = require('express')
const mongoose = require('mongoose');
const mongo = require('./environment/mongo');
const axios = require('axios');
var cheerio = require('cheerio');
const app = express()
const port = 3001
let arr = [];
let array = [];

app.get('/', (req, res) => {
    res.send('Hello World!')
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
app.get("/getmeta",(req,ress)=>{
    function getgame(num) {
        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {
         
            console.log("开始爬第"+num+"个" + doc.name);
            axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Game")
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let obj={};
                    obj.positive= $('.score_distribution').find(".data").first().text();
                    obj.mixed=$('.score_distribution').find(".score_count").last().prev().find(".data").text();
                    obj.negative= $('.score_distribution').find(".data").last().text();
                 
                    obj.review_average=$('.userscore_summary').find('.summary_data').text();
                    obj.highscore=$('.highest_review').find('.score_wrap').text();
                    obj.hightitle=$('.highest_review').find('.product_title').text();
                    obj.lowscore=$('.lowest_review').find('.score_wrap').text();
                    obj.lowtitle=$('.lowest_review').find('.product_title').text();
                    obj.num=$('.page_nav').find(".page_num").last().text();
                    mongo.Metauser.updateOne({ name: doc.name }, { game_info: obj }).exec();
                    Promise.all($(".review_content").map((i,el)=>{
                   
                            let object={};
                            object.product_title=$(el).find(".product_title").text();
                            object.product_score=$(el).find(".product_score").find(".data").text();
                            object.date=$(el).find(".date").text();
                            object.review_score=$(el).find(".review_score").text();
                            object.body=$(el).find(".blurb_expanded").text();
                            object.helpful=$(el).find(".review_helpful").find(".helpful_summary").text();
                            mongo.Metauser.updateOne({ name: doc.name }, {$push: { game_review: object } }).exec();

                        })).then((res)=>{
                            console.log("成功第"+num+"个" + doc.name);
                            if (num < 163181)
                            getgame(num + 2);
                        })
                   
                })
                .catch(function (error) {
                    
              
                 
                    console.log("卡住了" + num);
                    if(!error.response)
                    console.log(error);
                    if (error.response&&error.response.status==404)
                    getgame(num+2);
                    else
                    setTimeout(() => {
                        getgame(num);
                    }, 5000);
                });
        })

    }

    function gettv(num) {
   
            mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {
  
            console.log("开始爬第"+num+"个" + doc.name);
            axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=TvShow")
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let obj={};
                    obj.positive= $('.score_distribution').find(".data").first().text();
                    obj.mixed=$('.score_distribution').find(".score_count").last().prev().find(".data").text();
                    obj.negative= $('.score_distribution').find(".data").last().text();
                 
                    obj.review_average=$('.userscore_summary').find('.summary_data').text();
                    obj.highscore=$('.highest_review').find('.score_wrap').text();
                    obj.hightitle=$('.highest_review').find('.product_title').text();
                    obj.lowscore=$('.lowest_review').find('.score_wrap').text();
                    obj.lowtitle=$('.lowest_review').find('.product_title').text();
                    obj.num=$('.page_nav').find(".page_num").last().text();

                    mongo.Metauser.updateOne({ name: doc.name }, { tv_info: obj }).exec();
                    Promise.all($(".review_content").map((i,el)=>{
                   
                                                    let object={};
                                                    object.product_title=$(el).find(".product_title").text();
                                                    object.product_score=$(el).find(".product_score").find(".data").text();
                                                    object.date=$(el).find(".date").text();
                                                    object.review_score=$(el).find(".review_score").text();
                                                    object.body=$(el).find(".blurb_expanded").text();
                                                    object.helpful=$(el).find(".review_helpful").find(".helpful_summary").text();
                                                    mongo.Metauser.updateOne({ name: doc.name }, {$push: { tv_review: object } }).exec();
                        
                                                })).then((res)=>{
                                                    console.log("成功第"+num+"个" + doc.name);
                                                    if (num < 163181)
                                                    gettv(num + 2);
                                                })
                    
                })
                .catch(function (error) {
                    
              
                 
                    console.log("卡住了" + num);
                    if(!error.response)
                    console.log(error);
                    
                    if (error.response&&error.response.status==404)
                    gettv(num+2);
                    else
                    setTimeout(() => {
                        gettv(num);
                    }, 5000);
                })
            
        })
     
    }

    function getmovie(num) {
      
        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {
           
            console.log("开始爬第"+num+"个" + doc.name);
            axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Movie")
                .then(function (res)
                 {
                    $ = cheerio.load(res.data);
                    let obj={};
                    obj.positive= $('.score_distribution').find(".data").first().text();
                    obj.mixed=$('.score_distribution').find(".score_count").last().prev().find(".data").text();
                    obj.negative= $('.score_distribution').find(".data").last().text();
                 
                    obj.review_average=$('.userscore_summary').find('.summary_data').text();
                    obj.highscore=$('.highest_review').find('.score_wrap').text();
                    obj.hightitle=$('.highest_review').find('.product_title').text();
                    obj.lowscore=$('.lowest_review').find('.score_wrap').text();
                    obj.lowtitle=$('.lowest_review').find('.product_title').text();
                    obj.num=$('.page_nav').find(".page_num").last().text();

       
                    mongo.Metauser.updateOne({ name: doc.name }, { movie_info: obj }).exec();
                    Promise.all($(".review_content").map((i,el)=>{
                   
                                                    let object={};
                                                    object.product_title=$(el).find(".product_title").text();
                                                    object.product_score=$(el).find(".product_score").find(".data").text();
                                                    object.date=$(el).find(".date").text();
                                                    object.review_score=$(el).find(".review_score").text();
                                                    object.body=$(el).find(".blurb_expanded").text();
                                                    object.helpful=$(el).find(".review_helpful").find(".helpful_summary").text();
                                                    mongo.Metauser.updateOne({ name: doc.name }, {$push: { movie_review: object } }).exec();
                        
                                                })).then((res)=>{
                                                    console.log("成功第"+num+"个" + doc.name);
                                                    if (num < 163181)
                                                    getmovie(num + 2);
                                                })
              
                })
                .catch(function (error) {
                    
              
                 
                    console.log("卡住了" + num);
                    if(!error.response)
                    console.log(error);
                    if (error.response&&error.response.status==404)
                    getmovie(num+2);

                    else 
                    setTimeout(() => {
                        getmovie(num);
                    }, 5000);
                })
        })
    
   
    }

    function getmusic(num) {
        
        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {
  
            console.log("开始爬第"+num+"个" + doc.name);
            axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Album")
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    let obj={};
                    obj.positive= $('.score_distribution').find(".data").first().text();
                    obj.mixed=$('.score_distribution').find(".score_count").last().prev().find(".data").text();
                    obj.negative= $('.score_distribution').find(".data").last().text();
                 
                    obj.review_average=$('.userscore_summary').find('.summary_data').text();
                    obj.highscore=$('.highest_review').find('.score_wrap').text();
                    obj.hightitle=$('.highest_review').find('.product_title').text();
                    obj.lowscore=$('.lowest_review').find('.score_wrap').text();
                    obj.lowtitle=$('.lowest_review').find('.product_title').text();
                    obj.num=$('.page_nav').find(".page_num").last().text();

                    mongo.Metauser.updateOne({ name: doc.name }, { music_info: obj }).exec();
                    Promise.all($(".review_content").map((i,el)=>{
                   
                                                    let object={};
                                                    object.product_title=$(el).find(".product_title").text();
                                                    object.product_score=$(el).find(".product_score").find(".data").text();
                                                    object.date=$(el).find(".date").text();
                                                    object.review_score=$(el).find(".review_score").text();
                                                    object.body=$(el).find(".blurb_expanded").text();
                                                    object.helpful=$(el).find(".review_helpful").find(".helpful_summary").text();
                                                    mongo.Metauser.updateOne({ name: doc.name }, {$push: { music_review: object } }).exec();
                        
                                                })).then((res)=>{
                                                    console.log("成功第"+num+"个" + doc.name);
                                                    if (num < 163181)
                                                    getmusic(num + 2);
                                                })
                    
                })
                .catch(function (error) {
                    
              
                 
                    console.log("卡住了" + num);
                    if(!error.response)
                    console.log(error);
                    if (error.response&&error.response.status==404)
                    getmusic(num+2);
                    else 
                    setTimeout(() => {
                        getmusic(num);
                    }, 5000);
                });
        })
  
    }
    for (let i = 0; i < 2; i++)
    {
        getmovie(0 + i);
        gettv(0 + i);
        getmusic(0 + i);
        getgame(0 + i);
    
  
    }
       
    ress.send("ok");
})

app.get("/getmetareview",(req,ress)=>{
    function getgame(num) {
        
        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {
            console.log("开始爬第"+num+"个" + doc.name);

            if (!doc.game_info||doc.game_info.num=="")
            {
                if (num < 163180)
                getgame(num + 3);
            }
            else
            {
                let page_num=parseInt(doc.game_info.num);
                function getpage(page)
                {
                axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Game&page="+page)
                    .then(function (res) {
                        $ = cheerio.load(res.data);
                       
                      
                        Promise.all($(".review_content").map((i,el)=>{
                       
                                let object={};
                                object.product_title=$(el).find(".product_title").text();
                                object.product_score=$(el).find(".product_score").find(".data").text();
                                object.date=$(el).find(".date").text();
                                object.review_score=$(el).find(".review_score").text();
                                object.body=$(el).find(".blurb_expanded").text();
                                object.helpful=$(el).find(".review_helpful").find(".helpful_summary").text();
                                mongo.Metauser.updateOne({ name: doc.name }, {$push: { game_review: object } }).exec();
    
                            })).then((res)=>{
                                console.log("成功第"+num+"个" + doc.name+"第"+page+"页");
                                if(page<page_num-1)
                                getpage(page+1); 
                                if (num < 163180&&page==page_num-1)
                                getgame(num + 3);
                            })
                       
                    })
                    .catch(function (error) {
                        
                  
                     
                        console.log("卡住了" + num);
                        if(!error.response)
                        console.log(error);
                        if (error.response&&error.response.status==404&&page<page_num-1)
                        getpage(page+1);
                        else if(error.response&&error.response.status==404&&num < 163180&&page==page_num-1)
                        {
                            getgame(num+3);
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
            console.log("开始爬第"+num+"个" + doc.name);
            if (!doc.movie_info||doc.movie_info.num=="")
            {
                if (num < 163180)
                getmovie(num + 3);
            }
            else
            {
                let page_num=parseInt(doc.movie_info.num);
                function getpage(page)
                {
                axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Movie&page="+page)
                    .then(function (res) {
                        $ = cheerio.load(res.data);
                      
                        Promise.all($(".review_content").map((i,el)=>{
                       
                                let object={};
                                object.product_title=$(el).find(".product_title").text();
                                object.product_score=$(el).find(".product_score").find(".data").text();
                                object.date=$(el).find(".date").text();
                                object.review_score=$(el).find(".review_score").text();
                                object.body=$(el).find(".blurb_expanded").text();
                                object.helpful=$(el).find(".review_helpful").find(".helpful_summary").text();
                                mongo.Metauser.updateOne({ name: doc.name }, {$push: { movie_review: object } }).exec();
    
                            })).then((res)=>{
                                console.log("成功第"+num+"个" + doc.name+"第"+page+"页");
                                if(page<page_num-1)
                                getpage(page+1); 
                                if (num < 163180&&page==page_num-1)
                                getmovie(num + 3);
                            })
                       
                    })
                    .catch(function (error) {
                        
                  
                     
                        console.log("卡住了" + num);
                        if(!error.response)
                        console.log(error);
                        if (error.response&&error.response.status==404&&page<page_num-1)
                        getpage(page+1);
                        else if(error.response&&error.response.status==404&&num < 163180&&page==page_num-1)
                        {
                            getmovie(num+3);
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
            console.log("开始爬第"+num+"个" + doc.name);
            if (!doc.tv_info||doc.tv_info.num=="")
            {
                if (num < 163180)
                gettv(num + 3);
            }
            else
            {
                let page_num=parseInt(doc.tv_info.num);
                function getpage(page)
                {
                axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=TvShow&page="+page)
                    .then(function (res) {
                        $ = cheerio.load(res.data);
                      
                        Promise.all($(".review_content").map((i,el)=>{
                       
                                let object={};
                                object.product_title=$(el).find(".product_title").text();
                                object.product_score=$(el).find(".product_score").find(".data").text();
                                object.date=$(el).find(".date").text();
                                object.review_score=$(el).find(".review_score").text();
                                object.body=$(el).find(".blurb_expanded").text();
                                object.helpful=$(el).find(".review_helpful").find(".helpful_summary").text();
                                mongo.Metauser.updateOne({ name: doc.name }, {$push: { tv_review: object } }).exec();
    
                            })).then((res)=>{
                                console.log("成功第"+num+"个" + doc.name+"第"+page+"页");
                                if(page<page_num-1)
                                getpage(page+1); 
                                if (num < 163180&&page==page_num-1)
                                gettv(num + 3);
                            })
                       
                    })
                    .catch(function (error) {
                        
                  
                     
                        console.log("卡住了" + num);
                        if(!error.response)
                        console.log(error);
                        if (error.response&&error.response.status==404&&page<page_num-1)
                        getpage(page+1);
                        else if(error.response&&error.response.status==404&&num < 163180&&page==page_num-1)
                        {
                            gettv(num+3);
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
            console.log("开始爬第"+num+"个" + doc.name);
            if (!doc.music_info||doc.music_info.num=="")
            {
                if (num < 163180)
                getmusic(num + 3);
            }
            else
            {
                let page_num=parseInt(doc.music_info.num);
                function getpage(page)
                {
                axios.get('https://www.metacritic.com/user/' + doc.name + "?myscore-filter=Album&page="+page)
                    .then(function (res) {
                        $ = cheerio.load(res.data);
                      
                        Promise.all($(".review_content").map((i,el)=>{
                       
                                let object={};
                                object.product_title=$(el).find(".product_title").text();
                                object.product_score=$(el).find(".product_score").find(".data").text();
                                object.date=$(el).find(".date").text();
                                object.review_score=$(el).find(".review_score").text();
                                object.body=$(el).find(".blurb_expanded").text();
                                object.helpful=$(el).find(".review_helpful").find(".helpful_summary").text();
                                mongo.Metauser.updateOne({ name: doc.name }, {$push: { music_review: object } }).exec();
    
                            })).then((res)=>{
                                console.log("成功第"+num+"个" + doc.name+"第"+page+"页");
                                if(page<page_num-1)
                                getpage(page+1); 
                                if (num < 163180&&page==page_num-1)
                                getmusic(num + 3);
                            })
                       
                    })
                    .catch(function (error) {
                        
                  
                     
                        console.log("卡住了" + num);
                        if(!error.response)
                        console.log(error);
                        if (error.response&&error.response.status==404&&page<page_num-1)
                        getpage(page+1);
                        else if(error.response&&error.response.status==404&&num < 163180&&page==page_num-1)
                        {
                            getmusic(num+3);
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


  
    for (let i = 0; i < 3; i++)
    {
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
                console.log("开始操作：" + num + doc.name+i);
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
                else{
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
            if (doc.review&&doc&&doc.review.length>0)
                getfull(0);
            else 
                get(num + 10);









        })
    }

    for (let i = 0; i < 10; i++)
        get(0 + i);
    res.send("ok");
})
app.get("/getmetaformysql",(req,res)=>{
    function get(num) {
        mongo.Metauser.findOne({}).skip(num).exec((err, doc) => {

            console.log("开始操作：" + num + doc.name);
            if (doc && doc.game_review&& doc.game_review.length > 0)
                doc.game_review.map(el => {
                    let obj = {};
                    obj= el;
                    obj.name=doc.name;
                    let data = new mongo.Metagame(obj);
                    data.save();

                

                })
                if (doc && doc.music_review&& doc.music_review.length > 0)
                doc.music_review.map(el => {
                    let obj = {};
                    obj= el;
                    obj.name=doc.name;
                    let data = new mongo.Metamusic(obj);
                    data.save();

                

                })
                if (doc && doc.tv_review&& doc.tv_review.length > 0)
                doc.tv_review.map(el => {
                    let obj = {};
                    obj= el;
                    obj.name=doc.name;
                    let data = new mongo.Metatv(obj);
                    data.save();

                

                })
                if (doc && doc.movie_review&& doc.movie_review.length > 0)
                doc.movie_review.map(el => {
                    let obj = {};
                    obj= el;
                    obj.name=doc.name;
                    let data = new mongo.Metamovie(obj);
                    data.save();

                

                })
            if (num<163182)
            get(num + 1);
        })
    }
    get(0);
    res.send("ok");
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})