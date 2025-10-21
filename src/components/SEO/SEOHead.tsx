import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  siteName?: string;
  twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  keywords?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  schema?: object;
}

/**
 * SEOHead Component - Enhanced version with breadcrumbs and schema support
 * 
 * Usage:
 * <SEOHead 
 *   title="ChatAPC - AI Process Control"
 *   description="Transform your plant operations..."
 *   url="https://chatapc.ai/"
 *   breadcrumbs={[
 *     { name: 'Home', url: 'https://chatapc.ai/' },
 *     { name: 'About', url: 'https://chatapc.ai/company/about' }
 *   ]}
 * />
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  url,
  image = 'https://chatapc.ai/chatAPC-logo-light-mode.svg',
  type = 'website',
  siteName = 'ChatAPC',
  twitterCardType = 'summary_large_image',
  keywords,
  breadcrumbs,
  schema,
}) => {
  const canonicalUrl = url || 'https://chatapc.ai';
  
  // Generate breadcrumb schema if breadcrumbs are provided
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:site" content="@ChatAPC" />
      <meta name="twitter:creator" content="@AlphaProcessControl" />

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Custom Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};