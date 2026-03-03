import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 mt-12 py-6 lg:py-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-slate-400">
              © 2026 Karnavati University. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
              Faculty Timetable Management System
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for KU Faculty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
