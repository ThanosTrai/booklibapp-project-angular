# Book Library Application - Front End

This repository hosts the front-end part of the Book Library application. The front-end is built using Angular (standalone) and Typescript and is intended to work in conjunction with the Java Spring Boot back-end which can be found
in a separate repository.

## Related Repository
**Back-end (Java Spring Boot):** [Book Library Back-End Repository](https://github.com/ThanosTrai/booklibapp-project-springboot)<br>
This front-end application is designed to work with the above-mentioned back-end repository. Make sure to set up and run the back-end application to fully utilize the features of this front-end application.

## Features

- Interact with the Book Club back-end to display and manage book data.
- User authentication and profile management.
- Search, view, and favorite books.

## Environment Setup

To run this project, you'll need to have the following installed on your development machine:

- **Angular CLI**: Version 16.2.9
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
