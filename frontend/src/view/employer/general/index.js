import useGetJobsByEmployer from "../../../hooks/useGetJobsByEmployer";
import NumberItem from "../../../components/statistics/NumberItem";
import TextItem from "../../../components/statistics/TextItem";

export default function EmployerGeneral() {
  const { jobs } = useGetJobsByEmployer();

  return (
    <div
      className="bg-white ms-3 mt-3 shadow-sm"
      style={{ paddingLeft: "45px", paddingRight: "35px", height: "92.5%" }}
    >
      <h4 className="mb-2 pt-3 text-main">Tổng quan</h4>
      <div className="mt-4 mx-auto row row-cols-3">
        <NumberItem title="Số job đã đăng" number={9} />
        <NumberItem title="Số job chưa có ứng viên" number={3} />
        <NumberItem title="Số ứng viên đăng ký nhận thông báo" number={50} />
        <NumberItem title="Số hồ sơ chưa xem" number={20} />
        <NumberItem
          items={[
            { title: "Số hồ sơ nộp tới trong ngày", value: 4 },
            { title: "Số hồ sơ nộp tới trong tuần", value: 13 },
            { title: "Số hồ sơ nộp tới trong tháng", value: 62 },
          ]}
        />
        <TextItem title="Job được quan tâm nhiều nhất" text={jobs[0]?.jname} />
      </div>
    </div>
  );
}
