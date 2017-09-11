"use strict"
const sqlite3 = require("sqlite3").verbose();
const readline = require("readline");
const Table = require("cli-table");
const view = require("./view/view");
const model = require("./model/model");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


model.accessDatabase(function(data) {
  // originalData is to be used as a comparison whether the data is being changed
  // or not by the user.
  let originalData = JSON.parse(JSON.stringify(data));;
  let usernameInput;
  let passwordInput;
  let selectedUser;
  let prevState = "";
  let newStudent = {};
  let newDosen = {};

  //starting the view of the application and prompting for username
  view.startingHeader();
  prevState = "askingUsername"
  rl.setPrompt("Username : ");
  rl.prompt();

  //readline
  rl.on("line", function(line) {

    //if there is no user selected, we will get inside this if statement block
    if(selectedUser === undefined) {

      //prompting password to the user
      if(prevState === "askingUsername") {
        prevState = "askingPassword"
        usernameInput = line
        rl.setPrompt("Password : ");
        view.singleLine();
        rl.prompt();
      }

      //check whether the username and password match
      else if(prevState === "askingPassword") {
        prevState = "checkingPassword"
        passwordInput = line
        //selectedUser
        selectedUser = model.userVerification(usernameInput, passwordInput, data.user)
        if(selectedUser === undefined) {
          prevState = "askingUsername"
          view.loginFailed();
          rl.setPrompt("Username : ");
          rl.prompt();
        }
      }
    }

    //if username and password is correct, the code block will run
    if (selectedUser !== undefined) {

      //=============================
      //main menu
      //=============================
      if(prevState === "checkingPassword") {
        prevState = "mainMenu";
        view.userPanel(selectedUser.NAMA_USER, selectedUser.ROLE)
        view.mainMenu();
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //students menu view
      //=============================
      else if (line.trim() === "1" && prevState === "mainMenu") {
        prevState = "mahasiswaMenu";
        view.mahasiswaMenu();
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //List of all students
      //=============================
      else if(line.trim() === "1" && prevState === "mahasiswaMenu") {
        prevState = "mahasiswaMenu"
        view.cliTable(data, "mahasiswa")
        view.mahasiswaMenu();
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }


      //=============================
      //searching for specific student, prompting for student's identification number
      //=============================
      else if ( line.trim() === "2" && (prevState === "mahasiswaMenu") ) {
        prevState = "mahasiswaMenuCariMahasiswa1";
        view.singleLine();
        rl.setPrompt("Masukkan NIM : ");
        rl.prompt();
      }

      //=============================
      //searching's logic for finding specific student
      //=============================
      else if (prevState === "mahasiswaMenuCariMahasiswa1" || prevState === "nimTidakDitemukan") {
        let NIMMAhasiswa = line;
        let selectedDataMahasiswa = model.searchMember(NIMMAhasiswa, data, "mahasiswa", "NIM")

        //if we find the student, display him/her
        if (selectedDataMahasiswa) {
          view.cariMahasiswa(
            selectedDataMahasiswa.data.NIM,
            selectedDataMahasiswa.data.NAMA_MAHASISWA,
            selectedDataMahasiswa.data.ALAMAT,
            selectedDataMahasiswa.data.UMUR,
            selectedDataMahasiswa.data.JURUSANID
          );
          view.mahasiswaMenu();
          prevState = "mahasiswaMenu";
          rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
          rl.prompt();
        }

        //else, tell the user we don't find him/her
        else {
          prevState = "nimTidakDitemukan";
          console.log(`mahasiswa dengan NIM ${NIMMAhasiswa} tidak terdaftar`);
          rl.setPrompt("Masukkan NIM : ");
          rl.prompt();
        }
      }

      //=============================
      //adding new student & prompting his/her name
      //=============================
      else if (line.trim() === "3" && prevState === "mahasiswaMenu") {
        view.addMember()
        prevState = "tambahMuridNAMA";
        rl.setPrompt("NAMA:");
        rl.prompt();
      }

      //=============================
      //adding new student & prompting his/her identification number (NIM)
      //=============================
      else if (prevState === "tambahMuridNAMA") {
        newStudent.MAHASISWAID = data.mahasiswa.length + 1;
        newStudent.NAMA_MAHASISWA = line;
        prevState = "tambahMuridNIM";
        rl.setPrompt("NIM:");
        rl.prompt();
      }

      //=============================
      //adding new student & prompting his/her field of study
      //=============================
      else if (prevState === "tambahMuridNIM") {
        newStudent.NIM = line;
        prevState = "tambahMuridJURUSAN";
        rl.setPrompt("JURUSAN:");
        rl.prompt();
      }

      //=============================
      //adding new student & prompting his/her age
      //=============================
      else if (prevState === "tambahMuridJURUSAN") {
        newStudent.JURUSANID = Number(line);
        prevState = "tambahMuridUMUR";
        rl.setPrompt("UMUR:");
        rl.prompt();
      }

      //=============================
      //adding new student & prompting his/her address
      //=============================
      else if (prevState === "tambahMuridUMUR") {
        newStudent.UMUR = Number(line);
        prevState = "tambahMuridALAMAT";
        rl.setPrompt("ALAMAT:");
        rl.prompt();
      }

      //=============================
      //adding new student & prompting his/her field of study
      //=============================
      else if (prevState === "tambahMuridALAMAT") {
        newStudent.ALAMAT = line;
        prevState = "mahasiswaMenu";
        data.mahasiswa.push(newStudent);
        view.cliTable(data, "mahasiswa")
        view.mahasiswaMenu();
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //delete student menu
      //=============================
      else if (line.trim() === "4" && prevState === "mahasiswaMenu") {
        prevState = "hapusMurid";
        view.singleLine();
        rl.setPrompt("masukkan NIM mahasiswa yang akan dihapus:");
        rl.prompt();
      }

      //=============================
      //the logic for deleting the student
      //=============================
      else if (prevState === "hapusMurid") {
        var NIMMAhasiswa = line;
        var indexMahasiswa = model.searchMember(NIMMAhasiswa, data, "mahasiswa", "NIM");
        data.mahasiswa = model.deleteData(data, indexMahasiswa.index, "mahasiswa");
        view.cliTable(data, "mahasiswa")
        console.log(`mahasiswa dengan NIM: ${NIMMAhasiswa} telah dihapus`);
        view.mahasiswaMenu();
        prevState = "mahasiswaMenu";
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //going back to the main menu
      //=============================
      else if (line.trim() === "5" && prevState === "mahasiswaMenu") {
        prevState = "mainMenu";
        view.mainMenu();
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //field of study menu
      //=============================
      else if (line.trim() === "2" && prevState === "mainMenu") {
        prevState = "mainMenu";
        view.cliTable(data, "jurusan")
        view.mainMenu();
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //Teachers menu
      //=============================
      else if (line.trim() === "3" && prevState === "mainMenu") {
        view.dosenMenu();
        prevState = "dosenMenu"
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //displaying all teachers
      //=============================
      else if(line.trim() === "1" && prevState === "dosenMenu") {
        view.cliTable(data, "dosen")
        view.dosenMenu();
        prevState = "dosenMenu"
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //searching teachers menu & prompting for his/her identification number (NIP)
      //=============================
      else if(line.trim() === "2" && prevState === "dosenMenu") {
        prevState = "dosenMenuCariDosen"
        view.singleLine();
        rl.setPrompt("Masukkan NIP : ");
        rl.prompt();
      }

      //=============================
      //the logic behind teachers search
      //=============================
      else if (prevState === "dosenMenuCariDosen" || prevState === "nipTidakDitemukan") {
        let NIPDosen = line;
        //let selectedDosen = searchDosen(NIPDosen, data.dosen);
        let selectedDosen = model.searchMember(NIPDosen, data, "dosen", "NIP")
        //if we found the teacher, we will display his/her data to the user
        if(selectedDosen) {
          view.cariDosen(
            selectedDosen.data.NAMA_DOSEN,
            selectedDosen.data.NIP);
          view.dosenMenu();
          prevState = "dosenMenu";
          rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
          rl.prompt();
        }

        //otherwise, tell the user we did't find him/her
        else {
          console.log(`dosen dengan NIP ${NIPDosen} tidak terdaftar`);
          rl.setPrompt("Masukkan NIP : ");
          prevState = "nipTidakDitemukan"
          rl.prompt();
        }
      }

      //=============================
      //adding new teacher && prompting for his/her name
      //=============================
      else if(line.trim() === "3" && prevState === "dosenMenu") {
        view.addMember()
        rl.setPrompt("NAMA: ");
        prevState = "tambahDosenNama";
        rl.prompt();
      }

      //=============================
      //adding new teacher && prompting for his/her user identification (NIP)
      //=============================
      else if(prevState === "tambahDosenNama") {
        newDosen.DOSENID = data.dosen.length + 1;
        newDosen.NAMA_DOSEN = line;
        rl.setPrompt("NIP: ");
        prevState = "tambahDosenNIP"
        rl.prompt();
      }

      //=============================
      //adding the new teacher into the database
      //=============================
      else if(prevState === "tambahDosenNIP") {
        newDosen.NIP = line;
        data.dosen.push(newDosen)
        view.cliTable(data, "dosen")
        view.dosenMenu()
        prevState = "dosenMenu"
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //delete teacher menu && prompting for his/her NIP
      //=============================
      else if(line.trim() === "4" && prevState === "dosenMenu") {
        prevState = "hapusDosen";
        view.singleLine();
        rl.setPrompt("masukkan NIP Dosen yang akan dihapus:");
        rl.prompt();
      }

      //=============================
      //delete teacher logic
      //=============================
      else if(prevState === "hapusDosen" || prevState === "gagalHapusDosen") {
        var NIPDosen = line;
        var indexDosen = model.searchMember(NIPDosen, data, "dosen", "NIP")
        //if we find the teacher, delete him/her data, and tell the user
        if(indexDosen !== undefined) {
          data.dosen = model.deleteData(data, indexDosen.index, "dosen");
          view.cliTable(data, "dosen")
          console.log(`dosen dengan NIP ${NIPDosen} telah dihapus`);
          view.dosenMenu();
          rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
          prevState = "dosenMenu"
          rl.prompt();
        }

        //otherwise, prompt the user again for his/her NIP
        else {
          console.log(`dosen dengan NIP ${NIPDosen} tidak terdaftar`);
          rl.setPrompt("masukkan NIP Dosen yang akan dihapus:");
          prevState = "gagalHapusDosen"
          rl.prompt();
        }
      }

      //=============================
      //going back to main menu from teacher's menu
      //=============================
      else if (line.trim() === "5" && prevState === "dosenMenu") {
        view.mainMenu();
        prevState = "mainMenu";
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //the coursework's menu
      //=============================
      else if (line.trim() === "4" && prevState === "mainMenu") {
        view.cliTable(data, "matakuliah")
        view.mainMenu();
        prevState = "mainMenu"
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //kontrakkuliah menu
      //=============================
      else if (line.trim() === "5" && prevState === "mainMenu") {
        view.cliTable(data, "kontrakkuliah")
        view.mainMenu();
        prevState = "mainMenu"
        rl.setPrompt("masukkan salah satu no. dari opsi diatas :");
        rl.prompt();
      }

      //=============================
      //logout menu
      //=============================
      else if (line === "6" && prevState === "mainMenu") {

        //comparing whether the user make a change to the database
        var dataComparison = JSON.stringify(originalData) === JSON.stringify(data);

        //if the user did not change the database, logout the user
        if(dataComparison) {
          selectedUser = undefined;
          view.noDataChange()
          view.logout()
          view.startingHeader()
          prevState = "askingUsername"
          rl.setPrompt("Username :");
          rl.prompt();
        }

        //otherwise, set the state that there is a change, prompt for confirmation
        //whether to save the change or not
        else {
          prevState = "differentDataComparison"
          view.dataChangePrompt()
          rl.setPrompt("yes/no :");
          rl.prompt();
        }
      }

      //=============================
      //logout confirmation logic (the user want to save the database changes)
      //=============================
      else if( (line.trim().toLowerCase() === "y" || line.trim().toLowerCase() === "yes") && prevState === "differentDataComparison") {
        selectedUser = undefined;
        view.savingData()
        prevState = "askingUsername"
        model.saveDatabase(originalData, data)
        originalData = data;
        rl.setPrompt("Username :");
        rl.prompt();
      }

      //=============================
      //logout confirmation logic (the user don't want to save the database changes)
      //=============================
      else if( (line.trim().toLowerCase() === "n" || line.trim().toLowerCase() === "no") && prevState === "differentDataComparison") {
        view.noDataChange();
        prevState = "askingUsername"
        rl.setPrompt("Username :");
        rl.prompt();
      }
    }
  });
});
