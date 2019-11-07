var nguoiDungService = new NguoiDungService();

function themTestGit(){
<<<<<<< HEAD
    console.log("them ducvidai");
}
=======
    console.log("them nguoi dung");
}

>>>>>>> master
getListUser();

getEle("btnThemNguoiDung").addEventListener("click",function(){
    var title  = "Thêm Người Dùng";
    var footer = `
        <button id="btnThem" class="btn btn-success" onclick="themNguoiDung()">Thêm</button>
    `;
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

//Thêm Người Dùng
function themNguoiDung(){
    var taikhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung= getEle("loaiNguoiDung").value;

    var nguoiDung = new NguoiDung(taikhoan, hoTen, matKhau, email,soDT, maLoaiNguoiDung);
    // console.log(nguoiDung);

    nguoiDungService.themNguoiDung(nguoiDung)
        .then(function(result){
            console.log(result);
            getListUser();
        })
        .catch(function(error){
            console.log(error);
        });
}
function getListUser(){
    nguoiDungService.layDanhSachNguoiDung()
    .then(function(result){
            // console.log(result.data);
            // this.mangNguoiDung = result.data;
            setLocalStorage(result.data); // tao fan setlocalstorage trong then
            renderTable(result.data);
        })
        .catch(function(error){
            console.log(error);
        });
    
}




function renderTable(mangNguoiDung){
    var contentHTML = "";
    mangNguoiDung.map(function(item,index){
        contentHTML +=`
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.soDT}</td>
                <td>${item.maLoaiNguoiDung}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="sua(${item.id})">Sua</button>
                    <button class="btn btn-danger" onclick="xoa(${item.id})">XOa</button>
                </td>
            </tr>
        `;

    });
    getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

// Chức năng xóa
function xoa(id){
    console.log(id);
    nguoiDungService.xoaNguoiDung(id) 
        .then(function(result){
            getListUser();
        })
        .catch(function(error){
            console.log(error);
            // if(error.response.status === 404){
            //     alert("ma nguoi dung sai")
            // }
        });
}

// sua nguoi dung
function sua(id){
    console.log(id);
    var title = "sữa người dùng";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    // cach 2:
    // document.getElementsByClassName[0].innerHTML = "sua nguoi dung";
    var footer = `
        <button class="btn btn-success" onclick="capnhat(${id})"> cập nhật</button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    nguoiDungService.layThongTinNguoiDung(id)
        .then(function(result){
            // getListUser();
            console.log(result);
            getEle("TaiKhoan").setAttribute("disabled",true);
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("SoDienThoai").value = result.data.soDT;
            getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
        })
        .catch(function(error){
            console.log(error);
        })
}

// cap nhat nguoi dùng
function capnhat(id){
    console.log(id);

    var taikhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung= getEle("loaiNguoiDung").value;
    
    var nguoiDung = new NguoiDung(taikhoan,hoTen,matKhau,email,soDT,maLoaiNguoiDung);
    console.log(nguoiDung);

    nguoiDungService.capNhatNguoiDung(id, nguoiDung)
        .then(function(result){
            getListUser();
        })
        .catch(function(error){
            console.log(error);
        })
}

// Luu mảng người dùng xuo1ng LocalStorage
function setLocalStorage(mangNguoiDung){ // tao tham so mangNguoiDung
    localStorage.setItem("DanhSachNguoiDung",JSON.stringify(mangNguoiDung));
}

//Chưc năng Tỉm kiếm
getEle("txtSearch").addEventListener("keyup", function(){
    var chuoiTimKiem = getEle("txtSearch").value;
    // console.log(323);
    var mangNguoiDung = getLocalStorage();
    console.log(mangNguoiDung);

   var mangTimKiem = nguoiDungService.timKiemNguoiDung(chuoiTimKiem, mangNguoiDung);

   renderTable(mangTimKiem);
});

// Lấy mảng người dùng xuống localStorange
function getLocalStorage(){
    if(localStorage.getItem("DanhSachNguoiDung")){
     return JSON.parse(localStorage.getItem("DanhSachNguoiDung"));
    }
}


function getEle(id){
    return document.getElementById(id);
}