# FitMeals
#### CSC309 Team Project - team14
Priyanshu Arora, Aidan Brasseur, Saeyon Sivakumaran

## Table of Contents
1. [Features of FitMeals](#features-of-fitmeals)
2. [Instructions](#instructions)
3. [Login Credentials](#login-credentials)
4. [Third Party Libraries](#third-party-libraries)

## Features of FitMeals
FitMeals is a platform for users to access and post healthy recipes. Users have the ability to create recipes, comment on recipes, rate recipes and more...

### Viewing Recipes
- On the home page, there is a list of featured recipes that the user can click on
- Each recipe contains the author's information, recipe rating, picture, ingredients, instructions and comments
  - To see the author's profile, click on their avatar at the top of the page
  - To save the recipe, see [Saved Recipes Page](#saved-recipes-page)
  - To comment, see [Posting Comments](#posting-comments)

### Posting Recipes
- Navigate to the new recipe page
  - This link can be found on the home page under the categories (you must be logged in to submit a new recipe)
- Enter information (title, description, image, ingredients, instructions)
- Click submit and the recipe will be publicly available once approved by an admin

### Posting Comments
- Navigate to the recipe you want to comment on
- Scroll to the comments section at the bottom 
- Type your comment in the text area and click the "Add Comment" button (you must be logged in)

### Approving/Rejecting Recipes
- Navigate to the admin page
  - Click on the profile icon in the top-right of the webpage, and select the "Admin Page" (you must be logged in as an admin to see this)
- Find the recipe you wish to approve/reject and click the corresponding button
  - Green Checkmark: Approve
  - Red 'X': Reject

### Editing Recipes
- Admins have the option to edit existing recipes and change information as required
- Navigate to the admin page
  - Click on the profile icon in the top-right of the webpage, and select the "Admin Page" (you must be logged in as an admin to see this)
- Find the recipe you wish to edit, click on it and you will be brought to the edit page of the recipe
  - Once done, click the "Update and Approve" button at the bottom of the page

### Profile Page
- Each user has a profile page, where we can see their information and recipes they created
  - Information includes name, username and their average rating

### Saved Recipes Page
- Users have an option to save recipes to their saved recipes list for easy access later
- The saved recipes page can be accessed by clicking on the profile icon in the top-right of the webpage and then selecting the "Saved Recipes" link
- To save a recipe, navigate to the recipe and click on the heart symbol to the right of the rating (you must be logged in to save a recipe)
  - Once you click the heart, it will fill - an indication that the recipe is now saved
  - If the heart is already filled, that means you already have it saved
- To unsave a recipe, click on the filled heart and it will unfill - an indication that the recipe is no longer saved

### Category Filtering
- Each recipe has at least one category/tag and users will have the option to filter the website's recipes by these categories
- We currently have the user interface for this at the beginning of the home page, but we are planning on doing this sorting in our backend and therefore, this functionality
is not implemented for Phase 1

### Recipe Search
- At the top of FitMeals, there is a search bar that will let the user search the website for recipes based on their input
- We currently have the search bar, but we are planning on doing the search in our backend and therefore, this functionality is not implemented for Phase 1

### Ban Users
- Admins have the ability to ban users by navigating to their profile and clicking the "Ban User" button
  - As the button will require backend functionality, the button is available but has not functionality for Phase 1

## Instructions
FitMeals is powered by React and uses Yarn to manage dependencies and launch the application.
- Open the project and run `yarn install` to install all the required dependencies for the web application
- Once you have completed installing all dependencies, run `yarn start` to bring up FitMeals in your browser
  - The application will run at http://localhost:3000 in your browser

## Login Credentials
| User | Admin |
|------|-------|
| Email: user@user.com | Email: admin@admin.com |
| Password: user | Password: admin |

## Third Party Libraries
- React
- Yarn
- React Router DOM
- Ant Design and Ant Design Icons
- React Minimal Pie Chart
- Framer Motion
