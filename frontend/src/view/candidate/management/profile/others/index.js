import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useContext, useState } from "react";
import OtherFormDialog from "./OtherFormDialog";
import { CandidateContext } from "../../layouts";
import FrameLayout from "../FrameLayout";
import otherApi from "../../../../../api/other";

export default function Other() {
  const { others, setOthers, getOthers } = useContext(CandidateContext);
  const [actType, setActType] = useState("VIEW");
  const [current, setCurrent] = useState({});

  const handleDelete = async (id) => {
    let choice = window.confirm("Bạn có chắc muốn xóa Thông tin này?");
    if (choice) {
      await otherApi.destroy(id);
      let temp = others.filter((item) => {
        return item.id !== id;
      });
      setOthers(temp);
    }
  };
  const handleEdit = (item) => {
    setActType("EDIT");
    setCurrent(item);
  };

  return (
    <FrameLayout
      title="Thông tin khác"
      hasaddbtn={true}
      className="mt-4"
      setActType={setActType}
      titleId="profile-other"
    >
      {others?.map((item, index) => (
        <div key={index}>
          <hr />
          <div className="position-relative">
            <div className="border-0 border-main border-start ps-3">
              <div className="fw-bold">{item.name}</div>
              <div className="ts-smd text-break">
                Mô tả:
                <span className="text-secondary"> {item.description}</span>
              </div>
            </div>
            <div className="position-absolute top-0 end-0">
              <Stack direction="horizontal" gap={2}>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => handleEdit(item)}
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Xóa
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      ))}
      {actType !== "VIEW" && (
        <OtherFormDialog
          actType={actType}
          setActType={setActType}
          current={current}
          getAll={getOthers}
        />
      )}
    </FrameLayout>
  );
}
