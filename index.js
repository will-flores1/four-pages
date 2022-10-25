const http = require("http");
const url = require("url");
const fs = require("fs");

const PORT = 3000;
let page404 = fs.readFileSync("./404.html", (err, data) => {
	if (err) throw err;
	console.log("data: " + data);
	res.end(data);
});
console.log("page404: " + page404);

http
	.createServer((req, res) => {
		res.statusCode = 200;
		let path = url.parse(req.url, true);
		console.log("URL: " + path.pathname);
		const file =
			path.pathname === "/" ? "./index.html" : `.${path.pathname}.html`;
		console.log("file: " + file);

		fs.readFile(file, (err, data) => {
			if (err) {
				res.writeHead(404, { "Content-Type": "text/html" });
				// res.write(page404);
				res.end(page404);
			}
			res.writeHead(200, { "Content-type": "text/html" });
			// console.log(file + " " + data);
			// res.write(data);
			return res.end(data);
		});
	})
	.listen(PORT);
