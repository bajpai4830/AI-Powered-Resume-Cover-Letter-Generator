import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Award } from "lucide-react";

interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

interface CertificationsFormProps {
  data: CertificationItem[];
  onChange: (data: CertificationItem[]) => void;
}

export function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addCertification = () => {
    const newCertification: CertificationItem = {
      name: "",
      issuer: "",
      date: "",
      expiryDate: ""
    };
    onChange([...data, newCertification]);
    setEditingIndex(data.length);
  };

  const updateCertification = (index: number, field: keyof CertificationItem, value: string) => {
    const updated = data.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const removeCertification = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Certifications</h3>
          <p className="text-sm text-gray-600 mt-1">
            Add your professional certifications, licenses, and credentials
          </p>
        </div>
        <Button onClick={addCertification} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No certifications added yet</h3>
            <p className="text-gray-600 text-center mb-4">
              Add your professional certifications to showcase your expertise
            </p>
            <Button onClick={addCertification}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Certification
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((certification, index) => (
            <Card key={index} className={editingIndex === index ? "border-blue-300 bg-blue-50" : ""}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">
                    {certification.name || "New Certification"}
                    {certification.issuer && (
                      <span className="text-sm font-normal text-gray-600 block">
                        from {certification.issuer}
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
                      onClick={() => removeCertification(index)}
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
                    <Label htmlFor={`cert-name-${index}`}>Certification Name *</Label>
                    <Input
                      id={`cert-name-${index}`}
                      placeholder="e.g., AWS Certified Solutions Architect, Google Analytics Certified"
                      value={certification.name}
                      onChange={(e) => updateCertification(index, "name", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`cert-issuer-${index}`}>Issuing Organization *</Label>
                    <Input
                      id={`cert-issuer-${index}`}
                      placeholder="e.g., Amazon Web Services, Google, Microsoft, Cisco"
                      value={certification.issuer}
                      onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`cert-date-${index}`}>Date Obtained *</Label>
                      <Input
                        id={`cert-date-${index}`}
                        type="month"
                        value={certification.date}
                        onChange={(e) => updateCertification(index, "date", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`cert-expiry-${index}`}>Expiry Date (if applicable)</Label>
                      <Input
                        id={`cert-expiry-${index}`}
                        type="month"
                        value={certification.expiryDate || ""}
                        onChange={(e) => updateCertification(index, "expiryDate", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      {certification.date && (
                        <p className="text-sm text-gray-600">
                          Obtained: {new Date(certification.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </p>
                      )}
                      {certification.expiryDate && (
                        <p className="text-sm text-gray-600">
                          Expires: {new Date(certification.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </p>
                      )}
                    </div>
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Certification Tips</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Include industry-recognized certifications relevant to your field</li>
              <li>• List certifications in reverse chronological order (most recent first)</li>
              <li>• Include certification IDs or badge links if available</li>
              <li>• Mention ongoing certifications or ones you're pursuing</li>
              <li>• Focus on certifications that align with your target job requirements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
