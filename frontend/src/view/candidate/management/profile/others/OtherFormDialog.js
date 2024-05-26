import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Form, Stack, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import RequiredMark from "../../../../../components/form/requiredMark";
import otherApi from "../../../../../api/other";

export default function OtherFormDialog({
  actType,
  setActType,
  current,
  getAll,
}) {
  const requiredMsg = "Không được để trống";
  const schema = yup.object({
    name: yup.string().required(requiredMsg),
    description: yup.string().required(requiredMsg),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (actType === "ADD") {
      await otherApi.create(data);
      alert("Tạo mới thành công!");
      await getAll();
      setActType("VIEW");
    }
    if (actType === "EDIT") {
      await otherApi.update(current.id, data);
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
    >
      <Modal.Header closeButton>
        <Modal.Title>Thông tin khác</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label className="fw-600">Tên</Form.Label>
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
            <Form.Label className="fw-600">Mô tả</Form.Label>
            <RequiredMark />
            <Form.Control
              as={"textarea"}
              rows={5}
              size="sm"
              defaultValue={actType === "EDIT" ? current.description : null}
              {...register("description")}
              isInvalid={errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>
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
              variant="danger"
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
