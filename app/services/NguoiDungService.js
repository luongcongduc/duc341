function NguoiDungService(){
    // this.mangNguoiDung = [];
    this.themNguoiDung = function(nguoiDung){
        // this.mangNguoiDung.push(NguoiDung);
        return axios({
            method : "POST", 
            url: "http://5dbacbbc3ec5fb0014319423.mockapi.io/NguoiDung",
            data: nguoiDung
        });
};

    this.layDanhSachNguoiDung = function(){
        // Get: lấy danh sach người dùng về
        // post: thêm người dùng lên server
        //put : cập nhật người dùng
        // Delete: xóa người dùng
        return axios({
            // method la giao thuc
            //key: value
            method: "GET",
            url: "http://5dbacbbc3ec5fb0014319423.mockapi.io/NguoiDung",
        });
        // .then(function(result){
        //     // console.log(result.data);
        //     // this.mangNguoiDung = result.data;

        //     renderTable(result.data);
        // })
        // .catch(function(error){
        //     console.log(error);
        // });

        // console.log(this.mangNguoiDung);
        // // bị lỗi bất đồng bộ
    };

    this.xoaNguoiDung = function(id){
        return axios({
            method : "DELETE",
            url: `http://5dbacbbc3ec5fb0014319423.mockapi.io/NguoiDung/${id}`,
        });
    };

    this.layThongTinNguoiDung = function(id){
        return axios({
            method : "GET",
            url: `http://5dbacbbc3ec5fb0014319423.mockapi.io/NguoiDung/${id}`,
        });
    };

    this.capNhatNguoiDung = function(id, nguoiDung){
        return axios({
            method : "PUT",
            url: `http://5dbacbbc3ec5fb0014319423.mockapi.io/NguoiDung/${id}`,
            data: nguoiDung,
        });
    };

    this.timKiemNguoiDung = function(chuoiTimKiem, mangNguoiDung){
        /**
         * 1. tao mảng rỗng mangTimKiem
         * 2. Duyệt mangNguoiDung
         * 3. sữ dụng hàm indexOf so sánh
         * 4. Thêm người dùng tìm thấy vào mảng mangTimKiem
         */

        //  Cách 1:
        // var mangTimKiem = [];
        // mangNguoiDung.map(function(item){
        //     if(item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1){
        //         mangTimKiem.push(item);
        //     }
        // });

        // return mangTimKiem;


        // Cách 2 dùng filter
       return mangNguoiDung.filter(function(item){
            return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
        });
    };
}


