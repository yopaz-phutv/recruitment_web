import "./edit-form.css";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import employerApi from "../../../api/employer";
import EmployerDetailView from "../../../components/EmployerDetailView";
import EditForm from "./EditForm";
import Loading from "../../../components/Loading";

export default function EmployerDetail() {
  const [detail, setDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getDetail = async () => {
    try {
      setIsLoading(true);
      const res = await employerApi.getDetail();
      setDetail(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="bg-white ms-3 mt-3 pb-4 position-relative shadow-sm">
      <div className="pt-3" style={{ marginLeft: "45px" }}>
        <h4 className="text-main">Thông tin công ty</h4>
        {isLoading ? (
          <Loading />
        ) : !isEdit ? (
          <>
            <EmployerDetailView employer={detail} className="mt-3" />
            <Button
              className="position-absolute bg-main border-0"
              style={{ top: "30px", right: "16px" }}
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
