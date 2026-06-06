/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ercas2026.ufba.br',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
};
