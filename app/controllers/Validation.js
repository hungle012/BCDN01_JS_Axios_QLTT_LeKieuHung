function Validation() {
    //Phương thức
    this.checkEmpty = function (inputval, spanID, message) {
        if (inputval.trim() == "") {
            //Không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        } else {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }
    
    //kiểm tra tài khoản trùng
    this.checkID = function (inputval, spanID, message, mang) {
        //Kiểm tra mã đã tồn tại trong mảng
        var isExist = false;
        isExist = mang.some(function(item) {
            return item.taiKhoan === inputval.trim();
        });
        if (isExist) {
            //không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        } else {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }

    this.checkName=function(inputval, spanID, message){
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
        if(pattern.test(inputval)){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }

    }

    this.checkEmail = function(inputval, spanID, message){
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(inputval.match(pattern)){
              //hợp lệ
              document.getElementById(spanID).innerHTML = "";
              return true;
        }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    this.checkDropdown = function(selID,spanID, message){
        var optIndex = document.getElementById(selID).selectedIndex;
    
        if(optIndex != 0){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }    
    this.checkPass = function(inputval, spanID, message){
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if(inputval.match(pattern)){
             //hợp lệ
             document.getElementById(spanID).innerHTML = "";
             return true;
        }else{
             // không hợp lệ
             document.getElementById(spanID).innerHTML = message;
             return false;
        }
    }
    this.checkLength = function(inputval, spanID, message){
        var pattern =  /([a-zA-Z1-9 +àáảạãâầấẩậẫđèéẻẹẽêềếểệễìíỉịĩòóỏọõơờớởợỡôồốổộỗùúủụũưừứửựữỳýỷỵỹ &.,]){1,60}/;
        if(inputval.match(pattern) && inputval.length <= 60){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            // console.log(inputval.length);
            return true;
       }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
       }
    }
   


}