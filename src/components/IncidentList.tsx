import { useState } from "react";
import { Clock, MapPin, AlertTriangle, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Incident {
  id: string;
  title: string;
  timestamp: string;
  camera: string;
  location: string;
  severity: 'critical' | 'warning' | 'info' | 'resolved';
  description: string;
  isNew?: boolean;
}

interface IncidentListProps {
  onIncidentSelect: (incident: Incident) => void;
  selectedIncidentId?: string;
}

export const IncidentList = ({ onIncidentSelect, selectedIncidentId }: IncidentListProps) => {
  const [filter, setFilter] = useState<string>("all");

  // Mock incident data
  const incidents: Incident[] = [
    {
      id: "1",
      title: "Unauthorized Access Detected",
      timestamp: "14:32:15",
      camera: "Camera 01 - Main Entrance",
      location: "Building A - Main Entrance",
      severity: "critical",
      description: "Person detected without valid access card",
      isNew: true
    },
    {
      id: "2",
      title: "Motion in Restricted Area",
      timestamp: "14:28:42",
      camera: "Camera 03 - Server Room",
      location: "Building A - Server Room",
      severity: "warning",
      description: "Unexpected movement detected in secure zone"
    },
    {
      id: "3",
      title: "Loitering Detection",
      timestamp: "14:15:33",
      camera: "Camera 05 - Parking Lot",
      location: "Building B - Parking Area",
      severity: "info",
      description: "Person detected in area for extended period"
    },
    {
      id: "4",
      title: "Door Left Open",
      timestamp: "14:10:18",
      camera: "Camera 02 - Emergency Exit",
      location: "Building A - Emergency Exit",
      severity: "warning",
      description: "Security door remained open beyond normal duration"
    },
    {
      id: "5",
      title: "Normal Activity",
      timestamp: "14:05:22",
      camera: "Camera 04 - Lobby",
      location: "Building A - Main Lobby",
      severity: "resolved",
      description: "Routine foot traffic during business hours"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-incident-critical text-white';
      case 'warning': return 'bg-incident-warning text-black';
      case 'info': return 'bg-incident-info text-white';
      case 'resolved': return 'bg-incident-success text-white';
      default: return 'bg-muted';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <Clock className="h-4 w-4" />;
      case 'info': return <Eye className="h-4 w-4" />;
      case 'resolved': return <Eye className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    if (filter === "all") return true;
    return incident.severity === filter;
  });

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Live Incidents</h3>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {incidents.filter(i => i.severity !== 'resolved').length} Active
          </Badge>
        </div>
        
        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Incidents</SelectItem>
              <SelectItem value="critical">Critical Only</SelectItem>
              <SelectItem value="warning">Warnings Only</SelectItem>
              <SelectItem value="info">Info Only</SelectItem>
              <SelectItem value="resolved">Resolved Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Incident List */}
      <ScrollArea className="h-[600px]">
        <div className="p-2">
          {filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              className={`p-4 rounded-lg mb-2 cursor-pointer transition-all hover:bg-accent/50 ${
                selectedIncidentId === incident.id ? 'bg-accent border-l-4 border-primary' : 'hover:bg-muted/50'
              }`}
              onClick={() => onIncidentSelect(incident)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(incident.severity)}
                  <h4 className="font-medium text-sm text-foreground">{incident.title}</h4>
                  {incident.isNew && (
                    <Badge className="bg-primary text-xs px-1.5 py-0.5">NEW</Badge>
                  )}
                </div>
                <Badge className={`text-xs ${getSeverityColor(incident.severity)}`}>
                  {incident.severity.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">{incident.description}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {incident.timestamp}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {incident.location}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-1 font-medium">
                {incident.camera}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};