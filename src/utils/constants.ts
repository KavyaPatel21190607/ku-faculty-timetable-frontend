// Constants and utility functions for timetable management

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const timeSlots = [
  { id: 1, time: "07:30 - 08:25", start: "07:30", end: "08:25" },
  { id: 2, time: "08:25 - 09:20", start: "08:25", end: "09:20" },
  { id: 3, time: "09:20 - 10:15", start: "09:20", end: "10:15" },
  { id: 4, time: "10:15 - 11:10", start: "10:15", end: "11:10" },
  { id: 5, time: "11:10 - 12:05", start: "11:10", end: "12:05" },
  { id: 6, time: "12:05 - 13:00", start: "12:05", end: "13:00" },
  { id: 7, time: "13:00 - 13:55", start: "13:00", end: "13:55" },
  { id: 8, time: "13:55 - 14:50", start: "13:55", end: "14:50" },
  { id: 9, time: "14:50 - 15:45", start: "14:50", end: "15:45" },
  { id: 10, time: "15:45 - 16:40", start: "15:45", end: "16:40" },
  { id: 11, time: "16:40 - 17:30", start: "16:40", end: "17:30" }
];

// Helper function to get current day
export const getCurrentDay = (): string => {
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekDays[new Date().getDay()];
};

// Helper function to get current time slot
export const getCurrentTimeSlot = (): number | null => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes
  
  for (let slot of timeSlots) {
    const [startHour, startMin] = slot.start.split(':').map(Number);
    const [endHour, endMin] = slot.end.split(':').map(Number);
    
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    if (currentTime >= startTime && currentTime <= endTime) {
      return slot.id;
    }
  }
  
  return null;
};
