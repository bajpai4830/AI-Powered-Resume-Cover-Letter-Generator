import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Trophy } from "lucide-react";

interface AchievementItem {
  title: string;
  description: string;
  date: string;
}

interface AchievementsFormProps {
  data: AchievementItem[];
  onChange: (data: AchievementItem[]) => void;
}

export function AchievementsForm({ data, onChange }: AchievementsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addAchievement = () => {
    const newAchievement: AchievementItem = {
      title: "",
      description: "",
      date: ""
    };
    onChange([...data, newAchievement]);
    setEditingIndex(data.length);
  };

  const updateAchievement = (index: number, field: keyof AchievementItem, value: string) => {
    const updated = data.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const removeAchievement = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Achievements & Awards</h3>
          <p className="text-sm text-gray-600 mt-1">
            Highlight your accomplishments, awards, recognitions, and extracurricular activities
          </p>
        </div>
        <Button onClick={addAchievement} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Achievement
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Trophy className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No achievements added yet</h3>
            <p className="text-gray-600 text-center mb-4">
              Add your awards, recognitions, and notable accomplishments
            </p>
            <Button onClick={addAchievement}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Achievement
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((achievement, index) => (
            <Card key={index} className={editingIndex === index ? "border-blue-300 bg-blue-50" : ""}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">
                    {achievement.title || "New Achievement"}
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
                      onClick={() => removeAchievement(index)}
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
                    <Label htmlFor={`achievement-title-${index}`}>Achievement Title *</Label>
                    <Input
                      id={`achievement-title-${index}`}
                      placeholder="e.g., Employee of the Year, Dean's List, Hackathon Winner"
                      value={achievement.title}
                      onChange={(e) => updateAchievement(index, "title", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`achievement-description-${index}`}>Description *</Label>
                    <Textarea
                      id={`achievement-description-${index}`}
                      placeholder="Describe the achievement, what you accomplished, and its significance..."
                      value={achievement.description}
                      onChange={(e) => updateAchievement(index, "description", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`achievement-date-${index}`}>Date *</Label>
                    <Input
                      id={`achievement-date-${index}`}
                      type="month"
                      value={achievement.date}
                      onChange={(e) => updateAchievement(index, "date", e.target.value)}
                    />
                  </div>
                </CardContent>
              ) : (
                <CardContent>
                  {achievement.description && (
                    <p className="text-sm text-gray-700 mb-2">
                      {achievement.description.slice(0, 120)}...
                    </p>
                  )}
                  {achievement.date && (
                    <p className="text-sm text-gray-600">
                      {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </p>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-purple-900 mb-1">Achievement Tips</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Include awards, honors, scholarships, and recognitions</li>
              <li>• Mention leadership roles and volunteer activities</li>
              <li>• Include academic achievements like Dean's List or GPA if strong</li>
              <li>• Add competition wins, publications, or speaking engagements</li>
              <li>• Quantify your achievements when possible (e.g., "Top 5% of class")</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
