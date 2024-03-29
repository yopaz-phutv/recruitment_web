export const sample = {
  basicInfor: {
    fullname: "Ngô Thị Thoa",
    dob: new Date("1992-02-02"),
    phone: "0333333333",
    email: "ngothoa22@gmail.com",
    link: "link@recruitment.com",
    address: "Long Biên, Hà Nội",
    gender: 1,
    objective:
      "Áp dụng những kinh nghiệm về kỹ năng bán hàng và sự hiểu biết về thị trường để trở thành một nhân viên bán hàng chuyên nghiệp, mang đến nhiều giá trị cho khách hàng. Từ đó giúp Công ty tăng số lượng khách hàng và mở rộng tập khách hàng.",
  },
  educations: [
    {
      school: "Đại học Recruitment",
      major: "QUẢN TRỊ DOANH NGHIỆP",
      start_date: new Date("2010-10"),
      end_date: new Date("2014-05"),
      description: "Tốt nghiệp loại Giỏi, điểm trung bình 8.0",
    },
  ],
  experiences: [
    {
      name: "Nhân viên bán hàng",
      company: "Cửa hàng XYZ",
      start_date: new Date("2014-03"),
      end_date: new Date("2015-02"),
      description:
        "- Bán hàng trực tiếp tại cửa hàng cho người nước ngoài và người Việt.\n- Quảng bá sản phẩm thông qua các ấn phẩm truyền thông: banner, poster, tờ rơi...\n- Lập báo cáo sản lượng bán ra hàng ngày.",
    },
    {
      name: "Nhân viên bán hàng",
      company: "Công ty ABC",
      start_date: new Date("2015-03"),
      end_date: new Date("2015-08"),
      description:
        "- Hỗ trợ viết bài quảng cáo sản phẩm qua kênh facebook, các forum,...\n- Giới thiệu, tư vấn sản phẩm, giải đáp các vấn đề thắc mắc của khách hàng qua điện thoại và email.",
    },
  ],
  projects: [],
  skills: [
    {
      name: "Tin học văn phòng",
      description: "- Sử dụng thành thạo các công cụ Word, Excel, Power Point",
    },
    {
      name: "Tiếng Anh",
      description: "- Khả năng giao tiếp Tiếng Anh trôi chảy",
    },
  ],
  certificates: [
    { name: "Chứng chỉ Tiếng Anh A2", receive_date: new Date("2013-03") },
  ],
  prizes: [
    {
      name: "Giải nhất Tài năng ABC",
      receive_date: new Date("2013-08"),
    },
  ],
  activities: [
    {
      organization: "Môi trường xanh ABC",
      role: "Tình nguyện viên",
      is_present: 0,
      start_date: new Date("2013-10"),
      end_date: new Date("2014-06"),
      description:
        "Tập hợp các món quà và phân phát tới người vô gia cư.\n- Chia sẻ, động viên họ vượt qua giai đoạn khó khăn, giúp họ có những suy nghĩ lạc quan.",
    },
  ],
  others: [],
};
export default sample;
