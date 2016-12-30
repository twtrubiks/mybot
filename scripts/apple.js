// Description:
//   回傳10篇蘋果即時新聞
//
// Dependencies:
//   "cheerio": "0.20.0"
//
// Configuration:
//   None
//
// Commands:
//   hubot apple news me- 回傳10篇蘋果即時新聞
//
// Author:
//   twtrubiks

cheerio = require("cheerio");
HOST = 'http://www.appledaily.com.tw/';

module.exports = function(robot) {
    robot.respond(/apple news me/, function(response) {
        var target_url = "http://www.appledaily.com.tw/realtimenews/section/new/" ;
        robot.http(target_url).get()(function(err, res, body) {
            if (res.statusCode!= 200) {
				return response.send("蘋果即時新聞網站異常");
            }
            var $ = cheerio.load(body);		
			var titles = $("li.rtddt a");
            for (var i = 0; i < 10; i++) {
				var len = $(titles[i]).attr('href').split("/").length;
				var time = $(titles[i]).children('time').text() ;
				var h2 = $(titles[i]).children('h2').text() ;
				var title = $(titles[i]).attr('href').split("/")[len-1];
				var link = HOST + $(titles[i]).attr('href');
				response.send(time+"  ["+h2+"]  "+title+"  "+link);  
			}		
        })		
    });
	return robot.catchAll(function(res) {
    return res.send("您輸入的指令 "+ res.message.text + " 不存在哦~ " +
	"\n如需查看更多的指令，請輸入 bot help");
  });
	
}