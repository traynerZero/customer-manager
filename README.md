# Customer Management CRUD Application

Welcome to the Customer Management CRUD application! This project demonstrates basic CRUD (Create, Read, Update, Delete) operations for managing customer data. It's built using Laravel for the backend API and React.js for the frontend interface. This application allows you to:

-   Create new customers with their first name, last name, email, and contact number.
-   Read existing customer details.
-   Update customer information.
-   Delete customers from the database.

## Getting Started

To start the project:

-   If you are on **Windows**, run `start-project-windows.sh`.
-   If you are on **Linux**, run `start-project-linux.sh`.

-   Run "docker-compose exec app php artisan migrate" command on terminal to start database migration
-   Open your browser at http://localhost:8000 to start

Ensure you have Node.js and Yarn installed. If `yarn dev` does not automatically start, run it manually in a new terminal window/tab.

## Technologies Used

-   **Frontend:** React.js, Axios, Tailwind CSS
-   **Backend:** Laravel, MySQL
-   **Development Tools:** Docker, Yarn (or npm), Git
