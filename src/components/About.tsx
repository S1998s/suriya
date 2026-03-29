"use client";

export default function About() {
  const timeline = [
    {
      year: "2013",
      title: "Class 10th - State Board",
      description: "Achieved 90% - Strong foundation in academics.",
    },
    {
      year: "2015",
      title: "Class 12th - State Board",
      description: "Achieved 83% - Prepared for higher education.",
    },
    {
      year: "2019",
      title: "B.E. Computer Science Engineering",
      description: "National Engineering College, Tamil Nadu (CGPA: 6.9).",
    },
    {
      year: "2019-2025",
      title: "Senior Software Engineer at Mitrasoft",
      description: "Delivered scalable enterprise applications across finance, healthcare, and fitness domains with a focus on performance, security, and data integrity.",
    },
    {
      year: "2025-Present",
      title: "Senior Software Engineer at InTimeTec",
      description: "Led manufacturing systems, real-time data modules & enterprise applications.",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-white">About Me</h2>
        <div className="h-1 w-20 bg-blue-400 mb-12"></div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* About Text */}
          <div>
            <p className="text-dark-muted text-lg leading-relaxed mb-4">
              Senior software engineer with 6+ years of experience designing and maintaining enterprise-grade manufacturing and financial systems. Specialized in high-volume, data-intensive applications with deep expertise in backend services, SQL Server, and performance optimization.
            </p>
            <p className="text-dark-muted text-lg leading-relaxed mb-4">
              Recently worked as Senior Software Engineer at Mitrasoft, leading development and enhancement of enterprise Manufacturing Management System supporting end-to-end plant operations across multiple global facilities. Experienced in designing and maintaining real-time machine-integrated modules, optimizing backend services, and building scalable enterprise applications.
            </p>
            <p className="text-dark-muted text-lg leading-relaxed">
              Proven track record of delivering high-performance solutions for manufacturing and financial domains. Strong experience working with global clients, building secure, scalable, and performance-driven solutions with focus on reliability and maintainability.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  {index !== timeline.length - 1 && (
                    <div className="w-1 h-12 bg-dark-border my-2"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-400">
                    {item.year}
                  </h3>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-dark-muted text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-12">
          {[
            { number: "6+", label: "Years Experience" },
            { number: "5+", label: "Enterprise Systems" },
            { number: "Global", label: "Clients Served" },
            { number: "100%", label: "Uptime Focus" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-dark-bg rounded-lg p-6 text-center hover:border border-blue-400 transition-all"
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-dark-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
