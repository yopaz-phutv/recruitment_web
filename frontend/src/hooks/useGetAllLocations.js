import { useEffect, useState } from "react";
import locationApi from "../api/location";

const useGetAllLocations = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllLocations = async () => {
    setIsLoading(true);
    const res = await locationApi.getAll();
    setLocations(res);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  return { locations, isLoading };
};

export default useGetAllLocations;
