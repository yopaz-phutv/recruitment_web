import Modal from "react-bootstrap/Modal";
import Template from "./TemplateWrapper";
import OptionDialog from "./OptionDialog";
import { useState } from "react";
import * as htmlToImage from "html-to-image";

export default function TemplatePreviewModal({ show, setShow, templateId }) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleExport = () => {
    var node = document.getElementById("resume");
    htmlToImage
      .toPng(node)
      .then((dataUrl) => {
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
        fullscreen="lg-down"
        style={{ fontFamily: "sans-serif" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center fw-600">
            Mẫu hồ sơ số {templateId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-4 align-items-start">
            <div style={{ marginLeft: "40px" }}>
              <Template mode="READ" useSampleData={true} templateId={templateId} />
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
      <OptionDialog
        show={showCreateModal}
        setShow={setShowCreateModal}
        templateId={templateId}
      />
    </>
  );
}
