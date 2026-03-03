import { motion } from "motion/react";
import { X, User, Mail } from "lucide-react";

export function Sidebar({ isOpen, onClose, selectedFaculty, onSelectFaculty, isMobile, facultyList = [] }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? { x: -300 } : { x: 0 }}
        animate={{ x: isOpen ? 0 : isMobile ? -300 : 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed top-0 left-0 h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 z-50 flex flex-col
          ${isMobile ? "w-[280px]" : "w-64 lg:w-72"}
          ${!isMobile && !isOpen ? "lg:-ml-72" : ""}`}
      >
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="dark:bg-white dark:rounded-lg dark:px-2 dark:py-1">
                <img 
                  src="/assets/KU-X-NAAC-A-Logo_Web-01.webp" 
                  alt="Karnavati University - NAAC Grade A+ Accredited" 
                  className="h-12 lg:h-16 w-auto object-contain"
                />
              </div>
            </div>
            {isMobile && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-slate-400" />
              </button>
            )}
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-3">
            <p className="text-xs lg:text-sm font-medium text-blue-900 dark:text-blue-300">Faculty Timetable</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Management System</p>
          </div>
        </div>

        {/* Faculty List */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-3">
            Faculty Members
          </h3>
          <div className="space-y-2">
            {facultyList.map((faculty) => {
              const isSelected = selectedFaculty && selectedFaculty._id === faculty._id;
              return (
                <motion.button
                  key={faculty._id}
                  onClick={() => {
                    onSelectFaculty(faculty);
                    if (isMobile) onClose();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-3 lg:p-4 rounded-xl text-left transition-all
                    ${isSelected
                      ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg shadow-blue-900/30"
                      : "bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-750 text-gray-900 dark:text-slate-100"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg flex-shrink-0
                      ${isSelected ? "bg-white/20" : "bg-white dark:bg-slate-700"}`}
                    >
                      <User className={`w-4 h-4 lg:w-5 lg:h-5
                        ${isSelected ? "text-white" : "text-blue-900 dark:text-blue-400"}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`font-semibold text-sm lg:text-base truncate
                        ${isSelected ? "text-white" : "text-gray-900 dark:text-slate-100"}`}
                      >
                        {faculty.faculty_name}
                      </p>
                      <p className={`text-xs lg:text-sm mt-1 truncate
                        ${isSelected ? "text-blue-100" : "text-gray-600 dark:text-slate-400"}`}
                      >
                        {faculty.faculty_designation}
                      </p>
                      {faculty.contact && (
                        <div className={`flex items-center gap-1 mt-1.5
                          ${isSelected ? "text-blue-100" : "text-gray-500 dark:text-slate-500"}`}
                        >
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          <p className="text-xs truncate">{faculty.contact}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 lg:p-6 border-t border-gray-200 dark:border-slate-700">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl p-3 lg:p-4">
            <p className="text-xs font-medium text-blue-900 dark:text-blue-300">Total Faculty</p>
            <p className="text-xl lg:text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">{facultyList.length}</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
