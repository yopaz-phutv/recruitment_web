import Placeholder from "react-bootstrap/Placeholder";

export default function JobItemSkeleton() {
  return (
    <Placeholder animation="glow" className="mb-3">
      <div className="d-flex p-2 border bg-white">
        <Placeholder style={{ width: "100px", height: "100px" }} />
        <div className="ms-2 mt-1" style={{ width: "calc(100% - 125px)" }}>
          <Placeholder xs={12} />
          <Placeholder xs={12} />
          <Placeholder xs={5} className="me-1" />
          <Placeholder xs={5} />
          <Placeholder xs={5} />
        </div>
      </div>
    </Placeholder>
  );
}
