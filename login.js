
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
