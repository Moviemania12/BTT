import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://behindthetech.in',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },

    { url: 'https://behindthetech.in/about', lastModified: new Date() },
    { url: 'https://behindthetech.in/articles', lastModified: new Date() },
    { url: 'https://behindthetech.in/learn', lastModified: new Date() },
    { url: 'https://behindthetech.in/tools', lastModified: new Date() },
    { url: 'https://behindthetech.in/contact', lastModified: new Date() },

    { url: 'https://behindthetech.in/privacy-policy', lastModified: new Date() },
    { url: 'https://behindthetech.in/terms-and-conditions', lastModified: new Date() },
    { url: 'https://behindthetech.in/cookie-policy', lastModified: new Date() },
    { url: 'https://behindthetech.in/disclaimer', lastModified: new Date() },
    { url: 'https://behindthetech.in/editorial-policy', lastModified: new Date() },
    { url: 'https://behindthetech.in/content-policy', lastModified: new Date() },
    { url: 'https://behindthetech.in/fact-checking-policy', lastModified: new Date() },
    { url: 'https://behindthetech.in/correction-policy', lastModified: new Date() },
    { url: 'https://behindthetech.in/affiliate-disclosure', lastModified: new Date() },
    { url: 'https://behindthetech.in/advertising-disclosure', lastModified: new Date() },
    { url: 'https://behindthetech.in/accessibility', lastModified: new Date() },
    { url: 'https://behindthetech.in/data-center-map', lastModified: new Date() },
  ]
}
