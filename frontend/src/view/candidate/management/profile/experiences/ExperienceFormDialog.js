import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Form, Stack, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import experienceApi from "../../../../../api/experience";
import RequiredMark from "../../../../../components/form/requiredMark";

export default function ExperienceFormDialog({
  actType,
  setActType,
  current,
  getAll,
}) {
  const requiredMsg = "Không được để trống";
  const schema = yup.object({
    name: yup.string().required(requiredMsg),
    company: yup.string().required(requiredMsg),
    // description: yup.string().required(requiredMsg),
    start_date: yup.string().required("Vui lòng chọn"),
    end_date: yup.string().required("Vui lòng chọn"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log({ data });
    if (actType === "ADD") {
      await experienceApi.create(data);
      alert("Tạo mới thành công!");
      await getAll();
      setActType("VIEW");
    }
    if (actType === "EDIT") {
      await experienceApi.update(current.id, data);
      alert("Cập nhật thành công!");
      await getAll();
      setActType("VIEW");
    }
  };

  return (
    <Modal
      show={actType !== "VIEW"}
      onHide={() => setActType("VIEW")}
      centered
      size="lg"
      fullscreen="md-down"
      style={{ fontFamily: "sans-serif" }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-600">Kinh nghiệm việc làm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="row row-cols-md-2 row-cols-sm-1">
              <Form.Group className="mt-2">
                <Form.Label className="fw-600">Chức vụ/Vị trí</Form.Label>
                <RequiredMark />
                <Form.Control
                  size="sm"
                  type="text"
                  defaultValue={actType === "EDIT" ? current.name : null}
                  {...register("name")}
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label className="fw-600">Tên công ty</Form.Label>
                <RequiredMark />
                <Form.Control
                  size="sm"
                  type="text"
                  defaultValue={actType === "EDIT" ? current.company : null}
                  {...register("company")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.company?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label className="fw-600">Thời gian bắt đầu</Form.Label>
                <RequiredMark />
                <Form.Control
                  size="sm"
                  type="date"
                  {...register("start_date")}
                  defaultValue={actType === "EDIT" ? current.start_date : null}
                  isInvalid={errors.start_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.start_date?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label className="fw-600">Thời gian kết thúc</Form.Label>
                <RequiredMark />
                <Form.Control
                  size="sm"
                  type="date"
                  {...register("end_date")}
                  defaultValue={actType === "EDIT" ? current.end_date : null}
                  isInvalid={errors.end_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.end_date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group className="mt-2">
              <Form.Label className="fw-600">Mô tả công việc</Form.Label>
              <Form.Control
                as={"textarea"}
                rows={5}
                size="sm"
                defaultValue={actType === "EDIT" ? current.description : null}
                {...register("description")}
                // isInvalid={errors.description}
              />
              {/* <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback> */}
            </Form.Group>
          </div>
          <Stack direction="horizontal" gap={3} className="mt-3">
            <Button
              variant="outline-primary"
              size="sm"
              type="submit"
              className="ms-auto"
            >
              Lưu
            </Button>
            <Button
              variant="secondary"
              size="sm"
              type="reset"
              className="me-3"
              onClick={() => setActType("VIEW")}
            >
              Hủy
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
