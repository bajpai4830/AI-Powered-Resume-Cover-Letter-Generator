import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Link, 
  GraduationCap, 
  Brain, 
  Briefcase, 
  Code, 
  Award, 
  Trophy,
  Target,
  ArrowLeft,
  ArrowRight,
  Save,
  Download,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { LinksForm } from "@/components/forms/LinksForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";
import { CertificationsForm } from "@/components/forms/CertificationsForm";
import { AchievementsForm } from "@/components/forms/AchievementsForm";
import { JobRoleForm } from "@/components/forms/JobRoleForm";
import { isSectionComplete, CompleteForm } from "@/lib/validation";

type FormSection = 
  | "personal" 
  | "links" 
  | "education" 
  | "skills" 
  | "experience" 
  | "projects" 
  | "certifications" 
  | "achievements" 
  | "job-role";

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

const formSections: Array<{
  id: FormSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}> = [
  { id: "personal", label: "Personal Info", icon: User, description: "Basic contact information" },
  { id: "links", label: "Links", icon: Link, description: "Professional profiles and portfolios" },
  { id: "education", label: "Education", icon: GraduationCap, description: "Academic qualifications" },
  { id: "skills", label: "Skills", icon: Brain, description: "Technical and soft skills" },
  { id: "experience", label: "Experience", icon: Briefcase, description: "Work history and roles" },
  { id: "projects", label: "Projects", icon: Code, description: "Notable projects and contributions" },
  { id: "certifications", label: "Certifications", icon: Award, description: "Professional certifications" },
  { id: "achievements", label: "Achievements", icon: Trophy, description: "Awards and accomplishments" },
  { id: "job-role", label: "Target Job", icon: Target, description: "Job role you're applying for" },
];

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<FormSection>("personal");
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

  const updateFormData = <T extends keyof FormData>(section: T, data: FormData[T]) => {
    const newFormData = { ...formData, [section]: data };
    setFormData(newFormData);
    // Auto-save to localStorage
    localStorage.setItem('resume-builder-draft', JSON.stringify(newFormData));
  };

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('resume-builder-draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const saveDraft = () => {
    localStorage.setItem('resume-builder-draft', JSON.stringify(formData));
    // TODO: Show success toast
    console.log('Draft saved!');
  };

  const clearDraft = () => {
    localStorage.removeItem('resume-builder-draft');
    setFormData({
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
  };

  const currentSectionIndex = formSections.findIndex(section => section.id === activeSection);
  const completedSections = formSections.filter(section =>
    isSectionComplete(section.id as keyof CompleteForm, formData[section.id as keyof FormData])
  ).length;
  const progress = (completedSections / formSections.length) * 100;

  const handleNext = () => {
    if (currentSectionIndex < formSections.length - 1) {
      setActiveSection(formSections[currentSectionIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setActiveSection(formSections[currentSectionIndex - 1].id);
    }
  };

  const handleGenerate = () => {
    // Navigate to preview page for AI generation
    navigate("/preview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C9</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Resume Builder</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Progress value={progress} className="w-32" />
              <p className="text-sm text-gray-600 mt-1">
                {completedSections} of {formSections.length} sections completed
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={saveDraft}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Bar for Mobile */}
          <div className="md:hidden mb-6">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-600 mt-2 text-center">
              {completedSections} of {formSections.length} completed - Current: {formSections[currentSectionIndex].label}
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Build Your Resume</CardTitle>
                  <CardDescription>
                    Complete each section to create your professional resume and cover letter
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {formSections.map((section, index) => {
                    const Icon = section.icon;
                    const isCompleted = isSectionComplete(section.id as keyof CompleteForm, formData[section.id as keyof FormData]);
                    const isCurrent = section.id === activeSection;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all hover:bg-gray-50 ${
                          isCurrent 
                            ? "bg-blue-50 border-l-4 border-blue-600" 
                            : isCompleted 
                            ? "bg-green-50" 
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            isCurrent 
                              ? "bg-blue-100 text-blue-600" 
                              : isCompleted 
                              ? "bg-green-100 text-green-600" 
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium ${
                              isCurrent ? "text-blue-900" : isCompleted ? "text-green-900" : "text-gray-900"
                            }`}>
                              {section.label}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {section.description}
                            </p>
                          </div>
                          {isCompleted && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              ✓
                            </Badge>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Main Form Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const Icon = formSections[currentSectionIndex].icon;
                      return <Icon className="w-6 h-6 text-blue-600" />;
                    })()}
                    <div>
                      <CardTitle className="text-2xl">
                        {formSections[currentSectionIndex].label}
                      </CardTitle>
                      <CardDescription>
                        {formSections[currentSectionIndex].description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Tabs value={activeSection} onValueChange={(value) => setActiveSection(value as FormSection)}>
                    <TabsContent value="personal" className="space-y-6">
                      <PersonalInfoForm
                        data={formData.personal}
                        onChange={(data) => updateFormData('personal', data)}
                      />
                    </TabsContent>

                    <TabsContent value="links" className="space-y-6">
                      <LinksForm
                        data={formData.links}
                        onChange={(data) => updateFormData('links', data)}
                      />
                    </TabsContent>

                    <TabsContent value="education" className="space-y-6">
                      <EducationForm
                        data={formData.education}
                        onChange={(data) => updateFormData('education', data)}
                      />
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-6">
                      <SkillsForm
                        data={formData.skills}
                        onChange={(data) => updateFormData('skills', data)}
                      />
                    </TabsContent>

                    <TabsContent value="experience" className="space-y-6">
                      <ExperienceForm
                        data={formData.experience}
                        onChange={(data) => updateFormData('experience', data)}
                      />
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-6">
                      <ProjectsForm
                        data={formData.projects}
                        onChange={(data) => updateFormData('projects', data)}
                      />
                    </TabsContent>

                    <TabsContent value="certifications" className="space-y-6">
                      <CertificationsForm
                        data={formData.certifications}
                        onChange={(data) => updateFormData('certifications', data)}
                      />
                    </TabsContent>

                    <TabsContent value="achievements" className="space-y-6">
                      <AchievementsForm
                        data={formData.achievements}
                        onChange={(data) => updateFormData('achievements', data)}
                      />
                    </TabsContent>

                    <TabsContent value="job-role" className="space-y-6">
                      <JobRoleForm
                        data={formData.jobRole}
                        onChange={(data) => updateFormData('jobRole', data)}
                      />
                    </TabsContent>
                  </Tabs>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-8 border-t">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      disabled={currentSectionIndex === 0}
                      className="flex items-center space-x-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </Button>

                    <div className="flex items-center space-x-4">
                      {currentSectionIndex === formSections.length - 1 ? (
                        <>
                          <Button
                            variant="outline"
                            className="flex items-center space-x-2"
                            onClick={() => navigate("/preview")}
                          >
                            <Eye className="w-4 h-4" />
                            <span>Preview</span>
                          </Button>
                          <Button
                            onClick={handleGenerate}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Generate Resume & Cover Letter</span>
                          </Button>
                        </>
                      ) : (
                        <Button 
                          onClick={handleNext}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2"
                        >
                          <span>Next</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
