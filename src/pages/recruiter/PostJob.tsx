import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, X, Briefcase, Sliders, CheckCircle } from 'lucide-react';
import type { SkillRequirement } from '@/types';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: '',
  });
  const [skills, setSkills] = useState<SkillRequirement[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addSkill = () => {
    if (newSkill.trim() && !skills.find((s) => s.skill.toLowerCase() === newSkill.toLowerCase())) {
      setSkills([...skills, { skill: newSkill.trim(), weight: 50 }]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillName: string) => {
    setSkills(skills.filter((s) => s.skill !== skillName));
  };

  const updateSkillWeight = (skillName: string, weight: number) => {
    setSkills(skills.map((s) => (s.skill === skillName ? { ...s, weight } : s)));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Experience level is required';
    }
    if (skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/recruiter/dashboard');
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[400px] animate-fade-in">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Job Posted Successfully!</h2>
            <p className="text-muted-foreground">
              Your job posting is now live and candidates can start applying.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Post a New Job</h1>
        <p className="text-muted-foreground mt-1">
          Create a job posting and define skill requirements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">Job Details</CardTitle>
            </div>
            <CardDescription>Basic information about the position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="e.g., Machine Learning Engineer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className={errors.description ? 'border-destructive' : ''}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
              >
                <SelectTrigger className={errors.experienceLevel ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                </SelectContent>
              </Select>
              {errors.experienceLevel && (
                <p className="text-sm text-destructive">{errors.experienceLevel}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills and Weights */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">Required Skills</CardTitle>
            </div>
            <CardDescription>
              Add skills and adjust their importance using the weight sliders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Skill Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill (e.g., Python, Machine Learning)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1"
              />
              <Button type="button" onClick={addSkill} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {errors.skills && (
              <p className="text-sm text-destructive">{errors.skills}</p>
            )}

            {/* Skills List with Weights */}
            {skills.length > 0 && (
              <div className="space-y-4 pt-2">
                {skills.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-sm">
                        {skill.skill}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          Weight: {skill.weight}%
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeSkill(skill.skill)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Slider
                      value={[skill.weight]}
                      onValueChange={(value) => updateSkillWeight(skill.skill, value[0])}
                      min={10}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            )}

            {skills.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Sliders className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No skills added yet</p>
                <p className="text-xs">Add skills above to define job requirements</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" size="lg">
            Post Job
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
