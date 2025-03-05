//import React from 'react';

const PostDetail = () => {
   
    // const data = {
    //     title: 'Đây là tiêu đề bài viết đầy đủ luôn nè',
    //     name: 'Tên tác giả viết bài này đầy đủ',
    //     date: '26/12/2025',
    //     img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //     content: "Những năm gần đây, dầu dừa đã trở nên phổ biến trên toàn thế giới. Nhiều nhà sản xuất đã bắt đầu sử dụng dầu dừa trong các sản phẩm đóng gói và nhiều người đã dùng dầu dừa nấu ăn. Nhiều sản phẩm, chẳng hạn như thực phẩm chiên, đồ ngọt, dầu gội đầu, cà phê, sinh tố đều có chứa dầu dừa. Vậy dầu dừa ăn có tốt không?\n\
    //     1. Dầu dừa là chất béo gì?\n\
    //     Theo Bộ Nông nghiệp Hoa Kỳ cho biết, một thìa cà phê dầu dừa chứa:\n\
    //     Lượng calo: 40\n\
    //     Chất béo: 4,5g\n\
    //     Natri: 0mg\n\
    //     Carbohydrate: 0g\n\
    //     Chất xơ: 0g\n\
    //     Đường: 0g\n\
    //     Chất đạm: 0g\n\
    //      Dầu dừa được tạo ra bằng cách ép chất béo từ “thịt” màu trắng bên trong quả dừa. Khoảng 84% lượng calo của dầu dừa đến từ chất béo bão hòa. Theo các chuyên gia dinh dưỡng giải thích điều này, giống như bơ và mỡ lợn, dầu dừa ở trạng thái rắn ở nhiệt độ phòng, thời hạn sử dụng lâu và có khả năng chịu được nấu ăn ở nhiệt độ cao.\n\
    //     Chất béo bão hòa của dầu dừa được tạo thành phần lớn từ chất béo trung tính chuỗi trung bình hoặc MCT (medium-chain triglycerides). Một số chuyên gia cho rằng cơ thể bạn xử lý chúng khác với chất béo chuỗi dài trong dầu thực vật lỏng, sữa và thịt béo.\n\
    //     Theo Hiệp hội Tim mạch Hoa Kỳ cho biết, người dân cần hạn chế chất béo bão hòa không quá 13 gam mỗi ngày, tương đương với khoảng một thìa dầu dừa.\n\
    //     Các nghiên cứu cho thấy, chất béo bão hòa MCT trong dừa có thể tăng HDL (HDL - giúp loại bỏ LDL) hoặc cholesterol “tốt” trong cơ thể và điều này",
        
    // }

    return (
        <div >
            <div className='lg:w-[80%] w-[90%] mx-auto my-[20px] py-[20px] px-[20px] bg-white border border-gray-300 shadow rounded'>
                <h2 className='flex flex-col lg:text-4xl md:text-3xl text-2xl font-bold mb-[10px]'>{data.title}</h2>
                <div className='flex flex-row mb-[10px] opacity-70'>
                    <h3 className='lg:text-xl md:text-lg text-sm text-left  w-1/2 font-bold opacity-70'>Tác giả: {data.name}</h3>
                    <h3 className='lg:text-xl md:text-lg text-sm text-right w-1/2 mr-[5px] opacity-50'>{data.date}</h3>
                </div>
                <img
                    src= {data.img}
                    alt=""
                    className = "lg:w-full rounded aspect-video mb-[20px] shadow"
                ></img>
                <p className='whitespace-pre-line break-word lg:text-lg md:text-base text-sm mb-[10px]'>
                    {data.content}
                </p>
            </div>
        </div>
    );
};

export default PostDetail;