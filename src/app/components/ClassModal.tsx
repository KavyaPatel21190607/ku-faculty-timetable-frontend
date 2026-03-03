import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, MapPin, User, Clock } from "lucide-react";
import { days, timeSlots } from "../../utils/constants";

const typeColors = {
  Theory: "bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200",
  Lab: "bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-200",
  Tutorial: "bg-green-100 dark:bg-green-900/40 text-green-900 dark:text-green-200",
  Meeting: "bg-orange-100 dark:bg-orange-900/40 text-orange-900 dark:text-orange-200",
  Research: "bg-pink-100 dark:bg-pink-900/40 text-pink-900 dark:text-pink-200",
  Consultation: "bg-teal-100 dark:bg-teal-900/40 text-teal-900 dark:text-teal-200"
};

export function ClassModal({ isOpen, onClose, classData, className }) {
  if (!isOpen || !classData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Modal - Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="hidden lg:block fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-full max-w-6xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl dark:shadow-black/40 z-50 overflow-hidden"
          >
            <ModalContent classData={classData} className={className} onClose={onClose} />
          </motion.div>

          {/* Drawer - Mobile */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl dark:shadow-black/40 z-50 
              max-h-[85vh] overflow-hidden"
          >
            <ModalContent classData={classData} className={className} onClose={onClose} isMobile />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ModalContent({ classData, className, onClose, isMobile }) {
  return (
    <div className="flex flex-col h-full max-h-[90vh] lg:max-h-[85vh]">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-900 to-blue-700 flex-shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/20 backdrop-blur-sm 
                flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-1">
                  {className} Timetable
                </h2>
                <p className="text-sm lg:text-base text-blue-100">Complete Weekly Schedule</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        {/* Desktop View - Grid */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky top-0 bg-gray-50 dark:bg-slate-800 p-4 text-left font-semibold text-gray-700 dark:text-slate-300 
                  border-b-2 border-gray-200 dark:border-slate-700 min-w-[120px]">
                  Time
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="sticky top-0 bg-gray-50 dark:bg-slate-800 p-4 text-center font-semibold text-gray-700 dark:text-slate-300 
                      border-b-2 border-gray-200 dark:border-slate-700 min-w-[180px]"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, slotIndex) => (
                <tr key={slot.id} className="border-b border-gray-200 dark:border-slate-700">
                  <td className="p-4 text-sm font-medium text-gray-700 dark:text-slate-300 align-top bg-gray-50 dark:bg-slate-800">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                      <span>{slot.time}</span>
                    </div>
                    {slot.isBreak && (
                      <span className="inline-block mt-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-900 dark:text-orange-300 
                        text-xs rounded-md font-medium">
                        Break
                      </span>
                    )}
                  </td>
                  {days.map((day) => {
                    const lecture = classData[day]?.[slotIndex];
                    return (
                      <td key={day} className="p-4 align-top">
                        {lecture ? (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`p-3 rounded-lg ${typeColors[lecture.type] || "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-slate-200"}`}
                          >
                            <p className="font-bold text-sm mb-2">{lecture.subject}</p>
                            <div className="space-y-1 text-xs">
                              <div className="flex items-center gap-1.5">
                                <User className="w-3 h-3" />
                                <span className="line-clamp-1">{lecture.faculty}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3 h-3" />
                                <span>{lecture.room}</span>
                              </div>
                              <span className="inline-block px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded text-xs font-medium mt-1">
                                {lecture.type}
                              </span>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="p-3 text-center text-gray-400 dark:text-slate-600 text-sm">—</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Accordion/Cards */}
        <div className="lg:hidden space-y-4">
          {days.map((day) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 dark:bg-slate-800 rounded-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4">
                <h3 className="font-bold text-white text-lg">{day}</h3>
              </div>
              <div className="p-4 space-y-3">
                {timeSlots.map((slot, slotIndex) => {
                  const lecture = classData[day]?.[slotIndex];
                  return (
                    <div key={slot.id} className="bg-white dark:bg-slate-900 rounded-lg p-3 shadow-sm dark:shadow-black/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{slot.time}</span>
                        {slot.isBreak && (
                          <span className="ml-auto px-2 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-900 dark:text-orange-300 
                            text-xs rounded-md font-medium">
                            Break
                          </span>
                        )}
                      </div>
                      {lecture ? (
                        <div className={`p-3 rounded-lg ${typeColors[lecture.type] || "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-slate-200"}`}>
                          <p className="font-bold text-sm mb-2">{lecture.subject}</p>
                          <div className="space-y-1.5 text-xs">
                            <div className="flex items-center gap-1.5">
                              <User className="w-3 h-3" />
                              <span>{lecture.faculty}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3" />
                              <span>{lecture.room}</span>
                            </div>
                            <span className="inline-block px-2 py-1 bg-white/50 dark:bg-black/20 rounded text-xs font-medium mt-1">
                              {lecture.type}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 text-center text-gray-400 dark:text-slate-600 text-sm">No class scheduled</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
