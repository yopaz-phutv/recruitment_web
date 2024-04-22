import Button from "react-bootstrap/Button";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/auth";
import { employerAuthActions } from "../../../redux/slices/employerAuthSlice";

export default function RegisterPreview({ employer, setIsEdit }) {
  const nav = useNavigate();
  const dispatch = useDispatch()

  const handleQuit = async () => {
    await authApi.logout(2);
    dispatch(employerAuthActions.logout());
    localStorage.removeItem("employer_jwt");
    nav("/employer/login");
  };

  return (
    <div
      className="border mx-auto p-3 shadow bg-white rounded position-relative"
      style={{ width: "740px" }}
    >
      <div
        to="/employer/login"
        className="position-absolute top-0 ts-sm text-primary pointer"
        style={{ left: "5px" }}
        onClick={handleQuit}
      >
        <IoIosArrowBack style={{ marginBottom: "1px" }} />
        Đăng nhập
      </div>
      <div className="ts-smd text-success text-center">
        Vui lòng đợi admin duyệt thông tin tài khoản nhà tuyển dụng của bạn!
      </div>
      <h5 className="text-center text-main mt-2 pb-2">Thông tin đã đăng ký</h5>
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
      <Button
        className="mt-3 px-5 d-block mx-auto"
        onClick={() => {
          if (!employer.user?.is_denied) setIsEdit(true);
          else nav("/employer/signup");
        }}
      >
        {!employer.user?.is_denied ? "Sửa thông tin" : "Đăng ký mới"}
      </Button>
    </div>
  );
}
