import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Code, ExternalLink } from "lucide-react";

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface ProjectsFormProps {
  data: ProjectItem[];
  onChange: (data: ProjectItem[]) => void;
}

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const [newTechnology, setNewTechnology] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addProject = () => {
    const newProject: ProjectItem = {
      title: "",
      description: "",
      technologies: [],
      link: ""
    };
    onChange([...data, newProject]);
    setEditingIndex(data.length);
  };

  const updateProject = (index: number, field: keyof ProjectItem, value: any) => {
    const updated = data.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const addTechnology = (projectIndex: number) => {
    if (newTechnology.trim()) {
      const project = data[projectIndex];
      if (!project.technologies.includes(newTechnology.trim())) {
        const updated = data.map((item, i) => 
          i === projectIndex 
            ? { ...item, technologies: [...item.technologies, newTechnology.trim()] }
            : item
        );
        onChange(updated);
      }
      setNewTechnology("");
    }
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const updated = data.map((item, i) => 
      i === projectIndex 
        ? { ...item, technologies: item.technologies.filter((_, ti) => ti !== techIndex) }
        : item
    );
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Projects</h3>
          <p className="text-sm text-gray-600 mt-1">
            Showcase your personal projects, open-source contributions, or significant work
          </p>
        </div>
        <Button onClick={addProject} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Code className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects added yet</h3>
            <p className="text-gray-600 text-center mb-4">
              Add your notable projects to showcase your skills and experience
            </p>
            <Button onClick={addProject}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <Card key={index} className={editingIndex === index ? "border-blue-300 bg-blue-50" : ""}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">
                    {project.title || "New Project"}
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
                      onClick={() => removeProject(index)}
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
                    <Label htmlFor={`title-${index}`}>Project Title *</Label>
                    <Input
                      id={`title-${index}`}
                      placeholder="e.g., E-commerce Website, Mobile App, Data Analysis Tool"
                      value={project.title}
                      onChange={(e) => updateProject(index, "title", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`description-${index}`}>Description *</Label>
                    <Textarea
                      id={`description-${index}`}
                      placeholder="Describe the project, its purpose, key features, and your role..."
                      value={project.description}
                      onChange={(e) => updateProject(index, "description", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`link-${index}`}>Project Link (optional)</Label>
                    <Input
                      id={`link-${index}`}
                      placeholder="https://github.com/yourusername/project or live demo URL"
                      value={project.link || ""}
                      onChange={(e) => updateProject(index, "link", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Technologies Used *</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a technology (e.g., React, Python, MongoDB...)"
                          value={newTechnology}
                          onChange={(e) => setNewTechnology(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTechnology(index);
                            }
                          }}
                        />
                        <Button 
                          type="button" 
                          onClick={() => addTechnology(index)}
                          size="sm"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-sm">
                              {tech}
                              <button
                                onClick={() => removeTechnology(index, techIndex)}
                                className="ml-2 hover:text-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardContent>
                  {project.description && (
                    <p className="text-sm text-gray-700 mb-3">{project.description.slice(0, 150)}...</p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}
                  {project.link && (
                    <div className="flex items-center text-sm text-blue-600">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      <span>View Project</span>
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
            <h4 className="font-semibold text-blue-900 mb-1">Project Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Include both personal and professional projects</li>
              <li>• Focus on projects that demonstrate skills relevant to your target job</li>
              <li>• Mention the problem you solved and the impact of your work</li>
              <li>• Include links to GitHub repositories or live demos when possible</li>
              <li>• List the specific technologies and tools you used</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
