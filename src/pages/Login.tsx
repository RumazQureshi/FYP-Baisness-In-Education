import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Shield, User, Briefcase, ArrowRight } from 'lucide-react';
import type { UserRole } from '@/types';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('seeker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Demo navigation based on role
      if (role === 'seeker') {
        navigate('/seeker/dashboard');
      } else {
        navigate('/recruiter/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Bias-Aware Screening</h1>
          <p className="text-muted-foreground mt-2">Fair recruitment through anonymization</p>
        </div>

        <Card className="shadow-academic-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">I am a</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value) => setRole(value as UserRole)}
                  className="grid grid-cols-2 gap-3"
                >
                  <Label
                    htmlFor="role-seeker"
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      role === 'seeker'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <RadioGroupItem value="seeker" id="role-seeker" className="sr-only" />
                    <User className="w-5 h-5" />
                    <span className="font-medium">Job Seeker</span>
                  </Label>
                  <Label
                    htmlFor="role-recruiter"
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      role === 'recruiter'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <RadioGroupItem value="recruiter" id="role-recruiter" className="sr-only" />
                    <Briefcase className="w-5 h-5" />
                    <span className="font-medium">Recruiter</span>
                  </Label>
                </RadioGroup>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'border-destructive' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-primary font-medium hover:underline">
                Create one
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          This system promotes fair hiring by removing identifying information from candidate profiles.
        </p>
      </div>
    </div>
  );
};

export default Login;
