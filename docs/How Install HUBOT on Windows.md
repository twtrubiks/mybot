# 如何在 Windows 安裝 HUBOT
How Install HUBOT on Windows 

可參考HUBOT官網[HUBOT](https://hubot.github.com/)的安裝教學 。<br>   
本人在這裡參考[HUBOT](https://hubot.github.com/)官網的教學，並用中文紀錄一下:memo:

## 安裝node and npm
安裝方法參考[ HUBOT ](https://hubot.github.com/)官網建議的使用[ chocolatey ](https://chocolatey.org/) 安裝，<br>
首先，使用<b> 系統管理員 </b>執行CMD，然後輸入以下指令
```
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```
或是<br>
使用<b> 系統管理員 </b>執行 PowerShell 命令列，然後輸入以下指令
```
iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))
```
以上方法選一種即可，安裝時，應該會出現錯誤，請用<b> 系統管理員 </b>打開 PowerShell，然後執行以下指令：
```
Set-ExecutionPolicy RemoteSigned
```
接著選 Y(YES)，即可順利安裝。

## 安裝Node JS
### 方法一
使用<b> 系統管理員 </b>執行 PowerShell 命令列，然後輸入以下指令
```
choco install nodejs.install
```
可能會問你一些東西，選 1 YES。<br>
接著 設定環境變數，<br>
使用<b> 系統管理員 </b>執行CMD，然後輸入以下指令
```
setx /M PATH "%PATH%;C:\Program Files\nodejs\"
```
也可以手動自己設定環境變數，設定好會如下圖<br>
![alt tag](http://i.imgur.com/YKlFgrF.jpg)<br>
<br>
### 方法二
直接到[ Node.js ](https://nodejs.org/en/)官網下載，然後安裝。

## 開始建立 HUBOT
先安裝必要套件，執行CMD，然後輸入以下指令
```
npm install -g hubot coffee-script yo generator-hubot
```
接著選一個自己喜歡的路徑，執行CMD，然後輸入以下指令
```
mkdir myhubot
cd myhubot
```
接著再輸入以下指令
```
yo hubot
```
接著會問你一些要設定的東西，擁有者、機器人名稱、描述 、Bot adapter，基本上都用預設就行了，直接按Enter<br>
P.S <b> Bot adapter </b> 在這裡我是輸入 <b> slack </b> (可依照自己的需求選擇[ Adapters ](https://hubot.github.com/docs/adapters/) )
![alt tag](http://i.imgur.com/U623K56.jpg)<br>

開始啟動 HUBOT，在自己創立的資料夾裡下使用CMD，然後輸入以下指令，
我們先使用<b> shell adapter </b>下去測試
```
bin\hubot -a shell
```
啟動成功後，可輸入指令測試，例如
```
[機器人名稱] echo [想要發出的訊息] 
myhubot echo hello
```
如需觀看更多指令，可以使用
```
[機器人名稱] help
myhubot help
```
![alt tag](http://i.imgur.com/4yMnqgT.jpg)<br>

以上就是使用<b> shell adapter </b>，<br>

## 結合hubot-slack
可參考[ hubot-slack](https://github.com/slackhq/hubot-slack)<br>
在同資料夾底下執行CMD，然後輸入以下指令
```
npm install -g hubot-slack --save
```
接著到[ Slack](https://slack.com/) 申請帳號，<br>
去 [https://my.slack.com/services/new/hubot](https://my.slack.com/services/new/hubot) 新增一個 Hubot APP，<br>
並且取得自己的 API Token<br>
```
HUBOT_SLACK_TOKEN=xoxb-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
![alt tag](http://i.imgur.com/VFHA2og.jpg)<br>
設定<b> 環境變數 </b>，執行CMD，然後輸入以下指令<br>
注意，中間不能有空格，不然會無法設定環境變數。
```
set HUBOT_SLACK_TOKEN=xoxb-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
使用Node.js執行，然後輸入以下指令
```
process.env
```
如需觀看特定參數的值，可輸入下列指令
```
process.env.HUBOT_SLACK_TOKEN
```
更多資料可參考 [Node.js](https://nodejs.org/api/process.html)  

接著再輸入以下指令和slack連接
```
bin\hubot -a slack
```
![alt tag](http://i.imgur.com/Dhak4wm.jpg)<br>
接著再回到slack上，可以發現連線成功<br>
![alt tag](http://i.imgur.com/DrLXF8C.jpg)<br>

## Deploying to Heroku
可參考 [hubot-slack](https://github.com/slackhq/hubot-slack)，先到 [Heroku](https://www.heroku.com/)註冊帳號，再安裝 [Heroku Toolbelt ](https://toolbelt.heroku.com/)，<br>
執行CMD，然後輸入以下指令，輸入自己的帳號和密碼
```
% heroku login
Enter your Heroku credentials.
Email: youremail@example.com
Password:
Could not find an existing public key.
Would you like to generate one? [Yn]
Generating new SSH public key.
Uploading ssh public key /Users/you/.ssh/id_rsa.pub
```
Initialize git and make your initial commit
```
% git init
% git add .
% git commit -m "Initial commit"
```
開始創造 Heroku APP
```
% heroku create
Creating app... done, stack is cedar-14
https://cryptic-basin-78675.herokuapp.com/ | https://git.heroku.com/cryptic-basin-78675.git
```
接著輸入自己的 Heroku APP 網址以及 APP 名稱以及 HUBOT_SLACK_TOKEN
```
% heroku config:add HEROKU_URL=https://cryptic-basin-78675.herokuapp.com/ --app cryptic-basin-78675
% heroku config:add HUBOT_SLACK_TOKEN=xoxb-xxxxxxxxxxxxxxxxxxxxxxxxxxxx --app cryptic-basin-78675

Setting config vars and restarting cryptic-basin-78675... done
HUBOT_SLACK_TOKEN: xoxb-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
Deploy the bot
```
git push heroku master
```
佈署完成之後，再回到slack上，可以發現連線成功。<br>
![alt tag](http://i.imgur.com/DrLXF8C.jpg)<br>
如果還有其他的環境變數要設定，可以在以下地方設定。<br>
![alt tag](http://i.imgur.com/UOKEt7a.jpg)<br>

## 其他注意事項
如果要使用 hubot-scripts 裡面的檔案，假設今天要使用 news.coffee，<br>
news.coffee 路徑為 \myhubot\node_modules\hubot-scripts\news.coffee，<br>
請記得在<b> hubot-scripts.json </b> 裡加入 "news.coffee"。<br><br>

假如script裡出現 
```
HTMLParser  = require "cheerio"
```
代表需要額外安裝，執行CMD，然後輸入以下指令
```
npm install cheerio --save
```
並且在<b> package.json </b>的<b> dependencies </b>加入 "cheerio"以及版本<br><br>

如果要使用 [hubot-youtube](https://github.com/hubot-scripts/hubot-youtube)，執行CMD，然後輸入以下指令<br>
```
npm install hubot-youtube --save
```
並在<b> external-scripts.json </b>加入 "hubot-youtube"


## Environment
* Windows 8.1
* npm 3.8.6
* Node 4.4.3
