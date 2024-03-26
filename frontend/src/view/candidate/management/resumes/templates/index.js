import { useState } from "react";
import templateList from "./templateList";
import TemplatePreviewModal from "./TemplatePreviewModal";

export default function TemplateList() {
  const [showModal, setShowModal] = useState(false);
  const [curTemplateId, setCurTemplateId] = useState(1);
  const handleView = (item) => {
    setCurTemplateId(item.id);
    setShowModal(true);
  };

  return (
    <div className="mx-4 mt-4 px-5 py-3 bg-white h-100">
      <h4 className="mb-4 text-main">Mẫu hồ sơ</h4>
      <div className="row row-cols-lg-3 row-cols-2">
        {templateList.map((item) => (
          <div
            key={`template_${item.id}`}
            className="pe-2"
            onClick={() => handleView(item)}
          >
            <img
              src={item.image}
              alt={"template_" + item.id}
              className="w-100 h-100 border hover-shadow hover-border-main pointer"
            />
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
