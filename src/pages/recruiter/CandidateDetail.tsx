import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  CalendarIcon,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { mockSkills, mockExperience, mockEducation, mockSensitiveAttributes } from '@/data/mockData';
import { format } from 'date-fns';

const CandidateDetail = () => {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const [interviewDate, setInterviewDate] = useState<Date | undefined>();
  const [interviewTime, setInterviewTime] = useState<string>('');
  const [isScheduled, setIsScheduled] = useState(false);

  // Mock revealed candidate data
  const candidate = {
    candidateId: candidateId || 'CND-2024-001',
    fullName: mockSensitiveAttributes.name,
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    location: mockSensitiveAttributes.location,
    university: mockSensitiveAttributes.university,
    skills: mockSkills,
    experience: mockExperience,
    education: mockEducation,
    matchPercentage: 92,
  };

  const handleScheduleInterview = () => {
    if (interviewDate && interviewTime) {
      setIsScheduled(true);
    }
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shortlist
      </Button>

      {/* Revealed Notice */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-revealed border border-revealed-foreground/20">
        <CheckCircle className="h-5 w-5 text-revealed-foreground flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-revealed-foreground">Identity Revealed</p>
          <p className="text-sm text-muted-foreground">
            Full candidate details are now visible. This candidate was shortlisted based on 
            their anonymized profile.
          </p>
        </div>
      </div>

      {/* Candidate Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-2xl font-semibold flex-shrink-0">
              {candidate.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">{candidate.fullName}</h1>
                  <p className="text-muted-foreground">{candidate.candidateId}</p>
                </div>
                <Badge className="bg-success/10 text-success border-success/20" variant="outline">
                  {candidate.matchPercentage}% Match
                </Badge>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 mt-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {candidate.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {candidate.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {candidate.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  {candidate.university}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Skills */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Skills</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {candidate.skills.map((skill) => (
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
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Experience</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {candidate.experience.map((exp, index) => (
                <div key={exp.id}>
                  {index > 0 && <Separator className="mb-4" />}
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{exp.title}</p>
                      <p className="text-sm text-muted-foreground">{exp.duration}</p>
                      <p className="text-sm mt-1">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Education</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {candidate.education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.field} • {candidate.university}
                    </p>
                  </div>
                  <Badge variant="secondary">{edu.year}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Interview Scheduling */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Schedule Interview</CardTitle>
              </div>
              <CardDescription>
                Select a date and time for the interview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isScheduled ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <p className="font-medium">Interview Scheduled!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {interviewDate && format(interviewDate, 'PPP')} at {interviewTime}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsScheduled(false)}
                  >
                    Reschedule
                  </Button>
                </div>
              ) : (
                <>
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {interviewDate ? format(interviewDate, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={interviewDate}
                          onSelect={setInterviewDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Picker */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <Select value={interviewTime} onValueChange={setInterviewTime}>
                      <SelectTrigger>
                        <Clock className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    className="w-full"
                    disabled={!interviewDate || !interviewTime}
                    onClick={handleScheduleInterview}
                  >
                    Schedule Interview
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;
