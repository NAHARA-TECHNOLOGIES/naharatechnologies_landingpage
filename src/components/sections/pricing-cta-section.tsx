export default function PricingCtaSection() {
  return (
    <section className="bg-[#feecea] dark:bg-gray-900 py-16 sm:py-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#FB923C] px-6 py-12 shadow-2xl sm:px-12 sm:py-16 lg:flex lg:items-center lg:gap-x-20 lg:px-16 lg:py-20 transition-transform hover:scale-[1.005] duration-500">
          
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:flex-auto lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1]">
              Stay Ahead with
              <br />
              Nahara Technologies
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/90 font-medium max-w-lg mx-auto lg:mx-0">
              Get innovation updates, insights, and product releases from Nahara’s tech ecosystem — crafted for dream builders like you.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <button
                type="button"
                className="rounded-full bg-white px-8 py-3.5 text-base font-bold text-[#B91C1C] shadow-lg hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Subscribe Now
              </button>
            </div>
          </div>
          
          <div className="relative mt-16 h-64 sm:h-80 lg:mt-0 lg:flex-none lg:w-1/2 lg:h-auto w-full max-w-md mx-auto lg:max-w-[500px] flex items-center justify-center">
             {/* Image container using aspect ratio to maintain card shape without specific height constraints */}
             <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/020efcc2-39fa-4397-a8b1-657fce73285a-naharatechnologies-com/assets/images/images_1.png"
                  alt="Stay Ahead with Nahara Technologies"
                  className="absolute inset-0 h-full w-full object-cover bg-black/20"
                />
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}