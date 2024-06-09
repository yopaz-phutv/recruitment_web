import NumberItem from "../../../components/statistics/NumberItem";

export default function AdminGeneral() {
  return (
    <div className="pt-3 ps-3">
      <div className="bg-white py-3 ps-5 vh-100">
        <h4 className="text-main">Tổng quan</h4>
        <div className="mt-4 mx-auto row row-cols-3">
          <NumberItem title="Số tài khoản ứng viên" number={2000} />
          <NumberItem title="Số tài khoản nhà tuyển dụng" number={350} />
          <NumberItem title="Số đơn ứng tuyển thành công" number={1000} />
          <NumberItem
            items={[
              { title: "Số lượt truy cập trang web trong ngày", value: 1000 },
              { title: "Số lượt truy cập trang web trong tuần", value: 6000 },
              { title: "Số lượt truy cập trang web trong tháng", value: 24000 },
            ]}
          />
          <NumberItem
            items={[
              { title: "Số bài đăng tuyển dụng trong ngày", value: 180 },
              { title: "Số bài đăng tuyển dụng trong tuần", value: 680 },
              { title: "Số bài đăng tuyển dụng trong tháng", value: 2400 },
            ]}
          />
          <NumberItem
            items={[
              { title: "Số đơn ứng tuyển trong ngày", value: 500 },
              { title: "Số đơn ứng tuyển trong tuần", value: 3000 },
              { title: "Số đơn ứng tuyển trong tháng", value: 12000 },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
