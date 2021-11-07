var counter = 0;
var nameArr = new Array();
var urlArr=[];
var recArr = [];
var sharpArr = [];
var telArr=[];
var mailArr =[];
var dateArr=[];

function validateInputs() {
    let bool = true;
    if (
            document.getElementById('name').value==="" ||
            document.getElementById('url').value==="" ||
            document.getElementById('tel').value==="" ||
            document.getElementById('email').value===""
        ){
        if(document.getElementById('name').value==="")
            alert("Fill in  \"your name\"");
        if(document.getElementById('url').value==="")
            alert("Enter URL OF your favourite site");
        if(document.getElementById('tel').value==="")
            alert("Enter your PHONE number");
        if(document.getElementById('email').value==="")
            alert("Enter your EMAIL address")
        bool=false;
    }
    return bool;
}

function validate () {
    let bool = validateInputs();
    if(bool) {
        nameArr[counter]=document.getElementById('name').value;
        urlArr[counter]=document.getElementById('url').value;
        if (document.querySelector('input[id="rec"]:checked')){
            recArr[counter] = "Yes";
        } else recArr[counter]="No";
        sharpArr[counter]=document.querySelector('input[name="sharp"]:checked').value;
        telArr[counter]=document.getElementById('tel').value;
        mailArr[counter]=document.getElementById('email').value;
        dateArr[counter]=document.getElementById('date').value;
        counter++;
        ShowAll();
    }
}

function swap(){
    let table = document.getElementById('tableNames');
    table.style.direction = 'rtl';
    let button = document.getElementById('swap');
    button.disabled = true;
}

function ShowAll () {
    var newWindow = window.open('', "Results", "menubar=no,scrollbars=yes,width=1300px,height=500px");
    newWindow.document.write('<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <title>Forms</title>\n' +
        '    <link href="assets/css/style.css" rel="stylesheet">\n' +
        '    <script type="text/javascript" src="assets/js/script.js"></script>\n' +
        '</head>\n' +
        '<body>\n' +
        '<div class="wrapper">' +
        '<header class="header">' +
        '<h1 class="h1">' +
        'Results' +
        '</h1>' +
        '</header>' +
        '<article class = "main" align="center">' +
        '<p>' + tabl() +'</p>'+
        '\n' +
        '</article>' +
        '<nav class="nav">\n' +
        '\n' +
        '        <button name="send" type="button"  onclick="window.close()">Main</button>\n' +
        '        <br><br>\n' +
        '        <button id=swap onclick=swap()> Swap </button>' +
        '        <button name="send" type="button" disabled>Results</button>' +
        '</nav>\n' +
        '    <aside class="aside"></aside>\n' +
        '    <footer class="footer">\n' +
        '        <p class="p1"></p>\n' +
        '    </footer>\n' +
        '</div>\n' +
        '</body>\n' +
        '</html>')
}

function tabl() {
    var html =
        "<table border='4px' id='tableNames'>" +
        "<tr>" +
        "<th>Name</th>" +
        "<th>URL</th>" +
        "<th>Reccomendations</th>" +
        "<th>Convinience</th>" +
        "<th >Telephone</th>" +
        "<th >Email</th>" +
        "<th >Date</th>" +
        "</tr>";
    for(var i=0; i<nameArr.length;i++) {
        html=html+"<tr>" +
            "<td>"+ nameArr[i]+"</td>" +
            "<td>"+ urlArr[i]+"</td>" +
            "<td>"+ recArr[i]+"</td>" +
            "<td>"+ sharpArr[i]+"</td>" +
            "<td>"+ telArr[i]+"</td>" +
            "<td>"+ mailArr[i]+"</td>" +
            "<td>"+ dateArr[i]+"</td>" +
            "</tr>";
    }
    html+="</table>";
    html+= "<optgroup align='center' label='users'>";
    for(i=0; i<nameArr.length;i++) {
        html=html+
            "<option>" + nameArr[i] + "</option>";
    }
    html+= "</optgroup>";
    return html;
}

function clearArr() {
    window.close();
    nameArr.clearData();
    ShowAll();
}