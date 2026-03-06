# ctucal (CTU Calendar)

A Node.js web application that automatically fetches your assessment tasks from the CTU Campus Manager portal and exports them as an iCalendar (.ics) file. This allows you to import your academic calendar directly into any calendar application that supports the iCalendar format.

## Purpose

CTU Calendar simplifies academic planning by:
- Automatically logging into your CTU Campus Manager student portal
- Extracting assessment details (modules, assessments, due dates)
- Converting tasks into a standard iCalendar format
- Generating a downloadable `.ics` file that can be imported into calendar applications like Google Calendar, Outlook, or Apple Calendar

## Prerequisites

Before installing, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EthanLeRoux/ctucal.git
   cd ctucal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with your CTU credentials:
   ```
   CTU_USERNAME=your_student_username
   CTU_PASSWORD=your_student_password
   ```
   
   Replace `your_student_username` and `your_student_password` with your actual CTU Campus Manager login credentials.

4. **Start the server:**
   ```bash
   npm start
   ```
   
   The server will run on `http://localhost:3000`

## Usage

### Fetching Tasks and Logging In

Make a POST request to the `/login` endpoint to fetch your assessment tasks:

```bash
curl -X POST http://localhost:3000/login
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "tasks": [
    {
      "module": "Software Engineering",
      "assessment": "Project Submission",
      "due": "2026-03-15"
    },
    ...
  ]
}
```

### Exporting to Calendar

To download your calendar as an `.ics` file, navigate to:

```
http://localhost:3000/calendar.ics
```

Your browser will automatically download a `calendar.ics` file. Alternatively, use curl:

```bash
curl http://localhost:3000/calendar.ics > my_calendar.ics
```

## How to Use

1. **Accessing the Calendar**: The calendar file is available at the following URL:
   - `.ics File URL: (subscribable URL)`

2. **Subscribing to the Calendar**: To subscribe to the calendar, use the URL provided above within your preferred calendar application (e.g., Google Calendar, Outlook).

3. **Updating Calendar Events**: Make sure to refresh your calendar regularly to get the latest updates on events!

## Troubleshooting
In case of any issues, feel free to check the issues section of this repository or contact the maintainers.

## How It Works

1. The application uses Puppeteer to automate a browser instance
2. It navigates to the CTU Campus Manager login page
3. Logs in using credentials from your `.env` file
4. Extracts assessment data from the portal's task table
5. Converts the data into iCalendar (RFC 5545) format
6. Serves the calendar file for download
