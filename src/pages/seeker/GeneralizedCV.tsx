import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Download,
  Eye,
  Shield,
  GraduationCap,
  Briefcase,
  Code,
  Hash,
} from 'lucide-react';
import { mockJobSeekerProfile, mockSkills, mockExperience, mockEducation } from '@/data/mockData';

const GeneralizedCV = () => {
  const profile = mockJobSeekerProfile;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Generalized CV</h1>
          <p className="text-muted-foreground mt-1">
            This is how recruiters see your profile during the anonymized screening phase
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Anonymization Notice */}
      <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
        <Shield className="h-6 w-6 text-accent flex-shrink-0" />
        <div>
          <p className="font-medium text-accent">Identity Protected</p>
          <p className="text-sm text-muted-foreground">
            Personal identifiers have been removed. Recruiters evaluate candidates based on skills and experience only.
          </p>
        </div>
      </div>

      {/* CV Preview Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-foreground/10">
              <Hash className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl text-primary-foreground">
                Candidate {profile.candidateId}
              </CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Anonymous Candidate Profile
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Skills Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Skills & Proficiency</h3>
            </div>
            <div className="grid gap-3">
              {mockSkills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-4">
                  <span className="text-sm font-medium w-32">{skill.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-progress-bg overflow-hidden">
                    <div
                      className="h-full rounded-full bg-progress-fill transition-all"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {skill.proficiency}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Experience Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Experience Summary</h3>
            </div>
            <div className="space-y-4">
              {mockExperience.map((exp) => (
                <div key={exp.id} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{exp.title}</p>
                    <p className="text-sm text-muted-foreground">{exp.duration}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-anonymized">
              <p className="text-sm text-anonymized-foreground flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Company names hidden to reduce organizational bias
              </p>
            </div>
          </div>

          <Separator />

          {/* Education Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Education</h3>
            </div>
            <div className="space-y-3">
              {mockEducation.map((edu) => (
                <div
                  key={edu.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">{edu.field}</p>
                  </div>
                  <Badge variant="secondary">{edu.year}</Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-anonymized">
              <p className="text-sm text-anonymized-foreground flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Institution names hidden to reduce prestige bias
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <p className="text-sm text-muted-foreground text-center">
        This generalized CV preserves your qualifications while removing identifying information 
        that could lead to bias in the hiring process.
      </p>
    </div>
  );
};

export default GeneralizedCV;
