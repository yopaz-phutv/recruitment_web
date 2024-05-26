import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InnerHTML from "dangerously-set-html-content";

export default function BellDialog({ show, setShow, current }) {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Body>
        <h4 className="border-bottom pb-2 text-center">Thông báo</h4>
        <div className="ts-smd text-danger">
          <InnerHTML html={current.name} />
        </div>
        {/* <div className="text-secondary ts-sm">
          Đã nhận lúc {dayjs(current.created_at).format("H:m - DD/MM/YYYY")}
        </div> */}
        {current.content && (
          <div className="mt-1 rounded p-2 bg-mlight whitespace-preline">
            <InnerHTML html={current.content} />
          </div>
        )}
        <Button
          className="mt-2 d-block ms-auto"
          size="sm"
          variant="danger"
          onClick={handleClose}
        >
          Đóng
        </Button>
      </Modal.Body>
    </Modal>
  );
}
