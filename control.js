var express = require('express');
var app = express();
var exec = require('child_process').exec;

app.get('/list',function(req,res){
	exec('forever list', function(error, stdout, stderr) {
	  // command output is in stdout
		res.send(stdout);
	});
});

app.get('/restart/:fid',function(req,res){
	var fid = req.params.fid;
        exec('forever restart ' + fid , function(error, stdout, stderr) {
          // command output is in stdout
                res.send(stdout);
        });
});


app.listen(8000);
