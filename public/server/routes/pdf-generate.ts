import { RequestHandler } from "express";

interface PDFGenerationRequest {
  type: 'resume' | 'cover-letter' | 'both';
  data: {
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
    education: Array<any>;
    experience: Array<any>;
    projects: Array<any>;
    certifications: Array<any>;
    achievements: Array<any>;
    jobRole: {
      title: string;
      company: string;
      description: string;
    };
  };
  aiContent?: {
    resume?: {
      summary: string;
      enhancedExperience: Array<any>;
      enhancedProjects: Array<any>;
    };
    coverLetter?: {
      content: string;
      personalizedOpening: string;
      bodyParagraphs: string[];
      strongClosing: string;
    };
  };
}

// Generate HTML for resume
const generateResumeHTML = (data: PDFGenerationRequest['data'], aiContent?: PDFGenerationRequest['aiContent']): string => {
  const { personal, links, skills, education, experience, projects, certifications, achievements, jobRole } = data;
  const resumeAI = aiContent?.resume;

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${personal.fullName} - Resume</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: #333;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
            font-size: 11pt;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .name {
            font-size: 24pt;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 8px;
        }
        .title {
            font-size: 14pt;
            color: #2563eb;
            margin-bottom: 15px;
        }
        .contact {
            font-size: 10pt;
            color: #6b7280;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 14pt;
            font-weight: bold;
            color: #1f2937;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .item {
            margin-bottom: 15px;
        }
        .item-title {
            font-weight: bold;
            color: #1f2937;
        }
        .item-subtitle {
            color: #6b7280;
            font-style: italic;
        }
        .item-date {
            color: #6b7280;
            font-size: 10pt;
        }
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .skill {
            background: #f3f4f6;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 10pt;
            color: #374151;
        }
        .links a {
            color: #2563eb;
            text-decoration: none;
            margin-right: 15px;
        }
        ul {
            margin: 8px 0;
            padding-left: 20px;
        }
        li {
            margin-bottom: 4px;
        }
        @media print {
            body { margin: 0; padding: 0.5in; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${personal.fullName}</div>
        ${jobRole.title ? `<div class="title">${jobRole.title}</div>` : ''}
        <div class="contact">
            ${personal.email} • ${personal.phone}${personal.address ? ` • ${personal.address}` : ''}
        </div>
        ${(links.linkedin || links.github || links.portfolio || links.other) ? `
        <div class="links" style="margin-top: 10px;">
            ${links.linkedin ? `<a href="${links.linkedin}">LinkedIn</a>` : ''}
            ${links.github ? `<a href="${links.github}">GitHub</a>` : ''}
            ${links.portfolio ? `<a href="${links.portfolio}">Portfolio</a>` : ''}
            ${links.other ? `<a href="${links.other}">Profile</a>` : ''}
        </div>
        ` : ''}
    </div>

    ${resumeAI?.summary ? `
    <div class="section">
        <div class="section-title">Professional Summary</div>
        <p>${resumeAI.summary}</p>
    </div>
    ` : ''}

    ${skills.technical.length > 0 || skills.soft.length > 0 ? `
    <div class="section">
        <div class="section-title">Skills</div>
        ${skills.technical.length > 0 ? `
        <div style="margin-bottom: 15px;">
            <strong>Technical Skills:</strong><br>
            <div class="skills">
                ${skills.technical.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
        </div>
        ` : ''}
        ${skills.soft.length > 0 ? `
        <div>
            <strong>Soft Skills:</strong><br>
            <div class="skills">
                ${skills.soft.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
        </div>
        ` : ''}
    </div>
    ` : ''}

    ${experience.length > 0 ? `
    <div class="section">
        <div class="section-title">Work Experience</div>
        ${experience.map((exp, index) => {
          const enhanced = resumeAI?.enhancedExperience?.[index];
          return `
          <div class="item">
              <div class="item-title">${exp.position}</div>
              <div class="item-subtitle">${exp.company}</div>
              <div class="item-date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
              <ul>
                  ${(enhanced?.enhancedResponsibilities || exp.responsibilities).map((resp: string) => `<li>${resp}</li>`).join('')}
              </ul>
          </div>
          `;
        }).join('')}
    </div>
    ` : ''}

    ${education.length > 0 ? `
    <div class="section">
        <div class="section-title">Education</div>
        ${education.map(edu => `
        <div class="item">
            <div class="item-title">${edu.degree} in ${edu.field}</div>
            <div class="item-subtitle">${edu.school}</div>
            <div class="item-date">${edu.startYear} - ${edu.endYear}</div>
            ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
        </div>
        `).join('')}
    </div>
    ` : ''}

    ${projects.length > 0 ? `
    <div class="section">
        <div class="section-title">Projects</div>
        ${projects.map((project, index) => {
          const enhanced = resumeAI?.enhancedProjects?.[index];
          return `
          <div class="item">
              <div class="item-title">${project.title}</div>
              <p>${enhanced?.enhancedDescription || project.description}</p>
              <div style="margin-top: 8px;">
                  <strong>Technologies:</strong> ${project.technologies.join(', ')}
              </div>
              ${enhanced?.impact ? `<div><strong>Impact:</strong> ${enhanced.impact}</div>` : ''}
              ${project.link ? `<div><a href="${project.link}">View Project</a></div>` : ''}
          </div>
          `;
        }).join('')}
    </div>
    ` : ''}

    ${certifications.length > 0 ? `
    <div class="section">
        <div class="section-title">Certifications</div>
        ${certifications.map(cert => `
        <div class="item">
            <div class="item-title">${cert.name}</div>
            <div class="item-subtitle">${cert.issuer}</div>
            <div class="item-date">${cert.date}${cert.expiryDate ? ` - Expires: ${cert.expiryDate}` : ''}</div>
        </div>
        `).join('')}
    </div>
    ` : ''}

    ${achievements.length > 0 ? `
    <div class="section">
        <div class="section-title">Achievements</div>
        ${achievements.map(achievement => `
        <div class="item">
            <div class="item-title">${achievement.title}</div>
            <div class="item-date">${achievement.date}</div>
            <p>${achievement.description}</p>
        </div>
        `).join('')}
    </div>
    ` : ''}
</body>
</html>
  `;
};

// Generate HTML for cover letter
const generateCoverLetterHTML = (data: PDFGenerationRequest['data'], aiContent?: PDFGenerationRequest['aiContent']): string => {
  const { personal, jobRole } = data;
  const coverLetterAI = aiContent?.coverLetter;
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${personal.fullName} - Cover Letter</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 1in;
            font-size: 12pt;
        }
        .header {
            margin-bottom: 40px;
        }
        .sender {
            margin-bottom: 30px;
        }
        .date {
            text-align: right;
            margin-bottom: 30px;
        }
        .recipient {
            margin-bottom: 30px;
        }
        .content {
            margin-bottom: 30px;
        }
        .content p {
            margin-bottom: 16px;
        }
        .signature {
            margin-top: 40px;
        }
        @media print {
            body { margin: 0; padding: 1in; }
        }
    </style>
</head>
<body>
    <div class="date">${currentDate}</div>
    
    <div class="sender">
        <strong>${personal.fullName}</strong><br>
        ${personal.address || ''}<br>
        ${personal.email}<br>
        ${personal.phone}
    </div>

    <div class="recipient">
        Hiring Manager<br>
        ${jobRole.company || '[Company Name]'}<br>
        [Company Address]
    </div>

    <div class="content">
        <p><strong>Re: Application for ${jobRole.title} Position${jobRole.company ? ` at ${jobRole.company}` : ''}</strong></p>
        
        ${coverLetterAI?.content ? `
        <div style="white-space: pre-line;">${coverLetterAI.content}</div>
        ` : `
        <p>Dear Hiring Manager,</p>
        
        <p>I am writing to express my strong interest in the ${jobRole.title} position${jobRole.company ? ` at ${jobRole.company}` : ''}. With my background and skills, I am excited about the opportunity to contribute to your team.</p>
        
        <p>In my previous experience, I have developed expertise that aligns well with the requirements of this role. I am particularly drawn to this position because it offers the opportunity to apply my skills in a meaningful way.</p>
        
        <p>I would welcome the opportunity to discuss how my experience and enthusiasm can contribute to ${jobRole.company || 'your organization'}'s continued success. Thank you for considering my application.</p>
        `}
    </div>

    <div class="signature">
        <p>Sincerely,</p>
        <br>
        <p><strong>${personal.fullName}</strong></p>
    </div>
</body>
</html>
  `;
};

export const handlePDFGenerate: RequestHandler = async (req, res) => {
  try {
    const request = req.body as PDFGenerationRequest;
    
    if (!request.data?.personal?.fullName) {
      return res.status(400).json({
        error: 'Missing required field: personal.fullName is required'
      });
    }

    let html = '';
    let filename = '';

    switch (request.type) {
      case 'resume':
        html = generateResumeHTML(request.data, request.aiContent);
        filename = `${request.data.personal.fullName.replace(/\s+/g, '_')}_Resume.html`;
        break;
      case 'cover-letter':
        if (!request.data.jobRole?.title) {
          return res.status(400).json({
            error: 'Missing required field: jobRole.title is required for cover letter'
          });
        }
        html = generateCoverLetterHTML(request.data, request.aiContent);
        filename = `${request.data.personal.fullName.replace(/\s+/g, '_')}_Cover_Letter.html`;
        break;
      case 'both':
        // For now, we'll return the resume HTML. In a real implementation, 
        // you might want to combine both or return a ZIP file
        html = generateResumeHTML(request.data, request.aiContent);
        filename = `${request.data.personal.fullName.replace(/\s+/g, '_')}_Resume.html`;
        break;
      default:
        return res.status(400).json({
          error: 'Invalid type. Must be one of: resume, cover-letter, both'
        });
    }

    // Set headers for file download
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Send HTML content
    res.send(html);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({
      error: 'Failed to generate PDF content. Please try again.'
    });
  }
};
