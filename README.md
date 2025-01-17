## ChompTime: Your Gamified Digital Personal Assistant
Project for Hack For Good 2025 by Fang Yi, Xinyi, Skyler

# Overview
ChompTime is a gamified digital personal assistant designed for administrators of Singapore Book Council to:
- Automate meeting scheduling
- Manage tasks and reminders
- Summarise email threads using AI
- Keep users motivated with Champ, our mascot that motivates them to complete tasks

This project was developed during a hackthon to provide a cost-effective, interactive and efficient solution for task automation.

# Features
1. Meeting Management
   - Schedule and organise meetings
   - Easily add new participants to your meetings
2. Task Automation
   - Assign tasks as follow ups to other meetings
   - Specify details like due date, completion status, and priority
7. Gamification
   - Earn XP for coming to meetings on time and completing tasks!
  
# Tech Stack
Frontend: React.js, Tailwind CSS (Styling)
Backend: Next.js, NextAuth.js (Authentication)
Database: PostgreSQL
Deployment: Vercel

# Configuration
Set up a Vercel project and add in associated environmental variables in a `.env` file in the root of the directory. A template can be found below.
```
# Copy from .env.local on the Vercel dashboard
# https://nextjs.org/learn/dashboard-app/setting-up-your-database#create-a-postgres-database
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# `openssl rand -base64 32`
AUTH_SECRET=
AUTH_URL=

# email w postmark
POSTMARK_API_TOKEN=
```

# Setup Instructions
1. Clone the repo with `git clone https://github.com/skyl3-r/chompTime.git`
2. Navigate to the repository
3. Run `cd nextjs-dashboard`
4. Install dependencies with `pnpm install`
5. Run the development server with `pnpm dev`
6. Open `http://localhost:3000` in your web browser of choice
7. Explore the app!

# Usage
## Authentication
In `http://localhost:3000`, either sign up using your own email, username and password, or use our sample account to log in. (email: `user@nextmail.com`; password: `123456`).

## Meeting Scheduling
See existing meetings scheduled in the calendar in the dashboard. Create meetings and add participants using the buttons below the calendar.

## Task Scheduling
Query existing tasks by task title, associated users, meeting title, due dates, status and priority. Create new tasks using the button at the top right corner.

## Leaderboard
See a ranking of users based on their XP.

# Future Enhancements
1. Automated email reminders and alerts sent 1 day and 1 hour before each meeting or task due date. Formatted as messages from the mascot in order to inspire greater commitment to tasks.
2. Automated AI summary of meetings based on meeting transcripts or email threads. 
3. Increased mobile responsiveness.
4. Enhanced gamification features such as badges, levels and special achievements.
