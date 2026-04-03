# TaskFlow

TaskFlow is a modern, full-stack task management application designed to help users organize, track, and manage their projects efficiently. Featuring a dynamic Kanban-style interface, it offers a seamless drag-and-drop experience for productivity.

## 🚀 Features

- **Dynamic Kanban Board:** Effortlessly manage tasks using a drag-and-drop interface to move items between "To Do," "In Progress," and "Completed" states.
- **Secure Authentication:** Integrated Google Authentication for a quick and secure login experience.
- **Server-Side Data Handling:** Optimized performance using Next.js Server Actions for secure, direct database access without a separate API layer.
- **Responsive Design:** Fully optimized for all device types using Tailwind CSS and Shadcn/ui.
- **Persistent Storage:** All tasks and user data are securely stored and managed via MongoDB.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/), Lucide React
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Google Auth)

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or later
- A MongoDB Atlas account
- Google Developer Console credentials

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/wasifalam23/next-taskflow.git](https://github.com/wasifalam23/next-taskflow.git)
    cd next-taskflow
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `/app`: Next.js pages, layouts, and API routes.
- `/components`: Reusable UI components and Shadcn/ui elements.
- `/models`: Mongoose schemas for task and user data.
- `/lib`: Database connection logic and utility functions.
- `/hooks`: Custom React hooks for handling application state.
- `/types`: TypeScript interface definitions.

## 📄 License
