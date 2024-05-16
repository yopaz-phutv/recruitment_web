import clsx from "clsx";
import Spinner from "react-bootstrap/Spinner";

export default function Loading({
  className = "text-secondary",
  size = "sm",
  text = "Đang tải...",
  textClassName,
}) {
  return (
    <div className={clsx("ts-lg d-flex align-items-center", className)}>
      <Spinner size={size} className="me-1" />
      <div className={textClassName}>{text} </div>
    </div>
  );
}
