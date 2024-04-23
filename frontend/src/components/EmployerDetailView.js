export default function EmployerDetailView({
  employer,
  isFull = true,
  className,
}) {
  const empty = <span className="text-secondary">Chưa cập nhật</span>;

  return (
    <div className={className}>
      <div className="d-flex">
        <div className="fw-600 w-20">Tên:</div>
        {employer.name}
      </div>
      <div className="d-flex mt-1">
        <div className="fw-600 w-20">Quy mô:</div>
        {employer.min_employees ? (
          <div>
            {employer.min_employees}
            {employer.max_employees !== 0
              ? " - " + employer.max_employees
              : "+ "}
            &nbsp;nhân viên
          </div>
        ) : (
          empty
        )}
      </div>
      {employer.tax_code && (
        <div className="d-flex mt-1">
          <div className="fw-600 w-20">Mã số thuế:</div>
          {employer.tax_code}
        </div>
      )}
      <div className="d-flex mt-1">
        <div className="fw-600 w-20">Người liên hệ:</div>
        {employer.contact_name}
      </div>
      <div className="d-flex mt-1">
        <div className="fw-600 w-20">Điện thoại:</div>
        {employer.phone}
      </div>
      <div className="d-flex mt-1">
        <div className="fw-600 w-20">Email:</div>
        {employer.user?.email}
      </div>
      <div className="d-flex mt-1">
        <div className="fw-600 w-20">Địa chỉ:</div>
        <div className="w-80 whitespace-preline">{employer.address}</div>
      </div>
      {isFull && (
        <>
          <div className="d-flex mt-1">
            <div className="fw-600 w-20">Website:</div>
            {employer.website ? (
              <a href={employer.website} target="_blank" rel="noreferrer">
                {employer.website}
              </a>
            ) : (
              empty
            )}
          </div>
          <div className="mt-1">
            <div className="fw-600">Mô tả:</div>
            {employer.description ? (
              <div className="ts-smd whitespace-preline">
                {employer.description}
              </div>
            ) : (
              empty
            )}
          </div>
          <div className="mt-1 d-flex">
            <div className="fw-600 w-20">Logo công ty:</div>
            {employer.logo ? (
              <a
                href={employer.logo}
                className="border"
                target="_blank"
                rel="noreferrer"
              >
                <img src={employer.logo} alt="" />
              </a>
            ) : (
              empty
            )}
          </div>
          <div className="mt-1 d-flex">
            <div className="fw-600 w-20">Ảnh công ty:</div>
            {employer.image ? (
              <a
                href={employer.image}
                className="border"
                style={{ width: '540px' }}
                target="_blank"
                rel="noreferrer"
              >
                <img src={employer.image} alt="" className="w-100" />
              </a>
            ) : (
              empty
            )}
          </div>
        </>
      )}
    </div>
  );
}
