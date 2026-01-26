import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Search,
  Filter,
  ArrowUpDown,
  CheckSquare,
  Eye,
  Hash,
  GraduationCap,
  TrendingUp,
  Info,
} from 'lucide-react';
import { mockCandidates, mockJobs } from '@/data/mockData';
import type { AnonymizedCandidate } from '@/types';

const CandidateScreening = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'match' | 'experience'>('match');
  const [candidates, setCandidates] = useState<AnonymizedCandidate[]>(mockCandidates);

  const filteredCandidates = candidates
    .filter((c) =>
      c.candidateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'match') {
        return b.matchPercentage - a.matchPercentage;
      }
      return 0; // Default order for experience
    });

  const handleShortlist = (candidateId: string) => {
    setCandidates(
      candidates.map((c) =>
        c.candidateId === candidateId ? { ...c, isShortlisted: !c.isShortlisted } : c
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Candidate Screening</h1>
        <p className="text-muted-foreground mt-1">
          Review anonymized candidate profiles based on skills and experience
        </p>
      </div>

      {/* Anonymization Notice */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20">
        <Eye className="h-5 w-5 text-accent flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm">
            <span className="font-medium text-accent">Anonymized Stage: </span>
            <span className="text-muted-foreground">
              Candidate identities are hidden. Focus on skills and qualifications for unbiased evaluation.
            </span>
          </p>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Info className="h-4 w-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-xs">
            <p className="text-sm">
              Shortlisted candidates can have their identity revealed in the next stage.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by ID or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-full sm:w-56">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {mockJobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'match' | 'experience')}>
              <SelectTrigger className="w-full sm:w-40">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Match %</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <p className="text-sm text-muted-foreground">
        {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} found
      </p>

      {/* Candidate Cards */}
      <div className="grid gap-4">
        {filteredCandidates.map((candidate) => (
          <Card
            key={candidate.candidateId}
            className={`hover:shadow-academic-md transition-all ${
              candidate.isShortlisted ? 'ring-1 ring-accent' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Candidate Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-secondary-foreground font-mono text-lg flex-shrink-0">
                    <Hash className="h-5 w-5 mr-0.5" />
                    {candidate.candidateId.slice(-3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{candidate.candidateId}</p>
                      {candidate.isShortlisted && (
                        <Badge className="bg-accent/10 text-accent border-accent/20" variant="outline">
                          Shortlisted
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        {candidate.educationLevel}
                      </span>
                      <span>{candidate.experienceSummary}</span>
                    </div>

                    {/* Skills */}
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium">Skills</p>
                      <div className="space-y-2">
                        {candidate.skills.map((skill) => (
                          <div key={skill.name} className="flex items-center gap-3">
                            <span className="text-sm w-28">{skill.name}</span>
                            <div className="flex-1 h-2 rounded-full bg-progress-bg overflow-hidden max-w-48">
                              <div
                                className="h-full rounded-full bg-progress-fill transition-all"
                                style={{ width: `${skill.proficiency}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-8">
                              {skill.proficiency}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Score & Actions */}
                <div className="flex flex-col items-center gap-3 lg:items-end">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <span className="text-2xl font-bold text-success">
                      {candidate.matchPercentage}%
                    </span>
                    <span className="text-sm text-muted-foreground">match</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={candidate.isShortlisted ? 'secondary' : 'default'}
                      onClick={() => handleShortlist(candidate.candidateId)}
                    >
                      <CheckSquare className="h-4 w-4 mr-2" />
                      {candidate.isShortlisted ? 'Shortlisted' : 'Shortlist'}
                    </Button>
                    {candidate.isShortlisted && (
                      <Link to={`/recruiter/candidate/${candidate.candidateId}`}>
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CandidateScreening;
