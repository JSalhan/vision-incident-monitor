import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  severity: 'critical' | 'warning' | 'info' | 'resolved';
  duration?: number; // in minutes
}

export const IncidentTimeline = () => {
  const [currentHour, setCurrentHour] = useState(14); // 2 PM
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Mock timeline data for the current hour
  const timelineEvents: TimelineEvent[] = [
    { id: "1", time: "14:32", title: "Unauthorized Access", severity: "critical", duration: 5 },
    { id: "2", time: "14:28", title: "Motion in Restricted Area", severity: "warning", duration: 3 },
    { id: "3", time: "14:15", title: "Loitering Detection", severity: "info", duration: 8 },
    { id: "4", time: "14:10", title: "Door Left Open", severity: "warning", duration: 2 },
    { id: "5", time: "14:05", title: "Normal Activity", severity: "resolved", duration: 1 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-incident-critical';
      case 'warning': return 'bg-incident-warning';
      case 'info': return 'bg-incident-info';
      case 'resolved': return 'bg-incident-success';
      default: return 'bg-muted';
    }
  };

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const getTimePosition = (timeString: string) => {
    const [hour, minute] = timeString.split(':').map(Number);
    if (hour !== currentHour) return null;
    return (minute / 60) * 100; // Convert to percentage
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-foreground">Incident Timeline</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Today, {new Date().toLocaleDateString()}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentHour(Math.max(0, currentHour - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1 px-3 py-1 bg-accent rounded">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{formatHour(currentHour)} - {formatHour(currentHour + 1)}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentHour(Math.min(23, currentHour + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4">
        <div className="relative">
          {/* Time ruler */}
          <div className="flex justify-between text-xs text-muted-foreground mb-4">
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i}>{formatHour(currentHour)}:{(i * 10).toString().padStart(2, '0')}</span>
            ))}
          </div>

          {/* Timeline bar */}
          <div className="relative h-8 bg-muted rounded mb-4">
            {/* Time grid lines */}
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-border"
                style={{ left: `${(i + 1) * (100 / 6)}%` }}
              />
            ))}

            {/* Current time indicator */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
              style={{ left: `${(new Date().getMinutes() / 60) * 100}%` }}
            >
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
            </div>

            {/* Events */}
            {timelineEvents.map((event) => {
              const position = getTimePosition(event.time);
              if (position === null) return null;

              return (
                <div
                  key={event.id}
                  className={`absolute top-1 bottom-1 rounded cursor-pointer transition-all hover:scale-105 ${
                    selectedEvent === event.id ? 'ring-2 ring-primary' : ''
                  } ${getSeverityColor(event.severity)}`}
                  style={{
                    left: `${position}%`,
                    width: `${(event.duration || 1) * (100 / 60)}%`,
                    minWidth: '8px'
                  }}
                  onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                  title={`${event.time} - ${event.title}`}
                />
              );
            })}
          </div>

          {/* Event details */}
          {selectedEvent && (
            <div className="bg-accent p-3 rounded-lg">
              {(() => {
                const event = timelineEvents.find(e => e.id === selectedEvent);
                if (!event) return null;
                
                return (
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.time} • Duration: {event.duration} minutes
                      </p>
                    </div>
                    <Badge className={`${getSeverityColor(event.severity)} text-white`}>
                      {event.severity.toUpperCase()}
                    </Badge>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};