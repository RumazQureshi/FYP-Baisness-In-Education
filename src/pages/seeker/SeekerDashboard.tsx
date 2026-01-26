import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  FileText,
  Briefcase,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Eye,
  Upload,
} from 'lucide-react';
import { mockJobSeekerProfile, mockJobs } from '@/data/mockData';

const SeekerDashboard = () => {
  const profile = mockJobSeekerProfile;

  const stats = [
    {
      label: 'Profile Completion',
      value: `${profile.profileCompletion}%`,
      icon: FileText,
      color: 'text-primary',
    },
    {
      label: 'Jobs Applied',
      value: '5',
      icon: Briefcase,
      color: 'text-accent',
    },
    {
      label: 'CV Status',
      value: profile.cvUploaded ? 'Uploaded' : 'Not Uploaded',
      icon: profile.cvUploaded ? CheckCircle : AlertCircle,
      color: profile.cvUploaded ? 'text-success' : 'text-warning',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your profile and job search progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`rounded-lg bg-secondary p-3 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Completion Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Completion</CardTitle>
          <CardDescription>
            Complete your profile to improve your visibility to recruiters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{profile.profileCompletion}% Complete</span>
            <Badge variant="secondary">
              {profile.profileCompletion >= 80 ? 'Strong' : 'Needs Work'}
            </Badge>
          </div>
          <Progress value={profile.profileCompletion} className="h-2" />
          <div className="flex gap-2 pt-2">
            <Link to="/seeker/profile">
              <Button variant="outline" size="sm">
                Complete Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Anonymization Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Anonymization Status</CardTitle>
              <CardDescription>
                Your identity is protected during the screening process
              </CardDescription>
            </div>
            <Badge
              className={
                profile.anonymizationStatus === 'complete'
                  ? 'bg-success/10 text-success border-success/20'
                  : 'bg-warning/10 text-warning border-warning/20'
              }
              variant="outline"
            >
              {profile.anonymizationStatus === 'complete' ? 'Active' : 'Pending'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 rounded-lg bg-secondary/50 p-4">
            <Eye className="h-5 w-5 text-accent mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Your Candidate ID: {profile.candidateId}</p>
              <p className="text-sm text-muted-foreground">
                Recruiters see only your skills, experience summary, and education level—not your name, 
                university, or contact information—until they choose to reveal your identity.
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Link to="/seeker/generalized-cv">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View Generalized CV
              </Button>
            </Link>
            <Link to="/seeker/cv-upload">
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload New CV
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Jobs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recommended Jobs</CardTitle>
              <CardDescription>Based on your skills and preferences</CardDescription>
            </div>
            <Link to="/seeker/jobs">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockJobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-secondary/30 transition-colors"
              >
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="capitalize">
                    {job.experienceLevel}
                  </Badge>
                  <Link to="/seeker/jobs">
                    <Button size="sm">Apply</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeekerDashboard;
