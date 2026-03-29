"use client";

import { useState } from "react";

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Manufacturing Management System",
      description: "Large-scale multi-plant production operations system with real-time monitoring",
      category: "fullstack",
      technologies: ["Enterprise stack", "SQL Server", "Machine Integration", "Data Capture"],
      image: "🏭",
      details: "Developed and maintained a large-scale manufacturing management system supporting multi-plant production operations. Enabled real-time monitoring of receiving, processing, quality control, and packing workflows through machine-integrated data capture. Delivered reporting and analytics solutions to improve operational visibility, production efficiency, and compliance tracking.",
    },
    {
      id: 2,
      title: "Financial Application",
      description: "Loan audit workflows for non-bank financial services platform",
      category: "backend",
      technologies: ["Enterprise stack", "SQL Server", "Audit Workflows", "Compliance"],
      image: "💰",
      details: "Built and maintained loan audit workflows for a non-bank financial services platform. Enabled auditors to verify loan data, review documents, and mark submissions (Pass/Fail/Modify). Ensured compliance, data integrity, and efficient loan processing.",
    },
    {
      id: 3,
      title: "Healthcare Referral SaaS",
      description: "Cloud-based healthcare platform with doctor search and appointment booking",
      category: "fullstack",
      technologies: ["Enterprise stack", "Cloud Architecture", "Real-time Data", "Healthcare APIs"],
      image: "🏥",
      details: "Built cloud-based modules for doctor search, appointment booking, and lab test management. Enabled real-time data sharing to improve care coordination and patient engagement.",
    },
    {
      id: 4,
      title: "Gym Management Application",
      description: "Complete gym operations system with member tracking and fitness monitoring",
      category: "fullstack",
      technologies: ["Enterprise stack", "Member Management", "Fee Tracking", "Fitness Monitoring"],
      image: "💪",
      details: "Developed features for member registration, fee tracking, and fitness progress monitoring. Managed modules for CrossFit programs, fitness reports, and overall gym activity tracking.",
    },
    {
      id: 5,
      title: "Multi-Plant Operations Dashboard",
      description: "Real-time analytics and reporting for manufacturing operations",
      category: "backend",
      technologies: ["SQL Server", "Analytics", "Reporting", "Data Visualization"],
      image: "📊",
      details: "Created comprehensive reporting and analytics solutions for multi-plant manufacturing operations. Improved operational visibility, production efficiency, and compliance tracking across all facilities.",
    },
    {
      id: 6,
      title: "Enterprise Data Integration",
      description: "Integration of machine-captured data with core business systems",
      category: "backend",
      technologies: ["Enterprise stack", "Data Integration", "Machine APIs", "ETL Processes"],
      image: "🔄",
      details: "Designed and implemented integration layers to capture machine data and synchronized it with enterprise systems. Ensured data accuracy, real-time processing, and seamless workflow automation.",
    },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-white">Featured Projects</h2>
        <div className="h-1 w-20 bg-blue-400 mb-12"></div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["all", "backend", "fullstack"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === category
                  ? "bg-blue-600 text-white"
                  : "bg-dark-bg text-dark-muted hover:text-blue-400 border border-dark-border"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-dark-bg rounded-xl overflow-hidden border border-dark-border hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              {/* Project Image/Icon */}
              <div className="h-40 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                {project.image}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-dark-muted text-sm mb-4">
                  {project.description}
                </p>

                <div key={project.id} className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-blue-600/20 text-blue-300 rounded border border-blue-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-dark-muted text-xs mb-4 leading-relaxed">
                  {project.details}
                </p>


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
