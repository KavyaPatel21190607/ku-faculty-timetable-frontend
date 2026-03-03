import { motion, AnimatePresence } from "motion/react";
import { Download, Share2, Printer, X } from "lucide-react";
import { useState } from "react";

export function FloatingActions({ isMobile }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isMobile) return null;

  const actions = [
    { icon: Download, label: "Download", color: "bg-blue-600" },
    { icon: Share2, label: "Share", color: "bg-green-600" },
    { icon: Printer, label: "Print", color: "bg-purple-600" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 ${action.color} text-white px-4 py-3 
                  rounded-full shadow-lg hover:shadow-xl transition-shadow`}
              >
                <action.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center 
          transition-all ${isOpen ? "bg-red-500" : "bg-gradient-to-br from-blue-900 to-blue-700"}`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Share2 className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
