const cookieModule = require("cookie");
const { sign, verify } = require("jsonwebtoken");
const SECRET = "poiugyfguhijokpkoihugyfyguhijo";
const { getQueryData, deletPostFromDB } = require("./queries/getQueryData");
const encryption = require("./encryption");

const url = require("url");
const qsModule = require("querystring");

const getQueryDataHandler = (req, response) => {
  // const qs= url.parse(req.url, true).query.qs;
  const qs = req.headers.qs;
  let query = "";
  if (qsModule.parse(qs).qs == "allposts") query = "select * from";

  getQueryData(qs, (err, data) => {
    if (err) {
      response.writeHead(500, "Content-Type:text/html");
      response.end(
        "<h1>Sorry, there was a problem getting the query result<h1>"
      );
      console.log(err);
    } else {
      let output = JSON.stringify(data);
      console.log(output);

      response.writeHead(200, { "content-type": "application/json" });
      response.end(output);
    }
  });

  console.log("query string from headers is : " + qs);
};

const checkIfLoggedIn = (req, res, cb) => {
  // if (!req.headers.cookie) cb(new Error("not logged in"));

  if (typeof req.headers.cookie == "undefined") {
    cb(new Error("not logged in"));
    return;
  }

  console.log("req.headers.cookie is: " + req.headers.cookie);

  const { jwt } = cookieModule.parse(req.headers.cookie);

  // if (!jwt) return goHome();

  if (!jwt) cb(new Error("not logged in"));

  return verify(jwt, SECRET, (err, jwt) => {
    if (err) {
      res.writeHead(302, {
        "Content-Type": "text/html",
        Location: "/logout.html"
      });
      res.end();
    } else {
      cb(null, jwt);
    }
  });
};

const addPost = (body, req, res) => {
  let title = body.title;
  let content = body.content;
  checkIfLoggedIn(req, res, (err, jwt) => {
    console.log("title is: " + body.title + ", content is: " + body.content);

    getQueryData(
      `insert into posts (user_id,title,description)values('${jwt.user_id}','${title}','${content}')`,
      (err, arr) => {
        if (err) {
          console.log(err);
          return;
        }
        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        return res.end();
      }
    );
  });
};

function authCheck(req, res) {
  if (cookieModule.parse(req.headers.cookie).jwt) {
    console.log(cookieModule.parse(req.headers.cookie).jwt);

    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    return res.end("<h1>were authorized</h1>");
  } else {
    res.writeHead(401, {
      "Content-Type": "text/html"
    });
    return res.end("<h1>were NOT authorized</h1>");
  }
}

const signInUser = (body, res) => {
  let userEmail = qsModule.parse(body).userEmail;
  let password = qsModule.parse(body).password;
  let correctPassword = "";

  console.log("parsedbody is " + userEmail);

  getQueryData(
    `select * from users where email like '${userEmail}'`,
    (err, arr) => {
      if (err) {
        console.log(err);
        return;
      }
      if (arr.length != 0) {
        correctPassword = arr[0].password;

        encryption.comparePasswords(
          password,
          correctPassword,
          (err, isCorrect) => {
            if (isCorrect) {
              let userDetails = {};
              userDetails.user_id = arr[0].user_id;
              userDetails.name = arr[0].name;
              userDetails.email = arr[0].email;

              const cookie = sign(userDetails, SECRET);
              res.writeHead(302, {
                Location: "/",
                "Set-Cookie": `jwt=${cookie};`
              });
              return res.end();
            }
          }
        );
      }
    }
  );
};

const signUpUser = (body, res) => {
  let userEmail = body.email;
  let password = body.password;
  let name = body.name;

  let correctPassword = "";
  console.log("body is: " + body);
  encryption.hashPassword(password, (err, hashedPassword) => {
    console.log("parsedbody is " + userEmail);

    getQueryData(
      `insert into users (name,email,password)values('${name}','${userEmail}','${hashedPassword}')`,
      (err, arr) => {
        if (err) {
          console.log(err);
          return;
        }

        res.writeHead(302, {
          Location: "/signin.html"
        });
        return res.end();
      }
    );
  });
};

function getAllPosts(res) {
  getQueryData(
    "select posts.*,users.name,users.email from posts join users on posts.user_id = users.user_id ORDER BY posts.posts_id DESC;",
    (err, data) => {
      if (err) {
        res.writeHead(500, "Content-Type:text/html");
        res.end("<h1>Sorry, there was a problem getting the query result<h1>");
        console.log(err);
      } else {
        let output = JSON.stringify(data);
        console.log(output);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(output);
      }
    }
  );
}

module.exports = {
  getQueryDataHandler,
  addPost,
  checkIfLoggedIn,
  authCheck,
  signInUser,
  signUpUser,
  getAllPosts
};
