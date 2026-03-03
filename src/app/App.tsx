import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { TimetableGrid } from "./components/TimetableGrid";
import { ClassModal } from "./components/ClassModal";
import { InfoBanner } from "./components/InfoBanner";
import { TimetableStats } from "./components/TimetableStats";
import { FloatingActions } from "./components/FloatingActions";
import { TimetableFilters } from "./components/TimetableFilters";
import { Footer } from "./components/Footer";
import { ToastProvider } from "./components/ToastProvider";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { FreeSlotGrid } from "./components/FreeSlotGrid";
import apiService from "../services/api";

export default function App() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [selectedDay, setSelectedDay] = useState("All");
  const [isFreeSlotView, setIsFreeSlotView] = useState(false);
  const [freeSlotDay, setFreeSlotDay] = useState("All");
  
  // API state
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all faculty on mount
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getAllFaculty({ limit: 100 });
        
        if (response.success && response.data) {
          setFacultyList(response.data);
        }
      } catch (err) {
        console.error('Error fetching faculty:', err);
        setError(err.message || 'Failed to load faculty data');
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleFacultySelect = (faculty) => {
    setSelectedFaculty(faculty);
  };

  const handleLectureClick = (lecture) => {
    // For now, just show the lecture info without class timetable modal
    if (lecture && lecture.class) {
      console.log('Lecture clicked:', lecture);
      // TODO: Implement class timetable view if needed
    }
  };

  // Convert MongoDB timetable structure to grid format
  const convertTimetableToGrid = (timetable) => {
    if (!timetable || !Array.isArray(timetable)) return null;

    const gridData = {};
    
    timetable.forEach((dayData) => {
      if (dayData && dayData.day && Array.isArray(dayData.slots)) {
        // Create array of 11 periods (some might be null)
        const daySlots = new Array(11).fill(null);
        
        dayData.slots.forEach((slot) => {
          if (slot && slot.period && slot.period >= 1 && slot.period <= 11) {
            daySlots[slot.period - 1] = {
              time: slot.time,
              subject: slot.subject,
              class: slot.class,
              type: slot.type || 'Lecture',
              period: slot.period
            };
          }
        });
        
        gridData[dayData.day] = daySlots;
      }
    });
    
    return gridData;
  };

  const rawTimetable = selectedFaculty ? convertTimetableToGrid(selectedFaculty.timetable) : null;

  // Filter timetable based on selected type
  const currentTimetable = rawTimetable && filterType !== "All"
    ? Object.keys(rawTimetable).reduce((acc, day) => {
        acc[day] = rawTimetable[day].map((lecture) =>
          lecture && lecture.type === filterType ? lecture : null
        );
        return acc;
      }, {})
    : rawTimetable;

  return (
    <>
      <ToastProvider />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        {/* Loading State */}
        {loading && (
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSkeleton />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
              <h2 className="text-red-800 dark:text-red-300 text-xl font-semibold mb-2">Error Loading Data</h2>
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <>
            {/* Sidebar */}
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              selectedFaculty={selectedFaculty}
              onSelectFaculty={handleFacultySelect}
              isMobile={isMobile}
              facultyList={facultyList}
            />

            {/* Main Content */}
            <div
              className={`transition-all duration-300 ${
                !isMobile && isSidebarOpen ? "lg:ml-72" : ""
              }`}
            >
              {/* Navbar */}
              <Navbar
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                isMobile={isMobile}
                onFreeSlotToggle={() => setIsFreeSlotView(!isFreeSlotView)}
                isFreeSlotView={isFreeSlotView}
              />

              {/* Content */}
              <main className="p-4 lg:p-6">
                {isFreeSlotView ? (
                  <FreeSlotGrid
                    facultyList={facultyList}
                    selectedDay={freeSlotDay}
                    onDayChange={setFreeSlotDay}
                    onFacultyClick={(faculty) => {
                      setSelectedFaculty(faculty);
                      setIsFreeSlotView(false);
                    }}
                  />
                ) : selectedFaculty ? (
                  <>
                    <InfoBanner />
                    <TimetableStats timetable={rawTimetable} />
                    <TimetableFilters onFilterChange={setFilterType} />
                    <TimetableGrid
                      timetable={currentTimetable}
                      onLectureClick={handleLectureClick}
                      facultyName={selectedFaculty?.faculty_name}
                      selectedDay={selectedDay}
                      onDayChange={setSelectedDay}
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                    <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl dark:shadow-black/40 border border-gray-200 dark:border-slate-700">
                      <video
                        src="/assets/YTDown.com_YouTube_Glimpse-Of-Karnavati-University_Media_shA7wrm06nk_002_720p.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="mt-8 text-center space-y-3">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-slate-100">
                        Welcome to KU Faculty Timetable System
                      </h2>
                      <p className="text-gray-500 dark:text-slate-400 text-base lg:text-lg max-w-xl mx-auto">
                        Select a faculty member from the sidebar to view their weekly schedule.
                      </p>
                    </div>
                  </div>
                )}
              </main>

              {/* Footer */}
              <Footer />
            </div>

            {/* Class Modal */}
            <ClassModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              classData={selectedClass?.data}
              className={selectedClass?.name}
            />

            {/* Floating Actions - Mobile Only */}
            <FloatingActions isMobile={isMobile} />
          </>
        )}
      </div>
    </>
  );
}