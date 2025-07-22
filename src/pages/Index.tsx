import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { IncidentPlayer } from "@/components/IncidentPlayer";
import { IncidentList } from "@/components/IncidentList";
import { IncidentTimeline } from "@/components/IncidentTimeline";

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

const Index = () => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const handleIncidentSelect = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  return (
    <div className="min-h-screen bg-dashboard text-foreground dark">
      <Navbar />
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-80px)]">
        {/* Left side - Incident Player */}
        <div className="lg:col-span-2">
          <IncidentPlayer incident={selectedIncident} />
        </div>
        
        {/* Right side - Incident List */}
        <div className="lg:col-span-1">
          <IncidentList 
            onIncidentSelect={handleIncidentSelect}
            selectedIncidentId={selectedIncident?.id}
          />
        </div>
      </div>

      {/* Bottom - Timeline */}
      <div className="p-6 pt-0">
        <IncidentTimeline />
      </div>
    </div>
  );
};

export default Index;
