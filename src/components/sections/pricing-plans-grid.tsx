export default function PricingPlansGrid() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-white via-[#fff4f3] to-[#fcb5b0]/40 transition-colors duration-300">
      
      {/* Background Decorative Blurs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[20%] w-64 h-64 rounded-full bg-red-200/40 blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-80 h-80 rounded-full bg-pink-300/30 blur-3xl animate-float-slower"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-red-100 text-red-700 tracking-wide uppercase mb-4">
             Flexible Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 animate-gradient-x mb-6">
            Choose the plan that fits your growth
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Empower your business with flexible pay-as-you-go plans designed to scale with your vision. Transparent pricing, no hidden fees.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 max-w-7xl mx-auto">
          
          {/* Plan 1: Starter (Gradient Red) */}
          <div className="group relative p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer
                bg-gradient-to-r from-red-800 via-gray-700 to-red-500 animate-gradient
                bg-clip-padding backdrop-blur-md border border-transparent hover:border-white/30 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">Starter</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-extrabold text-white">$99</span>
                <span className="text-sm font-medium text-white/80">/month</span>
              </div>
              <p className="text-sm mb-8 leading-relaxed text-white/90">
                Perfect for small businesses and startups just getting started with their digital presence.
              </p>
              <ul className="space-y-4 mb-8">
                {['Basic Brand Strategy', '3 Social Media Templates', 'One-Page Website', 'Email Support', 'Basic SEO Setup'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 p-0.5 rounded-full bg-white/20 text-white">
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span className="text-sm font-medium text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 bg-white text-red-800 hover:bg-gray-100">
              Get Started
            </button>
          </div>

          {/* Plan 2: Business (White) */}
          <div className="group relative p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer
                bg-white text-gray-900 border border-transparent hover:border-red-100 ring-1 ring-gray-100 flex flex-col justify-between h-full transform md:scale-105 z-10">
            <div>
              <div className="absolute top-0 right-0 p-4">
                 <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Popular</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Business</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-extrabold text-gray-900">$299</span>
                <span className="text-sm font-medium text-gray-500">/month</span>
              </div>
              <p className="text-sm mb-8 leading-relaxed text-gray-600">
                Everything you need to scale your growing business with advanced tools and support.
              </p>
              <ul className="space-y-4 mb-8">
                {['Complete Brand Identity', '10 Social Media Templates', '5-Page Responsive Website', 'Priority Email & Chat', 'Advanced Analytics Dashboard', 'Monthly Strategy Call'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 p-0.5 rounded-full bg-red-100 text-red-600">
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 bg-gradient-to-r from-red-800 via-gray-600 to-red-600 text-white hover:opacity-90">
              Choose Business
            </button>
          </div>

          {/* Plan 3: Enterprise (Gradient Red) */}
          <div className="group relative p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer
                bg-gradient-to-r from-red-800 via-gray-700 to-red-500 animate-gradient
                bg-clip-padding backdrop-blur-md border border-transparent hover:border-white/30 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-extrabold text-white">Custom</span>
              </div>
              <p className="text-sm mb-8 leading-relaxed text-white/90">
                Full-scale tailored solutions specifically designed for large organizations and complex needs.
              </p>
              <ul className="space-y-4 mb-8">
                {['Dedicated Project Manager', 'Custom Software Development', 'Omnichannel Marketing Strategy', '24/7 Premium Support', 'Global CDN & Security', 'Quarterly Business Reviews'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                     <span className="mt-1 flex-shrink-0 p-0.5 rounded-full bg-white/20 text-white">
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span className="text-sm font-medium text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 bg-white text-red-800 hover:bg-gray-100">
              Contact Sales
            </button>
          </div>

        </div>
      </div>

      {/* Decorative Floating Icons matching Services Section layout */}
      <div className="hidden md:block absolute -right-36 lg:-right-48 -top-28 animate-float-slow opacity-90 hover:opacity-100 transition-all duration-500">
         <img 
           src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/020efcc2-39fa-4397-a8b1-657fce73285a-naharatechnologies-com/assets/images/roundIcon2_31d27e6e-9.png"
           alt="Decorative Element Top Right"
           width={260}
           height={260}
         />
      </div>
      <div className="hidden md:block absolute bottom-24 -left-44 lg:-left-56 animate-float-slower opacity-90 hover:opacity-100 transition-all duration-500">
         <img 
           src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/020efcc2-39fa-4397-a8b1-657fce73285a-naharatechnologies-com/assets/images/roundIcon3_0ff1aeb1-10.png"
           alt="Decorative Element Bottom Left"
           width={248}
           height={248}
         />
      </div>

    </section>
  );
}