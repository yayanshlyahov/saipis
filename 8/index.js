//Router позволяет определить дочерние подмаршруты 
//со своими обработчиками относительно некоторого главного маршрута.
const express = require('express');
const fs = require('fs');
const path = require('path');
const homeRoutes = require('./routes/home');
// создаем объект приложения
const app = express();

const PORT = 3000;
// для отправки статических файлов html
app.use(express.static(path.join(__dirname)));
//express.urlencoded() - это метод, встроенный в express 
//для распознавания входящего объекта запроса в виде строк или массивов.
app.use(express.urlencoded({extended: true}));

// сопотавляем роутер с конечной точкой "/"-корневой маршрут
app.use('/', homeRoutes);
// начинаем прослушивать подключения на 3000 порту
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});