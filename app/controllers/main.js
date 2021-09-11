var ndServices = new NguoiDungServices();
var validation = new Validation();

// lấy danh sách người dùng
function layDSND() {
    ndServices.layDS()
    .then(function(response) {
        // thành công
        // console.log(response.data);
        hienThiTable(response.data);
    })
    .catch(function(error) {
        // thất bại
        console.log(error);
    });
}
layDSND();

// hiển thị
function hienThiTable(mangND) {
    var content = "";
    mangND.map(function(item,index) {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.ngonNgu}</td>
            <td>${item.loaiND}</td>
            <td class="row-2">
                <button class="btn btn-danger" onclick="xoa('${item.id}');">Xóa</button>
                <button class="btn btn-info" onclick="layChiTiet('${item.id}');" data-toggle="modal" data-target="#myModal">Xem</button>
            </td>
        </tr>
        `;
    });
    document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}

// lấy dữ liệu từ form
function layDuLieu(mangND) {
    var taiKhoan = document.getElementById("TaiKhoan").value;
    var hoTen = document.getElementById("HoTen").value;
    var matKhau = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var hinhAnh = document.getElementById("HinhAnh").value;
    var loaiND = document.getElementById("loaiNguoiDung").value;
    var ngonNgu = document.getElementById("loaiNgonNgu").value;
    var moTa = document.getElementById("MoTa").value;

    // validation
    var isValid = true;

    // check tài khoản
    if (document.getElementById("TaiKhoan").disabled != true) {
        isValid = validation.checkEmpty(taiKhoan, "tbTK", "Tài Khoản không được để trống!") && validation.checkID(taiKhoan, "tbTK", "Tài Khoản bị trùng!", mangND);
    }

    // check name
    isValid &= validation.checkEmpty(hoTen, "tbHoTen", "Tên NV không được để trống!") && validation.checkName(hoTen, "tbHoTen", "Tên không chứa số và ký tự đặc biệt");

    // check email
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống!") && validation.checkEmail(email, "tbEmail", "Email không đúng định dạng");

    //Kiểm tra pass  
    isValid &= validation.checkEmpty(matKhau, "tbMatKhau", "Mật khẩu không được để trống!") && validation.checkPass(matKhau, "tbMatKhau", "Mật khẩu chưa đúng định dạng");

    //Kiểm tra hình ảnh
    isValid &= validation.checkEmpty(hinhAnh, "tbHinhAnh", "Hình ảnh không được để trống!");

    //Kiểm tra loại người dùng
    isValid &= validation.checkDropdown("loaiNguoiDung", "tbLoaiND", "Bạn chưa chọn loại người dùng nào!");

    //Kiểm tra loại ngôn ngữ 
    isValid &= validation.checkDropdown("loaiNgonNgu", "tbNgonNgu", "Bạn chưa chọn loại ngôn ngữ nào!");

    // kiểm tra mô tả
    isValid &= validation.checkEmpty(moTa, "tbMoTa", "Mô tả không được để trống!") && validation.checkLength(moTa, "tbMoTa", "Mô tả không quá 60 kí tự");

    if (isValid) {
        var nd = new NguoiDung(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);

        return nd;
    } else {

        return 0;
    }
}

// thêm người dùng
function them() {
    ndServices.layDS()
    .then(function(response) {
        var nd = layDuLieu(response.data);
        if (nd != 0) {
            ndServices.themND(nd)
            .then(function(response) {
                // console.log(response.data);
                layDSND();
                resetForm();
                document.querySelector("#myModal .close").click();
            })
            .catch(function(erorr) {
                console.log(error);
            });
        }
    })
    .catch(function (error) {
        console.log(error);
        return;
    });
}

document.querySelector("#btnThemNguoiDung").addEventListener("click", function () {
    document.querySelector(".modal-footer").innerHTML = `
    <button class="btn btn-success" onclick="them();">Thêm</button>
    `;
});

// lấy chi tiết sản phẩm
function layChiTiet(id) {
    ndServices.layND(id)
        .then(function (response) {
            // console.log(response.data);
            document.querySelector("#TaiKhoan").disabled = true;
            document.querySelector("#TaiKhoan").value = response.data.taiKhoan;
            document.querySelector("#HoTen").value = response.data.hoTen;
            document.querySelector("#MatKhau").value = response.data.matKhau;
            document.querySelector("#Email").value = response.data.email;
            document.querySelector("#HinhAnh").value = response.data.hinhAnh;
            document.querySelector("#loaiNguoiDung").value = response.data.loaiND;
            document.querySelector("#loaiNgonNgu").value = response.data.ngonNgu;
            document.querySelector("#MoTa").value = response.data.moTa;
            document.querySelector(".modal-footer").innerHTML = `
            <button class="btn btn-success" onclick="capNhat('${response.data.id}');">Cập Nhật</button>
            `;
        })
        .catch(function () {
            console.log(error);
        });
}

// cập nhật người dùng 
function capNhat(id) {
    var nd = layDuLieu();
    if (nd != 0) {
        ndServices.capNhatND(nd,id)
        .then(function(response){
            // // console.log(response.data);
            layDSND();
            resetForm();
            document.querySelector("#myModal .close").click();
        })
        .catch(function(error){
            console.log(error);
        });
    }
}

function resetForm() {
    document.getElementById("QLTT").reset();
    document.getElementById("TaiKhoan").disabled = false;
}

// xóa
function xoa(id) {
    ndServices.xoaND(id)
        .then(function (response) {
            // console.log(response.data);
            layDSND();
        })
        .catch(function (error) {
            console.log(error);
        });
}