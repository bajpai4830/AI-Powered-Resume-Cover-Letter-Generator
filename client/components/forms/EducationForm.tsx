import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, GraduationCap } from "lucide-react";

interface EducationItem {
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  gpa?: string;
}

interface EducationFormProps {
  data: EducationItem[];
  onChange: (data: EducationItem[]) => void;
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addEducation = () => {
    const newEducation: EducationItem = {
      school: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      gpa: ""
    };
    onChange([...data, newEducation]);
    setEditingIndex(data.length);
  };

  const updateEducation = (index: number, field: keyof EducationItem, value: string) => {
    const updated = data.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Education</h3>
          <p className="text-sm text-gray-600 mt-1">
            Add your educational qualifications, degrees, and academic achievements
          </p>
        </div>
        <Button onClick={addEducation} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <GraduationCap className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No education added yet</h3>
            <p className="text-gray-600 text-center mb-4">
              Add your educational background to showcase your qualifications
            </p>
            <Button onClick={addEducation}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <Card key={index} className={editingIndex === index ? "border-blue-300 bg-blue-50" : ""}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">
                    {education.degree || "New Education"} 
                    {education.field && ` in ${education.field}`}
                    {education.school && (
                      <span className="text-sm font-normal text-gray-600 block">
                        at {education.school}
                      </span>
                    )}
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
                      onClick={() => removeEducation(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {editingIndex === index ? (
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`school-${index}`}>School/Institution *</Label>
                    <Input
                      id={`school-${index}`}
                      placeholder="e.g., Stanford University, MIT, Community College"
                      value={education.school}
                      onChange={(e) => updateEducation(index, "school", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`degree-${index}`}>Degree *</Label>
                      <Input
                        id={`degree-${index}`}
                        placeholder="e.g., Bachelor's, Master's, PhD, Certificate"
                        value={education.degree}
                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`field-${index}`}>Field of Study *</Label>
                      <Input
                        id={`field-${index}`}
                        placeholder="e.g., Computer Science, Business, Engineering"
                        value={education.field}
                        onChange={(e) => updateEducation(index, "field", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`start-year-${index}`}>Start Year *</Label>
                      <Input
                        id={`start-year-${index}`}
                        placeholder="2020"
                        value={education.startYear}
                        onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`end-year-${index}`}>End Year *</Label>
                      <Input
                        id={`end-year-${index}`}
                        placeholder="2024"
                        value={education.endYear}
                        onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`gpa-${index}`}>GPA (optional)</Label>
                      <Input
                        id={`gpa-${index}`}
                        placeholder="3.8/4.0"
                        value={education.gpa || ""}
                        onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      {education.startYear && education.endYear && (
                        <p className="text-sm text-gray-600">
                          {education.startYear} - {education.endYear}
                        </p>
                      )}
                      {education.gpa && (
                        <p className="text-sm text-gray-600">
                          GPA: {education.gpa}
                        </p>
                      )}
                    </div>
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
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
            <h4 className="font-semibold text-blue-900 mb-1">Education Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• List your most recent education first</li>
              <li>• Include relevant coursework if you're a recent graduate</li>
              <li>• Mention honors, Dean's List, or academic achievements</li>
              <li>• Include GPA if it's strong (3.5+ typically)</li>
              <li>• Add certifications, bootcamps, or online courses if relevant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
