const express= require('express');
const app=express();
const calc=require('./arithmeticFunctions');

app.use(express.urlencoded({extended:false}));

// app.post('/operation/:operation/val_1/:val_1/val_2/:val_2',(req,res)=>{
app.post('/',(req,res)=>{
let operation = req.body.operation;
let val_1 =parseInt(req.body.val_1);
let val_2 =parseInt(req.body.val_2);

if(operation==='Addition'){
    console.log(`Result: ${calc.add(val_1,val_2)}`);
    res.send(`Value 1: ${val_1} \n Value 2: ${val_2} \n Result: ${calc.add(val_1,val_2)}`);
}else if(operation==='Subtraction'){
    res.send(`Value 1: ${val_1} \n Value 2: ${val_2} \n Result: ${calc.sub(val_1,val_2)}`);
}else if(operation==='Multiply'){
    res.send(`Value 1: ${val_1} \n Value 2: ${val_2} \n Result: ${calc.multiply(val_1,val_2)}`);
}else{
    res.send(`Value 1: ${val_1} \n Value 2: ${val_2} \n Result: ${calc.divide(val_1,val_2)}`);
}
})

app.listen(4000,()=>{
    console.log('listening on port 4000');
})