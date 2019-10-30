'use strict';

const { parse } = require('url');
const { readFile } = require('fs');
const path = require('path')
const qs = require('querystring');
const cookieModule = require('cookie');
const { sign, verify } = require('jsonwebtoken');
const SECRET = 'poiugyfguhijokpkoihugyfyguhijo';
const handlers = require("./handlers");
const getQueryData = require('./queries/getQueryData');
const notFoundPage = '<p style="font-size: 10vh; text-align: center;">404!</p>';
const encryption = require('./encryption');


module.exports = (req, res) => {
  const endpoint = parse(req.url).pathname;

  const goHome = () => {
    res.writeHead(
      302,
      {
        'Content-Type': 'text/html',
        'Location': '/'
      }
    );
    res.end();
  }
  console.log(`${req.method} ${endpoint}`);

  switch (`${req.method} ${endpoint}`) {


    case 'GET /signin.html': {
      checkIfLoggedIn(req, res, (err, jwtoken) => {
        if (err) {//check if he's logged in
          //this is if he's NOT logged in
          readFile(
            path.join(__dirname, '../public/signin.html'),
            (err, data) => {
              if (err) {
                console.log(err);
                throw err;
              }
              res.writeHead(
                200,
                {
                  'Content-Type': 'text/html',
                  'Content-Length': data.length
                }
              );
              return res.end(data);
            }
          );
        } else {


          readFile(
            path.join(__dirname, '../public/blog.html'),
            (err, data) => {
              res.writeHead(
                200,
                {
                  'Content-Type': 'text/html',
                  'Content-Length': data.length
                }
              );
              return res.end(data);
            }
          );



        }




      });
    }
      break;

    case 'POST /signUserIn': {

      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {


        signInUser(data, res);


      });

    }
      break;

    case 'POST /getQueryData': {

      handlers.getQueryDataHandler(req, res);



    }
      break;
    case 'GET /getAllPosts': {
      getQueryData('select * from posts', (err, data) => {
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
      });
    }
      break;

    case 'GET /blog.html': {



      readFile(
        path.join(__dirname, '../public/blog.html'),
        (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }
          res.writeHead(
            200,
            {
              'Content-Type': 'text/html',
              'Content-Length': data.length
            }
          );
          return res.end(data);
        }
      );





    }
      break;

    case 'GET /signup.html': {


      readFile(
        path.join(__dirname, '../public/signup.html'),
        (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }
          res.writeHead(
            200,
            {
              'Content-Type': 'text/html',
              'Content-Length': data.length
            }
          );
          return res.end(data);
        }
      );





    }
      break;
    case 'GET /logout.html': {

      res.writeHead(
        302,
        {
          'Set-Cookie': 'jwt=0; HttpOnly; Max-Age=0',
          'Content-Type': 'text/html',
          'Location': '/'
        }
      );
      res.end();

    }
      break;

    case 'POST /getuserinfo': {
      checkIfLoggedIn(req, res, (err, jwt) => {



        res.writeHead(
          200,
          {
            'Content-Type': 'text/json'
          }
        );
        console.log(jwt);
        return res.end(JSON.stringify(jwt));


      });

    }
    case 'GET /auth_check': {
      if (cookieModule.parse(req.headers.cookie).jwt) {
        console.log(cookieModule.parse(req.headers.cookie).jwt);

        res.writeHead(
          200,
          {
            'Content-Type': 'text/html'
          }
        );
        return res.end('<h1>were authorized</h1>');


      } else {
        res.writeHead(
          401,
          {
            'Content-Type': 'text/html'
          }
        );
        return res.end('<h1>were NOT authorized</h1>');



      }


    }
      break;
    case 'GET /':
      readFile(
        path.join(__dirname, '../public/index.html'),
        (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }
          res.writeHead(
            200,
            {
              'Content-Type': 'text/html',
              'Content-Length': data.length
            }
          );
          return res.end(data);
        }
      );
      break;
    default:


      {
        const fileName = req.url;
        const fileType = req.url.split(".")[1];
        readFile(__dirname + "/../public" + fileName, function (error, file) {
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





    //   res.writeHead(
    //     404,
    //     {
    //       'Content-Type': 'text/html',
    //       'Content-Length': notFoundPage.length
    //     }
    //   );
    //   return res.end(notFoundPage);
  }
}


const checkIfLoggedIn = (req, res, cb) => {

  // if (!req.headers.cookie) cb(new Error("not logged in"));

  if (typeof req.headers.cookie == 'undefined') { cb(new Error("not logged in")); return; }

  console.log('req.headers.cookie is: ' + req.headers.cookie);

  const { jwt } = cookieModule.parse(req.headers.cookie);

  // if (!jwt) return goHome();

  if (!jwt) cb(new Error("not logged in"));

  return verify(jwt, SECRET, (err, jwt) => {
    if (err) {
      res.writeHead(
        302,
        {
          'Content-Type': 'text/html',
          'Location': '/logout.html'
        }
      );
      res.end();
    } else {

      cb(null, jwt);

    }

  });
};






const signInUser = (body, res) => {
  let userEmail = qs.parse(body).userEmail;
  let password = qs.parse(body).password;
  let correctPassword = "";



  console.log('parsedbody is ' + userEmail);

  getQueryData(`select * from users where email like '${userEmail}'`, (err, arr) => {
    if (err) { console.log(err); return; }
    if (arr.length != 0) {
      correctPassword = arr[0].password;

      encryption.comparePasswords(password, correctPassword, (err, isCorrect) => {
        if (isCorrect) {

          let userDetails = {};
          userDetails.user_id = arr[0].user_id;
          userDetails.name = arr[0].name;
          userDetails.email = arr[0].email;

          const cookie = sign(userDetails, SECRET);
          res.writeHead(
            302,
            {
              'Location': '/',
              'Set-Cookie': `jwt=${cookie}; HttpOnly`
            }
          );
          return res.end();

        }

      });

    }
  });
}