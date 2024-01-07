import clsx from "clsx";
import { forwardRef, useEffect, useRef } from "react";

const TextAreaInner = forwardRef(
  ({ className, innerClassName, cvStyle = true, ...props }, ref) => {
    useEffect(() => {
      var textarea = document.querySelector("#autoresize");
      textarea.addEventListener("input", autoResize, false);

      function autoResize() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      }
    }, []);
    return (
      <div className={clsx("d-flex gap-1 align-items-center", className)}>
        <textarea
          id="autoresize"
          className={clsx(
            "overflow-hidden",
            cvStyle && "cv-input",
            innerClassName
          )}
          style={{ resize: "none" }}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
const TextArea = (props) => {
  const ref = useRef(null);
  return <TextAreaInner {...props} ref={ref} />;
};

export default TextArea;
