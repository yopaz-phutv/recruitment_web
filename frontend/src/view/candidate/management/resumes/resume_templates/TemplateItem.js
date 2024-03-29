import { useState } from "react";

export default function TemplateItem({template}) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className="position-relative border h-100 hover-shadow hover-border-main pointer"
      onMouseOver={() => setShowMore(true)}
      onMouseOut={() => setShowMore(false)}
    >
      <img
        src={template.image}
        alt={"template_" + template.id}
        className="w-100 h-100"
      />
      {showMore && (
        <div className="position-absolute bottom-0 w-100 text-center text-white bg-info py-2">
          Xem trước
        </div>
      )}
    </div>
  );
}
