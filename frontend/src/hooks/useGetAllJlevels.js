import { useEffect, useState } from "react";
import jlevelApi from "../api/jlevel";

const useGetAllJlevels = () => {
  const [jlevels, setJlevels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllJlevels = async () => {
    setIsLoading(true);
    const res = await jlevelApi.getAll();
    setJlevels(res.inf);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllJlevels();
  }, []);

  return { jlevels, isLoading };
};

export default useGetAllJlevels;
