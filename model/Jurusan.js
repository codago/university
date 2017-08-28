const sqlite = require('sqlite3').verbose();
let file = "../db/university.db";
let db = new sqlite.Database(file);

class Jurusan {
    constructor(nama) {
        this.nama = nama;
    }

    createTableJurusan() {
        db.serialize(function () {
            db.run("CREATE TABLE IF NOT EXISTS jurusan (jurusanID INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT NOT NULL);", function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Table Jurusan Created`)
                }
            })
        })
    }

    static daftarJurusan(cb) {
        db.all("SELECT * FROM jurusan;", function (err, data) {
            if (err) console.log(err)
            cb(data)
        })
    }

    static cariJurusan(id, cb) {
        db.all(`SELECT * FROM jurusan WHERE jurusan.jurusanID = '${id}';`, function (err, data) {
            if (err) console.log(err)
            cb(data)
        })
    }

    static tambahJurusan(nama) {
        db.all(`INSERT INTO jurusan (nama) VALUES ('${nama}')`, function (err) {
            if (err) console.log(err)
        })
    }

    static hapusJurusan(id) {
        db.run(`DELETE FROM jurusan WHERE jurusan.jurusanID = '${id}';`, function (err) {
            if (err) console.log(err)
        })
    }
}


export { Jurusan as default }