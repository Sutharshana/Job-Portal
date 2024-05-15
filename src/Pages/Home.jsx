import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Cards from "../components/Cards";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, []);

  // Handle input change
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().includes(query.toLowerCase())
  );

  // Radio filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // Filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }

    // Category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          experienceLevel,
          minPrice,
          maxPrice,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
    }
    
    // Map filtered jobs to Cards components
    return filteredJobs.map((data, i) => <Cards key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);
  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      {/* main content*/}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 p-4 py-12">
      {/* left side */} 
      <div className="bg-white p-4 rounded"><Sidebar handleChange={handleChange} handleClick={handleClick}/></div>

      {/* job cards*/} 
      <div className="col-span-2 bg-white p-4 rounded-sm"><Jobs result={result} /> </div>
      
      {/* right side */} 
      <div className="bg-white p-4 rounded">Right</div>

      </div>
      
    </div>
  );
};

export default Home;
