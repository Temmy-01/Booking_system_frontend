# Booking_system_frontend

This is the React frontend for the **Booking_system_frontend** appointment booking system. It provides a user-friendly interface for users to book 1-hour appointment slots (8 AM–4 PM), view existing bookings, and manage appointments. The frontend communicates with a Laravel backend API to sync with a service provider’s Google Calendar, check slot availability, and send `.ics` calendar invites to bookers.

## **Features**
- **Booking Interface**: Select available 1-hour slots, input appointment details, and book via a modal form.
- **Appointment List**: View a paginated, filterable table of booked appointments with details (name, booker, date/time).
- **Slot Availability**: Displays unavailable slots as blurred/unclickable in the booking modal.
- **Responsive Design**: Built with Bootstrap for a clean, mobile-friendly UI.
- **User Feedback**: Uses React Toastify for success/error notifications and SweetAlert2 for confirmation dialogs.
- **Authentication**: Integrates with Laravel Sanctum for secure API requests (assumes authenticated user).

## **Tech Stack**
- **Framework**: React 18
- **Styling**: Bootstrap 5, CSS
- **API Requests**: Axios
- **Notifications**: React Toastify, SweetAlert2
- **Routing**: React Router DOM
- **Build Tool**: Vite or Create React App (adjust based on your setup)

## **Prerequisites**
- Node.js 16+ (recommended: 18.x)
- npm 8+ or yarn
- Access to the Laravel backend API (e.g., `http://your-app.test/api/v1`)
- GitHub account with collaborator access to the private repository
- A modern browser (e.g., Chrome, Firefox)

## **Installation**

### **1. Clone the Repository**
If the frontend is in a subdirectory of the main repository:
```bash
git clone https://github.com/your-username/booking_system_frontend.git
cd booking_system_frontend