import "./edit-form.css";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import employerApi from "../../../api/employer";
import EmployerDetailView from "../../../components/EmployerDetailView";
import EditForm from "./EditForm";

export default function EmployerDetail() {
  const [detail, setDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const getDetail = async () => {
    const res = await employerApi.getDetail();
    setDetail(res);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="bg-white ms-4 mt-3 pb-3 position-relative">
      <div className="pt-3" style={{ marginLeft: "45px" }}>
        <h5 className="text-main">Thông tin công ty</h5>
        {!isEdit ? (
          <>
            <EmployerDetailView employer={detail} className="mt-3" />
            <Button
              className="position-absolute"
              style={{ top: '30px', right: '16px' }}
              onClick={() => setIsEdit(true)}
            >
              Sửa thông tin
            </Button>
          </>
        ) : (
          <EditForm
            className="mt-3 w-60"
            employer={detail}
            getDetail={getDetail}
            returnView={() => setIsEdit(false)}
          />
        )}
      </div>
    </div>
  );
}
