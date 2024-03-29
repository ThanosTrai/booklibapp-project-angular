# Book Library Frontend - Educational Project

This repository hosts the front-end code of the Book Library application. This project is built using Angular and Typescript and is intended primarily for educational purposes.
It is designed to work in conjuction with a Java Spring Boot back-end.

## Related Repository
**Back-end (Java Spring Boot):** [Book Library Back-End Repository](https://github.com/ThanosTrai/booklibapp-project-springboot)<br>
This front-end application is designed to work with the above-mentioned back-end repository. Make sure to set up and run the back-end application to fully utilize the features of this front-end application.

## Features

- Built with Angular 16.2.0, utilizing standalone components for enhanced modularity.
- Interact with the Book Library back-end to display and manage book data.
- Advanced user authentication and token management with Auth Service and Auth Token Interceptor.
- Robust search functionality allowing users to filter books by title, author, category, and ISBN.
- Interactive user experience with the ability to favorite and unfavorite books.


## Environment Setup

To run this project, you'll need to have the following installed on your development machine:

- **Angular CLI**: Version 16.2.9 (supports standalone components)
- **Node.js**: Version 18.16.0
- **npm (Node Package Manager)**: Version 9.5.1

These versions are recommended for compatibility with the project setup.


## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/ThanosTrai/booklibapp-project-angular.git
cd booklibapp-project-angular
```

### Install Dependencies
Run the following command to install the required dependencies:

```bash
npm install
```

### Running the Application

```bash
ng serve
```
This application will be available at `http://localhost:4200`.

### Dependencies and Frameworks Used

- **Angular**: Version 16.2.0
- **Angular Material**: Version 16.2.12
- **Bootstrap**: Version 5.2.3
- **RXJS**: Reactive Extensions Library for JavaScript
- **PrimeNG**: UI Component Suite for Angular
- **NgBootstrap**: Angular powered Bootstrap
- And other libraries as listed in `package.json`.
