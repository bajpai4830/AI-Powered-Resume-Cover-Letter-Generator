import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface JobRole {
  title: string;
  company: string;
  description: string;
}

interface JobRoleFormProps {
  data: JobRole;
  onChange: (data: JobRole) => void;
}

export function JobRoleForm({ data, onChange }: JobRoleFormProps) {
  const handleChange = (field: keyof JobRole, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="jobTitle" className="text-lg font-semibold">Job Title *</Label>
          <p className="text-sm text-gray-600 mt-1">
            The specific position you're applying for
          </p>
          <Input
            id="jobTitle"
            placeholder="e.g., Senior Software Engineer, Marketing Manager, Data Scientist..."
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="h-12 mt-2"
          />
        </div>

        <div>
          <Label htmlFor="targetCompany" className="text-lg font-semibold">Target Company</Label>
          <p className="text-sm text-gray-600 mt-1">
            The company you're applying to (optional but recommended for personalized cover letters)
          </p>
          <Input
            id="targetCompany"
            placeholder="e.g., Google, Microsoft, Startup XYZ..."
            value={data.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className="h-12 mt-2"
          />
        </div>

        <div>
          <Label htmlFor="jobDescription" className="text-lg font-semibold">Job Description</Label>
          <p className="text-sm text-gray-600 mt-1">
            Paste the job description or key requirements. This helps AI tailor your resume and cover letter.
          </p>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here... Include key responsibilities, required skills, qualifications, etc."
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="min-h-[200px] mt-2"
          />
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">✨</span>
          </div>
          <div>
            <h4 className="font-semibold text-purple-900 mb-1">AI Personalization Tips</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• The more detailed the job description, the better AI can tailor your documents</li>
              <li>• Include specific skills, technologies, and qualifications mentioned</li>
              <li>• Company culture and values help create personalized cover letters</li>
              <li>• Keywords from the job posting improve ATS compatibility</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">What makes a good job description input:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Required skills and technologies</li>
            <li>✓ Years of experience needed</li>
            <li>✓ Key responsibilities</li>
            <li>✓ Education requirements</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Example format:</h4>
          <div className="text-xs text-gray-600 bg-white p-2 rounded border">
            "We are seeking a Senior React Developer with 5+ years experience in JavaScript, React, Node.js. 
            Responsibilities include leading frontend development, mentoring junior developers, 
            and building scalable web applications..."
          </div>
        </div>
      </div>
    </div>
  );
}
