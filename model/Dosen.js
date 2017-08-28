const sqlite = require('sqlite3').verbose();
let file = "../db/university.db";
let db = new sqlite.Database(file);

class Dosen {
    constructor(nama) {
        this.nama = nama;
    }

    createTableDosen() {
        db.serialize(function () {
            db.run("CREATE TABLE IF NOT EXISTS dosen (dosenID INTEGER PRIMARY KEY AUTOINCREMENT,nama TEXT NOT NULL);", function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Table Dosen Created`)
                }

            })
        })
    }

    static daftarDosen(cb) {
        db.all("SELECT * FROM dosen;", function (err, data) {
            if (err) console.log(err)
            cb(data)
        })
    }

    static cariDosen(id, cb) {
        db.all(`SELECT * FROM dosen WHERE dosen.dosenID = '${id}';`, function (err, data) {
            if (err) console.log(err)

            cb(data);

        })
    }

    static tambahDosen(nama) {
        db.all(`INSERT INTO dosen (nama) VALUES ('${nama}');`, function (err) {
            if (err) console.log(err)
        })
    }

    static hapusDosen(id) {
        db.run(`DELETE FROM dosen WHERE dosenID = '${id}';`, function (err) {
            if (err) console.log(err)
        })
    }
}


export { Dosen as default }