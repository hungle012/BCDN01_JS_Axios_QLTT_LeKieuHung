function NguoiDungServices() {
    // lấy danh sách sản phẩm
    this.layDS = function () {
        return axios({
            method: 'get',
            url: 'https://6136ca2a8700c50017ef5662.mockapi.io/User'
        });
    }
    
    // Thêm
    this.themND = function (nd) {
        return axios({
            method: 'post',
            url: 'https://6136ca2a8700c50017ef5662.mockapi.io/User',
            data: nd
        });
    }

    // lấy người dùng
    this.layND = function(id){
        return axios({
            method: 'get',
            url: `https://6136ca2a8700c50017ef5662.mockapi.io/User/${id}`
        });
    }
    // cập nhật sản phẩm
    this.capNhatND = function(nd,id){
        return axios({
            method: 'put',
            url: `https://6136ca2a8700c50017ef5662.mockapi.io/User/${id}`,
            data:nd
        });
    }
    // cập nhật sản phẩm
    this.xoaND = function(id){
        return axios({
            method: 'delete',
            url: `https://6136ca2a8700c50017ef5662.mockapi.io/User/${id}`
        });
    }


}

