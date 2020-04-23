const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //////서버 주소 다른거 허용해주는 부분
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");  /// 메소드가 다른거 허용해주는 부분
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();   
});               


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');
const upload = multer({dest: './upload'})

const connection = mysql.createConnection(
  {
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
  }
);

  connection.connect();


app.get('/api/videos', (req, res) => {
    connection.query(
    `SELECT * FROM AI WHERE id = 3`,
    (err, rows, fields) => {
    res.send(rows);
        }
      )
  });

// app.use('/image', express.static('./upload'));
// app.post('/api/customers', upload.single('image'), (req, res) => {

//     let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
//     let image = '/image/' + req.file.filename;
//     let name = req.body.name;
//     let birthday = req.body.birthday;                            데이터추가 
//     let gender = req.body.gender;
//     let job = req.body.job;
//     let params = [image, name, birthday, gender, job];

//     connection.query(sql, params,
//     (err, rows, fields) => {
//     console.log(rows);
//     res.send(rows);
//     }
//   )
// });


// app.delete('/api/customers/:id', (req, res) => {
//   let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
//   let params = [req.params.id];
//   connection.query(sql, params,
//   (err, rows, fields) => {
//   res.send(rows);                              데이터 삭제
//   }
//   )
//   });

app.listen(port, () => console.log(`Listening on port ${port}`));
