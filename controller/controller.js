"use strict";
import View from '../view/view.js';
import User from '../model/User.js';
import Jurusan from '../model/Jurusan.js';
import Dosen from '../model/Dosen.js';
import Mahasiswa from '../model/Mahasiswa.js';
import Matakuliah from '../model/Matakuliah';
import Kontrak from '../model/Kontrak';

const readline = require('readline');

let temp = [];
let opsiMenu = "";
let userChoice = "";
let dataBaru = [];
User.listUser()
let userData = User.getListUser();

let count = 0;

View.loginPage();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "username : "
});

rl.prompt();

count++;
rl.on('line', (line) => {

    if (count === 0) {
        rl.prompt();
        count++;
    } else if (count === 1) {
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].username === line.trim()) {
                temp.push(line.trim())
            }
        }
        rl.setPrompt("password : ");
        rl.prompt();
        count++;

    } else if (count === 2) {
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].password === line.trim()) {
                temp.push(line.trim())
            }
        }

        if (temp.length === 2) {
            User.loginUser(temp[0], temp[1], function (data) {

                if (data.length === 1) {
                    View.reset_board();
                    View.daftarMenu(data);
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas: ");
                    rl.prompt();
                    count++;
                } else if (data.length === 0) {
                    console.log("username or password not found ! please try again !")
                    rl.setPrompt("username : ");
                    rl.prompt();
                    count = 1;
                    temp = []
                }
            })
        } else {
            console.log("username or password not found ! please try again !")
            rl.setPrompt("username : ");
            rl.prompt();
            count = 1;
            temp = []
        }
    } else if (count === 3) {
        if (line.trim() === "1") {
            opsiMenu = "mahasiswa";
            View.reset_board();
            count++
            View.menuMahasiswa()
            rl.prompt();
        } else if (line.trim() === "2") {
            opsiMenu = "jurusan";
            View.reset_board();
            count++;
            View.menuJurusan();
            rl.prompt();
        } else if (line.trim() === "3") {
            opsiMenu = "dosen";
            View.reset_board();
            count++;
            View.menuDosen();
            rl.prompt();
        } else if (line.trim() === "4") {
            opsiMenu = "matakuliah";
            View.reset_board();
            count++;
            View.menuMatakuliah();
            rl.prompt();
        } else if (line.trim() === "5") {
            opsiMenu = "kontrak";
            View.reset_board();
            count++;
            View.menuKontrak();
            rl.prompt();
        } else if (line.trim() === "6") {
            View.reset_board();
            count = 1;
            temp = [];
            console.log(`=================================================================`);
            console.log("kamu telah keluar");
            View.loginPage();
            rl.setPrompt("username: ");
            rl.prompt();
        }
    } else if (count === 4) {
        if (opsiMenu === "mahasiswa") {
            if (line.trim() === "1") {
                View.reset_board();
                rl.setPrompt("");
                Mahasiswa.daftarMahasiswa(function (data) {
                    View.printDaftarMahasiswa(data);
                    View.menuMahasiswa()
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                })
            } else if (line.trim() === "2") {
                View.reset_board();
                userChoice = line.trim();
                count++;
                rl.setPrompt("Masukkan NIM : ");
                rl.prompt();
            } else if (line.trim() === "3") {
                View.reset_board();
                userChoice = line.trim();
                console.log("Lengkapi data dibawah ini:");
                rl.setPrompt("NIM : ");
                rl.prompt();
                count++;
            } else if (line.trim() === "4") {
                View.reset_board();
                userChoice = line.trim();
                rl.setPrompt("masukkan NIM mahasiswa yang akan dihapus : ");
                rl.prompt();
                count++;
            } else if (line.trim() === "5") {
                View.reset_board();
                rl.setPrompt("");
                User.loginUser(temp[0], temp[1], function (data) {
                    View.daftarMenu(data);
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas: ");
                    rl.prompt();
                    count--;
                })
            }
        } else if (opsiMenu === "jurusan") {
            if (line.trim() === "1") {
                View.reset_board();
                rl.setPrompt("");
                Jurusan.daftarJurusan(function (data) {
                    View.printDaftarJurusan(data);
                    View.menuJurusan();
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                })
            } else if (line.trim() === "2") {
                View.reset_board();
                userChoice = line.trim();
                count++;
                rl.setPrompt("Masukkan ID jurusan : ");
                rl.prompt();
            } else if (line.trim() === "3") {
                View.reset_board();
                userChoice = line.trim();
                console.log("Lengkapi data dibawah ini:");
                rl.setPrompt("Nama jurusan : ");
                rl.prompt();
                count++;
            } else if (line.trim() === "4") {
                View.reset_board();
                userChoice = line.trim();
                rl.setPrompt("masukkan Id jurusan yang akan dihapus : ");
                rl.prompt();
                count++;
            } else if (line.trim() === "5") {
                View.reset_board();
                rl.setPrompt("");
                User.loginUser(temp[0], temp[1], function (data) {
                    View.daftarMenu(data);
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas: ");
                    rl.prompt();
                    count--;
                })
            }
        } else if (opsiMenu === "dosen") {
            if (line.trim() === "1") {
                View.reset_board();
                rl.setPrompt("");
                Dosen.daftarDosen(function (data) {
                    View.printDaftarDosen(data);
                    View.menuDosen();
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                })
            } else if (line.trim() === "2") {
                View.reset_board();
                userChoice = line.trim();
                count++;
                rl.setPrompt("Masukkan ID dosen : ");
                rl.prompt();
            } else if (line.trim() === "3") {
                View.reset_board();
                userChoice = line.trim();
                console.log("Lengkapi data dibawah ini:");
                rl.setPrompt("Nama dosen : ");
                rl.prompt();
                count++;
            } else if (line.trim() === "4") {
                View.reset_board();
                userChoice = line.trim();
                rl.setPrompt("masukkan Id dosen yang akan dihapus : ");
                rl.prompt();
                count++;
            } else if (line.trim() === "5") {
                View.reset_board();
                rl.setPrompt("");
                User.loginUser(temp[0], temp[1], function (data) {
                    View.daftarMenu(data);
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas: ");
                    rl.prompt();
                    count--;
                })
            }
        } else if (opsiMenu === "matakuliah") {
            if (line.trim() === "1") {
                View.reset_board();
                rl.setPrompt("");
                Matakuliah.daftarMatakuliah(function (data) {
                    View.printDaftarMatakuliah(data);
                    View.menuMatakuliah();
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                })
            } else if (line.trim() === "2") {
                View.reset_board();
                userChoice = line.trim();
                count++;
                rl.setPrompt("Masukkan ID matakuliah : ");
                rl.prompt();
            } else if (line.trim() === "3") {
                View.reset_board();
                userChoice = line.trim();
                console.log("Lengkapi data dibawah ini:");
                rl.setPrompt("Nama matakuliah : ");
                rl.prompt();
                count++;
            } else if (line.trim() === "4") {
                View.reset_board();
                userChoice = line.trim();
                rl.setPrompt("masukkan Id matakuliah yang akan dihapus : ");
                rl.prompt();
                count++;
            } else if (line.trim() === "5") {
                View.reset_board();
                rl.setPrompt("");
                User.loginUser(temp[0], temp[1], function (data) {
                    View.daftarMenu(data);
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas: ");
                    rl.prompt();
                    count--;
                })
            }
        } else if (opsiMenu === "kontrak") {
            if (line.trim() === "1") {
                View.reset_board();
                rl.setPrompt("");
                Kontrak.daftarKontrak(function (data) {
                    View.printDaftarKontrak(data);
                    View.menuKontrak();
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                })
            } else if (line.trim() === "2") {
                View.reset_board();
                userChoice = line.trim();
                count++;
                rl.setPrompt("Masukkan ID kontrak : ");
                rl.prompt();
            } else if (line.trim() === "3") {
                View.reset_board();
                userChoice = line.trim();
                console.log("Lengkapi data dibawah ini:");
                rl.setPrompt("Nilai : ");
                rl.prompt();
                count++;
            } else if (line.trim() === "4") {
                View.reset_board();
                userChoice = line.trim();
                rl.setPrompt("masukkan Id kontrak yang akan dihapus : ");
                rl.prompt();
                count++;
            } else if (line.trim() === "5") {
                View.reset_board();
                rl.setPrompt("");
                User.loginUser(temp[0], temp[1], function (data) {
                    View.daftarMenu(data);
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas: ");
                    rl.prompt();
                    count--;
                })
            }
        }
    } else if (count === 5) {
        rl.setPrompt("");
        if (opsiMenu === "mahasiswa") {
            if (userChoice === "2") {
                View.reset_board();
                count--;
                Mahasiswa.cariMahasiswa(line.trim(), function (data) {
                    if (data.length === 0) {
                        console.log(`mahasiswa dengan nim ${line.trim()} tidak ditemukan`);
                    } else {
                        View.printMahasiswa(data)
                    }
                    View.menuMahasiswa()
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                })
            } else if (userChoice === "3") {
                View.reset_board();
                dataBaru.push(line.trim());
                rl.setPrompt("nama : ");
                rl.prompt();
                count++;
            } else if (userChoice === "4") {
                View.reset_board();
                count--;
                Mahasiswa.cariMahasiswa(line.trim(), function (data) {
                    if (data.length === 0) {
                        console.log(`mahasiswa dengan nim ${line.trim()} tidak ditemukan`)
                    } else {
                        Mahasiswa.hapusMahasiswa(line.trim());
                        console.log(`mahasiswa dengan nim: ${line.trim()} telah dihapus.`)
                    }

                    Mahasiswa.daftarMahasiswa(function (data) {
                        View.printDaftarMahasiswa(data);
                        View.menuMahasiswa()
                        rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                        rl.prompt();
                    })
                })
            }
        } else if (opsiMenu === "jurusan") {
            if (userChoice === "2") {
                View.reset_board();
                count--;
                Jurusan.cariJurusan(line.trim(), function (data) {
                    if (data.length === 0) {
                        console.log(`jurusan dengan id ${line.trim()} tidak ditemukan`);
                    } else {
                        View.printJurusan(data)
                    }

                    View.menuJurusan()
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                })
            } else if (userChoice === "3") {
                View.reset_board();
                rl.setPrompt("");
                dataBaru.push(line.trim());
                Jurusan.tambahJurusan(dataBaru[0]);
                Jurusan.daftarJurusan(function (data) {
                    View.printDaftarJurusan(data);
                    View.menuJurusan()
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                    count -= 1;
                })

                dataBaru = [];
            } else if (userChoice === "4") {
                View.reset_board();
                count--;
                Jurusan.cariJurusan(line.trim(), function (data) {
                    if (data.length === 0) {
                        console.log(`jurusan dengan id ${line.trim()} tidak ditemukan`)
                    } else {
                        Jurusan.hapusJurusan(line.trim());
                        console.log(`jurusan dengan id: ${line.trim()} telah dihapus.`)
                    }

                    Jurusan.daftarJurusan(function (data) {
                        View.printDaftarJurusan(data);
                        View.menuJurusan()
                        rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                        rl.prompt();
                    })
                })

            }
        } else if (opsiMenu === "dosen") {
            if (userChoice === "2") {
                View.reset_board();
                count--;
                Dosen.cariDosen(line.trim(), function (data) {
                    if (data.length === 0) {
                        console.log(`dosen dengan id ${line.trim()} tidak ditemukan`);
                    } else {
                        View.printDosen(data)
                    }

                    View.menuDosen()
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                })
            } else if (userChoice === "3") {
                View.reset_board();
                rl.setPrompt("");
                dataBaru.push(line.trim());
                Dosen.tambahDosen(dataBaru[0]);
                Dosen.daftarDosen(function (data) {
                    View.printDaftarDosen(data);
                    View.menuDosen()
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                    count -= 1;
                })

                dataBaru = [];
            } else if (userChoice === "4") {
                View.reset_board();
                count--;
                Dosen.cariDosen(line.trim(), function (data) {
                    if (data.length === 0) {
                        console.log(`dosen dengan id ${line.trim()} tidak ditemukan`)
                    } else {
                        Dosen.hapusDosen(line.trim());
                        console.log(`dosen dengan id: ${line.trim()} telah dihapus.`)
                    }


                    Dosen.daftarDosen(function (data) {
                        View.printDaftarDosen(data);
                        View.menuDosen()
                        rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                        rl.prompt();
                    })
                })
            }
        } else if (opsiMenu === "matakuliah") {
            if (userChoice === "2") {
                View.reset_board();
                count--;
                Matakuliah.cariMatakuliah(line.trim(), function (data) {
                    if (data.length === 0) {
                        console.log(`matakuliah dengan id ${line.trim()} tidak ditemukan`);
                    } else {
                        View.printMatakuliah(data)
                    }

                    View.menuMatakuliah()
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                })
            } else if (userChoice === "3") {
                View.reset_board();
                dataBaru.push(line.trim());
                rl.setPrompt("sks : ");
                rl.prompt();
                count++;
            } else if (userChoice === "4") {
                View.reset_board();
                count--;
                Matakuliah.cariMatakuliah(line.trim(), function (data) {

                    if (data.length === 0) {
                        console.log(`matakuliah dengan id ${line.trim()} tidak ditemukan`)
                    } else {
                        Matakuliah.hapusMatakuliah(line.trim());
                        console.log(`matakuliah dengan id: ${line.trim()} telah dihapus.`)
                    }

                    Matakuliah.daftarMatakuliah(function (data) {
                        View.printDaftarMatakuliah(data);
                        View.menuMatakuliah()
                        rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                        rl.prompt();
                    })
                })
            }
        } else if (opsiMenu === "kontrak") {
            if (userChoice === "2") {
                View.reset_board();
                count--;
                Kontrak.cariKontrak(line.trim(), function (data) {
                    if (data.length === 0) {
                        console.log(`kontrak dengan id ${line.trim()} tidak ditemukan`);
                    } else {
                        View.printKontrak(data)
                    }

                    View.menuKontrak()
                    rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                    rl.prompt();
                })
            } else if (userChoice === "3") {
                View.reset_board();
                dataBaru.push(line.trim());
                rl.setPrompt("grade : ");
                rl.prompt();
                count++;
            } else if (userChoice === "4") {
                View.reset_board();
                count--;
                Kontrak.cariKontrak(line.trim(), function (data) {

                    if (data.length === 0) {
                        console.log(`kontrak dengan id ${line.trim()} tidak ditemukan`)
                    } else {
                        Kontrak.hapusKontrak(line.trim());
                        console.log(`kontrak dengan id: ${line.trim()} telah dihapus.`)
                    }

                    Kontrak.daftarKontrak(function (data) {
                        View.printDaftarKontrak(data);
                        View.menuKontrak()
                        rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                        rl.prompt();
                    })
                })
            }
        }
    } else if (count === 6) {
        if (opsiMenu === "mahasiswa") {
            View.reset_board();
            dataBaru.push(line.trim());
            rl.setPrompt("alamat : ");
            rl.prompt();
            count++;
        } else if (opsiMenu === "matakuliah") {
            View.reset_board();
            rl.setPrompt("");
            dataBaru.push(line.trim());
            Matakuliah.tambahMatakuliah(dataBaru[0], dataBaru[1]);
            Matakuliah.daftarMatakuliah(function (data) {
                View.printDaftarMatakuliah(data);
                View.menuMatakuliah()
                rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                rl.prompt();
                count -= 2;
            })

            dataBaru = [];
        } else if (opsiMenu === "kontrak") {
            View.reset_board();
            Dosen.daftarDosen(function (data) {
                View.printDaftarDosen(data);
                dataBaru.push(line.trim());
                rl.setPrompt("ID dosen : ");
                rl.prompt();
                count++;
            })

        }
    } else if (count === 7) {
        if (opsiMenu === "mahasiswa") {
            View.reset_board();
            Jurusan.daftarJurusan(function (data) {
                View.printDaftarJurusan(data);
                rl.setPrompt("jurusan : ");
                rl.prompt();
                dataBaru.push(line.trim());
                count++;
            })
        } else if (opsiMenu === "kontrak") {
            View.reset_board();
            Mahasiswa.daftarMahasiswa(function (data) {
                View.printDaftarMahasiswa(data);
                dataBaru.push(line.trim());
                rl.setPrompt("ID mahasiswa : ");
                rl.prompt();
                count++;
            })
        }
    } else if (count === 8) {
        if (opsiMenu === "mahasiswa") {
            View.reset_board();
            rl.setPrompt("");
            dataBaru.push(line.trim());
            Mahasiswa.tambahMahasiswa(dataBaru[0], dataBaru[1], dataBaru[2], dataBaru[3]);
            Mahasiswa.daftarMahasiswa(function (data) {
                View.printDaftarMahasiswa(data);
                View.menuMahasiswa()
                rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
                rl.prompt();
                count -= 4;
            })

            dataBaru = [];
        } else if (opsiMenu === "kontrak") {
            View.reset_board();
            Matakuliah.daftarMatakuliah(function (data) {
                View.printDaftarMatakuliah(data);
                dataBaru.push(line.trim());
                rl.setPrompt("ID matakuliah : ");
                rl.prompt();
                count++;
            })

        }
    } else if (count === 9) {
        View.reset_board();
        rl.setPrompt("");
        dataBaru.push(line.trim());
        Kontrak.tambahKontrak(dataBaru[0], dataBaru[1], dataBaru[2], dataBaru[3], dataBaru[4]);
        Kontrak.daftarKontrak(function (data) {
            View.printDaftarKontrak(data);
            View.menuKontrak()
            rl.setPrompt("masukkan salah satu no. dari opsi diatas:");
            rl.prompt();
            count -= 5;
        })

        dataBaru = [];
    }
rl.prompt();

}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});

