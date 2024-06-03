import Button from "react-bootstrap/Button";
import clsx from "clsx";

export default function FrameLayout({
  title,
  hasaddbtn,
  children,
  className,
  setActType,
  titleId,
}) {
  return (
    <>
      <div id={titleId} />
      <div
        className={clsx(
          "border border-2 rounded p-3 shadow-sm bg-white",
          className
        )}
      >
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="ps-1 fw-600">{title}</h5>
          {hasaddbtn && (
            <div className="d-inline float-end me-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActType("ADD")}
              >
                Thêm
              </Button>
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
