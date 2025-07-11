# Employee Directory – Frontend UI Assignment

This is a responsive and interactive **Employee Directory Web Interface** built as part of the Ajackus Frontend UI assignment.

## 🚀 Project Overview

The application allows users to:
- View a grid of employees.
- Add, edit, and delete employees.
- Filter by First Name, Department, or Role.
- Search by name or email.
- Sort by First Name or Department.
- View responsive layout across desktop, tablet, and mobile.
- Paginate through the employee list.

---

## 📁 Project Structure

src/
├── components/ # Reusable UI components (cards, buttons, forms)
├── data/ # Mock data source
├── hooks/ # Custom hooks if used
├── lib/ # Utility functions
├── pages/ # Main pages like EmployeeDashboard
│ ├── EmployeeDashboard.tsx
│ ├── Index.tsx
│ └── NotFound.tsx
├── types/ # TypeScript interfaces and types
├── App.tsx # Root component
├── main.tsx # Entry point
└── ...

yaml
Copy
Edit

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/rohithsarikela/Employee-Directory-
cd employee-directory
2. Install dependencies
bash
Copy
Edit
npm install
3. Run the development server
bash
Copy
Edit
npm run dev
The app will be available at: http://localhost:8080

✅ Features Implemented
 Employee Dashboard Page with Grid View

 Add/Edit Form with Validation

 Delete Employee Functionality

 Client-side Filter (Name, Department, Role)

 Sorting (First Name, Department)

 Search Bar (by name/email)

 Pagination (10, 25, 50, 100)

 Responsive Design

 Modular & Reusable Components

 Freemarker-ready (mock data from JSON/local array)

🔍 Technologies Used
React + TypeScript

Vite

Tailwind CSS

Vanilla JavaScript (for DOM logic and validation)

Freemarker-ready templates (UI structured to integrate)

⚠️ Known Issues / Improvements
Data is stored in memory; refreshing the page resets it.

No persistent storage (as per assignment requirements).

Could add routing and accessibility enhancements.

💡 Challenges Faced
Designing a clean, modular layout with Tailwind CSS.

Combining filter, search, and sort logic without API calls.

Ensuring responsiveness across all screen sizes.

🙌 Future Enhancements
Use localStorage for temporary data persistence.

Add page routing between dashboard and form pages.

Improve accessibility (ARIA roles, keyboard navigation).

📷 Screenshot
<img width="1900" height="907" alt="image" src="https://github.com/user-attachments/assets/c63e616f-6189-44a3-bb62-cb288440cae4" />
<img width="1047" height="626" alt="image" src="https://github.com/user-attachments/assets/afd4bd85-257a-4efd-9b2b-fcd8b8a2530c" />


