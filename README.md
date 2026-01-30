# Users API Implementation Guide

## Overview
This implementation fetches 500 user records from your GitHub Gist and caches them in IndexedDB for offline access and better performance.

## API Implementation

The API call is implemented in `src/api/users.api.ts`:

```typescript
const USERS_API_URL = "https://gist.github.com/Cornerstone-04/29c964685c0056ffd756d97e398d5948/raw/users.json";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(USERS_API_URL, {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
```

## How It Works

1. **First Load**:
   - `useUsers` hook calls `fetchUsers()` from the API
   - Fetches data from GitHub Gist
   - Saves all 500 records to IndexedDB
   - Displays data to user

2. **Subsequent Loads**:
   - Checks IndexedDB first
   - If data exists, loads instantly (no API call)
   - Users can manually refetch using the `refetch()` function

3. **Offline Support**:
   - Once cached, users can view data without internet
   - All filtering and pagination works offline

## Setup Steps

1. **Install dependencies**:
```bash
npm install axios dexie
```

2. **No .env needed** - The URL is hardcoded in the API file for simplicity

3. **File structure**:
```
src/
├── api/
│   ├── axios.ts (optional, not used anymore)
│   └── users.api.ts ✓ (uses axios directly)
├── db/
│   ├── index.ts ✓
│   ├── users.schema.ts ✓
│   └── users.service.ts ✓
├── hooks/
│   ├── useUsers.ts ✓
│   ├── useIndexedUsers.ts ✓
│   └── useFilters.ts ✓
└── pages/
    └── Users/
        └── Users.tsx ✓
```

## Testing the API

You can test if the API is working by:

1. Opening the browser console
2. Navigating to the Users page
3. Looking for the log: "Fetched 500 users from API"
4. Checking IndexedDB in DevTools → Application → IndexedDB → lendsqr-db → users

## Manual Refetch

To force a fresh fetch from the API:

```typescript
// In your component
const { refetch } = useUsers();

// Call this to force a new API fetch
await refetch();
```

## Error Handling

The implementation includes:
- 10-second timeout for API calls
- Error logging to console
- Graceful fallback to cached data
- User-friendly error messages

## Data Flow

```
User loads page
    ↓
useUsers hook
    ↓
Check IndexedDB
    ↓
Has data? → Yes → Display cached data
    ↓
    No
    ↓
Fetch from GitHub Gist API
    ↓
Save to IndexedDB
    ↓
Display data
```

## Notes

- The GitHub Gist URL points to the raw JSON file
- Data is cached permanently until manually cleared
- No authentication required for public Gist
- CORS is handled by GitHub's raw content delivery