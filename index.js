const
	http = require('http'),
	fs = require('fs'),
	path = require('path'),
	
// take from env (process.env.XXXXX) from stdin at launch
	port = 8125,
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
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './') filePath = './index.html';

    const
		extname = path.extname(filePath),
    // if undefined (=False) go behind pipe || set .txt
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
.listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);


// put in a container (Dockerfile) cf. shark tutorial
// docker-compose.yml + (.env) + mount logfile || stdout