/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://drainagehero.uk",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/outreach", "/outreach/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/outreach", "/outreach/"],
        allow: "/",
      },
    ],
  },
};
