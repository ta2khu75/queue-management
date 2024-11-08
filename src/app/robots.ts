import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/manager/',
        },
        sitemap: 'http://localhost:3000/sitemap.xml',
    }
}