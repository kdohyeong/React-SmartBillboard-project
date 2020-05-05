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
    // `SELECT * FROM AI WHERE id = 4`,
    'SELECT * FROM CANVAS',
    (err, rows, fields) => {
    res.send(rows);
        }
      )
  });


app.get('/api/menuDatas', (req, res) => {
  connection.query(
  `SELECT * FROM AI`,
  (err, rows, fields) => {
  res.send(rows);
      }
    )
});

// app.use('/api/canvasDatas', express.static('./upload'));
app.post('/api/canvasDatas', (req, res) => {
    console.log(req.body);
    let sql = 'INSERT INTO CANVAS VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let background = req.body.canvasDatas.background;
    let src = req.body.canvasDatas.objects[0].src;                          
    let width = req.body.canvasDatas.objects[0].width;
    let height = req.body.canvasDatas.objects[0].height;
    let scaleX = req.body.canvasDatas.objects[0].scaleX;
    let scaleY = req.body.canvasDatas.objects[0].scaleY;
    let top = req.body.canvasDatas.objects[0].top;
    let left = req.body.canvasDatas.objects[0].left;
    let angle = req.body.canvasDatas.objects[0].angle;
    let zTYPE = req.body.canvasDatas.objects[0].type;

    let params = [background, src, width, height, scaleX, scaleY, top, left, angle, zTYPE];

    connection.query(sql, params,
    (err, rows, fields) => {
    console.log(rows);
    res.send(rows);
    }
  )
});


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
