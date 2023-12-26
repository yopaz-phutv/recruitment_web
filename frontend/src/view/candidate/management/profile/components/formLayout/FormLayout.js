import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

export default function FormLayout({
  handleSubmit,
  children,
}) {
  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
    >
      <div style={{ fontSize: "15px" }}>{children}</div>
      <hr />
      <Stack direction="horizontal" gap={3}>
        <Button
          variant="outline-primary"
          size="sm"
          type="submit"
          className="ms-auto"
        >
          Lưu
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          type="reset"
          className="me-3"
        >
          Hủy
        </Button>
      </Stack>
    </Form>
  );
}
