"use strict";

const Table = require('cli-table');

class View {

    static loginPage() {
        console.log(`================================================================`);
        console.log('Welcome to Universita Bina Nusantara');
        console.log('Jl. KH. Syahdan No. 9')
        console.log(`================================================================`);
    }

    static daftarMenu(data) {
        let username, role;
        data.forEach(function (data) {
            username = data.username;
            role = data.role;
        })

        console.log(`================================================================`);
        console.log(`Welcome, ${username}. Your access level is: ${role}`);
        console.log(`================================================================`);
        console.log(`silahkan pilih opsi di bawah ini`);
        console.log(`[1] Mahasiswa`);
        console.log(`[2] Jurusan`);
        console.log(`[3] Dosen`);
        console.log(`[4] Mata kuliah`);
        console.log(`[5] Kontrak`);
        console.log(`[6] Keluar`);
        console.log(`================================================================`);
    }

    static menuJurusan() {
        console.log(`================================================================`);
        console.log(`silahkan pilih opsi di bawah ini`);
        console.log(`[1] Daftar jurusan`);
        console.log(`[2] Cari jurusan`);
        console.log(`[3] Tambah jurusan`);
        console.log(`[4] Hapus jurusan`);
        console.log(`[5] Kembali`);
        console.log(`================================================================`);
    }

    static printDaftarJurusan(data) {
        const tableJurusan = new Table({
            head: ['ID', 'Nama']
        });
        data.forEach(function (row) {
            let id = row.jurusanID
            let nama = row.nama
            tableJurusan.push(
                [id, nama]
            );

        })
        console.log(tableJurusan.toString());
    }

    static printJurusan(data) {
        let id, nama;

            data.forEach(function (row) {
                id = row.jurusanID
                nama = row.nama
            })

            console.log(`jurusan details`);
            console.log(`================================================================`);
            console.log(`id         : ${id}`);
            console.log(`nama       : ${nama}`);
            console.log(`================================================================`);
        
    }


    static menuDosen() {
        console.log(`================================================================`);
        console.log(`silahkan pilih opsi di bawah ini`);
        console.log(`[1] Daftar dosen`);
        console.log(`[2] Cari dosen`);
        console.log(`[3] Tambah dosen`);
        console.log(`[4] Hapus dosen`);
        console.log(`[5] Kembali`);
        console.log(`================================================================`);
    }

    static printDaftarDosen(data) {
        const tableDosen = new Table({
            head: ['ID', 'Nama']
        });
        data.forEach(function (row) {
            let id = row.dosenID
            let nama = row.nama
            tableDosen.push(
                [id, nama]
            );

        })
        console.log(tableDosen.toString());
    }

    static printDosen(data) {
        let id, nama;
            data.forEach(function (row) {
                id = row.dosenID
                nama = row.nama
            })
            console.log(`dosen details`);
            console.log(`================================================================`);
            console.log(`id         : ${id}`);
            console.log(`nama       : ${nama}`);
            console.log(`================================================================`);
        
    }

    static menuMahasiswa() {
        console.log(`================================================================`);
        console.log(`silahkan pilih opsi di bawah ini`);
        console.log(`[1] Daftar murid`);
        console.log(`[2] Cari murid`);
        console.log(`[3] Tambah murid`);
        console.log(`[4] Hapus murid`);
        console.log(`[5] Kembali`);
        console.log(`================================================================`);
    }

    static reset_board() {
        console.log("\x1B[2J")
    }

    static printDaftarMahasiswa(data) {
        const tableMahasiswa = new Table({
            head: ['NIM', 'Nama', 'Alamat', 'Jurusan']
        });
        let nim, nama, alamat, jurusan;
        data.forEach(function (row) {
            nim = row.nim
            nama = row.nama
            alamat = row.alamat
            jurusan = row.jurusan
            tableMahasiswa.push(
                [nim, nama, alamat, jurusan]
            );
        })
        console.log(`=================================================================`);
        console.log(tableMahasiswa.toString());

    }

    static printMahasiswa(data) {
        let id, nama, alamat, jurusan;
   
            data.forEach(function (row) {
                id = row.mahasiswaID;
                nama = row.nama;
                alamat = row.alamat;
                jurusan = row.jurusan;
            })
            console.log(`student details`);
            console.log(`================================================================`);
            console.log(`id         : ${id}`);
            console.log(`nama       : ${nama}`);
            console.log(`alamat     : ${alamat}`);
            console.log(`jurusan    : ${jurusan}`);
        
    }

    static menuMatakuliah() {
        console.log(`================================================================`);
        console.log(`silahkan pilih opsi di bawah ini`);
        console.log(`[1] Daftar matakuliah`);
        console.log(`[2] Cari matakuliah`);
        console.log(`[3] Tambah matakuliah`);
        console.log(`[4] Hapus matakuliah`);
        console.log(`[5] Kembali`);
        console.log(`================================================================`);
    }

    static printDaftarMatakuliah(data) {
        const tableMatakuliah = new Table({
            head: ['ID', 'Nama', 'SKS']
        });

        data.forEach(function (row) {
            let id = row.matakuliahID
            let nama = row.nama
            let sks = row.sks
            tableMatakuliah.push(
                [id, nama, sks]
            );

        })
        console.log(tableMatakuliah.toString());
    }

    static printMatakuliah(data) {
        let id, nama, sks;

            data.forEach(function (row) {
                id = row.matakuliahID
                nama = row.nama
                sks = row.sks
            })
            console.log(`matakuliah details`);
            console.log(`================================================================`);
            console.log(`id         : ${id}`);
            console.log(`nama       : ${nama}`);
            console.log(`sks        : ${sks}`);
            console.log(`================================================================`);
        
    }

    static menuKontrak() {
        console.log(`================================================================`);
        console.log(`silahkan pilih opsi di bawah ini`);
        console.log(`[1] Daftar kontrak`);
        console.log(`[2] Cari kontrak`);
        console.log(`[3] Tambah kontrak`);
        console.log(`[4] Hapus kontrak`);
        console.log(`[5] Kembali`);
        console.log(`================================================================`);
    }

    static printDaftarKontrak(data) {
        const tableKontrak = new Table({
            head: ['ID', 'Nilai', 'Grade', 'Dosen', 'Mahasiswa', 'Matakuliah']
        })
        data.forEach(function (row) {
            let id = row.kontrakID;
            let nilai = row.nilai;
            let grade = row.grade;
            let dosen = row.dosen;
            let mahasiswa = row.mahasiswa;
            let matakuliah = row.matakuliah;

            tableKontrak.push(
                [id, nilai, grade, dosen, mahasiswa, matakuliah]
            );

        })
        console.log(tableKontrak.toString());
    }

    static printKontrak(data) {
        let id, nilai, grade, dosen, mahasiswa, matakuliah;
        data.forEach(function (row) {
            id = row.kontrakID;
            nilai = row.nilai;
            grade = row.grade;
            dosen = row.dosen;
            mahasiswa = row.mahasiswa;
            matakuliah = row.matakuliah;
        })
        console.log(`kontrak details`);
        console.log(`================================================================`);
        console.log(`id         : ${id}`);
        console.log(`nilai      : ${nilai}`);
        console.log(`grade      : ${grade}`);
        console.log(`dosen      : ${dosen}`);
        console.log(`mahasiswa  : ${mahasiswa}`);
        console.log(`matakuliah : ${matakuliah}`);
        console.log(`================================================================`);
    }




}

export { View as default }
