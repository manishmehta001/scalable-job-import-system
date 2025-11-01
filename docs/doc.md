## System Design Thinking :-

In this project, I followed a clear and modular approach to design the system.
I divided the whole application into small parts — job fetching, queue processing, database storage, and log tracking.

I used NestJS for the backend because it supports clean architecture and modular coding.
Redis with Bull Queue was used to handle background jobs efficiently so that API calls do not block the main thread.

MongoDB was used for storing jobs and import history because it is easy to scale and flexible for JSON data.

A cron job was set up to fetch jobs every hour and save logs automatically.
The system is designed to handle multiple APIs and can easily be extended by adding new sources.

This makes the whole structure scalable, fault-tolerant, and easy to maintain.

===========================================================================================

## Documentation and Communication Skills :-

I have written clean and meaningful code with proper file structure and naming conventions.
Each module (Job, ImportJob, Queue, Cron) has a clear purpose and separation of logic.

## For documentation:

I explained my system flow in a readable and simple way.

Each service and method has a descriptive name, so other developers can understand easily.

The frontend also follows a clean and professional UI to display import history in a user-friendly way.
