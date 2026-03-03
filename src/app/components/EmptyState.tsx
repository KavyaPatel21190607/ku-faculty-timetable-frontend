import { motion } from "motion/react";
import { SearchX } from "lucide-react";

export function EmptyState({ title, message, action }: { title?: string; message?: string; action?: { label: string; onClick: () => void } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 lg:py-16"
    >
      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 lg:w-12 lg:h-12 text-gray-400 dark:text-slate-500" />
      </div>
      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">
        {title || "No results found"}
      </h3>
      <p className="text-sm lg:text-base text-gray-600 dark:text-slate-400 text-center max-w-md mb-6">
        {message || "Try adjusting your filters or search criteria"}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white 
            rounded-lg font-medium hover:shadow-lg transition-shadow"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
