var jwt = require("jsonwebtoken");
var base64url = require('base64url');
var bodyParser = require("body-parser");
var secret = "sketchji";
// var mysql = require('mysql');

module.exports = function(app,pool) {
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

    app.post('/category',ensureAuthorized,function(request,response) {
        //console.log(request.body.name);
        pool.getConnection(function(errorCon,conn) {
            //console.log('INSERT INTO `category`(`ca_name`) VALUES ("'+request.body.name+'")');
            conn.query('INSERT INTO `category`(`ca_name`) VALUES ("'+request.body.name+'")', function(errorQ) {
                if(errorQ){
                    response.json({
                        data:"error!!!!!!"
                    });
                }
                else{
                    response.json({
                        data:"success"
                    });
                }
                conn.release();
            });
        });
    });

    app.delete('/category/:id',ensureAuthorized,function(request,response) {
        var id = request.params.id;
        pool.getConnection(function(errorCon,conn) {
            //console.log('INSERT INTO `category`(`ca_name`) VALUES ("'+request.body.name+'")');
            conn.query('DELETE FROM `category` WHERE ca_id='+id, function(errorQ) {
                if(errorQ){
                    response.json({
                        data:"error!!!!!!"
                    });
                }
                else{
                    response.json({
                        data:"success"
                    });
                }
                conn.release();
            });
        });
    });

    app.get('/datesetting',ensureAuthorized,function(request,response){
        pool.getConnection(function(errorCon,conn) {
            conn.query('SELECT term_id,DATE_FORMAT(startdate,"%Y-%m-%d") startdate,DATE_FORMAT(enddate,"%Y-%m-%d") enddate FROM `termtime`', function(errorQ,result) {
                if(errorQ){
                    response.json({
                        data:"error!!!!!!"
                    });
                }
                else{
                    response.json(result);
                }
                conn.release();
            });
        });
    });

    app.put('/datesetting/:id',ensureAuthorized,function(request,response) {
        var id = request.params.id;
        //console.log("UPDATE `termtime` SET `startdate`='"+request.body.startdate+"',`enddate`='"+ request.body.enddate+"' WHERE `term_id`="+id);
        pool.getConnection(function(errorCon,conn) {
            conn.query("UPDATE `termtime` SET `startdate`='"+request.body.startdate+"',`enddate`='"+ request.body.enddate+"' WHERE `term_id`="+id, function(errorQ) {
                if(errorQ){
                    console.log(errorQ);
                    response.json({
                        data:"error!!!!!!"
                    });
                }
                else{
                    response.json({
                        data:"success"
                    });
                }
                conn.release();
            });
        });
    });

    app.get('/course/:id', function (req, res) {
      var cid = req.params.id;
      pool.getConnection(function (errorCon , conn) {
        conn.query('SELECT course.cid, course.cnum, course.title, course.detail, course.teacher, course.type, TIME_FORMAT(time.start_time, "%H:%i") AS start_time , TIME_FORMAT(time.end_time, "%H:%i") AS end_time FROM `course` INNER JOIN `time` ON course.cid = time.cid WHERE course.cid = ' + cid, function (errorQ, results) {
          var data = results[0];
          conn.query('SELECT day FROM courseday WHERE cid = ' + cid, function (errorQ, results) {
            data.days = results;
            res.json(data);
          });
        })
      });
    });

    app.post('/course',ensureAuthorized,function(request,response){
        var form = request.body;
        pool.getConnection(function(errorCon,conn) {
            conn.query("INSERT INTO `course`(`cnum`, `title`, `detail`, `teacher`, `type`) VALUES ('" + form.cnum + "','"+ form.title +"','"+form.detail+"','"+form.teacher+"','"+form.type+"')", function(errorQ) {
                if(errorQ){
                    response.json({data:"insert course error!!!!!!"});
                }
                else{
                    conn.query("SELECT `cid` FROM `course` ORDER BY cid DESC LIMIT 1", function(errorQ,result) {
                        if(errorQ){
                            response.json({data:"select error!!!!!!"});
                        }
                        else {
                            conn.query("INSERT INTO `time`(`cid`,`start_time`, `end_time`,`room`) VALUES ('"+result[0].cid+"','"+form.starttime+"','"+form.endtime+"','"+form.room+"')", function(errorQ) {
                                if(errorQ){
                                    response.json({data:"insert time error!!!!!!"});
                                }
                                else {
                                  var queryString = "INSERT INTO `courseday`(`cid`, `day`) VALUES ";
                                  for(var i  = 0 ; i < form.days.length; i++) {
                                    queryString += (i != 0 ? ', ' : '');
                                    queryString += "('" + result[0].cid + "', '" + form.days[i] + "')";
                                  }
                                  conn.query(queryString, function(errorQ) {
                                    if(errorQ){
                                      response.json({data:"insert day error!!!!!!"});
                                    }
                                    else{
                                      response.json({
                                        data:"success"
                                      });
                                      conn.release();
                                    }
                                  });
                                }
                          });
                       }
                   });
                }
            });
          });
      });

    app.get('/getall',ensureAuthorized,function(request,response){
        pool.getConnection(function(errorCon,conn) {
            conn.query('SELECT * FROM `course`', function(errorQ,courseList) {
                if(errorQ){
                    response.json({data:"error!!!!!!"});
                }
                else{
                    conn.query('SELECT * FROM `event`', function(errorQ,eventList) {
                        if(errorQ){
                            response.json({data:"error!!!!!!"});
                        }
                        else{
                            response.json(courseList.concat(eventList));
                        }
                        conn.release();
                    });
                }
            });
        });
    });
    app.delete('/course/:id',ensureAuthorized,function(request,response) {
        var id = request.params.id;
        pool.getConnection(function(errorCon,conn) {
            conn.query('DELETE FROM `course` WHERE `cid`='+id, function(errorQ) {
                if(errorQ){
                    response.json({data:"error!!!!!!"});
                }
                else{
                    conn.query('DELETE FROM `courseday` WHERE `cid`='+id, function(errorQ) {
                        if(errorQ){
                            response.json({data:"error!!!!!!"});
                        }
                        else{
                            conn.query('DELETE FROM `time` WHERE `cid`='+id, function(errorQ) {
                                if(errorQ){
                                    response.json({data:"error!!!!!!"});
                                }
                                else{
                                    response.json({data:"success!!!!"});
                                }
                                conn.release();
                            });
                        }
                    });
                }
            });
        });
    });
    app.delete('/event/:id',ensureAuthorized,function(request,response) {
        var id = request.params.id;
        pool.getConnection(function(errorCon,conn) {
            conn.query('DELETE FROM `event` WHERE `eid`='+id, function(errorQ) {
                if(errorQ){
                    response.json({data:"error!!!!!!"});
                }
                else{
                    conn.query('DELETE FROM `time` WHERE `eid`='+id, function(errorQ) {
                        if(errorQ){
                            response.json({data:"error!!!!!!"});
                        }
                        else{
                            conn.query('DELETE FROM `pic` WHERE `eid`='+id, function(errorQ) {
                                if(errorQ){
                                    response.json({data:"error!!!!!!"});
                                }
                                else{
                                    response.json({data:"success!!!!"});
                                }
                                conn.release();
                            });
                        }
                    });
                }
            });
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
};
