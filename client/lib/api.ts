// Types for API requests and responses
export interface FormData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  links: {
    linkedin: string;
    github: string;
    portfolio: string;
    other: string;
  };
  skills: {
    technical: string[];
    soft: string[];
  };
  education: Array<{
    school: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    gpa?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    responsibilities: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    date: string;
  }>;
  jobRole: {
    title: string;
    company: string;
    description: string;
  };
}

export interface AIGeneratedContent {
  resume: {
    summary: string;
    enhancedExperience: Array<{
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      current: boolean;
      enhancedResponsibilities: string[];
    }>;
    enhancedProjects: Array<{
      title: string;
      enhancedDescription: string;
      technologies: string[];
      impact: string;
    }>;
  };
  coverLetter: {
    content: string;
    personalizedOpening: string;
    bodyParagraphs: string[];
    strongClosing: string;
  };
}

// API Client class
class AIGenerationAPI {
  private baseURL = '/api';

  // Generate both resume and cover letter
  async generateBoth(formData: FormData): Promise<AIGeneratedContent> {
    const response = await fetch(`${this.baseURL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate content');
    }

    return response.json();
  }

  // Generate only resume
  async generateResume(formData: FormData): Promise<Pick<AIGeneratedContent, 'resume'>> {
    const response = await fetch(`${this.baseURL}/generate/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate resume');
    }

    return response.json();
  }

  // Generate only cover letter
  async generateCoverLetter(formData: FormData): Promise<Pick<AIGeneratedContent, 'coverLetter'>> {
    const response = await fetch(`${this.baseURL}/generate/cover-letter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate cover letter');
    }

    return response.json();
  }
}

// Export singleton instance
export const aiAPI = new AIGenerationAPI();

// Helper functions for form validation before API calls
export const validateFormForGeneration = (formData: FormData): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields
  if (!formData.personal.fullName) {
    errors.push('Full name is required');
  }
  if (!formData.personal.email) {
    errors.push('Email is required');
  }
  if (!formData.jobRole.title) {
    errors.push('Target job title is required');
  }

  // Recommended fields
  if (formData.skills.technical.length === 0) {
    errors.push('At least one technical skill is recommended');
  }
  if (formData.experience.length === 0) {
    errors.push('At least one work experience is recommended');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

// Get completion percentage for progress tracking
export const getFormCompletionPercentage = (formData: FormData): number => {
  let completed = 0;
  let total = 0;

  // Personal info (required)
  total += 4;
  if (formData.personal.fullName) completed++;
  if (formData.personal.email) completed++;
  if (formData.personal.phone) completed++;
  if (formData.personal.address) completed++;

  // Job role (required)
  total += 3;
  if (formData.jobRole.title) completed++;
  if (formData.jobRole.company) completed++;
  if (formData.jobRole.description) completed++;

  // Skills (recommended)
  total += 2;
  if (formData.skills.technical.length > 0) completed++;
  if (formData.skills.soft.length > 0) completed++;

  // Links (optional but valuable)
  total += 2;
  if (formData.links.linkedin || formData.links.github || formData.links.portfolio) completed++;
  if (formData.links.other) completed++;

  // Experience (recommended)
  total += 1;
  if (formData.experience.length > 0) completed++;

  // Education (recommended)
  total += 1;
  if (formData.education.length > 0) completed++;

  // Projects (optional)
  total += 1;
  if (formData.projects.length > 0) completed++;

  return Math.round((completed / total) * 100);
};

// PDF Download functionality
export const downloadPDF = async (
  type: 'resume' | 'cover-letter' | 'both',
  formData: FormData,
  aiContent?: AIGeneratedContent
): Promise<void> => {
  try {
    const response = await fetch('/api/download/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data: formData,
        aiContent
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate PDF');
    }

    // Get the filename from the response headers
    const contentDisposition = response.headers.get('content-disposition');
    let filename = `${formData.personal.fullName.replace(/\s+/g, '_')}_${type}.html`;

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }

    // Get the HTML content
    const htmlContent = await response.text();

    // Create a blob and download it
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('PDF download error:', error);
    throw error;
  }
};
