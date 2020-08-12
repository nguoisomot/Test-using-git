const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient
// let query = "admin.news.hoctap." + i + ".id";
// console.log(query);
const url = "mongodb://localhost:27017"

app.use(express.json())

mongoClient.connect(url, (err, db) => {

  if (err) {
    console.log("Error while connecting mongo client")
  } else {
    const myDb = db.db('myDb')
    const collection = myDb.collection('myTable1')

    app.post('/signup', (req, res) => {

      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }

      const query = { email: newUser.email }

      collection.findOne(query, (err, result) => {

        if (result == null) {
          collection.insertOne(newUser, (err, result) => {
            res.status(200).send()
          })
        } else {
          res.status(400).send()
        }

      })

    })
    app.get('/', (req, res) => {
      res.send('hello')
    });

    // change password
    app.post('/changepassword', (req, res) => {
      let email = req.body.email;
      let oldPassword = req.body.oldPassword;
      let newPassword = req.body.newPassword;

      collection.find({ email: email }).toArray(function (err, result) {
        if (err) throw err;
        if (result[0].password === "" + oldPassword) {
          collection.update({ email: email }, { $set: { password: newPassword } });

        }
        // res.send(result[0].password === "" + 123456789);

        // db.close();
      });

    });

    // delete user
    app.post('/deleteuser', (req, res) => {
      let email = req.body.email;
      collection.deleteOne({ email: email }, function (err, result) {
        if (err) throw err;
        // db.close();
      });
    });

    app.get('/changepassword1', (req, res) => {
      collection.find({ name: "thienson1" }).toArray(function (err, result) {
        if (err) throw err;
        if (result[0].password === "" + 123456789) {
          collection.update({ name: "thienson1" }, { $set: { password: "123456" } });

        }
        // res.send(result[0].password === "" + 123456789);

        // db.close();
      });
    })
    app.get('/search', (req, res) => {
      res.send('hello')
    })
    // get all data
    app.get('/getAllStudent', (req, res) => {

      collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        res.send(result[0].admin.student);
        // db.close();
      });
    });
    app.get('/getAllNews', (req, res) => {
      collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        res.send(result[0].admin.news.hoctap);
        // db.close();
      });
    });
    app.post('/login', (req, res) => {
      // const query = {
      //   email: req.body.email,
      //   password: req.body.password
      // }
      let username = req.body.username;
      let password = req.body.password;
      collection.findOne({ "admin.account.username": req.body.username, "admin.account.password": req.body.password }, (err, result) => {
        if (result != null) {
          const objToSend = {
            username: req.body.username,
            password: req.body.password
          }
          res.status(200).send(JSON.stringify(objToSend))
        } else {
          res.status(404).send()
        }
      })
    });
    app.post('/addNews', (req, res) => {

      // const newUser = {
      //   name: req.body.name,
      //   email: req.body.email,
      //   password: req.body.password
      // }
      let id = req.body.id;
      let title = req.body.title;
      let details = req.body.details;
      // let query = "\"admin.account.username\"";
      const query = {
        'admin.account.username': "admin"
      }
      collection.findOne({ "admin.news.hoctap.id": id }, (err, result) => {

        if (result == null) {
          collection.update(query, { $push: { "admin.news.hoctap": { "id": id, "title": title, "details": details } } }, (err, result) => {
            res.status(200).send()
          })
        } else {
          res.status(400).send()
        }

      })

    });
    app.post('/updateNews', (req, res) => {
      let position = req.body.position;
      let i = parseInt(position);

      let id = req.body.id;
      let title = req.body.title;
      let details = req.body.details;
      let queryTitle = "admin.news.hoctap." + i + ".title";
      let queryDetails = "admin.news.hoctap." + i + ".details";
      let query = JSON.parse('{' + '"' + queryTitle + '"' + ':' + '"' + title + '"' + ',' + '"' + queryDetails + '"' + ':' + '"' + details + '"' + '}');
      console.log(query);

      collection.findOne({ "admin.news.hoctap.id": id }, (err, result) => {
        if (result !== null) {
          collection.update({ "admin.account.username": "admin" }, { $set: query }, (err, result) => {
            res.status(200).send()
          })
        } else {
          res.status(400).send()
        }

      })

    });
    app.post('/deleteNews', (req, res) => {
      // let position = req.body.position;
      // let i = parseInt(position);

      let id = req.body.id;
      let title = req.body.title;
      let details = req.body.details;
      let queryId = "admin.news.hoctap";
      // let query = JSON.parse('{' + '"' + queryId + '"' + ':'+'{'+'"'+'id'+'"'+':'+'"'+id+'"' +'}' + '}');
      let query = JSON.parse('{' + '"' + queryId + '"' + ':' + '{' + '"' + 'id' + '"' + ':' + '"' + id + '"' + '}' + '}');

      collection.findOne({ "admin.news.hoctap.id": id }, (err, result) => {
        if (result !== null) {
          collection.update({ "admin.account.username": "admin" }, { $pull: query }, (err, result) => {
            res.status(200).send()
          })
        } else {
          res.status(400).send()
        }
      })

    })
    //========= Student===========
    app.post('/addStudent', (req, res) => {
      let email = req.body.email;
      let password = req.body.password;
      let fullname = req.body.fullname;
      let id = req.body.id;
      let classs = req.body.classs;
      // let query = "\"admin.account.username\"";
      const query = {
        'admin.account.username': "admin"
      }
      collection.findOne({ "admin.student.email": email }, (err, result) => {

        if (result == null) {
          collection.update(query, { $push: { "admin.student": { "email": email, "password": password, "fullname": fullname, "id": id, "classs": classs } } }, (err, result) => {
            res.status(200).send()
          })
        } else {
          res.status(400).send()
        }

      })

    });

    //== Update
    app.post('/updateStudent', (req, res) => {
      let position = req.body.position;
      let i = parseInt(position);
      // email, password, fullname, id, classs;
     
      let email = req.body.email;
      let password = req.body.password;
      let fullname = req.body.fullname;
      let id = req.body.id;
      let classs = req.body.classs;
      let queryPassword = "admin.student." + i + ".password";
      let queryFullname = "admin.student." + i + ".fullname";
      let queryid = "admin.student." + i + ".id";
      let queryclasss = "admin.student." + i + ".classs";
      let queryDetails = "admin.news.hoctap." + i + ".details";
      let query = JSON.parse('{' + '"' + queryPassword + '"' + ':' + '"' + password + '"' + ',' + '"' + queryFullname + '"' + ':' + '"' + fullname + '"' + ',' + '"' + queryid + '"' + ':' + '"' + id + '"' + ',' + '"' + queryclasss + '"' + ':' + '"' + classs + '"' + '}');
      console.log(query);

      collection.findOne({ "admin.student.email": email }, (err, result) => {
        if (result !== null) {
          collection.update({ "admin.account.username": "admin" }, { $set: query }, (err, result) => {
            res.status(200).send()
          })
        } else {
          res.status(400).send()
        }

      })

    });
    // == delete student ==
    app.post('/deleteStudent', (req, res) => {
      // let position = req.body.position;
      // let i = parseInt(position);

      let id = req.body.id;
      let title = req.body.title;
      let details = req.body.details;
      let queryId = "admin.student";
      // let query = JSON.parse('{' + '"' + queryId + '"' + ':'+'{'+'"'+'id'+'"'+':'+'"'+id+'"' +'}' + '}');
      let query = JSON.parse('{' + '"' + queryId + '"' + ':' + '{' + '"' + 'id' + '"' + ':' + '"' + id + '"' + '}' + '}');

      collection.findOne({ "admin.student.id": id }, (err, result) => {
        if (result !== null) {
          collection.update({ "admin.account.username": "admin" }, { $pull: query }, (err, result) => {
            res.status(200).send()
          })
        } else {
          res.status(400).send()
        }
      })

    });

    //==== login Student =====
    app.post('/loginStudent', (req, res) => {
      // const query = {
      //   email: req.body.email,
      //   password: req.body.password
      // }
      let username = req.body.email;
      let password = req.body.password;
      collection.findOne({ "admin.student.email": req.body.email, "admin.student.password": req.body.password }, (err, result) => {
        if (result != null) {
          const objToSend = {
            username: req.body.username,
            password: req.body.password
          }
          res.status(200).send(JSON.stringify(objToSend))
        } else {
          res.status(404).send()
        }
      })
    });

    app.get('/getLoginStudent', (req, res) => {
      collection.find({}).toArray(function (err, result) {
        // if (err) throw err;
        for (i = 0; i < result[0].admin.student.length;i++){
          if (result[0].admin.student[i].email == "thienson1@gmail.com"){
            res.send(result[0].admin.student[i]);
          }       
        }
        
        // db.close();
      });
      // collection.aggregate([{ $project: { "admin.student.email": "thienson2@gmail.com", "admin.student.password": "123456789" } }]).toArray(function (err, result) {
      //   // if (err) throw err;
      //   for (i = 0; i < result.length; i++) {
      //     if (result[i].email == "thienson1@gmail.com") {
      //       res.send(result[0].email);
      //       db.close();
      //     }
      //   }

      // });
    });
    //====getProfile
  }

})


app.listen(3000, () => {
  console.log("Listening on port 3000...")
})