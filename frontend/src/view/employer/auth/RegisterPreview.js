import Button from "react-bootstrap/Button";

export default function RegisterPreview({ employer }) {
  return (
    <div
      className="border mx-auto p-3 shadow bg-white rounded"
      style={{ width: "740px" }}
    >
      <h5 className="text-center text-main pb-2">Thông tin đã đăng ký</h5>
      <div className="d-flex">
        <div className="fw-600 w-20">Tên:</div>
        {employer.name}
      </div>
      <div className="d-flex mt-1">
        <div className="fw-600 w-20">Quy mô:</div>
        {employer.min_employees ? (
          <div>
            {employer.min_employees}
            {employer.max_employees !== 0
              ? " - " + employer.max_employees
              : "+ "}{" "}
            nhân viên
          </div>
        ) : (
          "Chưa cập nhật"
        )}
      </div>
      {employer.tax_code && (
        <div className="d-flex mt-1">
          <div className="fw-600 w-20">Mã số thuế:</div>
          {employer.tax_code}
        </div>
      )}
      <div className="d-flex mt-1">
        <div className="fw-600 w-20">Người liên hệ:</div>
        {employer.contact_name}
      </div>
      <div className="d-flex mt-1">
        <div className="fw-600 w-20">Điện thoại:</div>
        {employer.phone}
      </div>
      <div className="d-flex mt-1">
        <div className="fw-600 w-20">Email:</div>
        {employer.user?.email}
      </div>
      <div className="d-flex mt-1">
        <div className="fw-600 w-20">Địa chỉ:</div>
        <div className="w-80 whitespace-preline">{employer.address}</div>
      </div>
      <Button className="mt-3 px-5 d-block mx-auto">Sửa thông tin</Button>
    </div>
  );
}
