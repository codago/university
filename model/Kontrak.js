const sqlite = require('sqlite3').verbose();
let file = "../db/university.db";
let db = new sqlite.Database(file);


class Kontrak{
    constructor(nilai, grade, dosen, mahasiswa, matakuliah) {
        this.nilai = nilai;
        this.grade = grade;
        this.dosen = dosen;
        this.mahasiswa = mahasiswa;
        this.matakuliah = matakuliah;
    }

     createTableKontrak() {
        db.serialize(function () {
            db.run("CREATE TABLE IF NOT EXISTS kontrak (kontrakID INTEGER PRIMARY KEY AUTOINCREMENT,nilai INTEGER NOT NULL, grade TEXT NOT NULL, dosen REFERENCES dosen (dosenID), mahasiswa REFERENCES mahasiswa (mahasiswaID),matakuliah REFERENCES matakuliah(matakuliahID));", function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Table Kontrak Created`)
                }

            })
        })
    }

    static daftarKontrak(cb) {
        db.all("SELECT * FROM kontrak;", function (err, data) {
            if (err) console.log(err)
           cb(data)
        })
    }

    static cariKontrak(id,cb) {
         db.all(`SELECT * FROM kontrak WHERE kontrak.kontrakID = '${id}';`, function (err, data) {
            if (err) console.log(err)
            cb(data);
        })
    }

    static tambahKontrak(nilai,grade,dosen,mahasiswa,matakuliah) {
         db.all(`INSERT INTO kontrak(nilai,grade,dosen,mahasiswa,matakuliah) VALUES ('${nilai}','${grade}','${dosen}','${mahasiswa}','${matakuliah}');`,function(err){
            if(err)console.log(err)
        })
    }

    static hapusKontrak(id) {
         db.run(`DELETE FROM kontrak WHERE kontrakID = '${id}';`,function(err){
            if(err)console.log(err)
        })
    }
}

export {Kontrak as default}