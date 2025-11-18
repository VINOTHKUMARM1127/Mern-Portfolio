import axios from "axios";
import React, { useEffect, useState } from "react";

const useDataFetch = () => {
  const [Details, setDetails] = useState([]);
  const [data, setData] = useState([]);
  const [eduData, setEduData] = useState([]);
  const [projectdata, SetProjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchData = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL;

      const [
        detailsresponse,
        skillsresponse,
        educationresponse,
        projectsresponse,
      ] = await Promise.all([
        axios.get(`${base}/get-details`),
        axios.get(`${base}/get-skills`),
        axios.get(`${base}/get-education`),
        axios.get(`${base}/get-projects`),
      ]);

      setDetails(detailsresponse.data);
      setData(skillsresponse.data);
      setEduData(educationresponse.data);
      SetProjectData(projectsresponse.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return { Details, data, eduData, projectdata, loading };
};

export default useDataFetch;
