import { motion } from "motion/react";
import { Calendar, Clock, BookOpen } from "lucide-react";
import { timeSlots, days } from "../../utils/constants";

export function TimetableStats({ timetable }) {
  if (!timetable) return null;

  // Calculate total classes
  let totalClasses = 0;
  let totalLabs = 0;
  let totalTheory = 0;

  days.forEach((day) => {
    timetable[day]?.forEach((lecture) => {
      if (lecture) {
        totalClasses++;
        if (lecture.type === "Lab") totalLabs++;
        if (lecture.type === "Theory") totalTheory++;
      }
    });
  });

  const stats = [
    {
      label: "Total Classes",
      value: totalClasses,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Theory Classes",
      value: totalTheory,
      icon: Calendar,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Lab Sessions",
      value: totalLabs,
      icon: Clock,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-black/20 p-4 lg:p-6"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${stat.color} 
                flex items-center justify-center flex-shrink-0`}
            >
              <stat.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-slate-100">{stat.value}</p>
              <p className="text-sm lg:text-base text-gray-600 dark:text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
