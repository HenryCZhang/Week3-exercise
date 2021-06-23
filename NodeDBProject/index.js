const express = require('express');
const mysql = require('mysql');
const app = express();

//Middleware
app.use(express.urlencoded({extended:false}));

//Create a connection to the DB
let conn = mysql.createConnection({
    host:'127.0.0.1',
    //host:'localhost',
    user:'Henry',
    password:'13758981888Zc@',
    database:'microhard'
})

//Test our DB connection
conn.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('DB is connected');
    }
})

app.get('/',(req,res)=>{
    let sql = 'SELECT * FROM students';
    conn.query(sql,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})
//Get by last_name
app.get('/GetByLast_name/:last_name',(req,res)=>{
    let sql = `SELECT * FROM students WHERE last_name = '${req.params.last_name}'`;//Why don't need to wrap in ''? What's the value type passed in?
    conn.query(sql,(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})
//Get by ID
app.get('/GetByID/:id',(req,res)=>{
    let sql = `SELECT * FROM students WHERE id = ${req.params.id}`;//it still works without parseInt()?!!!
    conn.query(sql,(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})
//Group by department_id
app.get('/GroupByDepartment_id/:department_id',(req,res)=>{
    // let sql = `SELECT students.*, departments.title FROM students JOIN ON departments WHERE students.department_id = departments.id = ${req.params.department_id}`;
    let sql = `SELECT * FROM students WHERE students.department_id = ${req.params.department_id}`;

    conn.query(sql,(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

app.post('/',(req,res)=>{
    let sql = `INSERT INTO students(id,first_name,last_name,age,department_id) VALUES(${req.body.id},'${req.body.first_name}','${req.body.last_name}',${req.body.age},${req.body.department_id})`;
    
    conn.query(sql,(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.redirect('/');
        }
    })
})

//Update age on a particular student
app.put('/FindByID/:id/UpdateAge/:age',(req,res)=>{
    let sql = ` UPDATE students SET age = ${req.params.age} WHERE students.id = ${req.params.id}`;
    conn.query(sql,(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.redirect('/');
        }
    })
})
//Delete student by id
app.delete('/DeleteByID/:id',(req,res)=>{
    let sql = `DELETE FROM students WHERE id = ${req.params.id}`;
    conn.query(sql,(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.redirect('/');
        }
    })
})

app.listen(3000,()=>{
    console.log('server running on port 3000');
})
