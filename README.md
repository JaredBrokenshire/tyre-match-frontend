# TyreMatch Frontend

Frontend application for TyreMatch, an MSc Forensic Investigation dissertation project exploring the use of computer
vision to identify and match forensic-quality tyre impression images against a database of known tyre makes and models.

The frontend is built with Vue 2 and provides an interface for:

- Uploading and managing tyre impression data
- Viewing and interacting with analysis results
- Communicating with the Flask backend API
- Managing forensic comparison workflows

The application communicates with a Flask-based API backend connected to a MySQL database running through Docker
Compose.

---

## Prerequisites

Before running the frontend, ensure you have the following installed:

- Node.js (recommended LTS version)
- npm
- The TyreMatch backend API running in docker

--- 

## Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/JaredBrokenshire/tyre-match-frontend
cd tyre-match-frontend
```

---

### 2. Configure Hosts File

To allow the frontend and backend applications to communicate correctly in the local development environment, add the
following line to your system hosts file:

```bash
127.0.0.1 localtyrematch.com api.localtyrematch.com
```

### Hosts File Locations

Windows:

```bash
C:\Windows\System32\drivers\etc\hosts
```

Linux/MacOS:

```bash
/etc/hosts
```

You may need administrator/root privileges to edit the file.

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start the Development Server

```bash
npm run serve
```

The application will start with hot-reloading enabled for development.

---

### 5. Production Build

Compile and minify the application for production:

```bash
npm run build
```

---

### 6. Linting

Run linting and automatically fix issues where possible:

```bash
npm run lint
```

---

## Project Structure

```
src/
├── @core/                  # 3rd-party components
├── assets/                 # Static assets
├── components/             # Reusable Vue components
├── layouts/                # Reusable Vue layouts
├── libs/                   # 3rd-party libraries
├── router/                 # Vue Router configuration
├── services/               # API communication
├── views/                  # Application pages/views
├── App.vue                 # Vue mounted component
├── global-components.js    # 3rd-party component initialisation
└── main.js                 # Project entrypoint
```

---

## Backend Repository

This frontend is designed to work alongside
the [TyreMatch Flask API backend](https://github.com/JaredBrokenshire/tyre-match-backend).

Ensure the backend services and Docker containers are running before starting the frontend application.

---

## Research Context

TyreMatch forms part of an MSc dissertation investigating the feasibility of applying computer vision techniques to
forensic tyre impression analysis. The project aims to assist with the identification and comparison of tyre tread
patterns captured from forensic-quality ink impressions.

--- 

## Vue CLI Configuration

See the Vue CLI documentation for additional configuration options:

[Vue CLI Configuration Documentation](https://cli.vuejs.org/config/?utm_source=chatgpt.com)