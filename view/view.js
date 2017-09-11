"use strict"
const Table = require("cli-table");

function cliTable(data, table) {
  let tempTableArray = new Array(data[table].length);
  let dataPropertyLength = Object.keys(data[table][0]).length
  let headArray = new Array(dataPropertyLength);
  headArray[0] = "No";
  for(var x = 1; x < dataPropertyLength; x++) {
    headArray[x] = Object.keys(data[table][0])[x]
  }
  let cliTable = new Table({
    head: headArray
  });
  if(data[table].length > 0) {
    for(var x = 0; x < data[table].length; x++) {
      tempTableArray[x] = []
      for (var prop in data[table][x]) {
        tempTableArray[x].push(data[table][x][prop])
      }
      tempTableArray[x][0] = x+1
    }
    tempTableArray.forEach(function(item) {
      cliTable.push(item);
    });
    console.log("============================================================");
    console.log(cliTable.toString());
  } else {
    console.log("============================================================");
    console.log(cliTable.toString());
  }
}

function mainMenu() {
  console.log("============================================================");
  console.log("silahkan pilih opsi di bawah ini");
  console.log("[1] Mahasiswa");
  console.log("[2] Jurusan");
  console.log("[3] Dosen");
  console.log("[4] Mata kuliah");
  console.log("[5] Kontrak");
  console.log("[6] Keluar");
  console.log("============================================================");
}

function mahasiswaMenu() {
  console.log("============================================================");
  console.log("silahkan pilih opsi di bawah ini");
  console.log("[1] daftar murid");
  console.log("[2] cari murid");
  console.log("[3] tambah murid");
  console.log("[4] hapus murid");
  console.log("[5] kembali");
  console.log("============================================================");
}

function dosenMenu() {
  console.log("============================================================");
  console.log("[1] daftar dosen");
  console.log("[2] cari dosen");
  console.log("[3] tambah dosen");
  console.log("[4] hapus dosen");
  console.log("[5] kembali");
  console.log("============================================================");
}

function startingHeader() {
  console.log("============================================================");
  console.log("Welcome to Universitas Pendidikan Indonesia");
  console.log("Jl Setiabudi No. 255");
  console.log("============================================================");
}

function cariDosen(namadosen, nip) {
  console.log("============================================================");
  console.log(`Nama     : ${namadosen}`);
  console.log(`NIP      : ${nip}`);
}

function cariMahasiswa(nim, namamahasiswa, alamat, umur, jurusanid) {
  console.log("============================================================");
  console.log(`NIM      : ${nim}`);
  console.log(`Nama     : ${namamahasiswa}`);
  console.log(`Alamat   : ${alamat}`);
  console.log(`Umur     : ${umur}`);
  console.log(`Jurusan  : ${jurusanid}`);
}

function logout() {
  console.log("============================================================");
  console.log("Kamu telah keluar")
}

function loginFailed() {
  console.log("============================================================");
  console.log("username atau password yang anda masukkan salah");
  console.log("============================================================");
}

function noDataChange() {
  console.log("============================================================");
  console.log("tidak terdapat perubahan pada data");
}

function userPanel(username, role) {
  console.log("============================================================");
  console.log(`Welcome ${username}. Your access level is ${role}`);
}

function singleLine() {
  console.log("============================================================");
}

function dataChangePrompt() {
  console.log("============================================================");
  console.log("terdapat perubahan pada data, apakah anda mau menyimpan perubahan?");
  console.log("============================================================");
}

function savingData() {
  console.log("============================================================");
  console.log("menyimpan perubahan..");
  console.log("============================================================");
}

function noSaveData() {
  console.log("============================================================");
  console.log("perubahan tidak disimpan..");
  console.log("============================================================");
}

function addMember() {
  console.log("============================================================");
  console.log("lengkapi data di bawah ini: :");
}

module.exports = {
  cliTable: cliTable,
  mainMenu: mainMenu,
  mahasiswaMenu: mahasiswaMenu,
  dosenMenu: dosenMenu,
  startingHeader: startingHeader,
  cariDosen: cariDosen,
  cariMahasiswa: cariMahasiswa,
  logout: logout,
  loginFailed: loginFailed,
  noDataChange: noDataChange,
  userPanel: userPanel,
  singleLine: singleLine,
  dataChangePrompt: dataChangePrompt,
  savingData: savingData,
  noSaveData: noSaveData,
  addMember: addMember
}
