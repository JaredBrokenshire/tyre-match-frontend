## v0.2.1 `DATE`

### [Added]

- Added image upload wizard for tyre models and processing pipeline returns to the details page

## v0.2.1 30/08/2026

### [Added]

- Added binary, normalised and clean file type to tyre impression image display
- Added region selection to the reference point picker
- Added ROI parameters to the create tyre impression method

### [Changed]

- Updated the create tyre impression modal to a multi-step wizard for clarity

## v0.2.0 28/08/2026

### [Changed]

- Updated most pages and services to reflect new Go backend api signature

## v0.1.0 13/07/2026

### [Added]

- Added image displays to tyre model details page
- Added upload image button for tyre models
- Added PPI resolution calculator for tyre impression image uploads

## v0.0.6 06/06/2026

### [Added]

- Added file service for retrieving images to display on the frontend
- Added tyre impression details page, displaying all stages of the preprocessing pipeline

### [Changed]

- Changed formatting of data in tyre impression list view to capitalise status and display date and time correctly

## v0.0.5 24/05/2026

### [Added]

- Added tyre model update modal
- Added update and delete methods to the tyre model service
- Added generic delete modal

### [Changed]

- Updated README.md to include project details and host file changes

## v0.0.4 23/05/2026

### [Added]

- Added tyre model details page

### [Changed]

- Fixed incorrect placeholder in create tyre model modal
- Fixed vertical padding for no data display in data table

## v0.0.3 22/05/2026

### [Added]

- Added tyre impression list view
- Added VeeValidate for form validation with custom rules
- Added validated file input form component
- Added tyre impression image upload modal
- Added tyre model create modal and custom form elements
- Added feather icons dependency

### [Changed]

- Changed styling on subheadings in changelog

## v0.0.2 21/05/2026

### [Added]

- Added card and modal ui components
- Added text input and data table ui components
- Added toastification plugin for toast messages
- Added helper service with utility functions for sending and receiving api requests
- Added tyre models list view with data table

### [Changed]

- Updated primary colour in src/assets/css/styles.css
- Fixed axios requests to no longer require credentials

## v0.0.1 20/05/2026

### [Added]

- Setup Vue2 project structure with tailwindcss and eslint
- Added vue-router for page navigation
- Added home page and 404 page with default layout including header and footer