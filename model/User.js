const sqlite = require('sqlite3').verbose();
let file = "../db/university.db";

let db = new sqlite.Database(file);
let users = []

class User {
    createTableUser() {
        db.serialize(function () {
            db.run("CREATE TABLE IF NOT EXISTS users (userID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL,password TEXT NOT NULL,role TEXT NOT NULL);", function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Table User Created`)
                }
            })
        })
    }

    createUser(username, password, role) {
        db.all(`INSERT INTO users(username,password,role) VALUES ('${username}','${password}','${role}');`, function (err) {
            if (err) console.log(err)
        })
    }

    static listUser() {
        db.all("SELECT * FROM users;", function (err, data) {
            data.forEach(function (row) {
                users.push(row)
            })
        })
    }


    static getListUser(){
        return users;
    }
    

    static loginUser(username, password, cb) {
        db.all(`SELECT * FROM users WHERE users.username = '${username}' AND users.password = '${password}';`, function (err, data) {
            cb(data);
        })
    }


    static checkUserName(username, cb) {
        db.all(`SELECT * FROM users WHERE users.username = '${username}';`, function (err, data) {
            if (data.length > 0) {
                cb(true)
            } else {
                cb(false)
            }
        })
    }

    static checkPassword(password, cb) {
        db.all(`SELECT * FROM users WHERE users.password = '${password}';`, function (err, data) {
            if (data.length > 0) {
                cb(true);
            } else {
                cb(false)
            }
        })
    }

}

export { User as default }
