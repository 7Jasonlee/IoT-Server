const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const mqtt = require('mqtt');
const options={host: '127.0.0.1', port: 1883};
const url = '127.0.0.1:1883';
const client = mqtt.connect(options);

app.use(cors());

app.listen(port, function(){
    console.log(`listening on port ${port}`);
});


//setInterval(()=>{
//        client.publish('test','Hello mqtt');
//    }, 2000
//)
client.on('connect', function(connack) {
    console.log('Connected');    
});

client.on("error", (error) => { 
    console.log("Can't connect" + error);
    //process.exit(1);
});

client.subscribe('/testTopic');

client.on('message', function(topic, message) {
    console.log(message.toString());   
    
    if (message=='1234567890') {
        console.log('Correct Number');
    } else {
        console.log('Woops');
    }
});


//Get 요청에 의한 응답
//경로에 따른 html 페이지로 응답 가능
//Get = 주소창, Post = 주소창 X
app.get('/pet', function(req,res){
   res.send('펫용품 쇼핑몰입니다.');
});

app.get('/beauty', function(req,res){
    res.send('안녕하세요. 뷰티 상품 쇼핑몰입니다.');
});

app.get('/sound/:name', function(req,res){
    const { name } = req.params;
    if (name == "cat") {
        res.json({'sound':'야옹'});
    } else if (name == "dog") {
        res.json({'sound':'멍멍'});
    } else {
        res.json({'sound':'알수없음'});
    }
 });

app.get('/user/:id', function(req,res){
    //const p = req.params;
    //console.log(p.id);
    //res.json({'userid':p.id});

    const q = req.query;
    console.log(q.q);
    console.log(q.name);
    res.json({'query':q.q, 'name':q.name});
});

 
// '/'홈페이지 의미
app.get('/', function(req,resp){
    //resp.sendFile(__dirname + '/index.html');
    resp.sendFile(__dirname + '/write.html');
});