import CTooltip from "../CTooltip";

const TextItem = ({ title, text }) => {
  return (
    <div className="ps-0 mb-4 pe-4">
      <div
        className="bg-main text-white rounded px-3 pt-1 d-flex flex-column justify-content-center h-100"
        style={{ minHeight: "78px" }}
      >
        <div className="text-maxline-2 text-center">{title}</div>
        <CTooltip text={text}>
          <div className="text-truncate text-center fw-bold ts-lg">{text}</div>
        </CTooltip>
      </div>
    </div>
  );
};

export default TextItem;
