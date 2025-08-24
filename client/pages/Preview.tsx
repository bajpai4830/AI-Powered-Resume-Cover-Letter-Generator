import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Download, 
  RefreshCw, 
  FileText, 
  Mail,
  Eye,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { CoverLetterPreview } from "@/components/preview/CoverLetterPreview";
import { aiAPI, validateFormForGeneration, downloadPDF, type AIGeneratedContent } from "@/lib/api";

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

export default function Preview() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    personal: { fullName: "", email: "", phone: "", address: "" },
    links: { linkedin: "", github: "", portfolio: "", other: "" },
    education: [],
    skills: { technical: [], soft: [] },
    experience: [],
    projects: [],
    certifications: [],
    achievements: [],
    jobRole: { title: "", company: "", description: "" },
  });
  const [activeTab, setActiveTab] = useState("resume");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiContent, setAiContent] = useState<AIGeneratedContent | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Load form data from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('resume-builder-draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    }
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      // Validate form data
      const validation = validateFormForGeneration(formData);
      if (!validation.valid) {
        throw new Error(`Please complete the following: ${validation.errors.join(', ')}`);
      }

      // Generate AI content
      const content = await aiAPI.generateBoth(formData);
      setAiContent(content);
      console.log('Generated AI content successfully');
    } catch (error) {
      console.error('AI generation error:', error);
      setGenerationError(error instanceof Error ? error.message : 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (type: 'resume' | 'cover-letter' | 'both' = 'both') => {
    setIsDownloading(true);
    try {
      await downloadPDF(type, formData, aiContent || undefined);
      console.log('PDF downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      setGenerationError(error instanceof Error ? error.message : 'Failed to download PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  const hasEnoughData = formData.personal.fullName && formData.jobRole.title;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/builder")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Builder</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C9</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Preview</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/builder")}
            >
              <Eye className="w-4 h-4 mr-2" />
              Edit
            </Button>
            {hasEnoughData && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate AI Content
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDownload('both')}
                  disabled={isDownloading}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isDownloading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  Resume Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {formData.personal.fullName ? "Ready" : "Incomplete"}
                  </span>
                  <Badge variant={formData.personal.fullName ? "default" : "secondary"}>
                    {formData.personal.fullName ? "Complete" : "Needs Data"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-green-600" />
                  Cover Letter Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {formData.jobRole.title ? "Ready" : "Incomplete"}
                  </span>
                  <Badge variant={formData.jobRole.title ? "default" : "secondary"}>
                    {formData.jobRole.title ? "Complete" : "Needs Target Job"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                  AI Enhancement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">Available</span>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    Ready to Generate
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Error Display */}
          {generationError && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">Generation Error</h4>
                    <p className="text-sm text-red-800">{generationError}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Generated Content Display */}
          {aiContent && (
            <Card className="border-green-200 bg-green-50 mb-6">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">AI Content Generated Successfully!</h4>
                    <p className="text-sm text-green-800">Your resume and cover letter have been enhanced with AI-generated content.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preview Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-auto grid-cols-2">
                <TabsTrigger value="resume" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Resume Preview</span>
                </TabsTrigger>
                <TabsTrigger value="cover-letter" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Cover Letter Preview</span>
                </TabsTrigger>
              </TabsList>

              {!hasEnoughData && (
                <div className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                  Complete Personal Info and Target Job to enable full preview
                </div>
              )}
            </div>

            <TabsContent value="resume" className="mt-6">
              <ResumePreview data={formData} />
            </TabsContent>

            <TabsContent value="cover-letter" className="mt-6">
              <CoverLetterPreview data={formData} />
            </TabsContent>
          </Tabs>

          {/* Action Section */}
          {hasEnoughData && (
            <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                  Ready to Generate Professional Documents
                </CardTitle>
                <CardDescription>
                  Your information is complete! Generate AI-enhanced resume and cover letter tailored to your target job.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating AI Content...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate with AI
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload('both')}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download Current Version
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
