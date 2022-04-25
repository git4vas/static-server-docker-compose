dotenv = require('dotenv').config({debug: true});
//dotenv = require('dotenv').config({override: false});
//cf. lines 59 & 74 https://github.com/motdotla/dotenv/blob/master/lib/main.js 

const
	http = require('http'),
	fs = require('fs'),
	path = require('path'),
    PORT = process.env.PORT || 8080

arrContentType = {
		'.html': 'text/html',
		'.css':	'text/css',
		'.js': 'text/javascript',
		'.txt': 'text/plain',
		'.json': 'application/json',
		'.png':	'image/png', 
		'.jpg':	'image/jpg'
	};

http.createServer(function(request, response){
    console.log('requesting...');

    var requestUrl = (request.url != '/' ? request.url : '/index.html')
    var filePath = (process.env.PUBLIC || './public') + requestUrl;


//    if (filePath == './public/') filePath = './public/index.html';
//  var filePath = './public' + (request.url != '/') ? request.url : '/index.html'

    const
		extname = path.extname(filePath),
		contentType = arrContentType[extname] || arrContentType['.txt'];
    fs.readFile(filePath, function(error, content){
        if(error){
            if(error.code == 'ENOENT') {
                response.writeHead(404);
                response.end('file not found');
            }
            else {
                response.writeHead(500);
                response.end('Error, error-code: '+error.code);
            }
			console.log(`Request: "${filePath}" > Error ${error.code}`);
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
			console.log(`Request: "${filePath}" > Response ok`);
        }
    });

})
.listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);


// put in a container (Dockerfile) cf. shark tutorial
// docker-compose.yml + (.env) + mount logfile || stdout