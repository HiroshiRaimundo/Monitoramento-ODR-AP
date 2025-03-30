
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMonitoring } from "@/hooks/useMonitoring";
import { useResearch } from "@/hooks/useResearch";

// Components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TabContent from "@/components/dashboard/TabContent";
import LoginDialog from "@/components/LoginDialog";

const Index: React.FC = () => {
  const [timeRange, setTimeRange] = useState("mensal");
  
  // Hooks personalizados
  const auth = useAuth();
  const monitoring = useMonitoring();
  const research = useResearch();

  // Carregar dados do Supabase ao iniciar
  useEffect(() => {
    monitoring.fetchMonitoringItems();
    research.fetchResearchStudies();
    
    // Set up event listener for storage changes (for cross-tab login/logout synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "isAuthenticated") {
        if (e.newValue === "true") {
          auth.setIsLoginDialogOpen(false);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="max-w-7xl mx-auto space-y-6 flex-1">
        <Header 
          isAuthenticated={auth.isAuthenticated} 
          onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
          onLogoutClick={auth.handleLogout} 
        />

        <TabContent 
          isAuthenticated={auth.isAuthenticated}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          handleExport={monitoring.handleExport}
          monitoringItems={monitoring.monitoringItems}
          studies={research.studies}
          monitoringForm={monitoring.form}
          studyForm={research.form}
          handleAddMonitoring={monitoring.handleAddMonitoring}
          handleDeleteMonitoring={monitoring.handleDeleteMonitoring}
          handleStudySubmit={research.handleStudySubmit}
          handleDeleteStudy={research.handleDeleteStudy}
          isLoading={monitoring.isLoading}
          uniqueResponsibles={monitoring.getUniqueResponsibles()}
          responsibleFilter={monitoring.responsibleFilter}
          setResponsibleFilter={monitoring.setResponsibleFilter}
          uniqueFileTypes={monitoring.getUniqueFileTypes ? monitoring.getUniqueFileTypes() : []}
          fileTypeFilter={monitoring.fileTypeFilter}
          setFileTypeFilter={monitoring.setFileTypeFilter}
        />
      </div>

      <Footer />

      {/* Diálogo de Login */}
      <LoginDialog 
        isOpen={auth.isLoginDialogOpen}
        onOpenChange={auth.setIsLoginDialogOpen}
        form={auth.form}
        onSubmit={auth.handleLogin}
      />
    </div>
  );
};

export default Index;
