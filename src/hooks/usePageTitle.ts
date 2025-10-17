import { useEffect } from 'react';

interface UsePageTitleOptions {
  /**
   * Page title (will be appended with site name)
   */
  title: string;
  
  /**
   * Meta description for SEO
   */
  description?: string;
  
  /**
   * Override the default suffix (default: "ChatAPC - Alpha Process Control")
   */
  suffix?: string;
  
  /**
   * If true, only use the title without suffix
   */
  noSuffix?: boolean;
}

/**
 * Custom hook to manage page title and meta description
 * 
 * @example
 * // Simple usage
 * usePageTitle({ title: 'About Us' });
 * // Result: "About Us | ChatAPC - Alpha Process Control"
 * 
 * @example
 * // With description
 * usePageTitle({
 *   title: 'Blog',
 *   description: 'Latest insights on AI-powered process control'
 * });
 * 
 * @example
 * // Custom suffix
 * usePageTitle({
 *   title: 'Login',
 *   suffix: 'ChatAPC Platform'
 * });
 * 
 * @example
 * // No suffix (exact title)
 * usePageTitle({
 *   title: 'ChatAPC - Industrial AI Platform',
 *   noSuffix: true
 * });
 */
export const usePageTitle = ({
  title,
  description,
  suffix = 'ChatAPC',
  noSuffix = false,
}: UsePageTitleOptions): void => {
  useEffect(() => {
    // Set page title
    const fullTitle = noSuffix ? title : `${suffix} | ${title}`;
    document.title = fullTitle;

    // Set meta description if provided
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      
      // Create meta description tag if it doesn't exist
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      
      metaDescription.setAttribute('content', description);
    }

    // Cleanup function to reset title when component unmounts (optional)
    // You can remove this if you want the title to persist
    return () => {
      // Only reset if we're navigating away
      // document.title = 'ChatAPC - Alpha Process Control';
    };
  }, [title, description, suffix, noSuffix]);
};

/**
 * Alternative: Simple version for quick usage
 * Just sets the title without description
 * 
 * @example
 * useSimplePageTitle('About Us');
 */
export const useSimplePageTitle = (title: string): void => {
  usePageTitle({ title });
};