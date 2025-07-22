import { useState } from "react";
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface IncidentPlayerProps {
  incident?: {
    id: string;
    title: string;
    timestamp: string;
    camera: string;
    severity: 'critical' | 'warning' | 'info' | 'resolved';
    videoUrl?: string;
  };
}

export const IncidentPlayer = ({ incident }: IncidentPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(120); // 2 minutes example

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-incident-critical';
      case 'warning': return 'bg-incident-warning';
      case 'info': return 'bg-incident-info';
      case 'resolved': return 'bg-incident-success';
      default: return 'bg-incident-info';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Video Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">
              {incident?.title || "No Incident Selected"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {incident?.camera || "Select an incident to view"} • {incident?.timestamp}
            </p>
          </div>
          {incident && (
            <Badge className={`${getSeverityColor(incident.severity)} text-white`}>
              {incident.severity.toUpperCase()}
            </Badge>
          )}
        </div>
      </div>

      {/* Video Display */}
      <div className="aspect-video bg-black relative flex items-center justify-center">
        {incident ? (
          <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {/* Simulated video feed */}
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white/70">Loading video feed...</p>
              <p className="text-white/50 text-sm">{incident.camera}</p>
            </div>
            
            {/* Live indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">LIVE</span>
            </div>
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-white text-sm">
              {incident.timestamp}
            </div>
          </div>
        ) : (
          <div className="text-center text-white/50">
            <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Play className="h-6 w-6" />
            </div>
            <p>Select an incident to view footage</p>
          </div>
        )}
      </div>

      {/* Video Controls */}
      <div className="p-4 space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => setCurrentTime(value[0])}
            className="w-full"
            disabled={!incident}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
              disabled={!incident}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={!incident}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
              disabled={!incident}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              disabled={!incident}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" disabled={!incident}>
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};