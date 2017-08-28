const sqlite = require('sqlite3').verbose();
let file = "../db/university.db";
let db = new sqlite.Database(file);

class Mahasiswa {
    constructor(nim, nama, alamat, jurusan) {
        this.nim = nim;
        this.nama = nama;
        this.alamat = alamat;
        this.jurusan = jurusan;
    }

    createTableMahasiswa() {
        db.serialize(function () {
            db.run("CREATE TABLE IF NOT EXISTS mahasiswa (mahasiswaID INTEGER PRIMARY KEY AUTOINCREMENT, nim TEXT NOT NULL,nama TEXT NOT NULL,alamat TEXT NOT NULL,jurusan REFERENCES jurusan (jurusan_id));", function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Table Mahasiswa Created`)
                }
            })
        })
    }

    static daftarMahasiswa(cb) {
        db.all("SELECT * FROM mahasiswa;", function (err, data) {
            if (err) console.log(err)
            cb(data)
        })
    }

    static cariMahasiswa(nim, cb) {
        db.all(`SELECT * FROM mahasiswa WHERE mahasiswa.nim = '${nim}';`, function (err, data) {
            if (err) console.log(err)
            cb(data);
        })
    }

    static tambahMahasiswa(nim, nama, alamat, jurusan) {
        db.all(`INSERT INTO mahasiswa(nim,nama,alamat,jurusan) VALUES ('${nim}','${nama}','${alamat}','${jurusan}');`, function (err) {
            if (err) console.log(err)
        })
    }

    static hapusMahasiswa(nim) {
        db.run(`DELETE FROM mahasiswa WHERE mahasiswa.nim = '${nim}';`, function (err) {
            if (err) console.log(err)

        })
    }

}

export { Mahasiswa as default }