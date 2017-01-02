// Description:
//   回傳指定的PTT板名最新頁全部文章
//
// Dependencies:
//   "cheerio": "0.20.0"
//
// Configuration:
//   None
//
// Commands:
//   hubot ptt me <board>- 得到指定的PTT板名最新頁全部文章
//
// Author:
//   twtrubiks

var cheerio = require("cheerio");
var HOST = 'https://www.ptt.cc';

module.exports = function(robot) {
    robot.respond(/ptt me (.*)/, function(response) {
        board = response.match[1];
        var target_url = "https://www.ptt.cc/bbs/" + board + "/index.html";
        cookie = "over18=1; expires=Sat, 01 Jan 2100 00:00:00 GMT; path=/";
        robot.http(target_url).header("cookie", cookie).get()(function(err, res, body) {
            if (res.statusCode!= 200) {
				return response.send("您輸入的板名有錯誤哦~");
            }
            var $ = cheerio.load(body);
            var titles = $("div.title a");
            for (var i = 0; i < titles.length; i++) {
				title = $(titles[i]).text();
				url = HOST + $(titles[i]).attr('href');  
				response.send(title+"	"+url); 		
			}			
        })
    });
}



