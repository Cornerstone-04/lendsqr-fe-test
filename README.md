# Lendsqr Frontend Engineering Assessment

A comprehensive admin console built with React, TypeScript, and SCSS for managing user data with advanced filtering, persistent storage, and pixel-perfect UI implementation.

## 🎯 Project Overview

This project is a frontend assessment submission for Lendsqr, implementing a user management dashboard with the following core features:

- **Login Page**: Authenticated access with form validation
- **Dashboard**: Overview with user statistics
- **Users Page**: Complete user listing with filtering capabilities
- **User Details Page**: Detailed view of individual user information

## 🚀 Live Demo

**Deployed Application**: [https://cornerstone-ephraim-lendsqr-fe-test.vercel.app](https://cornerstone-ephraim-lendsqr-fe-test.vercel.app)

**GitHub Repository**: [https://github.com/Cornerstone-04/lendsqr-fe-test](https://github.com/Cornerstone-04/lendsqr-fe-test)

## 📋 Assessment Requirements

This implementation fulfills all requirements specified in the assessment:

### Core Pages Built
1. ✅ **Login Page** - Authentication with email/password validation
2. ✅ **Users Dashboard** - Central navigation hub
3. ✅ **Users Dashboard with Filters** - Table view with 500 records from mock API
4. ✅ **User Details Page** - Comprehensive user information display

## 🛠️ Tech Stack

### Core Technologies
- **ReactJS** - Modern React with latest features
- **TypeScript** - Type safety and developer experience
- **Vite 6** - Fast build tool and dev server
- **React Router 7** - Client-side routing
- **Bun** - Fast all-in-one JavaScript runtime and package manager

### Styling
- **SCSS/Sass** - Custom styling with variables and mixins
- **CSS Modules** - Scoped styling approach

### Data Management
- **Dexie.js** - IndexedDB wrapper for persistent storage
- **Axios** - HTTP client for API requests

### Testing
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **Fake IndexedDB** - Mocked IndexedDB for testing

## 🚦 Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **Bun** 1.0 or higher (recommended) or npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Cornerstone-04/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   VITE_USERS_API_URL=https://api.jsonserver.io/users
   ```

4. **Start the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
bun run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
bun run preview
```

## 🧪 Testing

### Run All Tests
```bash
bun test
```

### Run Tests in Watch Mode
```bash
bun run test:watch
```

### Generate Coverage Report
```bash
bun run test:coverage
```

### Test Coverage
The project maintains comprehensive test coverage across:
- **Components**: UsersTable, FilterDropdown, StatsCard, Login
- **Hooks**: useFilters, useUsers
- **Services**: users.service (CRUD operations)
- **Utils**: auth, stats-utils

## 🎨 Design Implementation

This project achieves **pixel-perfect accuracy** with the Figma design:

### Design Reference
- **Figma File**: [Frontend Testing](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/Frontend-Testing)

### Design Highlights
1. **Color Palette**: Exact brand colors from design system
2. **Typography**: Avenir font family with correct weights
3. **Spacing**: Consistent padding and margins
4. **Components**: All UI elements match design specifications
5. **Responsive Design**: Mobile, tablet, and desktop breakpoints

### Key Features
- **Collapsible Sidebar**: Desktop-only feature with smooth transitions
- **Status Badges**: Color-coded user statuses (Active, Inactive, Pending, Blacklisted)
- **Filter Dropdown**: Advanced filtering with position-aware dropdown
- **Pagination**: Clean, accessible pagination controls
- **User Actions**: Context menu for quick actions

## 💾 Data Storage

### IndexedDB Implementation
The application uses Dexie.js to manage a persistent IndexedDB database:

```typescript
// Database Schema
{
  users: "id, username, email, status, organization, dateJoined"
}
```

### Storage Strategy
1. **First Load**: Fetches 500 users from mock API
2. **Caching**: Saves all users to IndexedDB
3. **Subsequent Loads**: Reads from IndexedDB for instant loading
4. **Updates**: Status changes persist in IndexedDB
5. **Refresh**: Option to clear cache and refetch

### Benefits
- ⚡ Instant page loads after initial fetch
- 💾 Offline capability
- 🔄 Persistent user status updates
- 📱 Mobile-friendly performance

## 🔐 Authentication

### Mock Authentication
The login system uses localStorage for demo purposes:

```typescript
// Any email/password combination works
Email: test@example.com
Password: password123
```

### Features
- ✅ Form validation
- ✅ Password visibility toggle
- ✅ Error handling
- ✅ Protected routes
- ✅ Persistent sessions

## 📱 Responsive Design

### Breakpoints
```scss
$breakpoint-sm: 576px;   // Mobile
$breakpoint-md: 768px;   // Tablet
$breakpoint-lg: 992px;   // Desktop
$breakpoint-xl: 1200px;  // Large Desktop
```

### Mobile Features
- Hamburger menu for navigation
- Stacked statistics cards
- Horizontal scroll for table
- Touch-friendly interactions
- Optimized button sizes

## 🎯 Key Features

### Users Page
- **500 User Records**: Displays all users from mock API
- **Advanced Filtering**: Filter by organization, username, email, phone, date, and status
- **Pagination**: Customizable items per page (10, 20, 50, 100)
- **Quick Actions**: View details, activate, or blacklist users
- **Status Management**: Update user status directly from table

### User Details Page
- **Comprehensive Information**: All user data in organized sections
- **Tabbed Navigation**: General Details, Documents, Bank Details, etc.
- **User Tier Display**: Visual star rating system
- **Account Summary**: Balance and bank information
- **Social Links**: Clickable social media profiles
- **Status Actions**: Quick activate/blacklist buttons

### Dashboard
- **Statistics Overview**: Total users, active users, loans, and savings
- **Color-Coded Cards**: Visual distinction for different metrics
- **Responsive Grid**: Adapts to screen size

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_USERS_API_URL=https://api.jsonserver.io/users

# Application Settings
VITE_APP_NAME=Lendsqr Admin
VITE_ITEMS_PER_PAGE=100
```

### SCSS Variables
Key design tokens are defined in `src/styles/_variables.scss`:
```scss
$primary-teal: #39cdcc;
$primary-navy: #213f7d;
$text-primary: #213f7d;
$text-secondary: #545f7d;
```

## 🐛 Known Issues & Limitations

1. **Mock Authentication**: Uses localStorage instead of real auth
2. **Mock API**: Limited to 500 static records
3. **Pagination**: Client-side only (all records loaded)
4. **Filters**: Client-side filtering (no server pagination)

These are intentional choices for the assessment scope.

## 🚀 Deployment

### Vercel (Recommended)
```bash
bun run build
vercel --prod
```

### Netlify
```bash
bun run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
bun run build
bun run deploy
```

### Why Bun?
This project uses **Bun** as the package manager and runtime for several benefits:
- ⚡ **Faster installation**: 25x faster than npm
- 🚀 **Quick builds**: Optimized bundling and compilation
- 💾 **Efficient caching**: Better disk space usage
- 🔧 **Built-in tools**: Test runner, bundler, and more
- 🔄 **npm compatible**: Works with all npm packages

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Write semantic HTML
- Use SCSS variables and mixins
- Keep components small and focused

---


Thank you for reviewing my submission! 🎉
