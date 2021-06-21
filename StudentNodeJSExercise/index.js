const express= require('express');
const customMW = require('./customMiddleware');
const app = express();

//add middleware for put() and post()
app.use(express.urlencoded({extended:false}));

let students = [
    {id:1,name:'MicrosoftBoy',section:'A',gpa:4.0,nationality:'USA'},
    {id:2,name:'AppleBoy',section:'B',gpa:4.0,nationality:'USA'},
    {id:3,name:'HPBoy',section:'C',gpa:4.0,nationality:'USA'},
]

//retrieving all the students
app.get('/',(req,res)=>{
    customMW.useGet();
    return res.status(200).send(students);
})
//retrieving a student by id
app.get('/studentByID/:id',(req,res)=>{
    customMW.useGet();
    let id = parseInt(req.params.id);
    const student = students.find((stud)=>{
        if(stud.id===id){
            return true;
        }
    });
    if(student){
        res.status(200).send(student);
    }
    else{
        return res.status(404).send('Wrong ID! No Student Found!');
    }
})
//retrieving a student by section
app.get('/studentBySection/:section',(req,res)=>{
    customMW.useGet();
    let section = req.params.section;
    const student = students.find((stud)=>{
        if(stud.section===section){
            return true;
        }
    });
    if(student){
        res.status(200).send(student);
    }
    else{
        return res.status(404).send('Wrong Section! No Student Found!');
    }
})
//adding students
app.post('/add_student',(req,res)=>{
    let newStudent = req.body;
    students.push(newStudent);
    res.status(200).redirect('/');
})
//updating a student by name !can't use id coz form-urlencoded input values are all String
app.put('/update_student_id/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    const student = students.find((stud)=>{
        if(stud.id===id){
            return true;
        }
    })
    if(student){
         //update every student property
         for(let i in req.body){
            student[i]=req.body[i];
        }
        //send the updated student
        res.status(200).send(student);
    }
    else{
            res.status(404).send('Wrong ID! No Student Found!');
        }
})
//updating a student by section
app.put('/update_student_section/:section',(req,res)=>{
    let section = parseInt(req.params.section);
    const student = students.find((stud)=>{
        if(stud.section===section){
            return true;
        }
    })
    if(student){
         //update every student property
         for(let i in req.body){
            student[i]=req.body[i];
        }
        //send the updated student
        res.status(200).send(student);
    }
    else{
            res.status(404).send('Wrong Section! No Student Found!');
        }
})
//deleting a student by id
app.delete('/delete_student_id/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    let student = students.find((stud)=>{
        if(stud.id === id){
            return true;
        }
    })
    if(student){
        let index = students.indexOf(student);
        students.splice(index,1);
        res.status(200).send(students);
    }else{
        res.status(404).send('Wrong ID! No Student Found!');
    }
})
//deleting a student by section
app.delete('/delete_student_section/:section',(req,res)=>{
    let section = req.params.section;
    let student = students.find((stud)=>{
        if(stud.section === section){
            return true;
        }
    })
    if(student){
        let index = students.indexOf(student);
        students.splice(index,1);
        res.status(200).send(students);
    }else{
        res.status(404).send('Wrong Section! No Student Found!');
    }
})

app.listen(1000,function(){
    console.log('listening on port 1000');
})