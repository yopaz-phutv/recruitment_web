import clsx from "clsx";

export default function CircleTabs({
  className,
  title,
  tabNum = 2,
  curStep = 2,
  setCurStep
}) {
  return (
    <div className={clsx("d-flex align-items-center ts-smd", className)}>
        <span className="me-2">{title}</span>
      {Array.from({ length: tabNum }, (_, index) => (
        <div
          key={index}
          className="d-flex align-items-center"
          style={{ width: `calc(100% / ${tabNum})` }}
        >
          <div
            style={{ width: "15px", height: "15px" }}
            className={clsx(
              "position-relative rounded-circle pointer",
              index < curStep ? "bg-main" : "border"
            )}
            onClick={() => setCurStep(index + 1)}
          >
            <div className="position-absolute" style={{ top: '-20px', left: '3px' }}>{index + 1}</div>
          </div>

          {index !== tabNum - 1 && (
            <div
              style={{ height: "4px" }}
              className={clsx(
                "w-100",
                index < curStep - 1 ? "bg-main" : "bg-mlight"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
