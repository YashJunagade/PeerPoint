# PeerPoint – Get Help Through Your Peers

## Features

### For Students Seeking Help:
- **Sign Up/Login**: Register as a student who needs help.
- **Request Help**: Post queries or select from categories like academic, career, personal development, etc.
- **Search for Mentors**: Find seniors by college, university, or expertise.
- **Chat System**: One-to-one chat for private discussions.

### For Students Helping (Seniors):
- **Sign Up/Login**: Register as a mentor.
- **Provide Details**: Add college, university, expertise, and availability.
- **Connect Requests**: Receive help requests or browse questions.
- **Dashboard**: Track mentorship impact (students helped, feedback, etc.).

## Core Functionalities

### Frontend (React):
- **Home Page**: Overview, CTA buttons.
- **Dashboard**:
  - Seekers: Search for mentors, post queries.
  - Mentors: Respond to queries.
- **Search & Filter**: By university, expertise.
- **Chat System**: Firebase or Socket.io for real-time messaging.
- **Responsive Design**: Mobile-friendly UI.

### Backend (Node.js + MongoDB):
- **API Endpoints**:
  - `/api/users`: Manage sign-up/login.
  - `/api/mentors`: CRUD operations for mentors.
  - `/api/requests`: Manage help requests.
  - `/api/chat`: Chat functionality.
- **Authentication**: JWT-based authentication.
- **Database Models**:
  - `User`: Name, email, role, college, university.
  - `Mentor`: Expertise, availability, feedback.
  - `Chat`: Messages with timestamps.

## Tools to Use

### Frontend:
- **React.js** for UI.
- **Tailwind CSS** for styling.
- **React Router** for navigation.
- **Axios** for API calls.

### Backend:
- **Node.js + Express.js** for the server.
- **MongoDB + Mongoose** for the database.
- **JWT** for authentication.
- **Socket.io** for chat.


## License

This project is licensed under the MIT License.

[Visit PeerPoint](https://peerpoint.netlify.app/)
