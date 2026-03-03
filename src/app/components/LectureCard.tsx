import { motion } from "motion/react";

const typeColors = {
  Theory: "bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800",
  Lab: "bg-purple-100 text-purple-900 border-purple-200 dark:bg-purple-950/60 dark:text-purple-200 dark:border-purple-800",
  Tutorial: "bg-green-100 text-green-900 border-green-200 dark:bg-green-950/60 dark:text-green-200 dark:border-green-800",
  Meeting: "bg-orange-100 text-orange-900 border-orange-200 dark:bg-orange-950/60 dark:text-orange-200 dark:border-orange-800",
  Research: "bg-pink-100 text-pink-900 border-pink-200 dark:bg-pink-950/60 dark:text-pink-200 dark:border-pink-800",
  Consultation: "bg-teal-100 text-teal-900 border-teal-200 dark:bg-teal-950/60 dark:text-teal-200 dark:border-teal-800"
};

const typeBadge = {
  Lab: "bg-purple-200/50 dark:bg-purple-800/40",
  Theory: "bg-blue-200/50 dark:bg-blue-800/40",
};

export function LectureCard({ lecture, onClick, isCurrentSlot, isCurrentDay }) {
  if (!lecture) {
    return <div className="p-2 lg:p-4"></div>;
  }

  const isHighlighted = isCurrentSlot && isCurrentDay;
  const colorClass = typeColors[lecture.type] || "bg-gray-100 text-gray-900 border-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full p-3 lg:p-4 rounded-xl text-left transition-all border-2
        ${isHighlighted 
          ? "ring-4 ring-blue-400/50 dark:ring-blue-500/40 shadow-xl" 
          : "shadow-md hover:shadow-lg dark:shadow-black/20"
        }
        ${colorClass}`}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-bold text-sm lg:text-base line-clamp-2 flex-1">
            {lecture.subject}
          </h4>
          <span className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap flex-shrink-0
            ${typeBadge[lecture.type] || "bg-gray-200/50 dark:bg-slate-700/50"}`}
          >
            {lecture.type}
          </span>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm lg:text-base font-semibold">
            {lecture.class}
          </p>
          <p className="text-xs lg:text-sm opacity-80">
            {lecture.room}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
