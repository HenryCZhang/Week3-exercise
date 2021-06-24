const express = require('express');
const app = express();
const config = require('./config');
const Employee = require('./Models/Employee');

//Middleware for put() and patch()
app.use(express.urlencoded({extended:false}));

//Test our DB connection
//Use a Promise
config.authenticate().then(function(){
    console.log('Database connected');
}).catch(function(err){
    console.log(err);
});

//Retrieve all employees
app.get('/',(req,res)=>{
    Employee.findAll().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    });
})
//Add a new employee
app.post('/',(req,res)=>{
    let data = {
        id: req.body.id,
        name: req.body.name,
        gender: req.body.gender,
        salary: req.body.salary,
        department_id: req.body.department_id
    }
    Employee.create(data).then(()=>{
        res.redirect('/');
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

app.get('/findByID/:id',(req,res)=>{
    let id = req.params.id;
    //Find the student by id
    Employee.findByPk(id).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

//http://localhost:3000/filter?last_name=A&department_id=1
//Retireve a single employee by gender and  department_id
app.get('/filter',(req,res)=>{
    let data = {
        where:{
            gender: req.query.gender,
            department_id: req.query.department_id
        },
        attributes:['name','gender','department_id']//only display these columns
    }

    Employee.findAll(data).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

app.listen(4000,()=>{
    console.log('server running on port 3000');
})