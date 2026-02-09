import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  CheckSquare,
  ArrowRight,
  Plus,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { mockRecruiterStats, mockJobs, mockCandidates } from '@/data/mockData';

const RecruiterDashboard = () => {
  const stats = [
    {
      label: 'Active Job Posts',
      value: mockRecruiterStats.activeJobPosts,
      icon: Briefcase,
      color: 'text-primary',
    },
    {
      label: 'Total Applicants',
      value: mockRecruiterStats.totalApplicants,
      icon: Users,
      color: 'text-accent',
    },
    {
      label: 'Shortlisted',
      value: mockRecruiterStats.shortlistedCount,
      icon: CheckSquare,
      color: 'text-success',
    },
  ];

  const recentCandidates = mockCandidates.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Recruiter Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Review anonymized candidates and build diverse teams
          </p>
        </div>
        <Link to="/recruiter/post-job">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </Link>
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
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Anonymization Info */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="flex items-start gap-4 p-6">
          <Eye className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium text-accent">AI Powered Screening Active</p>
            <p className="text-sm text-muted-foreground">
              All candidates are shown anonymously during initial screening. You'll see only their
              skills, experience summary, and education level—not their names, photos, universities,
              or personal details. This helps ensure fair evaluation based on qualifications alone.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Active Job Posts</CardTitle>
                <CardDescription>Your current open positions</CardDescription>
              </div>
              <Link to="/recruiter/post-job">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-secondary/30 transition-colors"
                >
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.applicantCount} applicants
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={
                        job.status === 'active'
                          ? 'bg-success/10 text-success border-success/20'
                          : 'bg-muted text-muted-foreground'
                      }
                    >
                      {job.status}
                    </Badge>
                    <Link to="/recruiter/candidates">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Candidates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Top Matching Candidates</CardTitle>
                <CardDescription>Based on skill alignment</CardDescription>
              </div>
              <Link to="/recruiter/candidates">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCandidates.map((candidate) => (
                <div
                  key={candidate.candidateId}
                  className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground font-mono text-sm">
                      {candidate.candidateId.slice(-3)}
                    </div>
                    <div>
                      <p className="font-medium">{candidate.candidateId}</p>
                      <p className="text-sm text-muted-foreground">
                        {candidate.educationLevel}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">{candidate.matchPercentage}%</span>
                    </div>
                    {candidate.isShortlisted && (
                      <Badge className="bg-accent/10 text-accent border-accent/20" variant="outline">
                        Shortlisted
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
