"use strict";

const { parse } = require("url");
const { readFile } = require("fs");
const path = require("path");
const handlers = require("./handlers");
const { deletPostFromDB } = require("./queries/getQueryData");

module.exports = (req, res) => {
  const endpoint = parse(req.url).pathname;
  switch (`${req.method} ${endpoint}`) {
    case "GET /signin.html":
      {
        handlers.checkIfLoggedIn(req, res, (err, jwtoken) => {
          if (err) {
            //check if he's logged in
            //this is if he's NOT logged in
            readFile(
              path.join(__dirname, "../public/signin.html"),
              (err, data) => {
                if (err) {
                  console.log(err);
                  throw err;
                }
                res.writeHead(200, {
                  "Content-Type": "text/html",
                  "Content-Length": data.length
                });
                return res.end(data);
              }
            );
          } else {
            readFile(
              path.join(__dirname, "../public/blog.html"),
              (err, data) => {
                res.writeHead(200, {
                  "Content-Type": "text/html",
                  "Content-Length": data.length
                });
                return res.end(data);
              }
            );
          }
        });
      }
      break;
    case "POST /getQueryData":
      handlers.getQueryDataHandler(req, res);
      break;
    case "GET /getAllPosts":
      handlers.getAllPosts(res);
      break;
    case "POST /signUserIn":
      {
        let data = "";

        req.on("data", chunk => {
          data += chunk;
        });

        req.on("end", () => {
          handlers.signInUser(data, res);
        });
      }
      break;

    case "POST /addPost":
      {
        let data = "";

        req.on("data", chunk => {
          data += chunk;
        });

        req.on("end", () => {
          handlers.addPost(JSON.parse(data), req, res);
        });
      }
      break;

    case "POST /signUserUp":
      {
        let data = "";

        req.on("data", chunk => {
          data += chunk;
        });

        req.on("end", () => {
          handlers.signUpUser(JSON.parse(data), res);
        });
      }
      break;
    case "POST /delete_post":
      {
        let data = "";
        req.on("data", chunk => {
          data += chunk;
        });
        req.on("end", () => {
          console.log(data);
          let parsedData = JSON.parse(data);
          handlers.checkIfLoggedIn(req, res, (err, jwt) => {
            let user_id = jwt.user_id;

            deletPostFromDB(
              `DELETE FROM posts WHERE user_id=${user_id} AND posts_id=${parsedData.post_id}`,
              (err, data) => {
                if (err) {
                  res.writeHead(500, "Content-Type:text/html");
                  res.end(
                    "<h1>Sorry, there was a problem getting the query result<h1>"
                  );
                  console.log(err);
                } else {
                  let output = JSON.stringify(data);
                  console.log(output);

                  res.writeHead(200, { "content-type": "application/json" });
                  res.end(output);
                }
              }
            );
          });
        });
      }
      break;
    case "GET /add_post.html": {
      handlers.checkIfLoggedIn(req, res, (err, jwt) => {
        if (err) {
          res.writeHead(302, {
            "Content-Type": "text/html",
            Location: "/signin.html"
          });
          res.end();
          return;
        } else {
          readFile(
            path.join(__dirname, "../public/add_post.html"),
            (err, data) => {
              if (err) {
                console.log(err);
                throw err;
              }
              res.writeHead(200, {
                "Content-Type": "text/html",
                "Content-Length": data.length
              });
              return res.end(data);
            }
          );
        }
      });
    }
    case "GET /blog.html":
      {
        readFile(path.join(__dirname, "../public/blog.html"), (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }
          res.writeHead(200, {
            "Content-Type": "text/html",
            "Content-Length": data.length
          });
          return res.end(data);
        });
      }
      break;
    case "GET /logout.html":
      {
        res.writeHead(302, {
          "Set-Cookie": "jwt=0;  Max-Age=0",
          "Content-Type": "text/html",
          Location: "/"
        });
        res.end();
      }
      break;

    case "POST /getuserinfo": {
      handlers.checkIfLoggedIn(req, res, (err, jwt) => {
        if (err) {
          res.writeHead(200, {
            "Content-Type": "text/json"
          });
          return res.end(JSON.stringify({}));
        }
        res.writeHead(200, {
          "Content-Type": "text/json"
        });
        console.log(jwt);
        return res.end(JSON.stringify(jwt));
      });
    }

    case "GET /signup.html":
      {
        readFile(path.join(__dirname, "../public/signup.html"), (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }
          res.writeHead(200, {
            "Content-Type": "text/html",
            "Content-Length": data.length
          });
          return res.end(data);
        });
      }
      break;
    case "GET /logout.html":
      {
        res.writeHead(302, {
          "Set-Cookie": "jwt=0; Max-Age=0",
          "Content-Type": "text/html",
          Location: "/"
        });
        res.end();
      }
      break;

    case "GET /auth_check":
      handlers.authCheck((req, res));
      break;

    case "GET /":
      readFile(path.join(__dirname, "../public/index.html"), (err, data) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.writeHead(200, {
          "Content-Type": "text/html",
          "Content-Length": data.length
        });
        return res.end(data);
      });
      break;
    default: {
      const fileName = parse(req.url).pathname;
      const fileType = req.url.split(".")[1].split("?")[0];
      readFile(__dirname + "/../public" + fileName, function(error, file) {
        if (error) {
          res.writeHead(500, "Content-Type:text/html");
          res.end("<h1>Sorry, there was a problem loading this page</h1>");
          console.log(error);
        } else {
          res.writeHead(200, {
            "Content-Type": "text/" + fileType
          });
          res.end(file);
        }
      });
    }
  }
};
