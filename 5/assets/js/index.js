function DataBase(name) {
    this.dbName = name;
    this.ucDbName = this.dbName = this.dbName[0].toUpperCase() + this.dbName.substring(1);
    this.db = openDatabase(this.dbName, '1.0', this.ucDbName, 100 * 1024 * 1024);
}

DataBase.prototype.create = function(name) {
    var strFields = '';
    var fields = {
        name: 'TEXT', bill: 'TEXT',
        email: 'TEXT', phone: 'TEXT',
    }

    for (const key in fields) {
        strFields += ", " + key + ' ' + fields[key];
    }

    this.db.transaction(function (tx) {
        tx.executeSql('create table if not exists ' + name + '(id integer primary key autoincrement' + strFields + ')');
    });
};

DataBase.prototype.add = function(name) {
    var q = new Array();
    var vars = new Array();
    var vals = new Array();
    var values = {
        name: document.getElementById('add-name').value,
        bill: document.getElementById('add-bill').value,
        email: document.getElementById('add-mail').value,
        phone: document.getElementById('add-phone-number').value
    }

    for (var i = 0; i < Object.keys(values).length; i++) {
        q.push('?');
    }

    for (const key in values) {
        vars.push(key);
    }

    for (const key in values) {
        vals.push(values[key]);
    }

    this.db.transaction(function (tx) {
        tx.executeSql('insert into ' + name + '(' + vars.join(", ") + ') values(' + q.join(", ") + ')', vals);
    });
};

DataBase.prototype.load = function(name) {
    console.log('werwer');
    var sql = `select * from ${name}`;
    document.querySelector('.table').innerHTML = '';
    this.db.transaction(function(tx) {
        tx.executeSql(sql, [], function(tx, result) {
            var n = result.rows.length;
            for(var i = 0; i < n; i++) {
                var work = result.rows.item(i);
                var tbl_block = document.querySelector('.table');
                var cell_name = document.createElement('div');
                var cell_del_btn = document.createElement('div');
                var del_btn = document.createElement('button');
                cell_name.setAttribute('class', 'cell-tbaable');
                cell_name.setAttribute('data-id', work.id);
                var cell_bill = cell_name.cloneNode(true);
                var cell_mail = cell_name.cloneNode(true);
                var cell_phone = cell_name.cloneNode(true);
                cell_name.setAttribute('data-field', 'name');
                cell_bill.setAttribute('data-field', 'bill');
                cell_mail.setAttribute('data-field', 'email');
                cell_phone.setAttribute('data-field', 'phone');
                cell_del_btn.setAttribute('class', 'cell-tbaable');
                del_btn.setAttribute('data-id', work.id);
                cell_name.innerText = work.name;
                cell_bill.innerText = work.bill;
                cell_mail.innerText = work.email;
                cell_phone.innerText = work.phone;
                del_btn.innerHTML = '&times;';
                cell_del_btn.appendChild(del_btn);
                tbl_block.appendChild(cell_name);
                tbl_block.appendChild(cell_bill);
                tbl_block.appendChild(cell_mail);
                tbl_block.appendChild(cell_phone);
                tbl_block.appendChild(cell_del_btn);
            }
        });
    });
};

DataBase.prototype.update = function(name, field, value, id) {
    var sql = `update ${name} set ${field} = '${value}' WHERE id = ${id}`;
    console.log(sql);
    
    this.db.transaction(function (tx) {
        tx.executeSql(sql);
    });
};

DataBase.prototype.del = function(name, id) {
    var sql = `DELETE FROM ${name} WHERE id = ` + id;

    this.db.transaction((tx) => {
        tx.executeSql(sql);
    });
};

DataBase.prototype.clear = function(name) {
    var sql = `DROP TABLE ${name}`;
    this.db.transaction(function (tx) {
        tx.executeSql(sql);
    });
    document.querySelector('.table').innerHTML = '';
};

function App(baseName, tableName) {
    this.db = new DataBase(baseName);
    this.tbl = tableName;
    this.fields = {
        addName: document.querySelector('#add-name'),
        addbill: document.querySelector('#add-bill'),
        addMail: document.querySelector('#add-mail'),
        addPhoneNumber: document.querySelector('#add-phone-number')
    };
    this.btn = {
        add: document.querySelector('#add'),
        clear: document.querySelector('#btnClear'),
        del: document.querySelector('.table')
    };
};

App.prototype.create = function() {
    this.db.create(this.tbl);
    this.btn.add.addEventListener('click', e => {
        if(e.target.tagName == 'INPUT') {
            if (this.fields.addName != '' && this.fields.addbill != '' && this.fields.addMail != '' && this.fields.addPhoneNumber !='') {
                this.db.add(this.tbl);
                this.db.load(this.tbl);
            }
            for(const key in this.fields) {
                this.fields[key].value = '';
            }
        }
    });
    this.btn.clear.addEventListener('click', e => {
        if (e.target.tagName == 'BUTTON') {
            this.db.clear(this.tbl);
        }
    });
    this.btn.del.addEventListener('click', e => {
        if(e.target.tagName == 'BUTTON') {
            this.db.del(this.tbl, parseInt(e.target.getAttribute('data-id')));
            this.db.load(this.tbl);
        }
    });
    this.btn.del.addEventListener('dblclick', e => {
        if(e.target.tagName == 'DIV') {
            e.target.setAttribute('contenteditable', 'true');
            e.target.focus();
        }
    });
    this.btn.del.addEventListener('keydown', e => {
        if (e.target.tagName == 'DIV' && e.target.getAttribute('contenteditable') == 'true') {
            if(e.keyCode == 13) {
                e.target.setAttribute('contenteditable', 'false');
                var fld = e.target.getAttribute('data-field');
                var vle = e.target.innerText;
                var id = parseInt(e.target.getAttribute('data-id'));
                this.db.update(this.tbl, fld, vle, id);
            }
        }
    });
};

window.addEventListener('load', () => {
    let app = new App('dbusr', 'users');
    app.db.load(app.tbl);
    app.create();
});