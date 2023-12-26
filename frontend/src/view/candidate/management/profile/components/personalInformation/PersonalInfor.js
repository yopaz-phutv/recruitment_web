import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FrameLayout from "../frameLayout";
import dayjs from "dayjs";
import candidateApi from "../../../../../../api/candidate";
import { FaUser } from "react-icons/fa";
import PersonalInforFormDialog from "./PersonalInforFormDialog";

export default function PersonalInfor() {
  const [infor, setInfor] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [hasImg, setHasImg] = useState(false);
  const none = <span className="text-danger">Chưa có</span>;
  const itemStyle = "border-0 border-bottom w-95 pb-1";

  const getInfor = async () => {
    const res = await candidateApi.getCurrent();
    console.log("infor::", res);
    setInfor(res);
  };
  const isAuth = useSelector((state) => state.candAuth.isAuth);

  const handleEdit = () => {
    setIsEdit(true);
  };
  useEffect(() => {
    if (isAuth) {
      getInfor();
    }
  }, [isAuth]);

  return (
    <FrameLayout title="Thông tin cá nhân" hasaddbtn={false} className="mt-4">
      <hr />
      <div className="d-flex gap-5 flex-wrap align-items-center">
        <div className="ms-4" style={{ width: "150px", height: "150px" }}>
          {infor.avatar ? (
            <img
              src={infor.avatar}
              alt="image_error"
              width="100%"
              height="100%"
              className="rounded-pill avatar-img"
            />
          ) : (
            <FaUser
              className="rounded-pill text-bg-secondary p-1"
              style={{ fontSize: "130px" }}
            />
          )}
        </div>
        <div>
          <span className="ts-sm text-secondary">Mục tiêu nghề nghiệp</span>
          <br />
          <span className="ts-ssm fw-500 whitespace-pre-line">
            {infor.objective || none}
          </span>
        </div>
      </div>
      <hr />
      <div className="row row-cols-md-2 row-cols-sm-1">
        <div>
          <div className={itemStyle}>
            <span className="ts-sm text-secondary">Họ tên</span> <br />
            <span className="ts-ssm fw-500">
              {infor.lastname + " " + infor.firstname}
            </span>
          </div>
        </div>
        <div>
          <div className={itemStyle}>
            <span className="ts-sm text-secondary">Giới tính</span> <br />
            <span className="ts-ssm fw-500">
              {infor.gender === 0 && "Nam"}
              {infor.gender === 1 && "Nữ"}
              {infor.gender === undefined && none}
            </span>
          </div>
        </div>
        <div>
          <div className={itemStyle}>
            <span className="ts-sm text-secondary">Ngày sinh</span> <br />
            <span className="ts-ssm fw-500">
              {infor.dob ? dayjs(infor.dob).format("DD/MM/YYYY") : none}
            </span>
          </div>
        </div>
        <div>
          <div className={itemStyle}>
            <span className="ts-sm text-secondary">Số điện thoại</span> <br />
            <span className="ts-ssm fw-500">{infor.phone || none}</span>
          </div>
        </div>
        <div>
          <div className={itemStyle}>
            <span className="ts-sm text-secondary">Email</span> <br />
            <span className="ts-ssm fw-500">{infor.email || none}</span>
          </div>
        </div>
        <div>
          <div className={itemStyle}>
            <span className="ts-sm text-secondary">Địa chỉ</span> <br />
            <span className="ts-ssm fw-500">{infor.address || none}</span>
          </div>
        </div>
        <div>
          <div className={itemStyle}>
            <span className="ts-sm text-secondary">Liên kết</span> <br />
            <a href={infor.link} className="ts-ssm fw-500">{infor.link || none}</a>
          </div>
        </div>
      </div>
      {/* <div>
        <div className="mt-2">
          <span className="ts-sm text-secondary">Mục tiêu nghề nghiệp</span>
          <br />
          <span className="ts-ssm fw-500 whitespace-pre-line">
            {infor.objective || none}
          </span>
        </div>
      </div> */}
      <div className="clearfix">
        <Button
          variant="outline-primary"
          size="sm"
          className="me-3 float-md-end"
          onClick={handleEdit}
        >
          Cập nhật
        </Button>
      </div>
      {isEdit && (
        <PersonalInforFormDialog
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          infor={infor}
          hasImg={hasImg}
          setHasImg={setHasImg}
          getInfor={getInfor}
        />
      )}
    </FrameLayout>
  );
}
