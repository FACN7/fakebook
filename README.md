# FACN7 Fakebook



## A group project for Founders and Coders Nazareth, week 7

Link to [Heroku](http://fakebookdb.herokuapp.com)

### `how to install`

You can clone the repo by typing the command

```console
> git clone https://github.com/FACN7/fakebook
> cd fakebook
> npm i
> google-chrome index.html
```

### `how to test`

Install tape and tap-spec

```console
> npm i tape -D
> npm i tap-spec -D
```

Run the test command

```console
> npm test
```

## user journey

As a member of fakebook blog...

- You can see your posts and all posts that had been written by other users

- you can add,edit and delete a post

## our process:

- [x] Set up project architecture
- [x] Set up a server
- [x] Set up a database(2 tables => users & posts) in heruko
- [x] Set up a local testing database
- [x] Host the site on Heroku incl database
- [x] Display the list of posts from database to the browser
- [x] registering new user store it on database
- [x] login users
- [x] Add a post on client side and store it on database
- [x] Edit a post on client side and update it on database
- [x] Delete a post on client side and remove it from database
- [x] CSS

Stretch goals:

- [ ] Autocomplete
- [ ] Several reservations per book
- [ ] Codecov and Travis

## new stuff we've learned

- POST and GET requests to the server on a project with a database
- Made it working with XMLHttpRequest method
- Hosting a DB on Heroku
- Protected out inputs against script injections
