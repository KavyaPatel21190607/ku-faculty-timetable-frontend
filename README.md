# Karnavati University Faculty Timetable Management System

A modern, fully responsive, and production-ready Faculty Timetable Management System built for Karnavati University.

## 🎯 Features

### Core Functionality
- **Faculty Management**: Browse and select from 8+ faculty members across different departments
- **Interactive Timetable**: View weekly schedules with time slots from 9:00 AM to 4:05 PM
- **Class Schedule Viewer**: Click any lecture to view the complete class timetable
- **Real-time Highlighting**: Current day and time slot are automatically highlighted
- **Smart Filtering**: Filter lectures by type (Theory, Lab, Tutorial, Meeting, Research)
- **Statistics Dashboard**: Quick overview of total classes, theory sessions, and lab sessions

### Responsive Design
- **Mobile** (< 768px): Card-based layout with hamburger menu and overlay sidebar
- **Tablet** (768px - 1023px): Horizontally scrollable grid with collapsible sidebar
- **Desktop** (1024px+): Full grid layout with fixed sidebar
- **Ultra-wide**: Optimized for large screens with proper scaling

### UX Enhancements
- Smooth animations with Motion/Framer Motion
- Touch-friendly interface for mobile devices
- Custom scrollbar styling
- Loading skeletons for better perceived performance
- Toast notifications for user feedback
- Floating action buttons on mobile
- Dismissible info banner
- Professional color scheme with Deep Blue (#1E3A8A)

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Sidebar.tsx              # Responsive sidebar with faculty list
│   │   ├── Navbar.tsx                # Top navigation bar
│   │   ├── TimetableGrid.tsx        # Main timetable grid/cards
│   │   ├── LectureCard.tsx          # Individual lecture cell
│   │   ├── ClassModal.tsx           # Modal/drawer for class timetables
│   │   ├── TimetableStats.tsx       # Statistics cards
│   │   ├── TimetableFilters.tsx     # Filter buttons
│   │   ├── InfoBanner.tsx           # Info banner component
│   │   ├── FloatingActions.tsx      # Mobile floating actions
│   │   ├── Footer.tsx               # Footer component
│   │   ├── LoadingSkeleton.tsx      # Loading animation
│   │   └── ToastProvider.tsx        # Toast notification provider
│   └── App.tsx                       # Main application component
├── data/
│   └── timetableData.js             # Mock data (faculty, schedules, classes)
└── styles/
    ├── fonts.css                     # Font imports (Inter)
    ├── tailwind.css                  # Tailwind config & custom styles
    ├── theme.css                     # Design tokens
    └── index.css                     # Style imports

```

## 🛠️ Tech Stack

- **React 18.3.1** - UI library
- **Vite** - Build tool
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Motion** (Framer Motion) - Animation library
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **TypeScript** - Type safety

## 🎨 Design System

### Colors
- **Primary**: Deep Blue (#1E3A8A / rgb(30, 58, 138))
- **Secondary**: White (#FFFFFF)
- **Accent**: Light Gray (#F3F4F6)
- **Hover**: Soft Blue (#2563EB)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800, 900

### Breakpoints (Tailwind)
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📊 Data Structure

### Faculty Object
```javascript
{
  id: number,
  name: string,
  department: string,
  email: string
}
```

### Lecture Object
```javascript
{
  subject: string,
  class: string,
  room: string,
  type: "Theory" | "Lab" | "Tutorial" | "Meeting" | "Research" | "Consultation"
}
```

### Time Slot Object
```javascript
{
  id: number,
  time: string,
  start: string,
  end: string,
  isBreak?: boolean
}
```

## 🎯 Key Features Implementation

### Responsive Sidebar
- Desktop: Fixed 288px width, always visible
- Tablet: Collapsible, smooth slide animation
- Mobile: Hamburger menu with overlay backdrop, 280px width

### Timetable Views
- **Desktop**: Full grid with sticky headers and time column
- **Tablet**: Horizontally scrollable grid with optimized spacing
- **Mobile**: Card-based accordion layout with collapsible days

### Current Highlighting
- Automatically detects current day using `getCurrentDay()`
- Highlights current time slot using `getCurrentTimeSlot()`
- Visual ring effect on current lecture cells

### Filtering System
- Filter by lecture type (All, Theory, Lab, Tutorial, Meeting, Research)
- Real-time filtering without page reload
- Preserves statistics on raw data while filtering display

## 🎭 Component Details

### Sidebar
- Faculty list with avatars and department info
- Active faculty highlighting with gradient background
- Smooth animations on selection
- Mobile-friendly with swipe gestures
- Scrollable list with custom scrollbar

### TimetableGrid
- Responsive grid-to-cards transformation
- Sticky time column and day headers
- Current day/time highlighting
- Empty slot handling
- Hover effects on lecture cells

### ClassModal
- Desktop: Centered modal with backdrop blur
- Mobile: Bottom drawer with swipe-down gesture
- Complete class timetable view
- Faculty and room information
- Type badges with color coding

## 🎨 Design Patterns

### Color Coding by Lecture Type
- **Theory**: Blue (#3B82F6)
- **Lab**: Purple (#A855F7)
- **Tutorial**: Green (#10B981)
- **Meeting**: Orange (#F97316)
- **Research**: Pink (#EC4899)
- **Consultation**: Teal (#14B8A6)

### Animation Principles
- Smooth entrance animations (fade + slide)
- Hover scale effects (1.02x)
- Tap feedback (0.98x)
- Page transitions (spring physics)
- Loading states with pulse animation

## 📱 Mobile Optimizations

- Minimum tap target size: 44x44px
- Touch-friendly spacing
- No horizontal overflow
- Optimized font sizes for readability
- Hamburger menu with overlay
- Bottom drawer for modals
- Floating action buttons
- Swipe gestures support

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Screen reader friendly
- Color contrast compliance (WCAG AA)

## 🔧 Customization

### Adding New Faculty
Edit `/src/data/timetableData.js`:
```javascript
export const facultyList = [
  // Add new faculty
  {
    id: 9,
    name: "Dr. New Faculty",
    department: "Department",
    email: "email@ku.edu"
  }
];

export const facultyTimetables = {
  9: {
    Monday: [...],
    // Add schedule
  }
};
```

### Changing Colors
Edit the color classes in components or update the Tailwind theme in `/src/styles/theme.css`

### Modifying Time Slots
Edit the `timeSlots` array in `/src/data/timetableData.js`

## 🐛 Known Limitations

- Frontend only (no backend persistence)
- Mock data (not connected to real database)
- No authentication/authorization
- No real-time updates (requires page refresh)
- Print functionality is placeholder (not implemented)

## 🚀 Future Enhancements

- [ ] Backend integration with API
- [ ] Real-time updates with WebSocket
- [ ] Export to PDF/Excel
- [ ] Email notifications
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Faculty availability management
- [ ] Classroom booking system
- [ ] Conflict detection
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA)
- [ ] Offline support

## 📝 License

This project is built for Karnavati University. All rights reserved.

## 👨‍💻 Development

Built with ❤️ for Karnavati University Faculty

---

**Version**: 1.0.0  
**Last Updated**: February 11, 2026  
**Author**: Figma Make
