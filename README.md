Scalable Job Import System :-
------------------------------
A full-stack project built to fetch job data from multiple external APIs, queue them using Redis + Bull, process them in background using NestJS workers, store them in MongoDB, and finally view Import History using a Next.js admin dashboard.

Tech Stack :-
Backend (NestJS)
-----------------
Node.js + NestJS
MongoDB (Mongoose)
Bull Queue + Redis (Background Jobs)
Axios (API Fetching)
Cron Jobs for hourly job sync

Frontend (Next.js)
------------------
Next.js (App Router)
TypeScript
TailwindCSS (for UI)
Fetch API for backend communication

⚙️ Backend Setup (NestJS + MongoDB + Redis)
-------------------------------------------
Clone the Repository
-------------------
git clone https://github.com/manishmehta001/scalable-job-import-system.git
cd scalable-job-import-system/server


Install Dependencies
-------------------
npm install


Create .env file
------------------
PORT=4000
MONGO_URI=mongodb+srv://champbabu137_db_user:cPS5uJmeh75cvPVH@cluster0.vm8bskf.mongodb.net/
REDIS_URL=redis-11189.crce217.ap-south-1-1.ec2.redns.redis-cloud.com:11189
JOB_API="https://jobicy.com/?feed=job_feed"


Run MongoDB and Redis
---------------------
Locally or via cloud (e.g., Redis Cloud)
Make sure both are connected properly

Start the Server
-------------------
npm run start:dev

API runs on  http://localhost:4000


💻 Frontend Setup (Next.js)
-----------------------------
Go to the frontend folder
cd ../client


Install dependencies
-----------------
npm install


Run the frontend
---------------
npm run dev

App runs on  http://localhost:3000

Import History Page
------------------
Visit http://localhost:3000/import-history
You can see all import logs fetched from backend API (/import-jobs)

 Features
-------------
 Fetch jobs from real-time XML APIs
 Convert XML → JSON
 Queue jobs via Redis + Bull
 Background processing using workers
 Cron job runs hourly to import new jobs
 Import logs stored with:
 Total fetched :-
    New / Updated / Failed jobs
    Next.js UI to view Import History

Folder Structure
----------------
scalable-job-import-system/
│
├── client/         # Next.js frontend
│   └── app/        # Pages and components
│
└── server/         # NestJS backend
    ├── job/        # Job fetching and saving
    ├── queue/      # Bull queue processor
    ├── import_job/ # Import logs tracking
    └── cron_job/   # Cron job scheduling

👨‍💻 Author
Manish Kumar 
Full-Stack JavaScript Developer
React | Next.js | NestJS | MongoDB | Node.js

Manish Kumar Mehta
Full-Stack JavaScript Developer
React | Next.js | NestJS | MongoDB | Node.js
