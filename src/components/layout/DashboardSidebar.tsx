import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  User,
  FileText,
  Eye,
  Briefcase,
  PlusCircle,
  Users,
  CheckSquare,
  LogOut,
  Shield,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { UserRole } from '@/types';

interface SidebarProps {
  role: UserRole;
  collapsed: boolean;
  onToggle: () => void;
}

const seekerNavItems = [
  { path: '/seeker/dashboard', label: 'Dashboard', icon: Home },
  { path: '/seeker/profile', label: 'Profile', icon: User },
  { path: '/seeker/cv-upload', label: 'CV Upload', icon: FileText },
  { path: '/seeker/generalized-cv', label: 'Generalized CV', icon: Eye },
  { path: '/seeker/jobs', label: 'Job Listings', icon: Briefcase },
];

const recruiterNavItems = [
  { path: '/recruiter/dashboard', label: 'Dashboard', icon: Home },
  { path: '/recruiter/post-job', label: 'Post Job', icon: PlusCircle },
  { path: '/recruiter/candidates', label: 'Candidates', icon: Users },
  { path: '/recruiter/shortlist', label: 'Shortlist', icon: CheckSquare },
];

export const DashboardSidebar = ({ role, collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navItems = role === 'seeker' ? seekerNavItems : recruiterNavItems;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <Shield className="h-4 w-4 text-sidebar-primary-foreground" />
              </div>
              <span className="font-semibold text-sm">Explainable AI</span>
            </div>
          )}
          {collapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary mx-auto">
              <Shield className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            const linkContent = (
              <Link
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.path} delayDuration={0}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.path}>{linkContent}</div>;
          })}
        </nav>

        {/* Role Indicator */}
        {!collapsed && (
          <div className="mx-3 mb-2 rounded-lg bg-sidebar-accent/50 px-3 py-2">
            <p className="text-xs text-sidebar-foreground/60">Logged in as</p>
            <p className="text-sm font-medium capitalize">{role}</p>
          </div>
        )}

        {/* Logout */}
        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/login"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
              collapsed && 'justify-center'
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>
    </aside>
  );
};
