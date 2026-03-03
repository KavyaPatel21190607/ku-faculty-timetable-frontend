import { motion } from "motion/react";
import { Filter } from "lucide-react";
import { useState } from "react";

export function TimetableFilters({ onFilterChange }) {
  const [selectedType, setSelectedType] = useState("All");

  const types = ["All", "Theory", "Lab", "Tutorial", "Meeting", "Research"];

  const handleFilterClick = (type) => {
    setSelectedType(type);
    onFilterChange(type);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-black/20 p-4 mb-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <Filter className="w-5 h-5 text-gray-600 dark:text-slate-400" />
        <h3 className="font-semibold text-gray-900 dark:text-slate-200">Filter by Type</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <motion.button
            key={type}
            onClick={() => handleFilterClick(type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedType === type
                ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md"
                : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
          >
            {type}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
