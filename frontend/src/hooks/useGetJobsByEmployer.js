import { useEffect, useState } from "react";
import employerApi from "../api/employer";

const useGetJobsByEmployer = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEmployerJobs = async () => {
    setIsLoading(true);
    const res = await employerApi.getJobList();
    setJobs(res);
    setIsLoading(false);
  };

  useEffect(() => {
    getEmployerJobs();
  }, []);

  return { jobs, isLoading };
};

export default useGetJobsByEmployer;
