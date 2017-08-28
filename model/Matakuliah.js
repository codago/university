const sqlite = require('sqlite3').verbose();
let file = "../db/university.db";
let db = new sqlite.Database(file);

class Matakuliah {
    constructor(nama, sks) {
        this.nama = nama;
        this.sks = sks;
    }

    createTableMatakuliah() {
        db.serialize(function () {
            db.run("CREATE TABLE IF NOT EXISTS matakuliah (matakuliahID INTEGER PRIMARY KEY AUTOINCREMENT,nama TEXT NOT NULL, sks INTEGER NOT NULL);", function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Table Matakuliah Created`)
                }

            })
        })
    }

    static daftarMatakuliah(cb) {
        db.all("SELECT * FROM matakuliah;", function (err, data) {
            if (err) console.log(err)
            cb(data)
        })
    }

    static cariMatakuliah(id, cb) {
        db.all(`SELECT * FROM matakuliah WHERE matakuliah.matakuliahID = '${id}';`, function (err, data) {
            if (err) console.log(err)

            cb(data)

        })
    }

    static tambahMatakuliah(nama, sks) {
        db.all(`INSERT INTO matakuliah(nama,sks) VALUES ('${nama}','${sks}');`, function (err) {
            if (err) console.log(err)
        })
    }

    static hapusMatakuliah(id) {
        db.run(`DELETE FROM matakuliah WHERE matakuliahID = '${id}';`, function (err) {
            if (err) console.log(err)
        })
    }
}


export { Matakuliah as default }