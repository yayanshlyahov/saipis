//req-request-запрос на сервер
//res-response-ответ от сервера
const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
//render-отображает файл

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', async (req, res) => {
    const {massiv,massivcheck} = req.body;
    
if(massivcheck==='true'){
    
    fs.writeFile(path.join(__dirname, '..',  'hello.txt'),
   `${massiv}`,
    err => {
        if (err) {
            throw new Error(`Something going wrong => (${err})`);
        }
    });
}
if(massivcheck==='false'){
 
    fs.writeFile(path.join(__dirname, '..',  'onetezt.txt'),
   `${massiv}`,
    err => {
        if (err) {
            throw new Error(`Something going wrong => (${err})`);
        }
    });
}
 
 //redirect- метод для переадресации
 //"/"-куда будет перенапрвлен пользователь
 // первым параметром задается status , который звдвет статусный код переадресации
res.redirect('/');
});
router.post('/readone', async (req, res) => {
    const  eArr = [];
    fs.readFile(path.join(__dirname, '..', 'hello.txt'), 
    'utf-8',
    (err, data) => {
    if (err) {
        throw new Error(`Something going wrong => (${err})`);
    }
    let i =0;
    let arr = [];
    data.split(',').forEach(item =>{
        arr.push(`<td style="border:1px solid black;">${item}</td>`);
        i++;
        if(i%10===0){
            eArr.push(`<tr>${arr.join("")}</tr>`);
            arr = [];
        }
    });
    res.send(`<table>${eArr.join("")}</table>`);
   
    
    });
});
router.post('/readtwo', async (req, res) => {
    const cArr = [];
    fs.readFile(path.join(__dirname,'..', 'onetezt.txt'), 
    'utf-8',
    (err, data) => {
    if (err) {
        throw new Error(`Something going wrong => (${err})`);
    }
    let i =0;
    let arr = [];
    data.split(',').forEach(item =>{
        arr.push(`<td style="border:1px solid black;">${item}</td>`);
        i++;
        if(i%10===0){
            cArr.push(`<tr>${arr.join("")}</tr>`);
            arr = [];
        }
    });
    res.send(`<table>${cArr.join("")}</table>`);
    });
});
module.exports = router;