var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var base64url = require('base64url');
var secret = "sketchji";
var app = express();
app.use(express.static('cpenews'));

var pool = mysql.createPool({
    //connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'seproject'
});
// login.js extended
require('./login.js')(app,pool);



app.get('/category',function(request,response){
    pool.getConnection(function(errorCon,conn) {
      conn.query('SELECT * FROM `category`', function(errorQ, results) {
        response.json(results);
        conn.release();
      });
    });
});

app.get('/time-table',function(request,response){
  var today = new Date();
  var currentDate = today.getTime();
  var formDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
  //var currentTime = today.getHours() + ':' + today.getMinutes();
  var currentTime = '08:00'; // this is mockup
  pool.getConnection(function(errorCon,conn) {
    conn.query("SELECT * FROM termtime", function(errorQ, termList) {
      conn.query("SELECT E.eid,E.title,Ca.ca_name,Ca.color,TIME_FORMAT(T.start_time, '%H:%i') start_time,TIME_FORMAT(T.end_time, '%H:%i') end_time,T.room,DATE_FORMAT(T.start_date,'%d-%m-%Y') start_date,DATE_FORMAT(T.end_date,'%d-%m-%Y') end_date FROM time T,event E,category Ca WHERE E.eid = T.eid and Ca.ca_id = E.ca_id and T.start_date ='"+ formDate +"' and T.end_time > '" + currentTime + "'" , function(errorQ2, eventList) {
        for(term of termList) {
          term.startdate = new Date(term.startdate).getTime();
          term.enddate = new Date(term.enddate).getTime();
        }
        if((currentDate>=termList[2].startdate && currentDate<=termList[2].enddate)||(currentDate>=termList[1].startdate && currentDate<=termList[1].enddate)||(currentDate>=termList[0].startdate && currentDate<=termList[0].enddate)){
          var day = ['sun','mon','tue','wed','thu','fri','sat'];
          conn.query("SELECT C.cid,C.cnum,C.title,C.teacher,C.type,Ca.ca_name,Ca.color, TIME_FORMAT(T.start_time, '%H:%i') start_time,TIME_FORMAT(T.end_time, '%H:%i') end_time,T.room,Cd.day,T.start_date,T.end_date FROM time T,course C,category Ca,courseday Cd WHERE C.cid = T.cid and Ca.ca_id = C.ca_id and Cd.cid = C.cid AND Cd.day = '" + day[new Date().getDay()] +"' and T.end_time > '" + currentTime + "'" , function(errorQ, courseList) {
            response.json(eventList.concat(courseList));
            conn.release();
          });
        }
        else{
          response.json(eventList);
          conn.release();
        }
      });
    });
  });
});

app.get('/news',function(request,response){
	pool.getConnection(function(errorCon,conn) {
    conn.query("SELECT E.eid,E.title,E.detail,T.time_post,Ca.ca_name FROM event E,category Ca,time T WHERE E.eid = T.eid AND Ca.ca_id = E.ca_id ORDER BY T.time_post DESC", function(errorQ, results) {
      response.json(results);
      conn.release();
    });
  });
});

app.get('/news/:eid',function(request,response){
	var id = request.params.eid;
  pool.getConnection(function(errorCon,conn) {
    conn.query("SELECT E.eid,E.title,E.detail,T.time_post,Ca.ca_name,T.room,TIME_FORMAT(T.start_time, '%H:%i') start_time,TIME_FORMAT(T.end_time, '%H:%i') end_time,DATE_FORMAT(T.start_date,'%Y-%m-%d') start_date,DATE_FORMAT(T.end_date,'%Y-%m-%d') end_date FROM event E,category Ca,time T WHERE E.eid = T.eid AND Ca.ca_id = E.ca_id AND E.eid ="+id, function(errorQ, results) {
      if(errorQ){
        console.log(errorQ);
      }
      response.json(results);
      conn.release();
    });
  });
});


app.get('/home',function(request,response){
  pool.getConnection(function(errorCon,conn) {
    conn.query("SELECT * FROM `slide`", function(errorQ, results) {
      response.json(results);
      if(errorQ){
        response.json(errorQ);
      }
      conn.release();
    });
  });
});

app.listen(3000,function(){
	console.log('listening on 3000 \n')
});
