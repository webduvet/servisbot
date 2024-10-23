# Bot Logs Viewer

This project is a simple application to view logs for service bots. It reads data from JSON files and serves them using Next.js as a backend.

## Prerequisites

- Node.js (v18.x or higher recommended)
- pnpm (v7.x or higher recommended)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate into the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

## Running the App

Start the development server:

   ```bash
   pnpm dev
   ```

   This will start the Next.js app on [http://localhost:3000](http://localhost:3000).


## Data

The data for the application is located in the `./data` directory and includes:

- `bots.json` - List of bots.
- `workers.json` - List of workers.
- `logs.json` - Log entries for the bots.

The Next.js backend reads and serves data from these files.

## Additional Commands

- Lint the code:

  ```bash
  pnpm lint
  ```

- Format the code:

  ```bash
  pnpm format
  ```

## License

NA
