import { motion } from "motion/react";
import { Info, X } from "lucide-react";
import { useState } from "react";

export function InfoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-900 dark:border-blue-500 p-4 mb-6 rounded-lg"
    >
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-900 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
            Welcome to KU Faculty Timetable System
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-400">
            Select a faculty from the sidebar to view their weekly schedule. 
            Click on any class to see the complete timetable for that class.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-blue-900 dark:text-blue-400" />
        </button>
      </div>
    </motion.div>
  );
}
