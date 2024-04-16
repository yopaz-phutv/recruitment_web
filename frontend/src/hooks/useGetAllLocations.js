import { useEffect, useState } from "react";
import locationApi from "../api/location";

const useGetAllLocations = () => {
  const [locations, setLocations] = useState([]);

  const getAllLocations = async () => {
    const res = await locationApi.getAll();
    setLocations(res);
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  return locations;
};

export default useGetAllLocations;
