import Link from "next/link";
import MatrixBackground from "@/components/MatrixBackground";
import { personalName, professionalName, contactEmail, contactPhone } from "@/lib/siteInfo";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">
      {/* Matrix Video Style Background */}
      <MatrixBackground />

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        {/* Intro Section */}
        <div className="mb-8 sm:mb-12 animate-fadeIn px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 text-white drop-shadow-2xl leading-tight">
            <span className="text-cyan-400">{personalName.split(" ")[0]}</span> <span className="text-white">{professionalName.split(" ")[1] ?? personalName.split(" ")[1]}</span>
          </h1>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-cyan-500 to-pink-500 mx-auto my-6 sm:my-8 rounded-full"></div>
          
          <p className="text-lg sm:text-xl text-cyan-300 mb-3 sm:mb-4 font-bold drop-shadow-lg">Welcome, Visitor.</p>
          <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">You are about to see the real world.</p>
          <p className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
            <span className="text-cyan-400">Which pill</span> will you choose?
          </p>
        </div>

        {/* Pills Container */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-12 justify-center items-center my-12 sm:my-20 px-4">
          {/* Professional Pill (Blue) */}
          <Link
            href="/professional"
            className="group relative w-full sm:w-auto"
          >
            <div className="relative w-full sm:w-64 h-32 sm:h-32 md:h-40 cursor-pointer transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 max-w-xs mx-auto">
              {/* Outer Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full filter blur-xl opacity-0 group-hover:opacity-75 transition-all duration-300 animate-pulse"></div>
              
              {/* Pill Shape with Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50 border-2 border-cyan-400 group-hover:border-cyan-300 transition-all"
                style={{
                  backgroundImage: 'linear-gradient(135deg, rgba(6, 182, 212, 0.8) 0%, rgba(3, 105, 161, 0.8) 100%), url(/surya/images/red-pill.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Inner Content */}
                <div className="text-center z-10">
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white drop-shadow-lg">Professional</h2>
                  <p className="text-xs text-cyan-100 mt-1 drop-shadow-md">Reality</p>
                </div>
              </div>

              {/* Hover Shine Effect */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-white via-transparent to-transparent"></div>
            </div>

            {/* Label Below */}
            <p className="text-cyan-400 font-bold text-xs sm:text-sm mt-4 sm:mt-6 text-center drop-shadow-lg">Take the Blue Pill</p>
            <p className="text-gray-200 text-xs sm:text-sm font-medium text-center mt-1 drop-shadow-lg">Career • Experience • Excellence</p>
          </Link>

          {/* Personal Pill (Red/Pink) */}
          <Link
            href="/personal"
            className="group relative w-full sm:w-auto"
          >
            <div className="relative w-full sm:w-64 h-32 sm:h-32 md:h-40 cursor-pointer transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 max-w-xs mx-auto">
              {/* Outer Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full filter blur-xl opacity-0 group-hover:opacity-75 transition-all duration-300 animate-pulse" style={{animationDelay: '0.3s'}}></div>
              
              {/* Pill Shape with Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-full flex items-center justify-center shadow-2xl shadow-pink-500/50 border-2 border-pink-400 group-hover:border-pink-300 transition-all"
                style={{
                  backgroundImage: 'linear-gradient(135deg, rgba(236, 72, 153, 0.8) 0%, rgba(220, 38, 38, 0.8) 100%), url(/surya/images/red-pill.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Inner Content */}
                <div className="text-center z-10">
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white drop-shadow-lg">Personal</h2>
                  <p className="text-xs text-pink-100 mt-1 drop-shadow-md">Liberation</p>
                </div>
              </div>

              {/* Hover Shine Effect */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-white via-transparent to-transparent"></div>
            </div>

            {/* Label Below */}
            <p className="text-pink-400 font-bold text-xs sm:text-sm mt-4 sm:mt-6 text-center drop-shadow-lg">Take the Red Pill</p>
            <p className="text-gray-200 text-xs sm:text-sm font-medium text-center mt-1 drop-shadow-lg">Creative • Authentic • Adventure</p>
          </Link>
        </div>

        {/* Bottom Philosophy */}
        <div className="mt-16 pt-8 border-t border-cyan-900/50 px-4">
          <p className="text-cyan-400 text-sm drop-shadow-lg">
            Choose one path. Explore everything. Discover yourself.
          </p>
        </div>
      </div>
    </div>
  );
}
