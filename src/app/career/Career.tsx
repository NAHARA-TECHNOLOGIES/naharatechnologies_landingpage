"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiBriefcase,
  FiMapPin,
  FiSearch,
  FiUpload,
  FiArrowLeft,
} from "react-icons/fi";

// Define the type for job listings
type Job = {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
};

// Job listings with correct typing
const jobListings: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    category: "Engineering",
    location: "Remote",
    description: "Build scalable web applications.",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    category: "Design",
    location: "Remote",
    description: "Craft intuitive user experiences.",
  },
//   {
//     id: 3,
//     title: "Data Scientist",
//     category: "Analytics",
//     location: "San Francisco",
//     description: "Analyze complex datasets.",
//   },
  {
    id: 4,
    title: "Marketing Specialist",
    category: "Marketing",
    location: "Remote",
    description: "Develop and execute campaigns.",
  },
//   {
//     id: 5,
//     title: "Cybersecurity Analyst",
//     category: "Security",
//     location: "Remote",
//     description: "Ensure safe digital environments.",
//   },
//   {
//     id: 6,
//     title: "Product Manager",
//     category: "Business",
//     location: "Berlin",
//     description: "Lead and oversee product development strategies.",
//   },
//   {
//     id: 7,
//     title: "Cloud DevOps Engineer",
//     category: "IT",
//     location: "Remote",
//     description: "Maintain cloud infrastructure and automation workflows.",
//   },
  {
    id: 8,
    title: "Frontend Developer",
    category: "Engineering",
    location: "Remote",
    description: "Build stunning user interfaces and web experiences.",
  },
  {
    id: 9,
    title: "HR Coordinator",
    category: "Human Resources",
    location: "Remote",
    description: "Manage talent acquisition and organizational development.",
  },
  {
    id: 10,
    title: "AI Researcher",
    category: "Technology",
    location: "Remote",
    description:
      "Explore advancements in artificial intelligence and machine learning.",
  },
];

// Main Career Component
export default function Career() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const router = useRouter();

  // Filtering jobs based on search and filters
  const filteredJobs = jobListings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || job.category === categoryFilter) &&
      (locationFilter === "" || job.location === locationFilter)
  );

  // Handle job application selection
  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setApplyModalOpen(true);
  };

  // Handle file upload safely
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No file selected.");
      return;
    }

    setResume(e.target.files[0]);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">
        Join Our Team
      </h2>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
        <div className="relative w-full sm:flex-1">
          <FiSearch className="absolute left-3 top-4 text-gray-400 dark:text-gray-900" />
          <input
            type="text"
            placeholder="Search job titles..."
            className="border w-full pl-10 p-3 rounded-md dark:text-gray-900"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="border p-3 rounded-md w-full sm:w-auto flex-1   dark:text-gray-900"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option  value="">All Categories</option>
          {[
            "Engineering",
            "Design",
            "Analytics",
            "Marketing",
            "Security",
            "Business",
            "IT",
            "Human Resources",
            "Technology",
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className="border p-3 rounded-md w-full sm:w-auto flex-1  dark:text-gray-900"
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {[
            "Remote",
            "New York",
            "San Francisco",
            "London",
            "Berlin",
            "Toronto",
            "Paris",
            "Sydney",
          ].map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-transform hover:scale-105"
          >
            <FiBriefcase className="text-4xl text-red-700 mb-3" />
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600  dark:text-gray-300">
              {job.category} | <FiMapPin className="inline text-gray-400 dark:text-gray-300" />{" "}
              {job.location}
            </p>
            <p className="text-gray-700  dark:text-gray-300 mt-2">{job.description}</p>
            <button
              className="mt-4 bg-red-800 text-white px-4 py-2 hover:bg-red-700 w-full rounded-sm"
              onClick={() => handleApply(job)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Go Back Button */}
      <div className="text-center mt-8">
        <button
          className="bg-gray-800 text-white px-6 py-3 hover:bg-gray-900 flex items-center gap-2 mx-auto"
          onClick={() => router.push("/")}
        >
          <FiArrowLeft /> Go Back
        </button>
      </div>

      {/* Apply Modal */}
      {applyModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Apply for {selectedJob.title}
            </h3>
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center gap-3 mb-3">
              <FiUpload className="text-gray-500 text-xl" />
              <input type="file" onChange={handleFileUpload} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-black text-white px-4 py-2 w-full sm:w-auto"
                onClick={() =>
                  alert(`Application submitted for ${selectedJob.title}!`)
                }
              >
                Submit
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-md w-full sm:w-auto"
                onClick={() => setApplyModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
