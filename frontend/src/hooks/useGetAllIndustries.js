import { useEffect, useState } from "react";
import industryApi from "../api/industry";

const useGetAllIndustries = () => {
  const [industries, setIndustries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllIndustries = async () => {
    setIsLoading(true);
    const res = await industryApi.getAll();
    setIndustries(res.inf);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllIndustries();
  }, []);

  return { industries, isLoading };
};

export default useGetAllIndustries;
