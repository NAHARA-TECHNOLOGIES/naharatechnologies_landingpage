/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
<<<<<<< Updated upstream
	compress: true,
	reactStrictMode: true,
	webpack(config) {
			// Grab the existing rule that handles SVG imports
			const fileLoaderRule = config.module.rules.find((rule) =>
				rule.test?.test?.(".svg")
			);

			config.module.rules.push(
				// Reapply the existing rule, but only for svg imports ending in ?url
				{
					...fileLoaderRule,
					test: /\.svg$/i,
					resourceQuery: /url/, // *.svg?url
				},
				// Convert all other *.svg imports to React components
				{
					test: /\.svg$/i,
					issuer: fileLoaderRule.issuer,
					resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
					use: ["@svgr/webpack"],
				}
			);

			// Modify the file loader rule to ignore *.svg, since we have it handled now.
			fileLoaderRule.exclude = /\.svg$/i;

			return config;
		},

	// ...other config
=======
  compress: true,
  reactStrictMode: true,

  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "cdn-icons-png.flaticon.com",
      "res.cloudinary.com", // for Cloudinary-hosted images
      "localhost", // for local development backend images
      "naharatechnologies.com" // replace with your production domain if you serve images from backend
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] },
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
>>>>>>> Stashed changes
=======
  compress: true,
  reactStrictMode: true,

  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "cdn-icons-png.flaticon.com",
      "res.cloudinary.com", // for Cloudinary-hosted images
      "localhost", // for local development backend images
      "naharatechnologies.com" // replace with your production domain if you serve images from backend
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] },
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
>>>>>>> 295a02e (feat: restore all missing files and sync project from backup)
};

export default nextConfig;
