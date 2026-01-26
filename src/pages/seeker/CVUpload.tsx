import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Info,
  User,
  GraduationCap,
  Mail,
  MapPin,
  Loader2,
} from 'lucide-react';
import { mockSensitiveAttributes } from '@/data/mockData';

type UploadStatus = 'idle' | 'uploading' | 'parsing' | 'complete';

const CVUpload = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('complete'); // Demo: show complete state
  const [uploadProgress, setUploadProgress] = useState(100);
  const [fileName, setFileName] = useState('resume_2024.pdf');

  const sensitiveFields = [
    {
      icon: User,
      label: 'Name',
      value: mockSensitiveAttributes.name,
      reason: 'Names can reveal gender, ethnicity, or cultural background, potentially leading to unconscious bias.',
    },
    {
      icon: GraduationCap,
      label: 'University',
      value: mockSensitiveAttributes.university,
      reason: 'Institution names can create prestige bias, favoring candidates from well-known schools regardless of actual qualifications.',
    },
    {
      icon: Mail,
      label: 'Contact Info',
      value: mockSensitiveAttributes.contactInfo,
      reason: 'Email addresses and phone numbers can sometimes reveal personal details or location.',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: mockSensitiveAttributes.location,
      reason: 'Geographic information may lead to regional or socioeconomic bias in hiring decisions.',
    },
  ];

  const handleFileSelect = useCallback(() => {
    // Simulate upload process
    setUploadStatus('uploading');
    setFileName('new_resume.pdf');
    setUploadProgress(0);

    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploadStatus('parsing');
          
          // Simulate parsing
          setTimeout(() => {
            setUploadStatus('complete');
          }, 2000);
          
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">CV Upload & Analysis</h1>
        <p className="text-muted-foreground mt-1">
          Upload your CV to begin the anonymization process
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upload Your CV</CardTitle>
          <CardDescription>
            Supported formats: PDF, DOCX (Max 5MB)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Drop Zone */}
          <div
            onClick={handleFileSelect}
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-colors"
          >
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">Click to upload or drag and drop</p>
            <p className="text-sm text-muted-foreground mt-1">PDF or DOCX up to 5MB</p>
          </div>

          {/* Upload Progress */}
          {(uploadStatus === 'uploading' || uploadStatus === 'parsing') && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium flex-1">{fileName}</span>
                <Loader2 className="h-4 w-4 animate-spin text-accent" />
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {uploadStatus === 'uploading' ? 'Uploading...' : 'Analyzing and extracting data...'}
              </p>
            </div>
          )}

          {/* Complete State */}
          {uploadStatus === 'complete' && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
              <CheckCircle className="h-5 w-5 text-success" />
              <div className="flex-1">
                <p className="font-medium text-success">CV uploaded successfully</p>
                <p className="text-sm text-muted-foreground">{fileName}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleFileSelect}>
                Replace
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sensitive Attributes Detection */}
      {uploadStatus === 'complete' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Detected Sensitive Information</CardTitle>
              </div>
              <Badge className="bg-success/10 text-success border-success/20" variant="outline">
                4 Fields Hidden
              </Badge>
            </div>
            <CardDescription>
              The following information has been detected and will be hidden from recruiters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sensitiveFields.map((field) => (
              <div
                key={field.label}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <field.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{field.label}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {field.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <EyeOff className="h-3 w-3" />
                    Hidden
                  </Badge>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs">
                      <p className="text-sm">{field.reason}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Explanation Alert */}
      <Alert className="border-accent/30 bg-accent/5">
        <Eye className="h-4 w-4 text-accent" />
        <AlertTitle className="text-accent">Why is this information hidden?</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Research shows that personal identifiers like names, photos, and educational institutions 
          can lead to unconscious bias in hiring decisions. By hiding this information during initial 
          screening, recruiters can focus purely on your skills and qualifications, leading to fairer 
          evaluation. Your full details are only revealed after you've been shortlisted based on merit.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CVUpload;
