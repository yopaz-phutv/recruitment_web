import Modal from "react-bootstrap/Modal";
import Template from "./common";
import CreateOptionDialog from "./CreateOptionDialog";
import { useState } from "react";
import * as htmlToImage from "html-to-image";

export default function TemplatePreviewModal({ show, setShow, templateId }) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleExport = () => {
    var node = document.getElementById("resume");
    htmlToImage
      .toPng(node)
      .then((dataUrl) => {
        // var img = new Image();
        // img.src = dataUrl;
        // document.body.appendChild(img);
        let filename = `template_${templateId}.png`;
        let link = document.createElement("a");
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        scrollable
        size="xl"
        fullscreen="md-down"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            Mẫu hồ sơ số {templateId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-4 align-items-start">
            <div style={{ marginLeft: "40px" }}>
              <Template mode="READ" useSampleData templateId={templateId} />
            </div>
            <div className="flex-fill sticky-top">
              <button
                className="btn bg-main text-white w-100"
                onClick={() => setShowCreateModal(true)}
              >
                Dùng mẫu này
              </button>
              <button
                className="btn bg-main text-white w-100 mt-3"
                onClick={handleExport}
              >
                Xuất ảnh
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <CreateOptionDialog
        show={showCreateModal}
        setShow={setShowCreateModal}
        templateId={templateId}
      />
    </>
  );
}
