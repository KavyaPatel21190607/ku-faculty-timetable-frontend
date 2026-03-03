import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Calendar, User, Mail, ChevronDown, Users, AlertCircle } from "lucide-react";
import { days, timeSlots, getCurrentDay, getCurrentTimeSlot } from "../../utils/constants";

interface Faculty {
  _id: string;
  faculty_name: string;
  faculty_designation?: string;
  contact?: string;
  department?: string;
  timetable?: any[];
}

interface FreeSlotGridProps {
  facultyList: Faculty[];
  selectedDay?: string;
  onDayChange?: (day: string) => void;
  onFacultyClick?: (faculty: Faculty) => void;
}

// Custom dropdown component for each cell
function FacultyDropdown({ freeFaculty, onFacultyClick }: { freeFaculty: Faculty[]; onFacultyClick?: (faculty: Faculty) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (freeFaculty.length === 0) {
    return (
      <div className="flex items-center justify-center gap-2 p-3 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-100 dark:border-red-900/50 min-h-[60px]">
        <AlertCircle className="w-4 h-4 text-red-400 dark:text-red-500 flex-shrink-0" />
        <span className="text-xs text-red-500 dark:text-red-400 font-medium">No Faculty Available</span>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Dropdown trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border-2 transition-all text-left
          ${isOpen 
            ? "border-indigo-400 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 shadow-md shadow-indigo-100 dark:shadow-indigo-900/20" 
            : "border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30"
          }`}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Users className="w-4 h-4 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300 truncate">
            {selectedFaculty ? selectedFaculty.faculty_name : "View Faculty"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 px-1.5 py-0.5 rounded-md">
            {freeFaculty.length}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 dark:text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1.5 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl dark:shadow-black/30 border border-gray-200 dark:border-slate-600 overflow-hidden"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            <div className="px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border-b border-gray-100 dark:border-slate-700">
              <p className="text-xs font-semibold text-indigo-800 dark:text-indigo-300">
                {freeFaculty.length} Faculty Free
              </p>
            </div>
            <div className="max-h-56 overflow-y-auto overscroll-contain">
              {freeFaculty.map((faculty) => (
                <button
                  key={faculty._id}
                  onClick={() => {
                    setSelectedFaculty(faculty);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 text-left transition-colors flex items-center gap-2
                    hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border-b border-gray-50 dark:border-slate-700/50 last:border-0
                    ${selectedFaculty?._id === faculty._id ? "bg-indigo-50 dark:bg-indigo-950/40" : ""}`}
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center flex-shrink-0">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-slate-200 truncate">{faculty.faculty_name}</p>
                    {faculty.faculty_designation && (
                      <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{faculty.faculty_designation}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Faculty detail card */}
      <AnimatePresence>
        {selectedFaculty && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="mt-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-3 border border-indigo-100 dark:border-indigo-800/50"
          >
            <button
              onClick={() => onFacultyClick?.(selectedFaculty)}
              className="w-full flex items-start gap-2 text-left group"
              title="Click to view timetable"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-gray-900 dark:text-slate-100 truncate group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{selectedFaculty.faculty_name}</p>
                {selectedFaculty.faculty_designation && (
                  <p className="text-xs text-indigo-700 dark:text-indigo-400 font-medium mt-0.5">{selectedFaculty.faculty_designation}</p>
                )}
                {selectedFaculty.contact && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <Mail className="w-3 h-3 text-gray-400 dark:text-slate-500" />
                    <p className="text-xs text-gray-600 dark:text-slate-400 truncate">{selectedFaculty.contact}</p>
                  </div>
                )}
                <p className="text-[10px] text-indigo-500 dark:text-indigo-400 font-medium mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">Click to view timetable &rarr;</p>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FreeSlotGrid({ facultyList, selectedDay = "All", onDayChange, onFacultyClick }: FreeSlotGridProps) {
  const currentDay = getCurrentDay();
  const currentTimeSlot = getCurrentTimeSlot();
  const displayDays = selectedDay === "All" ? days : [selectedDay];

  // Build a lookup: day -> slotIndex -> list of free faculty
  const freeFacultyMap = useMemo(() => {
    const map: Record<string, Record<number, Faculty[]>> = {};

    days.forEach((day) => {
      map[day] = {};
      timeSlots.forEach((_, slotIndex) => {
        map[day][slotIndex] = [];
      });
    });

    facultyList.forEach((faculty) => {
      if (!faculty.timetable || !Array.isArray(faculty.timetable)) return;

      days.forEach((day) => {
        // find this day's data
        const dayData = faculty.timetable!.find((d: any) => d.day === day);

        timeSlots.forEach((_, slotIndex) => {
          const period = slotIndex + 1;
          let isFree = true;

          if (dayData && Array.isArray(dayData.slots)) {
            const slot = dayData.slots.find((s: any) => s.period === period);
            if (slot) {
              // Check if it's a break / free
              const subj = (slot.subject || "").trim().toLowerCase();
              const slotType = (slot.type || "").trim().toLowerCase();
              isFree =
                subj === "break" ||
                subj === "" ||
                subj === "-" ||
                subj === "—" ||
                slotType === "break";
            }
            // if no slot found for this period, faculty is free
          }
          // if no dayData at all, faculty is free that whole day

          if (isFree) {
            map[day][slotIndex].push(faculty);
          }
        });
      });
    });

    return map;
  }, [facultyList]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-900 to-purple-700 rounded-2xl p-4 lg:p-6 text-white"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">Free Slot Availability</h2>
            <p className="text-sm lg:text-base text-indigo-200 mt-1">
              View available faculty for each time slot
            </p>
          </div>
        </div>
      </motion.div>

      {/* Day Selector */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-black/20 p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-indigo-900 dark:text-indigo-400" />
          <h3 className="font-semibold text-gray-800 dark:text-slate-200">Select Day</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onDayChange?.("All")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedDay === "All"
                ? "bg-indigo-900 text-white shadow-lg shadow-indigo-900/30"
                : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
            }`}
          >
            All Days
          </button>
          {days.map((day) => {
            const isToday = day === currentDay;
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => onDayChange?.(day)}
                className={`px-4 py-2 rounded-lg font-medium transition-all relative ${
                  isSelected
                    ? "bg-indigo-900 text-white shadow-lg shadow-indigo-900/30"
                    : isToday
                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-300 border-2 border-indigo-900 dark:border-indigo-500"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                {day}
                {isToday && !isSelected && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white dark:border-slate-800"></span>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Desktop Grid View */}
      <div className="hidden lg:block overflow-x-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-black/20">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky top-0 left-0 z-20 bg-gray-50 dark:bg-slate-900 p-4 text-left font-semibold 
                text-gray-700 dark:text-slate-300 border-b-2 border-r-2 border-gray-200 dark:border-slate-700 min-w-[140px]">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500 dark:text-slate-400" />
                  <span>Time Slot</span>
                </div>
              </th>
              {displayDays.map((day) => {
                const isToday = day === currentDay;
                return (
                  <th
                    key={day}
                    className={`sticky top-0 z-10 p-4 text-center font-semibold border-b-2 border-gray-200 dark:border-slate-700 
                      min-w-[220px] ${isToday ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300" : "bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-slate-300"}`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {isToday && <Calendar className="w-5 h-5" />}
                      <span>{day}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, slotIndex) => (
              <tr key={slot.id} className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50/50 dark:hover:bg-slate-750/50 transition-colors">
                <td className="sticky left-0 z-10 p-4 text-sm font-medium text-gray-700 dark:text-slate-300 bg-gray-50 dark:bg-slate-900 
                  border-r-2 border-gray-200 dark:border-slate-700 align-top">
                  <div className="space-y-1">
                    <p className="font-semibold">{slot.time}</p>
                  </div>
                </td>
                {displayDays.map((day) => {
                  const isCurrentSlot = slot.id === currentTimeSlot;
                  const isCurrentDay = day === currentDay;
                  const freeFaculty = freeFacultyMap[day]?.[slotIndex] || [];

                  return (
                    <td
                      key={day}
                      className={`p-3 align-top ${
                        isCurrentSlot && isCurrentDay ? "bg-indigo-50/50 dark:bg-indigo-950/30" : ""
                      }`}
                    >
                      <FacultyDropdown freeFaculty={freeFaculty} onFacultyClick={onFacultyClick} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet Horizontal Scroll */}
      <div className="hidden md:block lg:hidden overflow-x-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-black/20">
        <div className="min-w-[900px]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky top-0 left-0 z-20 bg-gray-50 dark:bg-slate-900 p-3 text-left font-semibold 
                  text-gray-700 dark:text-slate-300 border-b-2 border-r-2 border-gray-200 dark:border-slate-700 min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                    <span className="text-sm">Time</span>
                  </div>
                </th>
                {displayDays.map((day) => {
                  const isToday = day === currentDay;
                  return (
                    <th
                      key={day}
                      className={`sticky top-0 z-10 p-3 text-center font-semibold border-b-2 
                        border-gray-200 dark:border-slate-700 min-w-[180px] text-sm
                        ${isToday ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300" : "bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-slate-300"}`}
                    >
                      {day}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, slotIndex) => (
                <tr key={slot.id} className="border-b border-gray-200 dark:border-slate-700">
                  <td className="sticky left-0 z-10 p-3 text-xs font-medium text-gray-700 dark:text-slate-300 
                    bg-gray-50 dark:bg-slate-900 border-r-2 border-gray-200 dark:border-slate-700 align-top">
                    <p className="font-semibold">{slot.time}</p>
                  </td>
                  {displayDays.map((day) => {
                    const freeFaculty = freeFacultyMap[day]?.[slotIndex] || [];
                    return (
                      <td key={day} className="p-2 align-top">
                        <FacultyDropdown freeFaculty={freeFaculty} onFacultyClick={onFacultyClick} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {displayDays.map((day) => {
          const isToday = day === currentDay;
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-black/20 overflow-hidden"
            >
              <div className={`p-4 ${isToday 
                ? "bg-gradient-to-r from-indigo-900 to-purple-700 text-white" 
                : "bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100"}`}
              >
                <div className="flex items-center gap-2">
                  {isToday && <Calendar className="w-5 h-5" />}
                  <h3 className="font-bold text-lg">{day}</h3>
                  {isToday && (
                    <span className="ml-auto px-2 py-1 bg-white/20 text-xs rounded-full font-medium">
                      Today
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4 space-y-4">
                {timeSlots.map((slot, slotIndex) => {
                  const freeFaculty = freeFacultyMap[day]?.[slotIndex] || [];
                  return (
                    <div key={slot.id}>
                      <div className="flex items-center gap-2 mb-2 px-2">
                        <Clock className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{slot.time}</span>
                        <span className="ml-auto text-xs font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 rounded-md">
                          {freeFaculty.length} free
                        </span>
                      </div>
                      <FacultyDropdown freeFaculty={freeFaculty} onFacultyClick={onFacultyClick} />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
