# StudioSpace — Creative Workspace & Production Studio Sharing Platform

**Live Website:** https://studiospace-client-six-ruddy.vercel.app  
**Frontend Repository:** https://github.com/Sajid498/studiospace-client  
**Backend Repository:** https://github.com/Sajid498/studiospace-server

## About the Project

StudioSpace is a peer-to-peer creative workspace and production studio sharing platform. It connects creators with studio owners, making it easier to discover, list, and book creative spaces for photography, filmmaking, podcasting, music production, and artistic activities.

## Key Features

- **Authentication:** Register and log in using email and password, with Google authentication support.
- **Explore Studios:** Browse available creative spaces and filter them by category or search by studio name and location.
- **Studio Management:** Authenticated users can add, edit, and delete their own studio listings.
- **Studio Details:** View studio descriptions, images, amenities, hourly rates, security deposits, and capacity.
- **Booking System:** Submit booking requests and view booking status through a personal dashboard.
- **Booking Management:** Studio owners can manage booking requests, while users can view and cancel eligible bookings.
- **Responsive Interface:** Modern interface with light and dark themes, interactive components, and notifications.

## Technology Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16, React 19 |
| Language | JavaScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui, Radix UI |
| Authentication | Better Auth |
| Notifications | Sonner |
| Icons | Lucide React |
| Slider | Swiper.js |
| Deployment | Vercel |

## Local Installation

### Prerequisites

- Node.js
- npm
- Git
- Running StudioSpace backend

### 1. Clone the repository

```bash
git clone https://github.com/Sajid498/studiospace-client.git
cd studiospace-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Use the actual backend URL if your backend runs on a different port.

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

http://localhost:3000

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Backend Integration

The frontend communicates with the StudioSpace Express.js backend for studio listings, booking operations, image uploads, and other application functionality.

**Production Backend:** https://studiospace-server-94ez.onrender.com

## Authentication and Examiner Access

An examiner can visit the live website and create a new account using the registration page. Google authentication is also available.

No private credentials or environment secrets are included in this repository.

## Project Repositories

- Frontend: https://github.com/Sajid498/studiospace-client
- Backend: https://github.com/Sajid498/studiospace-server

## Deployment

The frontend is deployed on Vercel and communicates with the deployed backend hosted on Render. MongoDB Atlas is used for database storage.

---

Developed as a full-stack web development project.