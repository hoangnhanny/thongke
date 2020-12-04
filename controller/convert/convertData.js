const { convertTime } = require("./convertTime");

const handleData = (list) => {
    // const list: any[] = await this.elasticSearch.run();
    // Tạo mảng danh sách mới với thời gian đã được convert theo định dạng hour:00
    list.map((element) => {
        element.created_at = convertTime(element.created_at);
    });
    const k = list.reduce((arrList, ele, index) => {
        //Lấy danh sách các URL từ mảng lưu trữ các giá trị
        const b = arrList.map((element) => {
            return element.url;
        });
        //Lấy danh sách các time từ mảng lưu trữ các giá trị
        const b1 = arrList.map((element) => {
            return element.time;
        });

        // Kiểm tra url và time đã tồn tại chưa
        if (b.includes(ele.current_url) && b1.includes(ele.created_at)) {
            // Nếu có tăng count lên
            arrList.map((element) => {
                if (element.url === ele.current_url) {
                    element.count++;
                }
            });
        } else {
            // Nếu chưa thì tạo mới 1 phần tử rồi đẩy vào mảng lưu trữ
            const data = {
                count: 1,
                time: ele.created_at,
                url: ele.current_url,
                app: ele.app_id,
            };
            arrList.push(data);
        }
        return arrList;
    }, []);
    return k;
};

exports.handleData = handleData;
