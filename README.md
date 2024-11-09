# Implementing User Authentication and Authorization with Next.js and Firebase

This is a practice to understand about the different setting for authentication, authorization, and protected routes in Next.js from React without React-router-dom library.

## Table of contents

-    [Overview](#overview)

     -    [Goal](#goal)
     -    [Why I Chose Not to Use react-router-dom in This Project](#why-i-chose-not-to-use-react-router-dom-in-this-project)

-    [Process](#process)

     -    [Planning]
          -    [Routing planning]()
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

Using react-router-dom with Next.js is generally discouraged, as Next.js has a powerful built-in routing system optimized for server-side rendering (SSR) and static site generation (SSG). Here’s why that matters, especially for authentication and authorization:

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

## Author

-    [Noej Ijkus](https://github.com/ijkuS)
-    [email](ijkus.noej@gmail.com)

## Acknowledgments
