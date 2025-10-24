import { useState } from 'react';

interface HubSpotFormData {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  message: string;
  phone?: string;
  jobtitle?: string;
  industry?: string;
  plant_size?: string;
  primary_challenge?: string;
  current_systems?: string;
  website?: string;
  lead_status?: string;
  lead_source?: string;
}

interface HubSpotSubmitOptions {
  portalId?: string;
  formGuid?: string;
  region?: string;
  pageName?: string;
  pageUri?: string;
}

interface UseHubSpotReturn {
  submitToHubSpot: (formData: HubSpotFormData, options?: HubSpotSubmitOptions) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  resetSuccess: () => void;
  clearError: () => void;
}

export const useHubSpot = (): UseHubSpotReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitToHubSpot = async (formData: HubSpotFormData, options?: HubSpotSubmitOptions): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // HubSpot configuration - base values with override support
      const HUBSPOT_PORTAL_ID = options?.portalId ?? '146813965';
      const HUBSPOT_FORM_GUID = options?.formGuid ?? '3ea13446-443c-4daa-ba74-10f0a653dc42';
      const region = options?.region;

      // Get HubSpot tracking cookie
      const getHubSpotCookie = () => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
          const [name, value] = cookie.trim().split('=');
          if (name === 'hubspotutk') {
            return value;
          }
        }
        return null;
      };

      const hutk = getHubSpotCookie();

      // Try different field name formats based on the error message
      const fields = [
        { name: 'firstname', value: formData.firstname?.trim?.() ?? '' },
        { name: 'lastname', value: formData.lastname?.trim?.() ?? '' },
        { name: 'email', value: formData.email?.trim?.() ?? '' },
        { name: 'company', value: formData.company?.trim?.() ?? '' },
        { name: 'message', value: formData.message?.trim?.() ?? '' },
      ];

      const optionalFieldMap: Array<{ key: keyof HubSpotFormData; name: string }> = [
        { key: 'phone', name: '0-2/phone' },
        { key: 'jobtitle', name: 'jobtitle' },
        { key: 'industry', name: 'industry' },
        { key: 'plant_size', name: 'plant_size' },
        { key: 'primary_challenge', name: 'primary_challenge' },
        { key: 'current_systems', name: 'current_systems' },
        { key: 'website', name: 'website' },
        { key: 'lead_status', name: 'lead_status' },
        { key: 'lead_source', name: 'lead_source' },
      ];

      optionalFieldMap.forEach(({ key, name }) => {
        const value = formData[key];
        if (typeof value === 'string' && value.trim().length > 0) {
          fields.push({ name, value: value.trim() });
        }
      });

      const hubspotData = {
        fields,
        context: {
          hutk: hutk || undefined, // Use undefined instead of empty string
          pageUri: options?.pageUri || window.location.href,
          pageName: options?.pageName || 'ChatAPC Landing Page'
        }
      };

      // Log the exact data being sent for debugging
      console.log('HubSpot fields being sent:', hubspotData.fields.map(f => `${f.name}: ${f.value}`));

      // Remove hutk from context if it's empty to avoid validation error
      if (!hutk) {
        delete hubspotData.context.hutk;
      }

      console.log('Sending data to HubSpot:', hubspotData);

      const baseUrl = region ? `https://api-${region}.hsforms.com` : 'https://api.hsforms.com';

      const response = await fetch(
        `${baseUrl}/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hubspotData)
        }
      );

      console.log('HubSpot response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('HubSpot success:', result);
        setSuccess(true);
        
        // Auto-reset success state after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        
        return true;
      } else {
        const errorData = await response.json();
        console.error('HubSpot API Error:', errorData);
        
        // Parse specific error messages for better user experience
        let errorMessage = 'Failed to submit form';
        
        if (errorData.errors && errorData.errors.length > 0) {
          const firstError = errorData.errors[0];
          
          switch (firstError.errorType) {
            case 'BLOCKED_EMAIL':
              errorMessage = 'This email address is not allowed. Please use a different email address.';
              break;
            case 'INVALID_EMAIL':
              errorMessage = 'Please enter a valid email address.';
              break;
            case 'REQUIRED_FIELD':
              errorMessage = `Required field is missing: ${firstError.message}`;
              break;
            case 'INVALID_HUTK':
              errorMessage = 'There was a tracking issue. Please try again.';
              break;
            default:
              errorMessage = firstError.message || errorData.message || 'Failed to submit form';
          }
        } else {
          errorMessage = errorData.message || 'Failed to submit form';
        }
        
        setError(errorMessage);
        return false;
      }
    } catch (err) {
      console.error('HubSpot Integration Error:', err);
      setError(err instanceof Error ? err.message : 'Network error. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetSuccess = () => {
    setSuccess(false);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    submitToHubSpot,
    isLoading,
    error,
    success,
    resetSuccess,
    clearError
  };
};
