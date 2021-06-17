const express= require('express');
const app = express();

//add middleWare for post() and put()
app.use(express.urlencoded({extended:false}));

let students=[
    {id:1,name:'A',age:1},
    {id:2,name:'B',age:2},
    {id:3,name:'C',age:3}
]

app.get('/students/:id', (req, res)=>{
    let id = parseInt(req.params.id);
    const student = students.find((element)=>{
    if (element.id === id) 
    return true});
    if (student) {return res.status(200).send(student);}
    return res.status(404).send('Wrong ID, No Student Found ');
});

app.post('/students/add_student',(req,res)=>{
    let newStudent = req.body;
    students.push(newStudent);
    res.redirect('/');
})


app.patch('/students/update_student/:id', (req, res)=>{
    const student = students.find((element)=>{
    if (element.id === parseInt(req.params.id)) 
    {return true;}
    });
    if (student) {
    for (let i in req.body){
    student[i] = req.body[i];
    }
    return res.status(200).send(student);
    }
    return res.status(404).send('Wrong ID, No Student Found');
});

// app.post('/students/add_student', (req, res)=>{
//     const student = {
//          id: req.body.id,
//          name: req.body.name,
//          age: req.body.age
//     };
//     students.push(student);
//     res.status(200).send(student);
// });


var server = app.listen(8000,()=>{
    console.log('server is listening on port 8000')
})