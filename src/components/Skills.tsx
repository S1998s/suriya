"use client";

export default function Skills() {
  const skillCategories = [
    {
      category: "Languages",
      skills: ["ColdFusion", "JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
    },
    {
      category: "Frameworks & UI",
      skills: ["jQuery Core", "jQuery UI", "AJAX", "Component-based UIs", "Bootstrap"],
    },
    {
      category: "Databases & Tools",
      skills: ["MS SQL Server", "MySQL", "REST APIs", "API Development"],
    },
    {
      category: "Development Tools",
      skills: ["Visual Studio Code", "Postman", "Git", "GitHub", "JIRA", "Trello", "Windows"],
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-white">Skills & Expertise</h2>
        <div className="h-1 w-20 bg-blue-400 mb-12"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-dark-surface rounded-xl p-6 hover:border border-blue-400 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-dark-bg text-dark-text rounded-full text-sm border border-dark-border hover:border-blue-400 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency Bars */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8">Proficiency</h3>
          <div className="space-y-6">
            {[
              { skill: "Backend & API development", percentage: 98 },
              { skill: "Database Architecture (SQL Server)", percentage: 95 },
              { skill: "Enterprise System Design", percentage: 90 },
              { skill: "Performance Optimization", percentage: 92 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-semibold">{item.skill}</span>
                  <span className="text-blue-400">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
