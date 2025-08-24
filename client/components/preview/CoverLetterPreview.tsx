import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

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

interface CoverLetterPreviewProps {
  data: FormData;
}

export function CoverLetterPreview({ data }: CoverLetterPreviewProps) {
  const hasRequiredInfo = data.personal.fullName && data.jobRole.title;
  const currentDate = format(new Date(), "MMMM d, yyyy");

  if (!hasRequiredInfo) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cover Letter Preview</h3>
          <p className="text-gray-600 mb-4">Complete Personal Information and Target Job sections to see your cover letter preview</p>
          <p className="text-sm text-gray-500">Required: Name and Job Title</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="h-full bg-white shadow-lg">
      <CardContent className="p-8">
        <div className="max-w-2xl mx-auto space-y-6 text-sm leading-relaxed">
          {/* Header */}
          <div className="text-right text-gray-600">
            <p>{currentDate}</p>
          </div>

          {/* Sender Information */}
          <div>
            <p className="font-semibold text-gray-900">{data.personal.fullName}</p>
            {data.personal.address && <p className="text-gray-700">{data.personal.address}</p>}
            {data.personal.email && <p className="text-gray-700">{data.personal.email}</p>}
            {data.personal.phone && <p className="text-gray-700">{data.personal.phone}</p>}
          </div>

          {/* Recipient Information */}
          <div>
            <p className="text-gray-700">Hiring Manager</p>
            {data.jobRole.company && (
              <>
                <p className="text-gray-700">{data.jobRole.company}</p>
                <p className="text-gray-700">[Company Address]</p>
              </>
            )}
          </div>

          {/* Subject Line */}
          <div>
            <p className="font-semibold text-gray-900">
              Re: Application for {data.jobRole.title} Position
              {data.jobRole.company && ` at ${data.jobRole.company}`}
            </p>
          </div>

          {/* Salutation */}
          <div>
            <p className="text-gray-900">Dear Hiring Manager,</p>
          </div>

          {/* Cover Letter Content Preview */}
          <div className="space-y-4">
            {/* Opening Paragraph */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-800 mb-2">
                <strong>AI-Generated Opening Paragraph</strong>
              </p>
              <p className="text-blue-700 italic">
                "I am writing to express my strong interest in the {data.jobRole.title} position
                {data.jobRole.company && ` at ${data.jobRole.company}`}. With my background in [relevant experience], 
                I am excited about the opportunity to contribute to your team and help drive [specific company goals]."
              </p>
            </div>

            {/* Body Paragraph 1 - Experience & Skills */}
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="text-green-800 mb-2">
                <strong>AI-Generated Experience Highlights</strong>
              </p>
              <p className="text-green-700 italic">
                "In my previous roles, I have developed expertise in [technical skills from your profile]. 
                My experience with [specific technologies/methodologies] has enabled me to [specific achievements]. 
                I am particularly drawn to this role because [connection to job description]."
              </p>
            </div>

            {/* Body Paragraph 2 - Achievements & Value */}
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
              <p className="text-purple-800 mb-2">
                <strong>AI-Generated Achievements & Value Proposition</strong>
              </p>
              <p className="text-purple-700 italic">
                "Some of my key accomplishments include [specific achievements from your experience]. 
                These experiences have prepared me to [how you'll contribute to their goals]. 
                I am confident that my [relevant skills] and passion for [industry/field] make me an ideal candidate."
              </p>
            </div>

            {/* Closing Paragraph */}
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <p className="text-orange-800 mb-2">
                <strong>AI-Generated Closing Paragraph</strong>
              </p>
              <p className="text-orange-700 italic">
                "I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to 
                {data.jobRole.company ? ` ${data.jobRole.company}'s` : " your organization's"} success. 
                Thank you for considering my application. I look forward to hearing from you soon."
              </p>
            </div>
          </div>

          {/* Closing */}
          <div>
            <p className="text-gray-900">Sincerely,</p>
            <br />
            <p className="font-semibold text-gray-900">{data.personal.fullName}</p>
          </div>

          {/* AI Generation Note */}
          <div className="border-t pt-4 mt-8">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">✨</span>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-1">AI Personalization</h4>
                  <p className="text-sm text-indigo-800">
                    When you generate your cover letter, AI will create personalized content based on:
                  </p>
                  <ul className="text-sm text-indigo-800 mt-2 space-y-1">
                    <li>• Your work experience and achievements</li>
                    <li>• Skills that match the job requirements</li>
                    <li>• Company research and culture alignment</li>
                    <li>• Industry-specific language and keywords</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
