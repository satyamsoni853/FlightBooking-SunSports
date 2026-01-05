# Travel-Trips Project Documentation

## 1. Project Overview

Travel-Trips is a comprehensive travel booking application designed to interpret user travel needs and provide seamless booking experiences for flights, hotels, and car rentals. The application focuses on a modern, user-friendly interface with premium aesthetics.

## 2. Technology Stack

Based on the configuration, this project uses the following key technologies:

- **Framework**: [Next.js](https://nextjs.org/) (React Framework for the Web)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Static typing for JavaScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
- **Icons**: [Lucide React](https://lucide.dev/) (Beautiful & consistent icons)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Library for React animations)
- **Forms & Validation**: Standard React forms (likely enhanced with libraries in future iterations)

## 3. Project Structure

The project follows the standard Next.js App Router structure:

```
src/
├── app/                 # App Router pages and layouts
│   ├── cars/            # Car rental feature pages
│   ├── flights/         # Flight booking flows (search, booking, payment)
│   ├── hotels/          # Hotel booking feature pages
│   ├── login/           # User authentication pages
│   ├── popular-routes/  # Curated travel routes
│   ├── layout.tsx       # Root layout (likely contains Navbar/Footer)
│   └── page.tsx         # Home page
├── components/          # Reusable UI components
├── constants/           # Static data (airports, etc.)
└── context/             # Global state (ThemeContext, etc.)
```

## 4. Component Documentation

### 4.1 Global Components

These components are used throughout the application to maintain consistency.

- **`Navbar.tsx`**: The top navigation bar. It includes links to major sections (Flights, Hotels, Cars), authentication options (Login/Sign up), and potentially a theme toggle. It is designed to be responsive and accessible.
- **`Footer.tsx`**: The bottom section of the application, likely containing legal links, contact info, and social media links.
- **`ThemeContext.tsx`** (in `context/`): Manages the application's visual theme (Light/Dark mode), ensuring a consistent look and feel across all pages.

### 4.2 Page Components

These files correspond to specific routes in the application.

#### Core Pages

- **`Hero.tsx`**: The landing section of the Home page. It likely features a catchy headline, a search bar/call-to-action, and engaging imagery to draw users in.
- **`Features.tsx`**: Displays key features or benefits of using the platform (e.g., "Best Prices", "24/7 Support").
- **`PopularRoutesPage.tsx`**: A dedicated section or page showcasing popular travel destinations with "Book Now" prompts.

#### Flight Flow

- **`FlightsPage.tsx`**: The main landing page for the Flights section. Likely contains the initial search interface.
- **`SearchResults.tsx`**: Displays the list of available flights based on the user's search criteria (origin, destination, date).
- **`FlightBookingPage.tsx`**: The page where users enter their details (names, passport info) to proceed with a selected flight.
- **`FlightPayment.tsx`**: Handles the payment processing UI, likely collecting credit card info or offering other payment methods.
- **`FlightUsername.tsx`**: Potentially a component for user-specific actions or displaying the logged-in user's profile in the flight flow.

#### Other Verticals

- **`hotels/page.tsx`**: Landing page for hotel bookings.
- **`cars/page.tsx`**: Landing page for car rentals.
- **`login/page.tsx`**: The user login interface, supporting email/password and potentially OAuth providers (Google, etc.).

### 4.3 Utility & UI Components

- **`constants/airports.ts`**: Contains a list of airports (codes, names, cities) used for the search autocomplete functionality.
- **`constants/index.ts`**: Central export point for project constants.

## 5. Key Workflows

### 5.1 Flight Booking Flow

1.  **Search**: User enters trip details on `FlightsPage` / Home.
2.  **Selection**: Results are shown in `SearchResults`. User picks a flight.
3.  **Details**: User enters passenger info in `FlightBookingPage`.
4.  **Payment**: User reviews cost and enters payment info in `FlightPayment`.
5.  **Confirmation**: Booking is confirmed (UI feedback).

### 5.2 Authentication

- Users can access `login/page.tsx` from the Navbar.
- Successful login likely updates a global user state (or session).

## 6. How to Generate PDF

To convert this documentation to PDF:

1.  **VS Code**: Install a "Markdown to PDF" extension (e.g., `yzane.markdown-pdf`) and run the "Convert" command.
2.  **Browser**: Open this file in a browser (with a Markdown viewer extension) or paste the content into a Markdown editor (like HackMD or StackEdit) and use the browser's "Print" -> "Save as PDF" feature.
