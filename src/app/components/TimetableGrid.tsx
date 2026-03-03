import { motion } from "motion/react";
import { LectureCard } from "./LectureCard";
import { EmptyState } from "./EmptyState";
import { days, timeSlots, getCurrentDay, getCurrentTimeSlot } from "../../utils/constants";
import { Clock, Calendar } from "lucide-react";

interface Lecture {
  subject: string;
  class: string;
  type: string;
  room?: string;
  [key: string]: any;
}

interface TimetableGridProps {
  timetable: Record<string, (Lecture | null)[]> | null;
  onLectureClick: (lecture: Lecture) => void;
  facultyName: string;
  selectedDay?: string;
  onDayChange: (day: string) => void;
}

export function TimetableGrid({ timetable, onLectureClick, facultyName, selectedDay = "All", onDayChange }: TimetableGridProps) {
  if (!timetable) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-slate-400 text-lg">Select a faculty to view timetable</p>
        </div>
      </div>
    );
  }

  // Check if timetable has any lectures
  const hasLectures = days.some(day => 
    timetable[day]?.some(lecture => lecture !== null)
  );

  if (!hasLectures) {
    return (
      <EmptyState
        title="No classes found"
        message="No lectures match the current filter criteria. Try selecting a different filter."
      />
    );
  }

  const currentDay = getCurrentDay();
  const currentTimeSlot = getCurrentTimeSlot();

  // Filter days based on selection
  const displayDays = selectedDay === "All" ? days : [selectedDay];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-4 lg:p-6 text-white"
      >
        <h2 className="text-xl lg:text-2xl font-bold mb-2">{facultyName}</h2>
        <p className="text-sm lg:text-base text-blue-100">Weekly Schedule</p>
      </motion.div>

      {/* Day Selector */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-black/20 p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-blue-900 dark:text-blue-400" />
          <h3 className="font-semibold text-gray-800 dark:text-slate-200">Select Day</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onDayChange("All")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedDay === "All"
                ? "bg-blue-900 text-white shadow-lg shadow-blue-900/30"
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
                onClick={() => onDayChange(day)}
                className={`px-4 py-2 rounded-lg font-medium transition-all relative ${
                  isSelected
                    ? "bg-blue-900 text-white shadow-lg shadow-blue-900/30"
                    : isToday
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-300 border-2 border-blue-900 dark:border-blue-500"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                {day}
                {isToday && !isSelected && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white dark:border-slate-800"></span>
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
                      min-w-[200px] ${isToday ? "bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300" : "bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-slate-300"}`}
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
                  const lecture = timetable[day]?.[slotIndex];
                  const isBreak = lecture && (lecture.type === "Break" || lecture.subject === "Break");
                  const isCurrentSlot = slot.id === currentTimeSlot;
                  const isCurrentDay = day === currentDay;
                  
                  return (
                    <td key={day} className="p-3 align-top">
                      {lecture && !isBreak ? (
                        <LectureCard
                          lecture={lecture}
                          onClick={() => onLectureClick(lecture)}
                          isCurrentSlot={isCurrentSlot}
                          isCurrentDay={isCurrentDay}
                        />
                      ) : (
                        <div className="p-4 text-center text-gray-300 dark:text-slate-600 text-sm">—</div>
                      )}
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
                        border-gray-200 dark:border-slate-700 min-w-[160px] text-sm
                        ${isToday ? "bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300" : "bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-slate-300"}`}
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
                    const lecture = timetable[day]?.[slotIndex];
                    const isBreak = lecture && (lecture.type === "Break" || lecture.subject === "Break");
                    const isCurrentSlot = slot.id === currentTimeSlot;
                    const isCurrentDay = day === currentDay;
                    
                    return (
                      <td key={day} className="p-2 align-top">
                        {lecture && !isBreak ? (
                          <LectureCard
                            lecture={lecture}
                            onClick={() => onLectureClick(lecture)}
                            isCurrentSlot={isCurrentSlot}
                            isCurrentDay={isCurrentDay}
                          />
                        ) : (
                          <div className="p-3 text-center text-gray-300 dark:text-slate-600 text-sm">—</div>
                        )}
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
                ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white" 
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
              <div className="p-4 space-y-3">
                {timeSlots.map((slot, slotIndex) => {
                  const lecture = timetable[day]?.[slotIndex];
                  const isCurrentSlot = slot.id === currentTimeSlot;
                  
                  return (
                    <div key={slot.id}>
                      <div className="flex items-center gap-2 mb-2 px-2">
                        <Clock className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{slot.time}</span>
                      </div>
                      {lecture && !(lecture.type === "Break" || lecture.subject === "Break") ? (
                        <LectureCard
                          lecture={lecture}
                          onClick={() => onLectureClick(lecture)}
                          isCurrentSlot={isCurrentSlot}
                          isCurrentDay={isToday}
                        />
                      ) : (
                        <div className="p-4 text-center text-gray-300 dark:text-slate-600 text-sm bg-gray-50 dark:bg-slate-900/50 rounded-xl">
                          —
                        </div>
                      )}
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