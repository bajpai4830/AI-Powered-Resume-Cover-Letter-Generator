import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Mail, Phone, Linkedin, Github, Globe, ExternalLink, Calendar, Award, Briefcase, GraduationCap } from "lucide-react";

interface FormData {
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
  education: Array<{
    school: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
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

interface ResumePreviewProps {
  data: FormData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const hasPersonalInfo = data.personal.fullName || data.personal.email || data.personal.phone;
  const hasLinks = data.links.linkedin || data.links.github || data.links.portfolio || data.links.other;
  const hasSkills = data.skills.technical.length > 0 || data.skills.soft.length > 0;
  const hasEducation = data.education && data.education.length > 0;
  const hasExperience = data.experience && data.experience.length > 0;
  const hasProjects = data.projects && data.projects.length > 0;
  const hasCertifications = data.certifications && data.certifications.length > 0;
  const hasAchievements = data.achievements && data.achievements.length > 0;

  const hasAnyContent = hasPersonalInfo || hasLinks || hasSkills || hasEducation || hasExperience || hasProjects || hasCertifications || hasAchievements;

  if (!hasAnyContent) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Preview</h3>
          <p className="text-gray-600 mb-4">Fill out the form sections to see your resume preview here</p>
          <p className="text-sm text-gray-500">Start with Personal Information →</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="h-full bg-white shadow-lg">
      <CardContent className="p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          {hasPersonalInfo && (
            <div className="text-center border-b pb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {data.personal.fullName || "Your Name"}
              </h1>
              {data.jobRole.title && (
                <p className="text-xl text-blue-600 font-medium mb-4">{data.jobRole.title}</p>
              )}
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                {data.personal.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{data.personal.email}</span>
                  </div>
                )}
                {data.personal.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>{data.personal.phone}</span>
                  </div>
                )}
                {data.personal.address && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{data.personal.address}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Professional Links */}
          {hasLinks && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Professional Links
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.links.linkedin && (
                  <div className="flex items-center gap-2 text-sm">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <a href={data.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {data.links.github && (
                  <div className="flex items-center gap-2 text-sm">
                    <Github className="w-4 h-4 text-gray-800" />
                    <a href={data.links.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      GitHub Profile
                    </a>
                  </div>
                )}
                {data.links.portfolio && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-green-600" />
                    <a href={data.links.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Portfolio Website
                    </a>
                  </div>
                )}
                {data.links.other && (
                  <div className="flex items-center gap-2 text-sm">
                    <ExternalLink className="w-4 h-4 text-purple-600" />
                    <a href={data.links.other} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Other Link
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Professional Summary Placeholder */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Professional Summary
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>AI-Generated Content Preview:</strong> When you generate your resume, 
                this section will contain a personalized professional summary based on your 
                experience, skills, and target job role.
              </p>
            </div>
          </div>

          {/* Skills */}
          {hasSkills && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Skills
              </h2>
              <div className="space-y-4">
                {data.skills.technical.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.technical.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.skills.soft.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.soft.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {hasExperience ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Work Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    {exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex}>{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Work Experience
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Add Experience:</strong> Go to the Experience section to add your work history. 
                  AI will enhance your responsibilities and achievements to match your target job.
                </p>
              </div>
            </div>
          )}

          {/* Education */}
          {hasEducation ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-purple-200 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                        <p className="text-purple-600 font-medium">{edu.school}</p>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <GraduationCap className="w-3 h-3 mr-1" />
                        {edu.startYear} - {edu.endYear}
                      </div>
                    </div>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Education
              </h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 text-sm">
                  <strong>Add Education:</strong> Go to the Education section to add your academic background.
                </p>
              </div>
            </div>
          )}

          {/* Projects */}
          {hasProjects ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-orange-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{project.title}</h3>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Projects
              </h2>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 text-sm">
                  <strong>Add Projects:</strong> Go to the Projects section to showcase your work. 
                  AI will help highlight the most relevant ones for your target role.
                </p>
              </div>
            </div>
          )}

          {/* Certifications */}
          {hasCertifications ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Certifications
              </h2>
              <div className="space-y-3">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="border-l-4 border-green-200 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                        <p className="text-green-600 font-medium">{cert.issuer}</p>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </div>
                    </div>
                    {cert.expiryDate && (
                      <p className="text-xs text-gray-500">
                        Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Certifications
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Add Certifications:</strong> Go to the Certifications section to add your professional credentials.
                </p>
              </div>
            </div>
          )}

          {/* Achievements */}
          {hasAchievements && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Achievements & Awards
              </h2>
              <div className="space-y-3">
                {data.achievements.map((achievement, index) => (
                  <div key={index} className="border-l-4 border-yellow-200 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
