export default function PricingTestimonialsSection() {
  const assets = [
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/020efcc2-39fa-4397-a8b1-657fce73285a-naharatechnologies-com/assets/images/images_14.png",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/020efcc2-39fa-4397-a8b1-657fce73285a-naharatechnologies-com/assets/images/images_15.png",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/020efcc2-39fa-4397-a8b1-657fce73285a-naharatechnologies-com/assets/images/images_16.png",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/020efcc2-39fa-4397-a8b1-657fce73285a-naharatechnologies-com/assets/images/images_17.png",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/020efcc2-39fa-4397-a8b1-657fce73285a-naharatechnologies-com/assets/images/images_18.png"
  ];

  const columns = [
    // Column 1
    [
      {
        name: "Jamie Rivera",
        handle: "@jamietechguru00",
        image: assets[0],
        text: "The flexible pricing plans allowed us to start small and scale as our user base grew. Truly a game changer for startups.",
        userPosition: "top"
      },
      {
        name: "Josh Smith",
        handle: "@jjsmith",
        image: assets[1],
        text: "Our team's productivity has skyrocketed since we started using this tool. The customized enterprise plan was exactly what we needed to streamline our workflow.",
        userPosition: "bottom"
      },
      {
        name: "Morgan Lee",
        handle: "@morganleewhiz",
        image: assets[2],
        text: "This app has completely transformed how I manage my projects and deadlines. The value for money is unmatched in the market right now.",
        userPosition: "bottom"
      },
      {
        name: "Alex Johnson",
        handle: "@alexj_design",
        image: assets[3],
        text: "As a seasoned designer always on the lookout for innovative tools, I highly recommend this platform for its affordable pro features.",
        userPosition: "bottom"
      }
    ],
    // Column 2
    [
      {
        name: "Casey Jordan",
        handle: "@caseyj",
        image: assets[4],
        text: "Their pay-as-you-go model is perfect for seasonal businesses like ours. We only pay for what we use.",
        userPosition: "top"
      },
      {
        name: "Taylor Kim",
        handle: "@taylorkim",
        image: assets[0],
        text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
        userPosition: "bottom"
      },
      {
        name: "Riley Smith",
        handle: "@rileysmith1",
        image: assets[1],
        text: "The customizability and integration capabilities of this app are top-notch. It's rare to find such robust features at this price point.",
        userPosition: "bottom"
      },
      {
        name: "Jordan Lee",
        handle: "@jlee_ux",
        image: assets[2],
        text: "I was amazed at how quickly we were able to onboard our entire team. The UX is intuitive and the billing is transparent.",
        userPosition: "bottom"
      }
    ],
    // Column 3
    [
      {
        name: "Jordan Patels",
        handle: "@jpatelsdesign",
        image: assets[3],
        text: "Transparent billing and exceptional support. I've never had to worry about hidden fees or surprise charges.",
        userPosition: "top"
      },
      {
        name: "Sam Dawson",
        handle: "@dawsontechtips",
        image: assets[4],
        text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place. It pays for itself in time saved.",
        userPosition: "bottom"
      },
      {
        name: "Casey Harper",
        handle: "@casey09",
        image: assets[0],
        text: "Its user-friendly interface and robust features support our diverse needs. Definitely worth the investment for any growing team.",
        userPosition: "bottom"
      }
    ]
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-[#feecea]/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden font-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-300 dark:to-gray-500 mb-6 tracking-tight">
            What our clients say
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            From just an idea to owning a product, our team has helped a lot of businesses and individuals in Africa and around the world achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6 lg:gap-8">
              {column.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className={`flex flex-col h-full ${testimonial.userPosition === 'top' ? 'flex-col' : 'flex-col-reverse justify-between gap-6'}`}>
                    
                    {/* User Info Block */}
                    <div className={`flex items-center gap-4 ${testimonial.userPosition === 'top' ? 'mb-4' : 'mt-2'}`}>
                      <div className="relative">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {/* Interactive accent indicator */}
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-base">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">
                          {testimonial.handle}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${testimonial.userPosition === 'top' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`}>
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background elements matching the design system */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-red-100/50 dark:bg-red-900/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-pink-100/50 dark:bg-pink-900/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
    </section>
  );
}