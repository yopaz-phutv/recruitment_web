import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import ActivityFormDialog from "./ActivityFormDialog";
import activityApi from "../../../../../api/activity";
import { CandidateContext } from "../../layouts";
import FrameLayout from "../FrameLayout";

export default function Activity() {
  const { activities, setActivities, getActivities } =
    useContext(CandidateContext);
  const [actType, setActType] = useState("VIEW");
  const [current, setCurrent] = useState({});

  const handleDelete = async (id) => {
    let choice = window.confirm("Bạn có chắc muốn xóa Hoạt động này?");
    if (choice) {
      await activityApi.destroy(id);
      let temp = activities.filter((item) => {
        return item.id !== id;
      });
      setActivities(temp);
    }
  };
  const handleEdit = (item) => {
    setActType("EDIT");
    setCurrent(item);
  };

  return (
    <FrameLayout
      title="Hoạt động"
      hasaddbtn={true}
      className="mt-4"
      setActType={setActType}
      titleId="profile-activity"
    >
      {activities?.map((item, index) => (
        <div key={index}>
          <hr />
          <div className="position-relative">
          <div className="border-0 border-main border-start ps-3 d-inline-block">
            <div className="fw-bold">{item.organization}</div>
            <div className="ts-smd text-secondary">{item.role}</div>
            {item.start_date || item.start_date ? (
              <div>
                <span className="text-secondary ts-xs">
                  {dayjs(item.start_date).format("DD/MM/YYYY")} -{" "}
                  {!item.is_present
                    ? dayjs(item.end_date).format("DD/MM/YYYY")
                    : "hiện tại"}
                </span>
              </div>
            ) : null}
            <div className="ts-smd">
              {item.link && (
                <div>
                  Link:{" "}
                  <a href={item.link} className="text-decoration-none">
                    {item.link}
                  </a>
                </div>
              )}
              <div className="text-break">
                Mô tả:
                <span className="text-secondary"> {item.description}</span>
              </div>
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
          </div></div>
        </div>
      ))}
      {actType !== "VIEW" && (
        <ActivityFormDialog
          actType={actType}
          setActType={setActType}
          current={current}
          getAll={getActivities}
        />
      )}
    </FrameLayout>
  );
}
