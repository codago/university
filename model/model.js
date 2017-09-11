"use strict"

const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db/university.db", function(err) {
  if (err) {
    return console.error(err.message);
  }
});

function accessDatabase(cb) {
  //special query for kontrakkuliah table
  const queryKontrakKuliah =
    "SELECT kontrakkuliah.kontrakkuliahid, mahasiswa.nama_mahasiswa, jurusan.nama_jurusan, " +
    "mahasiswa.nim, matakuliah.nama_matkul, matakuliah.sks, dosen.nama_dosen, " +
    "kontrakkuliah.nilai, kontrakkuliah.grade FROM kontrakkuliah " +
    "INNER JOIN mahasiswa ON kontrakkuliah.MAHASISWAID=mahasiswa.MAHASISWAID " +
    "INNER JOIN jurusan on mahasiswa.jurusanid=jurusan.jurusanid " +
    "INNER JOIN dosen ON kontrakkuliah.DOSENID=dosen.DOSENID " +
    "INNER JOIN matakuliah ON kontrakkuliah.MATAKULIAHID=matakuliah.MATAKULIAHID;";

  db.all(`SELECT * FROM user`, (err, user) => {
    if (err) {
      throw err;
    }
    db.all(`SELECT * FROM mahasiswa`, (err, mahasiswa) => {
      if (err) {
        throw err;
      }
      db.all(`SELECT * FROM dosen`, (err, dosen) => {
        if (err) {
          throw err;
        }
        db.all(`SELECT * FROM jurusan`, (err, jurusan) => {
          if (err) {
            throw err;
          }
          db.all(`SELECT * FROM matakuliah`, (err, matakuliah) => {
            if (err) {
              throw err;
            }
            db.all(queryKontrakKuliah, (err, kontrakkuliah) => {
              if (err) {
                throw err;
              }
              return cb({
                user: user,
                mahasiswa: mahasiswa,
                dosen: dosen,
                jurusan: jurusan,
                kontrakkuliah: kontrakkuliah,
                matakuliah: matakuliah
              });
            });
          });
        });
      });
    });
  });
}

function saveDatabase(originalData, newData) {
  if (
    JSON.stringify(originalData.mahasiswa) !== JSON.stringify(newData.mahasiswa)
  ) {
    db.run("DROP TABLE mahasiswa", function(error) {
      const createTableMahasiswaQuery = `CREATE TABLE mahasiswa(
      MAHASISWAID INT PRIMARY KEY NOT NULL,
      NAMA_MAHASISWA TEXT NOT NULL,
      NIM TEXT NOT NULL,
      JURUSANID INT NOT NULL,
      UMUR TEXT NOT NULL,
      ALAMAT TEXT NOT NULL
      );`;
      if (error) {
        console.log(error);
      }
      db.run(createTableMahasiswaQuery, function(error) {
        if (error) {
          console.log(error);
        }

        for (var x = 0; x < newData.mahasiswa.length; x++) {
          var MAHASISWAID = newData.mahasiswa[x].MAHASISWAID;
          var NAMA_MAHASISWA = newData.mahasiswa[x].NAMA_MAHASISWA;
          var NIM = newData.mahasiswa[x].NIM;
          var JURUSANID = newData.mahasiswa[x].JURUSANID;
          var UMUR = newData.mahasiswa[x].UMUR;
          var ALAMAT = newData.mahasiswa[x].ALAMAT;
          var insertMahasiswaQuery = `INSERT INTO mahasiswa(
            MAHASISWAID, NAMA_MAHASISWA, NIM, JURUSANID, UMUR, ALAMAT)
            VALUES(${MAHASISWAID}, '${NAMA_MAHASISWA}', '${NIM}', ${JURUSANID},
              '${UMUR}', '${ALAMAT}')`;
          db.run(insertMahasiswaQuery, function(error) {
            if (error) {
              console.log(error);
            }
          });
        }
      });
    });
  }

  if(JSON.stringify(originalData.dosen) !== JSON.stringify(newData.dosen)) {
    db.run("DROP TABLE dosen", function(error) {
    const createTableDosenQuery = `CREATE TABLE dosen(
    DOSENID INT PRIMARY KEY NOT NULL,
    NAMA_DOSEN TEXT NOT NULL,
    NIP TEXT NOT NULL
    );`;
      if (error) {
        console.log(error);
      }
      db.run(createTableDosenQuery, function(error) {
        if (error) {
          console.log(error);
        }

        for (var x = 0; x < newData.dosen.length; x++) {
          var DOSENID = newData.dosen[x].DOSENID;
          var NAMA_DOSEN = newData.dosen[x].NAMA_DOSEN;
          var NIP = newData.dosen[x].NIP;
          var insertDosenQuery = `INSERT INTO dosen(
          DOSENID, NAMA_DOSEN, NIP) VALUES(${DOSENID}, '${NAMA_DOSEN}', '${NIP}');`;
          db.run(insertDosenQuery, function(error) {
            if (error) {
              console.log(error);
            }
          });
        }
      });
    });
  }
}

function deleteData(data, index, table) {
  console.log(data[table]);
  data[table].splice(index, 1)
  return data[table];
}

function userVerification(usernameInput, passwordInput, tableUser) {
  for(var x = 0; x<tableUser.length; x++) {
    for(var prop in tableUser[x]) {
      if(
        tableUser[x].NAMA_USER === usernameInput &&
        tableUser[x].PASSWORD === passwordInput
      ) {
        return tableUser[x];
      }
    }
  }
}

function searchMember(idNumberDataUserInput, data, tableName, idNumberPropertyName) {
  for(var x = 0; x < data[tableName].length; x++) {
    for(var prop in data[tableName][x]) {
      if(data[tableName][x][idNumberPropertyName] === idNumberDataUserInput) {
        return {data: data[tableName][x], index: x}
      }
    }
  }
}

module.exports = {
  accessDatabase: accessDatabase,
  saveDatabase: saveDatabase,
  deleteData: deleteData,
  userVerification: userVerification,
  searchMember: searchMember
}
