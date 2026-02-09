import type {
  Job,
  Skill,
  Experience,
  Education,
  AnonymizedCandidate,
  Notification,
  JobSeekerProfile,
  SensitiveAttributes,
} from '@/types';

// Mock Skills
export const mockSkills: Skill[] = [
  { name: 'Python', proficiency: 85 },
  { name: 'Machine Learning', proficiency: 78 },
  { name: 'Data Analysis', proficiency: 90 },
  { name: 'SQL', proficiency: 82 },
  { name: 'TensorFlow', proficiency: 65 },
  { name: 'Communication', proficiency: 88 },
];

// Mock Experience
export const mockExperience: Experience[] = [
  {
    id: 'exp-1',
    title: 'Software Engineer',
    duration: '2 years',
    description: 'Developed web applications using modern frameworks',
  },
  {
    id: 'exp-2',
    title: 'Data Analyst Intern',
    duration: '6 months',
    description: 'Analyzed business data and created visualization dashboards',
  },
];

// Mock Education
export const mockEducation: Education[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    year: '2022',
  },
  {
    id: 'edu-2',
    degree: 'Master of Science',
    field: 'Data Science',
    year: '2024',
  },
];

// Mock Job Seeker Profile
export const mockJobSeekerProfile: JobSeekerProfile = {
  id: 'seeker-1',
  candidateId: 'CND-2024-001',
  skills: mockSkills,
  experience: mockExperience,
  education: mockEducation,
  profileCompletion: 75,
  cvUploaded: true,
  anonymizationStatus: 'complete',
};

// Mock Sensitive Attributes (detected from CV)
export const mockSensitiveAttributes: SensitiveAttributes = {
  name: 'Rumaz Naveed',
  university: 'Stanford University',
  contactInfo: 'john.smith@email.com, +1-555-0123',
  location: 'San Francisco, CA',
};

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Machine Learning Engineer',
    company: 'TechCorp Inc.',
    requiredSkills: [
      { skill: 'Python', weight: 90 },
      { skill: 'Machine Learning', weight: 95 },
      { skill: 'TensorFlow', weight: 70 },
    ],
    experienceLevel: 'mid',
    description: 'We are looking for an ML engineer to join our team and build intelligent systems.',
    postedDate: new Date('2024-01-15'),
    applicantCount: 24,
    status: 'active',
  },
  {
    id: 'job-2',
    title: 'Data Scientist',
    company: 'Analytics Co.',
    requiredSkills: [
      { skill: 'Python', weight: 85 },
      { skill: 'Data Analysis', weight: 95 },
      { skill: 'SQL', weight: 80 },
    ],
    experienceLevel: 'entry',
    description: 'Join our data science team to uncover insights from complex datasets.',
    postedDate: new Date('2024-01-18'),
    applicantCount: 45,
    status: 'active',
  },
  {
    id: 'job-3',
    title: 'Senior Backend Developer',
    company: 'CloudBase Ltd.',
    requiredSkills: [
      { skill: 'Python', weight: 90 },
      { skill: 'SQL', weight: 85 },
      { skill: 'Communication', weight: 60 },
    ],
    experienceLevel: 'senior',
    description: 'Lead backend development for our cloud infrastructure platform.',
    postedDate: new Date('2024-01-10'),
    applicantCount: 18,
    status: 'active',
  },
];

// Mock Anonymized Candidates
export const mockCandidates: AnonymizedCandidate[] = [
  {
    candidateId: 'CND-2024-001',
    skills: [
      { name: 'Python', proficiency: 85 },
      { name: 'Machine Learning', proficiency: 78 },
      { name: 'Data Analysis', proficiency: 90 },
    ],
    experienceSummary: '2.5 years in software development',
    educationLevel: 'Master of Science',
    matchPercentage: 92,
    isShortlisted: false,
    isRevealed: false,
  },
  {
    candidateId: 'CND-2024-002',
    skills: [
      { name: 'Python', proficiency: 90 },
      { name: 'TensorFlow', proficiency: 85 },
      { name: 'Machine Learning', proficiency: 88 },
    ],
    experienceSummary: '4 years in machine learning',
    educationLevel: 'PhD',
    matchPercentage: 88,
    isShortlisted: true,
    isRevealed: false,
  },
  {
    candidateId: 'CND-2024-003',
    skills: [
      { name: 'Data Analysis', proficiency: 95 },
      { name: 'SQL', proficiency: 88 },
      { name: 'Python', proficiency: 72 },
    ],
    experienceSummary: '1 year as data analyst intern',
    educationLevel: 'Bachelor of Science',
    matchPercentage: 75,
    isShortlisted: false,
    isRevealed: false,
  },
  {
    candidateId: 'CND-2024-004',
    skills: [
      { name: 'Python', proficiency: 78 },
      { name: 'Communication', proficiency: 92 },
      { name: 'Data Analysis', proficiency: 80 },
    ],
    experienceSummary: '3 years in tech consulting',
    educationLevel: 'Master of Business Administration',
    matchPercentage: 70,
    isShortlisted: true,
    isRevealed: true,
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Application Received',
    message: 'Your application for Machine Learning Engineer has been received.',
    type: 'success',
    read: false,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'notif-2',
    title: 'Profile Update Required',
    message: 'Complete your profile to improve your matching score.',
    type: 'warning',
    read: false,
    createdAt: new Date('2024-01-19'),
  },
  {
    id: 'notif-3',
    title: 'New Job Match',
    message: 'A new job matching your skills has been posted.',
    type: 'info',
    read: true,
    createdAt: new Date('2024-01-18'),
  },
];

// Recruiter Stats
export const mockRecruiterStats = {
  activeJobPosts: 3,
  totalApplicants: 87,
  shortlistedCount: 12,
};
