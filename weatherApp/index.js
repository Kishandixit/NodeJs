const http = require('http');
const fs = require('fs');
var requests = require('requests');

const homeFile = fs.readFileSync("home.html",'utf-8');

const  replaceVal=(tempVal,orgVal)=>{
    let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);

    return temperature;
}

const server = http.createServer((req,res)=>{
    if(req.url == '/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Etawah&appid=9a6f4b869fc0cae8b35a13390ac159cf')
        .on('data',  (chunk)=> {
            const objData = JSON.parse(chunk);
            const arrData = [objData];
        //   console.log(arrData[0].main.temp);
        const realTimeData = arrData.map((val)=>{replaceVal(homeFile,val)}); //.join("")
        // res.write(realTimeData);
        // console.log(realTimeData);
        console.log(val.main);
        })
        .on('end',  (err)=> {
          if (err) return console.log('connection closed due to errors', err);
          res.end();
        });
    }
})

server.listen(3030,"127.0.0.1")