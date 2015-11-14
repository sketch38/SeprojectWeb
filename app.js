var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var base64url = require('base64url');
var secret = "sketchji";
var app = express();

app.use(express.static('cpenews'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.post('/login', function(request, response) {
    //User.findOne({email: req.body.email, password: req.body.password}, function(err, user)
    var username = "admin";
    var password = "root";
    //console.log(request.body);
    if(username == request.body.username && password == request.body.password){
    	response.json({
			type: true,
			data: "login ok",
			token: jwt.sign(username,secret)
        });    
    }
    else{
    	response.json({
	        type: false,
	        data: "Incorrect username/password"
        });    
    } 
});

app.get('/me', ensureAuthorized, function(request, response) {
    //User.findOne({token: req.token}, function(err, user) {
    response.json({
    	data:"****"
    });
});

function ensureAuthorized(request, response, next) {
    var clientHeader = request.headers["authorization"];
    if (typeof clientHeader !== 'undefined') {
        var bearer = clientHeader.split(" ");
        var clientToken = bearer[1];
        var userToken = clientToken.split(".");
        var payload = userToken[1];
        var username = base64url.decode(payload);
        if(clientToken == jwt.sign(username,secret)){
        	next();
        }
        else{
        	response.send(403);
        }
        
    } else {
        response.send(403);
    }
}

var pool = mysql.createPool({
    //connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'seproject'
});

function handle_database(request,response){
	var path = request.route.path;
	pool.getConnection(function(error,conn){
		var queryString ={};
		if(path == '/news'){
			queryString = "SELECT * FROM event E,category Ca,time T WHERE E.eid = T.eid AND Ca.ca_id = E.ca_id";
		}
		else if(path == '/news/:eid'){
			var id = request.params.eid;
			queryString = 'SELECT * FROM `event` WHERE `eid`='+id;
		}
        else if(path == '/category'){
            queryString = 'SELECT ca_name FROM `category`';
        }
        else if(path == '/time-table'){
            queryString = 'SELECT * FROM time T,course C,category Ca,courseday Cd WHERE C.cid = T.cid and Ca.ca_id = C.ca_id and Cd.cid = C.cid';
        }
		conn.query(queryString,function(error,results){
			if(error){
				throw error;
			}
			else{
				//console.log(results);
				response.json(results);
			}
		});
		conn.release();
	});

}
app.get('/category',function(request,response){
    handle_database(request,response);
})
app.get('/time-table',function(request,response){
    handle_database(request,response);
})
app.get('/news',function(request,response){
	handle_database(request,response);
})
app.get('/news/:eid',function(request,response){
	handle_database(request,response);
})
app.listen(3000,function(){
	console.log('listening on 3000 \n') 
});

