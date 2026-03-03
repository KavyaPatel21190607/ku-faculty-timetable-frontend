import { motion } from "motion/react";

export function LoadingSkeleton() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header Skeleton */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="bg-gray-200 dark:bg-slate-700 rounded-2xl h-32"
      />

      {/* Grid Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-black/20 p-4">
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 42 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.02 }}
              className="bg-gray-200 dark:bg-slate-700 rounded-xl h-24"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
