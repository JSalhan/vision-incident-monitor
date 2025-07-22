import { Shield, Bell, Settings, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Navbar = () => {
  return (
    <nav className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      {/* Left - Logo and Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">SecureSight</span>
        </div>
        <div className="h-6 w-px bg-border" />
        <span className="text-sm text-muted-foreground">CCTV Monitoring Dashboard</span>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search incidents, cameras, or locations..."
            className="pl-10 bg-background"
          />
        </div>
      </div>

      {/* Right - Actions and User */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-incident-critical text-xs">
            3
          </Badge>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="h-6 w-px bg-border" />
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
        <div className="flex flex-col text-right">
          <span className="text-sm font-medium text-foreground">Admin User</span>
          <span className="text-xs text-muted-foreground">Security Center</span>
        </div>
      </div>
    </nav>
  );
};