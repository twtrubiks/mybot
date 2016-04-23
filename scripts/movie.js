// Description:
//   回傳開眼電影網近期上映電影
//
// Dependencies:
//   "cheerio": "0.20.0"
//
// Configuration:
//   None
//
// Commands:
//   hubot movie me - 回傳開眼電影網近期上映電影
//
// Author:
//   twtrubiks

var cheerio = require("cheerio");
var HOST = 'http://www.atmovies.com.tw/';

module.exports = function(robot) {
    robot.respond(/movie me/, function(response) {
        var target_url = "http://www.atmovies.com.tw/movie/next/";
        robot.http(target_url).get()(function(err, res, body) {
            if (res.statusCode!= 200) {
				return response.send("開眼電影網站異常");
            }	
            var $ = cheerio.load(body);
            var titles = $("div.filmTitle a");
            for (var i = 0; i < titles.length; i++) {
				title = $(titles[i]).text();
				title_split = title.replace(/\s+/g," ")
				url = HOST + $(titles[i]).attr('href');  
				response.send(title_split+url); 		
			}		
        })
    });
}