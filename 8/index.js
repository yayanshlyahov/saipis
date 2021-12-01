//Router позволяет определить дочерние подмаршруты 
//со своими обработчиками относительно некоторого главного маршрута.
const express = require('express');
const fs = require('fs');
const path = require('path');
const homeRoutes = require('./routes/home');
const app = express();

const PORT = 3000;
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});