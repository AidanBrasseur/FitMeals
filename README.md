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

### Login and Registration Functionality

#### Logging In to FitMeals 
- Navigate to the login page where you can enter your credentials
  - Hover over the user icon the top right corner of the home page and click login 
  - If you wish to use a pre-existing account, see [Login Credentials](#login-credentials)
- To remember your login information for future use, make sure the "Remember me" checkbox is ticked

#### Reset Password
- If you have forgotten your password, you can click on the "Forgot password?" button on the login page
- You will recieve an email with a link to FitMeals reset password page, where you can submit a new password
  - Please note that you have only 10 minutes after the email is sent to reset your password before your link expires

#### Creating a New Account
- To create a new account, click the "Get Started" button on the login page
- On the registration page, enter the required information and click the register button
- If you navigated to this page accidentally, click the "Back" button at the top of the page

### Viewing Recipes on the Home Page
- On the home page, there is a list of approved recipe previews that the user can click on. The preview shows the recipe's title, categories, subtitle, total time prep time, rating, and calories per serving. 
- You can search for recipes on the top right hand corner of the home page. The search will find your text in any part of any recipe(title, subtitle, description, and categories) and display the recipes that match you search. 
- You can also filter recipes by selecting the category cards on the home page. You can select multiple categories as well as de-select them.  

### Viewing detailed recipes
- Clicking on a recipe preview card will take you to a detailed recipe page. This page contains the author's full name, recipe rating, pictures, ingredients, instructions, macronutrient information, and comments. 
- You can click on any image to expand it. 
- To see the author's profile, click on their avatar at the top of the page, see [Viewing a user's profile](#viewing-a-user's-profile)
- If you are logged in then you have access to the following features:
  - To save the recipe click on the bookmark icon at the top of the page, see [Saving Recipes](#saving-recipes)
  - To view comments and submit your own, scroll to the bottom of the page below the instructions, see [Posting Comments](#posting-comments)
  - To rate the recipe, click on one of the 5 stars, see [Rating Recipes](#rating-recipes)
  - If the recipe is your own, you can delete it by clicking on the garbage can at the top right hand corner, see [Deleting Your Own Recipes](#deleting-your-own-recipes)



### Viewing a user's profile
- To view a user's profile you can click on the user's icon. This icon can be found on a detailed recipe page at the top near the title, or you can click on any icon on the comments section of a detailed recipe page, which is located at the bottom of the page. 
- Clicking on this icon will bring you to the user's profile page with their full name, username, average rating for their posted recipes, and their posted recipes listed, which you can also view by clicking on any. 
- You can also use the search bar at the top of the page to search through their recipes similar to the home page. 
- If this user is not you, then you will be able to see the user's approved recipes. 
- If the user is you then you will be able to see all your recipes including the ones that are rejected or pending. If you click on the recipe, the detailed recipe page will tell you if the recipe is under review or rejected. If it has been approved it will just show you the normal detailed recipe page as everyone else can see. 

### Rating Recipes
- Note: you must be logged in to access this feature. 
- To rate any recipe, navigate to the recipe's detailed recipe page by clicking on the recipe's preview card from either the home page or on a user's profile page. 
- Click on one of the 5 stars at the top of the page. 
- If you refresh the page you will see that the average rating will be updated and your rating for the recipe will be displayed on the same stars you clicked on. You can change your rating any time. 

### Saving Recipes
- Note: you must be logged in to access this feature. 
- Users have an option to save recipes to their saved recipes list for easy access later
- The saved recipes page can be accessed by hovering over your profile icon in the top-right of the webpage and then selecting the "Saved Recipes" link. You can search throught your saved recipes int the same was as the home page search. 
- To save a recipe, navigate to a recipe's detailed recipe page by clicking on the recipe's preview card on the home page or on a user's profile page and click on the bookmark symbol to the right of the rating. 
  - Once you click the bookmark, it will fill - an indication that the recipe is now saved. 
  - If the heart is already filled, that means you already have it saved. 
  - You will be able to see this saved recipe on you saved recipe page. 
- To unsave a recipe, click on the filled bookmark and it will unfill - an indication that the recipe is no longer saved. 

### Posting Comments
- Note: You must be logged in to access this feature. 
- Navigate to a recipe's detailed recipe page. 
- Scroll to the comments section at the bottom 
- Type your comment in the text area and click the "Add Comment" button. 
- Your comment will appear at the bottom of the comments list. 

### Deleting your own recipes
- Note: You must be logged in to access this feature. 
- Navigate to one of your recipe's detailed recipe page. 
- You can click on the garbage can at the top right of the page, which will delete the recipe forever. 

### Admin Functionality
These features are only available to admin users

#### Approving/Rejecting Recipes
- Navigate to the admin page
  - Click on the profile icon in the top-right of the webpage, and select the "Admin Page"
- Find the recipe you wish to approve/reject and click the corresponding button
  - Green Checkmark: Approve
  - Red 'X': Reject

#### Ban Users
- Admins have the ability to ban users by navigating to their profile and clicking the "Ban User" button
  - As the button will require backend functionality, the button is available but has not functionality for Phase 1



### Posting Recipes
- Navigate to the new recipe page
  - This link can be found on the home page under the categories (you must be logged in to submit a new recipe)
- Enter information (title, description, image, ingredients, macros, instructions)
- Click submit and the recipe will be publicly available once approved by an admin


### Editing Recipes
- Admins have the option to edit existing recipes and change information as required
- Navigate to the admin page
  - Click on the profile icon in the top-right of the webpage, and select the "Admin Page" (you must be logged in as an admin to see this)
- Find the recipe you wish to edit, click on it and you will be brought to the edit page of the recipe
  - Once done, click the "Update and Approve" button at the bottom of the page

### Profile Page
- Each user has a profile page, where we can see their information and recipes they created
  - Information includes name, username and their average rating




## Instructions
FitMeals is powered by React and uses Yarn to manage dependencies and launch the application.
- Open the project and run `yarn install` to install all the required dependencies for the web application
- Once you have completed installing all dependencies, run `yarn start` to bring up FitMeals in your browser
  - The application will run at http://localhost:3000 in your browser

## Login Credentials
| User | Admin |
|------|-------|
| Username: user | Username: user |
| Password: user | Password: admin |

## Third Party Libraries
- React
- Yarn
- React Router DOM
- Ant Design and Ant Design Icons
- React Minimal Pie Chart
- Framer Motion
