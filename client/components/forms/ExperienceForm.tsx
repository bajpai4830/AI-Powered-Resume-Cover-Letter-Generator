import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Briefcase } from "lucide-react";

interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

interface ExperienceFormProps {
  data: ExperienceItem[];
  onChange: (data: ExperienceItem[]) => void;
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const [newResponsibility, setNewResponsibility] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addExperience = () => {
    const newExperience: ExperienceItem = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      responsibilities: []
    };
    onChange([...data, newExperience]);
    setEditingIndex(data.length);
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = data.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const addResponsibility = (expIndex: number) => {
    if (newResponsibility.trim()) {
      const updated = data.map((item, i) => 
        i === expIndex 
          ? { ...item, responsibilities: [...item.responsibilities, newResponsibility.trim()] }
          : item
      );
      onChange(updated);
      setNewResponsibility("");
    }
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const updated = data.map((item, i) => 
      i === expIndex 
        ? { ...item, responsibilities: item.responsibilities.filter((_, ri) => ri !== respIndex) }
        : item
    );
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <p className="text-sm text-gray-600 mt-1">
            Add your professional work experience, including internships and relevant roles
          </p>
        </div>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No work experience added yet</h3>
            <p className="text-gray-600 text-center mb-4">
              Add your work experience to showcase your professional background
            </p>
            <Button onClick={addExperience}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <Card key={index} className={editingIndex === index ? "border-blue-300 bg-blue-50" : ""}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">
                    {experience.position || "New Position"} 
                    {experience.company && ` at ${experience.company}`}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    >
                      {editingIndex === index ? "Done" : "Edit"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeExperience(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {editingIndex === index ? (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`company-${index}`}>Company Name *</Label>
                      <Input
                        id={`company-${index}`}
                        placeholder="e.g., Google, Microsoft, Startup Inc."
                        value={experience.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`position-${index}`}>Position/Role *</Label>
                      <Input
                        id={`position-${index}`}
                        placeholder="e.g., Software Engineer, Marketing Manager"
                        value={experience.position}
                        onChange={(e) => updateExperience(index, "position", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`start-${index}`}>Start Date *</Label>
                      <Input
                        id={`start-${index}`}
                        type="month"
                        value={experience.startDate}
                        onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`end-${index}`}>End Date</Label>
                      <Input
                        id={`end-${index}`}
                        type="month"
                        value={experience.endDate}
                        onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                        disabled={experience.current}
                        placeholder={experience.current ? "Present" : ""}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${index}`}
                      checked={experience.current}
                      onCheckedChange={(checked) => {
                        updateExperience(index, "current", checked);
                        if (checked) {
                          updateExperience(index, "endDate", "");
                        }
                      }}
                    />
                    <Label htmlFor={`current-${index}`}>I currently work here</Label>
                  </div>

                  <div>
                    <Label>Key Responsibilities & Achievements</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a responsibility or achievement..."
                          value={newResponsibility}
                          onChange={(e) => setNewResponsibility(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addResponsibility(index);
                            }
                          }}
                        />
                        <Button 
                          type="button" 
                          onClick={() => addResponsibility(index)}
                          size="sm"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {experience.responsibilities.length > 0 && (
                        <div className="space-y-2">
                          {experience.responsibilities.map((resp, respIndex) => (
                            <div key={respIndex} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <span className="text-sm flex-1">{resp}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeResponsibility(index, respIndex)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardContent>
                  {experience.startDate && (
                    <p className="text-sm text-gray-600 mb-2">
                      {experience.startDate} - {experience.current ? "Present" : experience.endDate || "Not specified"}
                    </p>
                  )}
                  {experience.responsibilities.length > 0 && (
                    <div className="space-y-1">
                      {experience.responsibilities.slice(0, 2).map((resp, respIndex) => (
                        <p key={respIndex} className="text-sm text-gray-700">• {resp}</p>
                      ))}
                      {experience.responsibilities.length > 2 && (
                        <p className="text-sm text-gray-500">+ {experience.responsibilities.length - 2} more...</p>
                      )}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Experience Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Start with your most recent experience first</li>
              <li>�� Use action verbs (led, developed, implemented, increased)</li>
              <li>• Include quantifiable achievements when possible (e.g., "Increased sales by 25%")</li>
              <li>• Focus on accomplishments that are relevant to your target job</li>
              <li>• Include internships, part-time work, and volunteer experience if relevant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
