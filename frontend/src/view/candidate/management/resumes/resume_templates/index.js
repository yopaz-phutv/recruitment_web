import { useState } from "react";
import templateList from "./templateList";
import TemplatePreviewModal from "./TemplatePreviewModal";
import TemplatePreview from "./TemplateItem";

export default function TemplateList() {
  const [showModal, setShowModal] = useState(false);
  const [curTemplateId, setCurTemplateId] = useState(1);
  const handleView = (item) => {
    setCurTemplateId(item.id);
    setShowModal(true);
  };

  return (
    <div className="ms-4 mt-4 px-5 py-3 bg-white">
      <h4 className="mb-4 text-main">Danh sách mẫu hồ sơ</h4>
      <div className="row row-cols-lg-4 row-cols-3">
        {templateList.map((item) => (
          <div
            key={item.id}
            className="pe-3 mb-3"
            onClick={() => handleView(item)}
          >
            <TemplatePreview template={item} />
          </div>
        ))}
      </div>
      {showModal && (
        <TemplatePreviewModal
          show={showModal}
          setShow={setShowModal}
          templateId={curTemplateId}
        />
      )}
    </div>
  );
}
