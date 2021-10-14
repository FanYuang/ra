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
                    if (array.indexOf(el.name) == -1) {
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

app.get("/getgamereview", (req, res) => {
    function get(num) {
        mongo.Gameuser.findOne({}).skip(num).exec((err, doc) => {
            if (doc)
                console.log("开始操作：" + num + doc.name);
            else
                get(num + 10);



            function getfull(i) {
                let obj = {};

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
            if (doc.review)
                getfull(0);








        })
    }

    for (let i = 0; i < 10; i++)
        get(0 + i);
    res.send("ok");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})