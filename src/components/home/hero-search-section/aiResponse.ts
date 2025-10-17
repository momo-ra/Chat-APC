// Utility: Remove Markdown symbols from response
function stripMarkdown(text: string): string {
    let newText = text;
  
    // Replace **bold** or __bold__ with just the text
    newText = newText.replace(/\*\*(.*?)\*\*/g, '$1');
    newText = newText.replace(/__(.*?)__/g, '$1');
    
    // Replace *italic* and _italic_ with just the text
    newText = newText.replace(/\*(.*?)\*/g, '$1');
    newText = newText.replace(/_(.*?)_/g, '$1');
    
    // Remove inline code `
    newText = newText.replace(/`([^`]*)`/g, '$1');
    
    // Remove code blocks ```
    newText = newText.replace(/```[\s\S]*?```/g, '');
    
    // Replace leading bullet styles with dashes
    newText = newText.replace(/^[\s]*[\u2022\-\*]+/gm, match => '-');
    
    return newText;
  }
  
  // All available suggestion questions
  export const allSuggestionQuestions = [
    'When did TI100 start violating the high limit?',
    'How can we increase the margin of the CDU?',
    'What is TI100?',
    'What is kerosene flash point influenced by?',
    'What is the feed of C101',
    'Check if the APC limits on the Debutanizer are correct',
    'How can I increase the kerosene flash point from 42 degC to 43 degC',
    'Why is the draw temperature above its limit?',
    'Can I increase the feed from 1000 t/h to 1100 t/h?',
    'What is E201',
  ];
  
  // Initial suggestion questions
  export const initialSuggestionQuestions = [
    'When did TI100 start violating the high limit?',
    'How can we increase the margin of the CDU?',
    'What is TI100?',
  ];
  
  // Get random suggestions excluding the last asked question
  export const getRandomSuggestions = (
    lastQuestion: string,
    count: number = 3
  ): string[] => {
    const availableSuggestions = allSuggestionQuestions.filter(
      q => q.toLowerCase() !== lastQuestion.toLowerCase()
    );
  
    return availableSuggestions
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  };
  
  // Get AI response based on user message
  export const getAIResponse = (
    userMessage: string,
    lastQuestion: string
  ): { response: string; suggestions: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
  
    // Check for specific questions
    if (lowerMessage.includes('ti100') && lowerMessage.includes('violating')) {
      return {
        response: stripMarkdown(
          "TI100 exceeded its high limit at 14:32 on October 10, remaining above the limit for 45 minutes.\n\nThis extended violation indicates a sustained process disturbance that should be investigated to prevent recurrence."
        ),
        suggestions: getRandomSuggestions(lastQuestion),
      };
    } else if (
      lowerMessage.includes('increase') &&
      lowerMessage.includes('margin') &&
      lowerMessage.includes('cdu')
    ) {
      return {
        response: stripMarkdown(
          "The margin of the CDU can be increased from 3.5 EUR/ton to 3.8 EUR/ton by performing the following action:\n\n- Increase the Top pumparound flow APC high limit from 600 ton/hr to 650 ton/hr (safely below the equipment maximum of 700 ton/hr)\n- Expected margin improvement: +0.3 EUR/ton\n\nThis optimization opportunity could deliver significant annual savings while maintaining safe operating conditions."
        ),
        suggestions: getRandomSuggestions(lastQuestion),
      };
    } else if (lowerMessage.includes('what is ti100')) {
      return {
        response: stripMarkdown(
          "TI100 is the temperature indicator on the kerosene stripper overhead line, measuring vapor temperature.\n\n- Current value: 212.2°C\n- 8-hour average: 210.8°C\n- Location: Overhead vapor line of kerosene stripper\n\nThis measurement is critical for monitoring stripper performance and product quality control."
        ),
        suggestions: getRandomSuggestions(lastQuestion),
      };
    } else if (
      lowerMessage.includes('kerosene flash point') &&
      lowerMessage.includes('influenced')
    ) {
      return {
        response: stripMarkdown(
          "Kerosene flash point AI100 is influenced by two primary factors:\n\n1. Top temperature TC101 - Higher temperatures increase flash point\n2. Stripping steam FC200 - Increased steam flow raises flash point by removing light ends\n\nThese variables can be adjusted to optimize the flash point specification while maintaining product quality."
        ),
        suggestions: getRandomSuggestions(lastQuestion),
      };
    } else if (
      lowerMessage.includes('feed of c101') ||
      (lowerMessage.includes('what is') &&
        lowerMessage.includes('feed') &&
        lowerMessage.includes('c101'))
    ) {
      return {
        response: stripMarkdown(
          "The feed of stabilizer column C101 is:\n- Stream: S01\n- Source: Heat exchanger E101 outlet\n- Description: Pre-heated hydrocarbon feed entering the stabilizer for light-ends removal\n\nThis feed stream's temperature and composition significantly affect the stabilizer's separation efficiency."
        ),
        suggestions: getRandomSuggestions(lastQuestion),
      };
    } else if (
      lowerMessage.includes('apc limits') &&
      lowerMessage.includes('debutanizer')
    ) {
      return {
        response: stripMarkdown(
          "Analysis of the Debutanizer APC limits reveals an optimization opportunity:\n\nRecommendation: Reduce the APC low limit on the reboiler flow from 65 ton/hr to 60 ton/hr (equipment low limit)\n\nEconomic Impact:\n- Margin increase: 3.4 EUR/ton → 3.6 EUR/ton (+0.2 EUR/ton)\n- Annual benefit: 156k EUR/year\n\nThe current limit is unnecessarily conservative and constraining profitability. The equipment can safely operate at 60 ton/hr."
        ),
        suggestions: getRandomSuggestions(lastQuestion),
      };
    } else if (
      lowerMessage.includes('increase') &&
      lowerMessage.includes('kerosene flash point') &&
      (lowerMessage.includes('42') || lowerMessage.includes('43'))
    ) {
      return {
        response: stripMarkdown(
          "Kerosene Flash point AI100 can be increased from 42°C to 43°C by performing the following actions:\n- Increase top temperature from 110.8°C to 112.3°C (+1.5°C)\n- Increase stripping steam to the process high limit of 600 kg/hr\n\nThese adjustments will remove lighter components more effectively, raising the flash point to meet your target specification while maintaining column stability."
        ),
        suggestions: getRandomSuggestions(lastQuestion),
      };
    } else if (
      lowerMessage.includes('draw temperature') &&
      lowerMessage.includes('above') &&
      lowerMessage.includes('limit')
    ) {
      return {
        response: stripMarkdown(
          "The draw temperature is high because the kerosene draw flow is constrained at its APC low limit.\n\nWhen the draw flow hits its lower constraint, it cannot be reduced further to control the temperature, causing the temperature to rise above its limit.\n\nSolution: Either increase the draw flow limit or adjust upstream conditions to reduce the temperature driving force."
        ),
        suggestions: getRandomSuggestions(lastQuestion),
      };
    } else if (
      lowerMessage.includes('increase') &&
      lowerMessage.includes('feed') &&
      (lowerMessage.includes('1000') || lowerMessage.includes('1100'))
    ) {
      return {
        response: stripMarkdown(
          "No, the feed cannot be increased from 1000 t/h to 1100 t/h.\n\nConstraint: Column differential pressure (ΔP)\n- Current ΔP: 0.3 bar\n- Projected ΔP at 1100 t/h: 0.6 bar\n- Column limit: 0.55 bar\n\nIncreasing the feed to 1100 t/h would exceed the column's pressure limit by 0.05 bar, risking flooding and potential equipment damage. The maximum safe feed rate is lower than 1100 t/h."
        ),
        suggestions: getRandomSuggestions(lastQuestion),
      };
    } else if (lowerMessage.includes('what is e201')) {
      return {
        response: stripMarkdown(
          "E201 is a shell-and-tube heat exchanger with the following configuration:\n- Type: Shell-and-tube heat exchanger\n- Hot side (shell): Kerosene flow from Main Fractionator C101\n- Cold side (tubes): Cooling water\n- Function: Cools kerosene product to storage temperature\n\nThis exchanger is critical for product cooling and heat recovery in the fractionation section."
        ),
        suggestions: getRandomSuggestions(lastQuestion),
      };
    }
  
    // Default response
    return {
      response: stripMarkdown(
        "I can help you with various aspects of process control and optimization:\n\n- Equipment Information: Details on instruments, vessels, and heat exchangers\n- Process Analysis: Temperature trends, pressure limits, and flow constraints\n- Optimization Opportunities: Margin improvements and limit adjustments\n- Troubleshooting: Root cause analysis and corrective actions\n\nI have access to your current process data and can provide specific insights tailored to your plant operations. Try asking about specific tags, equipment, or optimization opportunities!"
      ),
      suggestions: getRandomSuggestions(lastQuestion),
    };
  };