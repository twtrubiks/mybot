// Description:
//   回傳最近PTT熱門的文章
//
// Dependencies:
//   "cheerio": "0.20.0"
//
// Configuration:
//   None
//
// Commands:
//   hubot ptt hot - 最近PTT熱門的文章
//
// Author:
//   twtrubiks

var cheerio = require("cheerio");
var HOST = 'http://disp.cc/b/';

module.exports = function(robot) {
    robot.respond(/ptt hot/, function(response) {
        board = response.match[1];
        var hot_url = "http://disp.cc/b/PttHot";
        cookie = "over18=1; expires=Sat, 01 Jan 2100 00:00:00 GMT; path=/";
        robot.http(hot_url).header("cookie", cookie).get()(function(err, res, body) {
            if (res.statusCode!= 200) {
				return response.send("網站異常");
            }
            var $ = cheerio.load(body);
            var titles = $("#list div.row2 div span.listTitle"); 		
            for (var i = 0; i < titles.length; i++) {
				title = $(titles[i]).text();
				url = HOST + $(titles[i]).find('a').attr('href');  
				response.send(title +"	"+ url); 		
			}			
        })
    });
}



