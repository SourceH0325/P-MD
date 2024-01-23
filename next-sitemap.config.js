module.exports = {
  siteUrl: 'https://minedocs.xyz',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/api/',
      },
    ],
  },
};
