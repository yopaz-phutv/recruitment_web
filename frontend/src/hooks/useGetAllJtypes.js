import { useEffect, useState } from "react";
import jtypeApi from "../api/jtype";

const useGetAllJtypes = () => {
  const [jtypes, setJtypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllJtypes = async () => {
    setIsLoading(true);
    const res = await jtypeApi.getAll();
    setJtypes(res.inf);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllJtypes();
  }, []);

  return { jtypes, isLoading };
};

export default useGetAllJtypes;
