import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ExternalLink, Linkedin, Github, Globe } from "lucide-react";

interface Links {
  linkedin: string;
  github: string;
  portfolio: string;
  other: string;
}

interface LinksFormProps {
  data: Links;
  onChange: (data: Links) => void;
}

export function LinksForm({ data, onChange }: LinksFormProps) {
  const handleChange = (field: keyof Links, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const validateLink = (url: string) => {
    if (!url) return true;
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const formatLink = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center space-x-2">
            <Linkedin className="w-4 h-4 text-blue-600" />
            <span>LinkedIn Profile</span>
          </Label>
          <div className="flex space-x-2">
            <Input
              id="linkedin"
              placeholder="linkedin.com/in/yourprofile or full URL"
              value={data.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              className={`flex-1 h-12 ${!validateLink(data.linkedin) && data.linkedin ? 'border-red-300' : ''}`}
            />
            {data.linkedin && validateLink(data.linkedin) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(formatLink(data.linkedin), '_blank')}
                className="px-3"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
          {!validateLink(data.linkedin) && data.linkedin && (
            <p className="text-sm text-red-600">Please enter a valid URL</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="github" className="flex items-center space-x-2">
            <Github className="w-4 h-4 text-gray-800" />
            <span>GitHub Profile</span>
          </Label>
          <div className="flex space-x-2">
            <Input
              id="github"
              placeholder="github.com/yourusername or full URL"
              value={data.github}
              onChange={(e) => handleChange("github", e.target.value)}
              className={`flex-1 h-12 ${!validateLink(data.github) && data.github ? 'border-red-300' : ''}`}
            />
            {data.github && validateLink(data.github) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(formatLink(data.github), '_blank')}
                className="px-3"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
          {!validateLink(data.github) && data.github && (
            <p className="text-sm text-red-600">Please enter a valid URL</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio" className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-green-600" />
            <span>Portfolio Website</span>
          </Label>
          <div className="flex space-x-2">
            <Input
              id="portfolio"
              placeholder="yourportfolio.com or full URL"
              value={data.portfolio}
              onChange={(e) => handleChange("portfolio", e.target.value)}
              className={`flex-1 h-12 ${!validateLink(data.portfolio) && data.portfolio ? 'border-red-300' : ''}`}
            />
            {data.portfolio && validateLink(data.portfolio) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(formatLink(data.portfolio), '_blank')}
                className="px-3"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
          {!validateLink(data.portfolio) && data.portfolio && (
            <p className="text-sm text-red-600">Please enter a valid URL</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="other" className="flex items-center space-x-2">
            <ExternalLink className="w-4 h-4 text-purple-600" />
            <span>Other Professional Link</span>
          </Label>
          <div className="flex space-x-2">
            <Input
              id="other"
              placeholder="Any other relevant professional link (Behance, Dribbble, etc.)"
              value={data.other}
              onChange={(e) => handleChange("other", e.target.value)}
              className={`flex-1 h-12 ${!validateLink(data.other) && data.other ? 'border-red-300' : ''}`}
            />
            {data.other && validateLink(data.other) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(formatLink(data.other), '_blank')}
                className="px-3"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
          {!validateLink(data.other) && data.other && (
            <p className="text-sm text-red-600">Please enter a valid URL</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Professional Links Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• LinkedIn is highly recommended for most professional roles</li>
              <li>• GitHub is essential for technical positions</li>
              <li>• Portfolio websites showcase your work and personality</li>
              <li>• Only include links that are professional and up-to-date</li>
              <li>• You can enter just the domain part - we'll add https:// automatically</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">For Technical Roles:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ GitHub with recent repositories</li>
            <li>✓ Portfolio with live projects</li>
            <li>✓ LinkedIn with technical skills</li>
            <li>✓ Stack Overflow profile (optional)</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">For Creative Roles:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Portfolio website with work samples</li>
            <li>✓ Behance or Dribbble profile</li>
            <li>✓ LinkedIn for networking</li>
            <li>✓ Instagram for visual work (if relevant)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
