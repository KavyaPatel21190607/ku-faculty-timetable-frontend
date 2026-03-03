import { motion } from "motion/react";
import { Menu, User, Clock } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar({ onToggleSidebar, isMobile, onFreeSlotToggle, isFreeSlotView }) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-4 lg:px-6 py-4 sticky top-0 z-30"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-3 lg:gap-4 min-w-0 flex-1">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 dark:text-slate-300" />
          </button>

          {/* Logo - visible on larger screens */}
          <div className="hidden md:block flex-shrink-0 dark:bg-white dark:rounded-lg dark:px-2 dark:py-1">
            <img 
              src="/assets/KU-X-NAAC-A-Logo_Web-01.webp" 
              alt="Karnavati University" 
              className="h-8 lg:h-10 w-auto object-contain"
            />
          </div>
          
          <div className="min-w-0 flex-1">
            <h1 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-slate-100 truncate">
              Faculty Timetable
            </h1>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-slate-400 hidden sm:block">
              {new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Free Slot Button */}
          <motion.button
            onClick={onFreeSlotToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md
              ${isFreeSlotView
                ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-blue-900/30"
                : "bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-900 dark:text-indigo-200 hover:from-indigo-200 hover:to-purple-200 dark:hover:from-indigo-800/60 dark:hover:to-purple-800/60 border border-indigo-200 dark:border-indigo-700"
              }`}
          >
            <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="hidden sm:inline">{isFreeSlotView ? "Back to Timetable" : "Free Slot"}</span>
            <span className="sm:hidden">{isFreeSlotView ? "Back" : "Free"}</span>
          </motion.button>

          {/* Profile */}
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">Admin</p>
              <p className="text-xs text-gray-600 dark:text-slate-400">Administrator</p>
            </div>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
