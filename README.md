# 💰 Finance Dashboard

A modern personal finance management dashboard built with React, Vite, and Tailwind CSS. Track your income, expenses, and financial insights with an intuitive UI.

---

##  Tech Stack

| Technology | Version |
|---|---|
| React | 19.x |
| Vite | 8.x |
| Tailwind CSS | 4.x |
| Recharts | 3.x |
| React Router DOM | 7.x |
| Lucide React | 1.x |

---

##  Project Structure

```
src/
├── components/
│   ├── NavBar.jsx         # Top navigation bar
│   ├── Header.jsx         # Welcome header with total balance
│   ├── Dashboard.jsx      # Main dashboard page
│   ├── SummaryCards.jsx   # Income / Expense / Balance cards
│   ├── Charts.jsx         # Line & Bar charts
│   ├── Insights.jsx       # Financial insights & tips
│   ├── Transactions.jsx   # Transactions table with filters
│   ├── RoleBase.jsx       # Role switcher (Admin / Viewer)
│   └── Footer.jsx         # Footer component
├── context/
│   └── AppContext.jsx     # Global state management
├── utils/
│   └── helpers.js         # Utility & calculation functions
├── data/
│   └── mockdata.js        # Mock transaction data
└── App.jsx                # Root component with routing
```

---

##  Features & Functionality

###  Navigation (NavBar)
- Desktop navigation links: **Home**, **Transactions**
- **Download dropdown** — hover to export options (JSON / CSV)
- **User dropdown** — hover to switch roles (Admin / Viewer)
- **Dark mode toggle** — Sun/Moon icon to switch themes
- **Mobile hamburger menu** — Menu Bar in Mobile View 
- Live "Last updated" timestamp that refreshes every 5 minutes

### 🏠 Header
- Displays current month and year
- Shows **Total Balance** 

### 📊 Dashboard (Home Page)
- **Month selector** — filter summary by any available month
- **Summary Cards** — Balance, Income, Expenses for selected month
- **Monthly Trend Chart** — Comparing income vs expenses over months
- **Spending Breakdown Chart** — Bar chart showing expenses by category
- **Financial Insights** — 4 insight cards + financial tip banner

###  Summary Cards
- Balance card 
- Income card  with `+` prefix
- Expenses card with `-` prefix
- Each card shows month label dynamically
- Hover animation (lift effect)

###  Charts
- **Monthly Income vs Expenses** — Line chart with custom, formatted Y-axis (K/L)
- **Spending by Category** — Bar chart sorted by highest spend, color-coded bars, angled X-axis labels
- Both charts are fully responsive using `ResponsiveContainer`

###  Insights
- **Highest Spending Category** — shows category name and total amount
- **Monthly Change** — % increase or decrease vs last month with trend icon
- **Average Daily Spending** — calculated across all expense days
- **Total Transactions** — all-time count
- **Financial Tip banner** — dynamic advice based on monthly spending trend

###  Transactions Page
- Full transactions table with columns: Date, Description, Category, Amount, Type
- **Search filter** — search by description or category
- **Type filter** — All / Income Only / Expenses Only
- **Month filter** — filter transactions by specific month (`YYYY-MM`)
- **Sortable columns** — click any column header to sort (asc/desc) with chevron icons
- Amount displayed in green (`+`) for income, red (`-`) for expenses
- **Admin only:**
  - Add Transaction button → modal form with all fields
  - Edit Transaction → pre-filled modal form
  - Delete Transaction → confirmation dialog
- Empty state message when no transactions match filters

### Role-Based Access (RoleBase)
- Two roles: **Viewer** and **Admin**
- Role persisted in `localStorage`
- **Viewer** — read-only access, no add/edit/delete buttons
- **Admin** — full CRUD access on transactions
- Active role highlighted with blue indicator dot

###  Dark Mode
- Full dark mode support across all components
- State persisted in `localStorage`
- Toggled via navbar button (Sun = light, Moon = dark)

###  Data Export
- **Export to CSV** — downloads all transactions as `.csv` file with date-stamped filename
- **Export to JSON** — downloads all transactions as formatted `.json` file
- Available in both desktop dropdown and mobile menu

###  State Management 
Global state includes:
- `transactions` — Save in Localstorage
- `role` — Save in Localstorage
- `darkMode` — Save in Localstorage
- `filters` — `{ type, search, month, sortBy, sortOrder }`
- `addTransaction` —  new transaction 
- `updateTransaction` — updates transaction 
- `deleteTransaction` — removes transaction 
- `getFilteredTransactions` — applies all active filters + sorting

###  Helper Utilities
| Function | Description |
|---|---|
| `formatCurrency` | Formats number as INR (₹) using `en-IN` locale |
| `formatDate` | Formats date string as `MMM DD, YYYY` |
| `calculateTotals` | Returns `{ income, expenses, balance }` from transactions array |
| `getCategoryBreakdown` | Returns expense totals grouped by category |
| `getMonthlyTrend` | Returns monthly income/expense data sorted by date |
| `getInsights` | Returns highest category, monthly change %, avg daily spend, total count |

---

##  Responsive Design
- Mobile View using Tailwind CSS 
- Tab View using Tailwind CSS
- Transactions table horizontally scrollable on small screens
---

##  Routing
Home , Dashboard ,other

## 📦 Installation & Setup

```bash
# Clone the repository
git clone <repo-url>
cd finance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
---