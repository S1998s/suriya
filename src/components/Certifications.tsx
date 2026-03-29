"use client";

export default function Certifications() {
  const certifications = [
    {
      icon: "https://www.adobe.com/federal/assets/svgs/adobe-logo.svg",
      title: "Adobe Certified Associate",
      issuer: "Adobe Inc.",
      detail: "Certified expertise in Adobe Creative Cloud and digital marketing technologies, demonstrating proficiency in design and web technologies",
      date: "2024",
    },
    {
      icon: "⭐",
      title: "Best Employee Award",
      issuer: "Mitrasoft",
      detail: "Recognized for high performance, productivity, and consistent contribution to team success",
      date: "Award",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Certifications & Awards
        </h2>
        <div className="h-1 w-20 bg-blue-400 mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-dark-surface rounded-xl p-8 border border-dark-border hover:border-blue-400 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{cert.icon}</div>
              <h3 className="text-2xl font-bold text-blue-400 mb-2">
                {cert.title}
              </h3>
              <p className="text-white font-semibold mb-2">{cert.issuer}</p>
              <p className="text-dark-muted mb-4">{cert.detail}</p>
              <div className="text-sm text-dark-muted border-t border-dark-border pt-4">
                {cert.date}
              </div>
            </div>
          ))}
        </div>

        {/* Key Achievements */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8">Work Experience</h3>
          <div className="space-y-6">
            {[
              {
                position: "Senior Software Engineer",
                company: "Mitrasoft",
                period: "June 2019 - August 2025",
                highlights: [
                  "Leading development and enhancement of enterprise Manufacturing Management System",
                  "Supporting end-to-end plant operations across multiple global facilities",
                  "Designing and maintaining real-time machine-integrated modules handling high-volume production data",
                  "Optimizing backend services supporting plant supervisors and management decision-making",
                  "Building scalable enterprise applications with focus on performance and reliability",
                ],
              },
            ].map((job, idx) => (
              <div
                key={idx}
                className="bg-dark-surface rounded-lg p-6 border border-dark-border hover:border-blue-400 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between mb-3 gap-1">
                  <div>
                    <h4 className="text-xl font-bold text-blue-400">
                      {job.position}
                    </h4>
                    <p className="text-white font-semibold">{job.company}</p>
                  </div>
                  <span className="text-dark-muted text-sm sm:text-right">{job.period}</span>
                </div>
                <ul className="space-y-2">
                  {job.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-dark-muted text-sm flex gap-2">
                      <span className="text-blue-400">▸</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
