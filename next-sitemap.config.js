module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE || 'https://www.naharatechnologies.com',
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
