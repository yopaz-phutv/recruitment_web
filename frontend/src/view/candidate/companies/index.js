import "./index.css";
import { useEffect, useState } from "react";
import employerApi from "../../../api/employer";
import CPagination from "../../../components/CPagination";
import Spinner from "react-bootstrap/Spinner";
import CompanyItem from "./CompanyItem";
import CompanyItemSkeleton from "./CompanyItemSkeleton";

function CompanyList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [comKey, setComKey] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [curPage, setCurPage] = useState(1);

  const getCompanies = async (page = 1) => {
    try {
      setIsLoading(true);
      const res = await employerApi.getList({ page, keyword: comKey });
      setCompanies(res.data);
      setTotalPage(res.last_page);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingSearch(true);
      await getCompanies();
      setCurPage(1);
    } catch (e) {
    } finally {
      setIsLoadingSearch(false);
    }
  };
  const handleChange = (e) => {
    setComKey(e.target.value);
  };

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ margin: "0px 100px", paddingBottom: "20px" }}>
      <form className="d-flex pt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          style={{ width: "300px" }}
          name="com_key"
          placeholder="Tìm tên công ty..."
          onChange={handleChange}
        />
        <button type="submit" className="ms-2 btn btn-primary">
          {isLoadingSearch && <Spinner size="sm" className="me-1" />}
          Tìm kiếm
        </button>
      </form>
      <h4 className="my-3 text-main text-center fw-600">Danh sách công ty</h4>
      <div className="row mt-3">
        {isLoading ? (
          Array.from({ length: 6 }, (_, index) => (
            <CompanyItemSkeleton key={index} />
          ))
        ) : companies.length === 0 ? (
          <h4 className="ms-3 text-start">Không có bản ghi nào phù hợp!</h4>
        ) : (
          <>
            {companies.map((company) => (
              <CompanyItem key={company.id} company={company} />
            ))}
            <CPagination
              className="justify-content-center"
              totalPage={totalPage}
              curPage={curPage}
              setCurPage={setCurPage}
              getList={getCompanies}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CompanyList;
