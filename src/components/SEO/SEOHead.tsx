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
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  url,
  image = 'https://chatapc.ai/chatAPC-logo-light-mode.svg',
  type = 'website',
  siteName = 'ChatAPC',
  twitterCardType = 'summary_large_image',
}) => {
  const canonicalUrl = url || 'https://chatapc.ai';
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
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
      <meta name="twitter:site" content="@chatapc_ai" />
    </Helmet>
  );
};