import { RequestHandler } from "express";

interface GenerateRequest {
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

interface GenerateResponse {
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

// Mock AI generation function - replace with actual Gemini API call
const generateWithAI = async (data: GenerateRequest): Promise<GenerateResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock response - this would be replaced with actual AI generation
  const resumeSummary = `Dynamic ${data.jobRole.title} with expertise in ${data.skills.technical.slice(0, 3).join(', ')}. 
    Proven track record of delivering innovative solutions and driving results in fast-paced environments. 
    Strong background in ${data.education[0]?.field || 'technology'} with excellent ${data.skills.soft.slice(0, 2).join(' and ')} skills.`;

  const enhancedExperience = data.experience.map(exp => ({
    ...exp,
    enhancedResponsibilities: exp.responsibilities.map(resp => 
      `• Enhanced: ${resp} - resulting in improved efficiency and team productivity`
    )
  }));

  const enhancedProjects = data.projects.map(project => ({
    ...project,
    enhancedDescription: `${project.description} - This project demonstrates advanced proficiency in ${project.technologies.slice(0, 2).join(' and ')}.`,
    impact: "Delivered significant value through innovative technical solutions and user-centered design."
  }));

  const coverLetterContent = `Dear Hiring Manager,

I am writing to express my strong interest in the ${data.jobRole.title} position${data.jobRole.company ? ` at ${data.jobRole.company}` : ''}. With my extensive background in ${data.skills.technical.slice(0, 3).join(', ')}, I am excited about the opportunity to contribute to your team's success.

In my previous roles, I have developed expertise in ${data.skills.technical.slice(0, 5).join(', ')}. My experience has enabled me to deliver innovative solutions and drive meaningful results. I am particularly drawn to this role because it aligns perfectly with my passion for ${data.skills.technical[0] || 'technology'} and my commitment to excellence.

${data.experience.length > 0 ? `At ${data.experience[0].company}, I ${data.experience[0].responsibilities[0]?.toLowerCase() || 'contributed significantly to the team'}. This experience has prepared me to make an immediate impact in your organization.` : ''}

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to${data.jobRole.company ? ` ${data.jobRole.company}'s` : ' your organization\'s'} continued success. Thank you for considering my application.

Sincerely,
${data.personal.fullName}`;

  return {
    resume: {
      summary: resumeSummary,
      enhancedExperience,
      enhancedProjects
    },
    coverLetter: {
      content: coverLetterContent,
      personalizedOpening: `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${data.jobRole.title} position${data.jobRole.company ? ` at ${data.jobRole.company}` : ''}.`,
      bodyParagraphs: [
        `With my extensive background in ${data.skills.technical.slice(0, 3).join(', ')}, I am excited about the opportunity to contribute to your team's success.`,
        `In my previous roles, I have developed expertise in ${data.skills.technical.slice(0, 5).join(', ')}. My experience has enabled me to deliver innovative solutions and drive meaningful results.`,
        `I am particularly drawn to this role because it aligns perfectly with my passion for ${data.skills.technical[0] || 'technology'} and my commitment to excellence.`
      ],
      strongClosing: `I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to${data.jobRole.company ? ` ${data.jobRole.company}'s` : ' your organization\'s'} continued success. Thank you for considering my application.`
    }
  };
};

export const handleAIGenerate: RequestHandler = async (req, res) => {
  try {
    const formData = req.body as GenerateRequest;

    // Validate required fields
    if (!formData.personal?.fullName || !formData.jobRole?.title) {
      return res.status(400).json({
        error: 'Missing required fields: personal.fullName and jobRole.title are required'
      });
    }

    // Generate AI content
    const result = await generateWithAI(formData);

    res.json(result);
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({
      error: 'Failed to generate AI content. Please try again.'
    });
  }
};

// Alternative endpoint for just resume generation
export const handleResumeGenerate: RequestHandler = async (req, res) => {
  try {
    const formData = req.body as GenerateRequest;

    if (!formData.personal?.fullName) {
      return res.status(400).json({
        error: 'Missing required field: personal.fullName is required'
      });
    }

    const result = await generateWithAI(formData);

    res.json({
      resume: result.resume
    });
  } catch (error) {
    console.error('Resume generation error:', error);
    res.status(500).json({
      error: 'Failed to generate resume content. Please try again.'
    });
  }
};

// Alternative endpoint for just cover letter generation
export const handleCoverLetterGenerate: RequestHandler = async (req, res) => {
  try {
    const formData = req.body as GenerateRequest;

    if (!formData.personal?.fullName || !formData.jobRole?.title) {
      return res.status(400).json({
        error: 'Missing required fields: personal.fullName and jobRole.title are required'
      });
    }

    const result = await generateWithAI(formData);

    res.json({
      coverLetter: result.coverLetter
    });
  } catch (error) {
    console.error('Cover letter generation error:', error);
    res.status(500).json({
      error: 'Failed to generate cover letter content. Please try again.'
    });
  }
};
