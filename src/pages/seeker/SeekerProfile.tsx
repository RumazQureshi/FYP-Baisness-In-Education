import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  X,
  Save,
  GraduationCap,
  Briefcase,
  Code,
  Edit2,
  Check,
} from 'lucide-react';
import { mockJobSeekerProfile } from '@/data/mockData';
import type { Skill, Experience, Education } from '@/types';

const SeekerProfile = () => {
  const [skills, setSkills] = useState<Skill[]>(mockJobSeekerProfile.skills);
  const [newSkill, setNewSkill] = useState('');
  const [experience, setExperience] = useState<Experience[]>(mockJobSeekerProfile.experience);
  const [education, setEducation] = useState<Education[]>(mockJobSeekerProfile.education);
  const [editingExp, setEditingExp] = useState<string | null>(null);
  const [editingEdu, setEditingEdu] = useState<string | null>(null);

  const addSkill = () => {
    if (newSkill.trim() && !skills.find((s) => s.name.toLowerCase() === newSkill.toLowerCase())) {
      setSkills([...skills, { name: newSkill.trim(), proficiency: 70 }]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillName: string) => {
    setSkills(skills.filter((s) => s.name !== skillName));
  };

  const updateSkillProficiency = (skillName: string, proficiency: number) => {
    setSkills(
      skills.map((s) => (s.name === skillName ? { ...s, proficiency } : s))
    );
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your professional information. Only non-identifying information is shared with recruiters.
        </p>
      </div>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-accent" />
            <CardTitle className="text-lg">Skills</CardTitle>
          </div>
          <CardDescription>
            Add your technical and soft skills with proficiency levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Skill */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill (e.g., Python, Communication)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              className="flex-1"
            />
            <Button onClick={addSkill} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Skills List */}
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-4">
                <Badge variant="secondary" className="min-w-[120px] justify-center">
                  {skill.name}
                </Badge>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.proficiency}
                    onChange={(e) =>
                      updateSkillProficiency(skill.name, Number(e.target.value))
                    }
                    className="w-full h-2 bg-progress-bg rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {skill.proficiency}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeSkill(skill.name)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">Experience</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newExp: Experience = {
                  id: `exp-${Date.now()}`,
                  title: 'New Position',
                  duration: '0 months',
                  description: '',
                };
                setExperience([...experience, newExp]);
                setEditingExp(newExp.id);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
          <CardDescription>
            Company names are hidden from recruiters to reduce bias
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {experience.map((exp, index) => (
            <div key={exp.id}>
              {index > 0 && <Separator className="mb-4" />}
              {editingExp === exp.id ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label>Job Title</Label>
                      <Input
                        value={exp.title}
                        onChange={(e) =>
                          setExperience(
                            experience.map((ex) =>
                              ex.id === exp.id ? { ...ex, title: e.target.value } : ex
                            )
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <Input
                        value={exp.duration}
                        onChange={(e) =>
                          setExperience(
                            experience.map((ex) =>
                              ex.id === exp.id ? { ...ex, duration: e.target.value } : ex
                            )
                          )
                        }
                        placeholder="e.g., 2 years"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) =>
                        setExperience(
                          experience.map((ex) =>
                            ex.id === exp.id ? { ...ex, description: e.target.value } : ex
                          )
                        )
                      }
                      placeholder="Describe your responsibilities and achievements..."
                      rows={3}
                    />
                  </div>
                  <Button size="sm" onClick={() => setEditingExp(null)}>
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{exp.title}</p>
                    <p className="text-sm text-muted-foreground">{exp.duration}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setEditingExp(exp.id)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">Education</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newEdu: Education = {
                  id: `edu-${Date.now()}`,
                  degree: 'Degree',
                  field: 'Field of Study',
                  year: new Date().getFullYear().toString(),
                };
                setEducation([...education, newEdu]);
                setEditingEdu(newEdu.id);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
          <CardDescription>
            Institution names are hidden to promote fair evaluation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.map((edu, index) => (
            <div key={edu.id}>
              {index > 0 && <Separator className="mb-4" />}
              {editingEdu === edu.id ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          setEducation(
                            education.map((ed) =>
                              ed.id === edu.id ? { ...ed, degree: e.target.value } : ed
                            )
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) =>
                          setEducation(
                            education.map((ed) =>
                              ed.id === edu.id ? { ...ed, field: e.target.value } : ed
                            )
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Year</Label>
                      <Input
                        value={edu.year}
                        onChange={(e) =>
                          setEducation(
                            education.map((ed) =>
                              ed.id === edu.id ? { ...ed, year: e.target.value } : ed
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                  <Button size="sm" onClick={() => setEditingEdu(null)}>
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.field} • {edu.year}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setEditingEdu(edu.id)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SeekerProfile;
