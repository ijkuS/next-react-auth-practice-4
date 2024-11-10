# Implementing User Authentication and Authorization with Next.js and Firebase

This is a practice to understand about the different setting for authentication, authorization, and protected routes in Next.js from React without React-router-dom library.

## Table of contents

-    [Overview](#overview)

     -    [Goal](#goal)
     -    [Why I Chose Not to Use react-router-dom in This Project](#why-i-chose-not-to-use-react-router-dom-in-this-project)

-    [Process](#process)

     -    [Planning]
          -    [Page routes planning](#page-routes-planning)
          -    [Handling data flow planning](#handling-data-flow-planning)
          -    [Technical planning](#technical-planning)

-    [Challenges and Lessons](#challenges-and-lessons)
-    [Future Improvements](#future-improvements)
-    [Useful resources](#useful-resources)
-    [Author](#author)
-    [Acknowledgments](#acknowledgments)

## Overview

This is a practice to understand about the different setting for authentication, authorization, and protected routes in Next.js from React without React-router-dom library.

### Goal

-    Authentication with firebase authentication and realtime database
-    Authorization for user types (Admins, Members, Visitors)
-    Protected routes with middleware

### Why I Chose Not to Use react-router-dom in This Project

In this project, I used Google Firebase for authentication and Next.js middleware and session handling for server-side security and control. Using react-router-dom with Next.js is generally discouraged, as Next.js has a powerful built-in routing system optimized for server-side rendering (SSR) and static site generation (SSG). Here’s why that matters, especially when integrating Firebase authentication and session management:

**Conflict with Next.js Routing:**
Next.js follows a file-based routing system, automatically generating routes based on the pages directory structure. Meanwhile, react-router-dom operates as a client-side router. Attempting to use both can lead to conflicts, redundant routes, and unexpected behavior as both systems vie to manage the routing layer.

**Server-Side Rendering Compatibility:**
Next.js excels in SSR, rendering routes and data on the server before reaching the client. This is especially beneficial for authentication flows, where server-rendered redirects or secure data fetching are essential. Since react-router-dom is purely client-side, it lacks support for SSR, potentially undermining Next.js’s capabilities in areas where secure, pre-rendered data is a priority.

**Middleware and API Integrations for Secure Access Control:**
Next.js supports built-in middleware and API routes, which help implement server-side authentication and authorization checks. This server-based approach ensures that only authenticated users can access protected routes, enhancing data security and access control. In contrast, react-router-dom is client-only, meaning it relies on client-side logic, exposing protected routes temporarily until access is verified on the client.

**Streamlined Redirects and Middleware Control:**
For authentication, Next.js’s middleware can check and apply redirects on the server before users reach restricted routes, effectively managing access and protecting sensitive content. react-router-dom lacks this server-driven redirection capability, limiting it to client-side control.

Overall, Next.js’s built-in routing, middleware, and server-side features provide a more secure and efficient approach to authentication and authorization. This is why I chose to leverage Next.js’s native capabilities for routing and access control in this project.

## Process

### Planning

#### Page routes planning

-    header

     -    Logo -> '/'
     -    Products -> '/products/all'
     -    Cart -> '/cart' (only members can see and use)
     -    Admnin -> '/admin/dashboard' (only admins can see and use)

     -    Login/Logout -> pop-up (logged-in user can see 'Logout' button, logged-out user can see 'Login' button)

#### Handling data flow planning

Here's how each part of this code setup handles data flow, from initial visitor access to login and session management.

**Before Login**

1. Default Access & Role (Visitor):
   When users land on the homepage without logging in, they automatically receive a default role of 'visitor'. This role is reflected in the `useUserSession` hook (role is set to 'visitor') and contols access in `Header.jsx`.

-    Menu Display: Visitors see only the essential navigation items: Logo, Products, and Login.
-    Protected Routes: middleware.js redirects unauthenticated users who attempt to access restricted routes( /cart, /admin) to the public homepage.

2. Session Check in Middleware:
   middleware.js checks for a session cookie (SESSION_COOKIE_NAME) to determine if a user has a session established. If no session cookie is found and a protected route is accessed, the user is redirected to the homepage.
   This ensures protected pages are server-side guarded from unauthorized access.

**After Login**

1. Login Flow with Firebase Authentication

-    Login Process: When a user clicks "Login," the login function in `useUserSession` triggers firebaseLogin, which authenticates the user via Firebase.
-    Role Assignment: Once authenticated, the user's role is determined by checking their isAdmin property, setting their role to either "admin" or "member."
-    Session Creation: The createSession function (from auth-actions) calls set-session.js to create a session cookie with the user’s UID and role. This cookie persists authentication and role information across requests and sessions.

2. Session Management and UI Update

-    UI Role-based Updates: After logging in, the Navbar updates to show relevant items based on the role:
     -    Members: See the Cart menu.
     -    Admins: See the Admin menu with full access.
-    Session Cookie Management: The session cookie (set with HttpOnly and Max-Age options) securely stores user data, enabling the server to recognize and authenticate the user on protected routes even after a page refresh or new request.

3. Logout Flow

-    When "Logout" is clicked, firebaseLogout removes Firebase's authentication state, and removeSession removes the session cookie by calling remove-session.js.
-    useUserSession resets user to null and role to "visitor," revoking access to member/admin-only routes.

**Session and Cookie Handling**

-    Session Persistence:

     -    The session cookie holds uid and role data, allowing server-side components (like middleware) to verify the user’s authentication state and role without re-authenticating through Firebase on every request.
     -    set-session.js and remove-session.js manage these cookies, making them persistent with a specified lifetime (Max-Age of one day) or removing them entirely.

-    Data Flow Across Server and Client:

     -    Initial Page Load: The server reads the session cookie to establish role and access permissions via middleware.js.

     -    Subsequent Requests: With useUserSession and the session cookie in place, user role and authentication states are maintained, ensuring protected pages and UI updates remain consistent across interactions and page reloads.

This setup effectively divides responsibility between server-side middleware for secure access control and client-side useUserSession for UI updates, maintaining a seamless, role-based user experience.

### 1. Initial structure of files

**File tree**

```
src
 ┣ actions
 ┃ ┗ auth-actions.js // *added
 ┣ app
 ┃ ┣ libs
 ┃ ┃ ┗ firebase
 ┃ ┃ ┃ ┣ auth.js // *added
 ┃ ┃ ┃ ┗ config.js // *added
 ┃ ┣ favicon.ico
 ┃ ┣ globals.css
 ┃ ┣ layout.js // *modified
 ┃ ┗ page.module.css
 ┣ components
 ┃ ┗ Header.jsx // *added
 ┣ hooks
 ┃ ┗ use-user-session.jsx // *added
 ┣ pages
 ┃ ┣ admin
 ┃ ┃ ┣ addnew.jsx
 ┃ ┃ ┗ dashboard.jsx
 ┃ ┣ api
 ┃ ┃ ┣ remove-session.js // *added
 ┃ ┃ ┗ set-session.js // *added
 ┃ ┣ products
 ┃ ┃ ┗ all.jsx
 ┃ ┣ _app.jsx // *modified
 ┃ ┣ cart.jsx
 ┃ ┗ index.jsx
 ┣ routes
 ┃ ┗ middleware-constants.js // *added
 ┗ middleware.js // *added
```

## Useful resources

[Next.js: middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## Author

-    [Noej Ijkus](https://github.com/ijkuS)
-    [email](ijkus.noej@gmail.com)

## Acknowledgments
