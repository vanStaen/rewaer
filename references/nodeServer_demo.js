// NODE exemple
// Should be set as index.js at the root of the server

const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //    if (req.url === '/') {
  //        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
  //            if (err) throw err;
  //            res.writeHead(200, { 'Content-Type': 'text/html' });
  //            res.end(content);
  //        })
  //    }
  //    if (req.url === '/about') {
  //        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
  //            if (err) throw err;
  //            res.writeHead(200, { 'Content-Type': 'text/html' });
  //            res.end(content);
  //        })
  //    }

  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  console.log(filePath);

  // Extension of the file
  let extName = path.extname(filePath);

  // Inital Cintent type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jog":
      contentType = "image/jpg";
      break;
  }

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not Fond 404
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Sucess
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });

  // Rest Api
  if (req.url === "/api/pics") {
    const usersJson = [
      { id: 0, pic: "theresa1.jpg" },
      { id: 1, pic: "theresa2.jpg" },
      { id: 2, pic: "theresa3.jpg" },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usersJson));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Serveur running on Port ${PORT}`));
