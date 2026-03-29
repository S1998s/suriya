"use client";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "ColdFusion in Enterprise Applications",
      excerpt:
        "How ColdFusion powers large-scale enterprise systems with rapid development, robust database integration, and reliable performance under heavy load.",
      date: "January 10, 2026",
      category: "Enterprise",
      readTime: "9 min read",
      image: "🏢",
      link: "https://dev.to/search?q=coldfusion+enterprise",
    },
    {
      id: 2,
      title: "ColdFusion & SQL Server: Best Practices",
      excerpt:
        "Deep dive into optimizing ColdFusion queries with SQL Server — from stored procedures and cfquery tuning to connection pooling and caching strategies.",
      date: "December 18, 2025",
      category: "Database",
      readTime: "11 min read",
      image: "🗄️",
      link: "https://dev.to/search?q=coldfusion+sql+server",
    },
    {
      id: 3,
      title: "Building REST APIs with ColdFusion",
      excerpt:
        "A practical guide to building secure, scalable RESTful APIs using ColdFusion components (CFCs), cffunction tags, and JSON response formatting.",
      date: "November 25, 2025",
      category: "Backend",
      readTime: "10 min read",
      image: "🔌",
      link: "https://dev.to/search?q=coldfusion+rest+api",
    },
    {
      id: 4,
      title: "Migrating Legacy ColdFusion to Modern Stacks",
      excerpt:
        "Strategies for modernizing ColdFusion applications — incremental migration, API-first refactoring, and coexistence patterns with modern front-end frameworks.",
      date: "October 30, 2025",
      category: "Architecture",
      readTime: "13 min read",
      image: "🔄",
      link: "https://dev.to/search?q=coldfusion+migration",
    },
  ];

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-white">Latest Articles</h2>
        <div className="h-1 w-20 bg-blue-400 mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-dark-surface rounded-xl overflow-hidden border border-dark-border hover:border-blue-400 transition-all duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div className="h-40 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
                {post.image}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-400 bg-blue-600/20 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-dark-muted">{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-dark-muted text-sm mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-dark-muted">{post.date}</span>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
