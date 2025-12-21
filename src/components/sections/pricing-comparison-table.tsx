export default function PricingComparisonTable() {
  const tiers = [
    {
      name: "Basic",
      price: "$299",
      description: "Essential tools for small businesses.",
    },
    {
      name: "Professional",
      price: "$599",
      description: "Advanced features for growing brands.",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Full-scale solutions for large organizations.",
    },
  ];

  const features = [
    {
      category: "Web Development",
      name: "Custom Website Design",
      basic: true,
      pro: true,
      enterprise: true,
    },
    {
      category: "Web Development",
      name: "CMS Integration",
      basic: true,
      pro: true,
      enterprise: true,
    },
    {
      category: "Web Development",
      name: "SEO Optimization",
      basic: "Basic",
      pro: "Advanced",
      enterprise: "Full Suite",
    },
    {
      category: "Branding",
      name: "Logo Design",
      basic: true,
      pro: true,
      enterprise: true,
    },
    {
      category: "Branding",
      name: "Brand Guidelines",
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      category: "Marketing",
      name: "Social Media Strategy",
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      category: "Marketing",
      name: "Ad Campaign Management",
      basic: false,
      pro: "5 Campaigns",
      enterprise: "Unlimited",
    },
    {
      category: "Mobile",
      name: "iOS & Android App",
      basic: false,
      pro: false,
      enterprise: true,
    },
    {
      category: "Support",
      name: "Technical Support",
      basic: "Email",
      pro: "Email & Chat",
      enterprise: "24/7 Dedicated",
    },
    {
      category: "Analytics",
      name: "Monthly Reports",
      basic: true,
      pro: true,
      enterprise: true,
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Decorative background elements consistent with other sections */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[5%] w-96 h-96 rounded-full bg-red-100/50 blur-3xl opacity-50"></div>
        <div className="absolute top-[20%] -left-[10%] w-72 h-72 rounded-full bg-pink-100/40 blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-gray-900 mb-6">
            What&apos;s Included
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Compare our plans to find the perfect fit for your business needs.
            Whether you&apos;re just starting out or scaling up, we have a solution
            for you.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="relative border border-gray-200 rounded-3xl overflow-hidden shadow-xl bg-white">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="p-6 sm:p-8 w-1/4 bg-gray-50/50 border-b border-gray-200">
                    <span className="sr-only">Feature</span>
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.name}
                      className={`p-6 sm:p-8 w-1/4 border-b border-gray-200 relative ${
                        tier.popular ? "bg-red-50/10" : ""
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-800 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-b-lg">
                          Most Popular
                        </span>
                      )}
                      <div className="flex flex-col gap-2 pt-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {tier.name}
                        </h3>
                        <div className="text-2xl font-bold text-red-800">
                          {tier.price}
                        </div>
                        <p className="text-sm text-gray-500 font-normal leading-normal">
                          {tier.description}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {features.map((feature, featureIdx) => (
                  <tr
                    key={featureIdx}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <th className="p-6 text-sm font-semibold text-gray-700 bg-white sticky left-0 z-10 sm:static border-r sm:border-r-0 border-gray-100 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.05)] sm:shadow-none min-w-[200px]">
                      {feature.name}
                      {featureIdx === 0 ||
                      features[featureIdx - 1].category !== feature.category ? (
                        <span className="block text-[10px] uppercase tracking-wider text-red-600 font-bold mb-1 mt-1 opacity-70">
                          {feature.category}
                        </span>
                      ) : null}
                    </th>
                    {tiers.map((tier, tierIdx) => {
                      const value =
                        feature[
                          tier.name.toLowerCase() === "professional"
                            ? "pro"
                            : (tier.name.toLowerCase() as keyof typeof feature)
                        ];

                      return (
                        <td
                          key={tierIdx}
                          className={`p-6 text-center ${
                            tier.popular ? "bg-red-50/5" : ""
                          }`}
                        >
                          {value === true ? (
                            <div className="flex justify-center">
                              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-red-800"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </div>
                            </div>
                          ) : value === false ? (
                            <div className="flex justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-300"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </div>
                          ) : (
                            <span className="text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                              {value}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="p-6 bg-white sticky left-0 z-10 sm:static"></td>
                  {tiers.map((tier, idx) => (
                    <td
                      key={idx}
                      className={`p-6 text-center ${
                        tier.popular ? "bg-red-50/5" : ""
                      }`}
                    >
                      <button
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                          tier.popular
                            ? "bg-red-800 text-white hover:bg-red-700 shadow-md"
                            : "bg-white border border-gray-300 text-gray-900 hover:border-red-800 hover:text-red-800"
                        }`}
                      >
                        Choose {tier.name}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Preview / Support Text */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Need a custom plan tailored to your specific enterprise needs?{" "}
            <a
              href="/contact"
              className="text-red-800 font-semibold hover:underline decoration-2 underline-offset-4"
            >
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
