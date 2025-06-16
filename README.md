# Property_Letting_WebApplication
A Property Letting Web Application that was created as a part of a module's assignments. It uses **JavaScript**, **Node.js**, **React.js** and more. 

This is the Assignment Brief to give you a better understanding of what this project includes, my project does go a bit out of scope and have more features and changes made for th website to be user friendly too. But overall this is what the project includes.

# Introduction
You will build a **web application** for a **Dublin Property Lettings Agency** (choose a name!). You will
plan, design, and create a **dynamic Next.js web application with an SQL backend** containing the
following features: **CRUD pages**, **user access control using cookies**, **a navigation system**, **CSS**, and **a
modular code design**.

The website will have 3 user levels:
• Landlord (Property owners)
• Tenants
• Admin

# Web Application Requirements
• Handle form data in a secure manner making sure to use server-side validation.
• Make the website look professional using well-designed CSS techniques and appropriate
content. Your code should be well commented. You may be asked to explain any piece of
code.
• Code should be modular, components should be reusable and not copy pasted to multiple
displays.
• The homepage of the site should be at ‘index’.
• All data is stored in an SQL database.

# Pages, Functionality, and Access Level
The following endpoints and functionality must be created. You have the choice to create
additional endpoints if so required.

                                 
**Homepage** (index.js)                                                                   
**Description** - Professional homepage with basic info about the agency.   
**Access Level** - Public (All visitors)    
**Notes** - Design-focused; no login required.
        
**Register Page**  
**Description** - Allow new users to register an account (Landlord or Tenant role).   
**Access Level** - Public (All visitors)   
**Notes** - Server-side form validation required.

**Login Page**  
**Description** - Login form to authenticate users, setting a cookie to manage sessions.  
**Access Level** - Public (All visitors)   
**Notes** - Cookie-based user session management.

**Dashboard** 
**Description** - Display personalized dashboard after login, based on user role.  
**Access Level** - Landlord, Tenant, Admin  
**Notes** - Redirect based on role after login.

**Property Listings** (View All Properties)  
**Description** - Display all properties available to rent.  
**Access Level** - Public (All visitors)   
**Notes** - Basic property info visible to everyone.

**My Properties** (Landlord Only)   
**Description** - Landlord can view, add, edit, or delete their own properties.   
**Access Level** - Landlord  
**Notes** - CRUD operations on properties

**Apply for Property**  
**Description** - Tenants can apply to rent aproperty (simple application formsubmission).  
**Access Level** - Tenant   
**Notes** - Connect tenant to property via DB.  

**My Applications**   
**Description** - Tenants can view their submitted rental applications.   
**Access Level** - Tenant   
**Notes** - Read-only view of submitted applications.

**Manage Applications** (Admin Only)  
**Description** - Admin can view all applications submitted by tenants.   
**Access Level** - Admin  
**Notes** - Optionally: approve/decline applications.

**Manage Users** (Admin Only)  
**Description** - Admin can view, edit, or delete any user account (landlord, tenant).   
**Access Level** - Admin   
**Notes** - CRUD operations on user data.

**Logout**   
**Description** - Clear cookie/session and redirect to homepage.  
**Access Level** - Landlord, Tenant, Admin  
**Notes** - Important for secure session management.
