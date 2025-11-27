# Second Brain Chatbot Web Component

A customizable chatbot web component built with React, TypeScript, and Vite.

## Installation

This project is designed to be used as a web component.

### Building the Project

To build the web component:

```bash
npm run build
# or
pnpm run build
```

This will generate the following files in the `dist` directory:
- `secondBrainChatBot.js`
- `secondBrainChatBot.css`

## Usage

### In a HTML file

1. Include the script and stylesheet in your HTML file:

```html
<script type="module" src="./path/to/dist/secondBrainChatBot.js"></script>
<link rel="stylesheet" href="./path/to/dist/secondBrainChatBot.css">
```

2. Use the custom element:

```html
<second-brain-chatbot
  enterprise-token="YOUR_ENTERPRISE_TOKEN"
  user-token="YOUR_USER_TOKEN"
  member-id="YOUR_MEMBER_ID"
  base_api="YOUR_BASE_API_URL"
></second-brain-chatbot>
```

### Attributes

| Attribute          | Description                                      | Required |
| ------------------ | ------------------------------------------------ | :------: |
| `enterprise-token` | The enterprise token for authentication.         |   Yes    |
| `user-token`       | The user token for authentication.               |   Yes    |
| `member-id`        | The member ID associated with the user.          |   Yes    |
| `base_api`         | The base URL for the API (e.g., `https://.../`). |   Yes    |

## Development

### Prerequisites

- Node.js (v18+)
- pnpm (recommended) or npm

### Setup

```bash
pnpm install
```

### Running Locally

To start the development server:

```bash
pnpm run dev
```

### Linting and Formatting

To run linting:

```bash
pnpm run lint
# or fix automatically
pnpm run lint:fix
```

To format code:

```bash
pnpm run format
```

### Testing the Build

To test the built web component using the included consumer app:

```bash
pnpm run start:consumer
```

This will serve the project and open the consumer app at `http://localhost:3000/consumer-app/index.html`.

## Project Structure

- `src/`: Source code
  - `components/`: React components
  - `store/`: Zustand stores
  - `api-manager.ts`: API handling logic
  - `WebCompo.tsx`: Web Component wrapper
- `dist/`: Built artifacts
- `consumer-app/`: Simple HTML app for testing the component
