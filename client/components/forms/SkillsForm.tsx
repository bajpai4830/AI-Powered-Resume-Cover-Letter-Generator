import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface Skills {
  technical: string[];
  soft: string[];
}

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim() && !data.technical.includes(newTechnicalSkill.trim())) {
      onChange({
        ...data,
        technical: [...data.technical, newTechnicalSkill.trim()]
      });
      setNewTechnicalSkill("");
    }
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim() && !data.soft.includes(newSoftSkill.trim())) {
      onChange({
        ...data,
        soft: [...data.soft, newSoftSkill.trim()]
      });
      setNewSoftSkill("");
    }
  };

  const removeTechnicalSkill = (skill: string) => {
    onChange({
      ...data,
      technical: data.technical.filter(s => s !== skill)
    });
  };

  const removeSoftSkill = (skill: string) => {
    onChange({
      ...data,
      soft: data.soft.filter(s => s !== skill)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'technical' | 'soft') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'technical') {
        addTechnicalSkill();
      } else {
        addSoftSkill();
      }
    }
  };

  const suggestedTechnicalSkills = [
    "JavaScript", "Python", "React", "Node.js", "TypeScript", "SQL", "Git", "AWS", 
    "Docker", "MongoDB", "PostgreSQL", "GraphQL", "REST APIs", "HTML/CSS", "Java", 
    "C++", "PHP", "Ruby", "Go", "Kubernetes", "Jenkins", "Redis", "Elasticsearch"
  ];

  const suggestedSoftSkills = [
    "Communication", "Leadership", "Problem Solving", "Teamwork", "Time Management",
    "Critical Thinking", "Adaptability", "Project Management", "Creativity", "Analytical Thinking",
    "Attention to Detail", "Customer Service", "Negotiation", "Public Speaking", "Mentoring"
  ];

  return (
    <div className="space-y-8">
      {/* Technical Skills */}
      <div className="space-y-4">
        <div>
          <Label className="text-lg font-semibold">Technical Skills</Label>
          <p className="text-sm text-gray-600 mt-1">
            Add programming languages, frameworks, tools, and technologies you're proficient in
          </p>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="e.g., JavaScript, React, Python..."
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'technical')}
            className="flex-1"
          />
          <Button onClick={addTechnicalSkill} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {data.technical.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.technical.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
                <button
                  onClick={() => removeTechnicalSkill(skill)}
                  className="ml-2 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div>
          <p className="text-sm text-gray-600 mb-2">Suggested technical skills:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTechnicalSkills
              .filter(skill => !data.technical.includes(skill))
              .slice(0, 12)
              .map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  size="sm"
                  onClick={() => onChange({
                    ...data,
                    technical: [...data.technical, skill]
                  })}
                  className="h-8 text-xs"
                >
                  + {skill}
                </Button>
              ))}
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="space-y-4">
        <div>
          <Label className="text-lg font-semibold">Soft Skills</Label>
          <p className="text-sm text-gray-600 mt-1">
            Add interpersonal and professional skills that make you effective at work
          </p>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="e.g., Leadership, Communication, Problem Solving..."
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'soft')}
            className="flex-1"
          />
          <Button onClick={addSoftSkill} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {data.soft.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.soft.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm bg-green-100 text-green-800">
                {skill}
                <button
                  onClick={() => removeSoftSkill(skill)}
                  className="ml-2 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div>
          <p className="text-sm text-gray-600 mb-2">Suggested soft skills:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedSoftSkills
              .filter(skill => !data.soft.includes(skill))
              .slice(0, 10)
              .map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  size="sm"
                  onClick={() => onChange({
                    ...data,
                    soft: [...data.soft, skill]
                  })}
                  className="h-8 text-xs"
                >
                  + {skill}
                </Button>
              ))}
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Skills Tips</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Include skills that are relevant to your target job</li>
              <li>• Be honest about your proficiency level</li>
              <li>• Mix technical and soft skills for a well-rounded profile</li>
              <li>• Use industry-standard names for technologies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
