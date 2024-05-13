import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

export default function SavedCandidates() {
  return (
    <div
      className="bg-white ms-4 mt-3 pb-2"
      style={{ paddingLeft: "45px", paddingRight: "35px" }}
    >
      <h5 className="mb-2 pt-3 text-main">Danh sách ứng viên đã đánh dấu</h5>
      <Table hover className="shadow-sm mt-3" style={{ width: "98%" }}>
        <thead className="table-primary ts-smd">
          <tr>
            <th className="fw-500 w-20">Tên</th>
            <th className="fw-500 w-20">Email</th>
            <th className="fw-500">Điện thoại</th>
            <th className="fw-500">Đăng ký lúc</th>
            <th className="fw-500">Cập nhật lúc</th>
            <th className="fw-500">Trạng thái</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
}
