
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
  module.exports = {checkIfLoggedIn , }