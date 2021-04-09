# FitMeals
#### CSC309 Team Project - team14
Priyanshu Arora, Aidan Brasseur, Saeyon Sivakumaran

## Table of Contents
1. [Features of FitMeals](#features-of-fitmeals)
2. [Instructions for Accessing FitMeals](#instructions-for-accessing-fitmeals)
3. [API Documentation](#api-documentation)
4. [Login Credentials](#login-credentials)
5. [Changes From Initial Proposal and Phase 1](#changes-from-initial-proposal-and-phase-1)
6. [Third Party Libraries](#third-party-libraries)

## Features of FitMeals
FitMeals is a platform for users to access and post healthy recipes. Users have the ability to create recipes, comment on recipes, rate recipes and more...

### Login and Registration Functionality 

#### Logging In to FitMeals 
- Navigate to the login page where you can enter your credentials
  - Hover over the user icon in the top right corner of the home page and click login 
  - If you wish to use a pre-existing account, see [Login Credentials](#login-credentials)
- To remember your login information for future use, make sure the "Remember me" checkbox is ticked

#### Reset Password
- If you have forgotten your password, you can click on the "Forgot password?" button on the login page
- You will receive an email with a link to the FitMeals reset password page, where you can submit a new password
  - Please note that you have only 10 minutes after the email is sent to reset your password before your link expires
  - As the "user" and "admin" users have fake emails, please create your own account with a valid email to view this functionality

#### Creating a New Account
- To create a new account, click the "Get Started" button on the login page
- On the registration page, enter the required information and click the register button
- If you navigated to this page accidentally, click the "Back" button at the top of the page

### Viewing Recipes on the Home Page
- On the home page, there is a list of approved recipe previews that the user can click on. The preview shows the recipe's title, categories, subtitle, total prep time, rating, and calories per serving. 
- You can search for recipes at the top right-hand corner of the home page. The search will find your text in the recipe title, subtitle, description, and categories, and display the recipes that match your search. 
- You can also filter recipes by selecting the category cards on the home page. You can select multiple categories as well as de-select them.  

### Viewing Detailed Recipes
- Clicking on a recipe preview card will take you to a detailed recipe page. This page contains the author's full name, profile image, recipe title, recipe description, recipe prep time, recipe rating, pictures, ingredients, instructions, macronutrient information, and comments. 
- You can click on any image to expand it. 
- To see the author's profile, click on their avatar at the top of the page, see [Viewing a user's profile](#viewing-a-user's-profile)
- If you are logged in then you have access to the following features:
  - To save the recipe click on the bookmark icon at the top of the page, see [Saving Recipes](#saving-recipes)
  - To view comments and submit your own, scroll to the bottom of the page below the instructions, see [Posting Comments](#posting-comments)
  - To rate the recipe, click on one of the 5 stars, see [Rating Recipes](#rating-recipes)
  - If the recipe is your own, you can delete it by clicking on the garbage can at the top right hand corner, see [Deleting Your Own Recipes](#deleting-your-own-recipes)

### Viewing a User's Profile
- To view a user's profile, you can click on the user's icon. This icon can be found on a detailed recipe page at the top near the title, or you can click on any icon on the comments section of a detailed recipe page, which is located at the bottom of the page. 
- Clicking on this icon will bring you to the user's profile page with their full name, username, average rating for their posted recipes, and their posted recipes listed, which you can also view by clicking on the recipe previews. 
- You can also use the search bar at the top of the page to search through their recipes similar to the home page. 
- If this user is not you, then you will be able to see the user's approved recipes. 
- If the user is you, then you will be able to see all your recipes including the ones that are rejected or pending. If you click on the recipe, the detailed recipe page will tell you if the recipe is under review or rejected. If it has been approved, it will just show you the normal detailed recipe page as everyone else can see. 

### Rating Recipes
- Note: you must be logged in to access this feature. 
- To rate any recipe, navigate to the recipe's detailed recipe page by clicking on the recipe's preview card from either the home page or on a user's profile page. 
- Click on one of the 5 stars at the top of the page. 
- If you refresh the page you will see that the average rating will be updated and your rating for the recipe will be displayed on the same stars you clicked on. You can change your rating at any time. 

### Saving Recipes
- Note: you must be logged in to access this feature. 
- Users have the option to save recipes to their saved recipes list for easy access later
- The saved recipes page can be accessed by hovering over your profile icon in the top-right of the webpage and then selecting the "Saved Recipes" link. You can search through your saved recipes in the same way as the home page search. 
- To save a recipe, navigate to a recipe's detailed recipe page by clicking on the recipe's preview card on the home page or on a user's profile page and click on the bookmark symbol to the right of the rating. 
  - Once you click the bookmark, it will fill - an indication that the recipe is now saved. 
  - If the bookmark is already filled, that means you already have it saved. 
  - You will be able to see this saved recipe on your saved recipe page. 
- To unsave a recipe, click on the filled bookmark and it will unfill - an indication that the recipe is no longer saved. 

### Posting Comments
- Note: You must be logged in to access this feature. 
- Navigate to a recipe's detailed recipe page. 
- Scroll to the comments section at the bottom 
- Type your comment in the text area and click the "Add Comment" button. 
- Your comment will appear at the bottom of the comments list. 

### Deleting Your Own Recipes
- Note: You must be logged in to access this feature. 
- Navigate to one of your recipe's detailed recipe page. 
- You can click on the garbage can at the top right of the page, which will delete the recipe forever. 

### Viewing Your Own Profile Page
- Note: You must be logged in to access this feature. 
- You can hover over the user icon on the top right corner of the home page and click on profile page. 
- You will be able to see your username, full name, and average rating across all of your approved recipes
- You will be able to see all your recipes including the ones that are rejected or pending. If you click on the recipe, the detailed recipe page will tell you if the recipe is under review or rejected. If it has been approved, it will just show you the normal detailed recipe page as everyone else can see. 

### Editing Your Profile
- Note: You must be logged in to access this feature. 
- You can hover over the user icon on the top right corner of the home page and click on account settings.
- Here you can edit your profile image, username, full name, email, and change your password.  

### Creating a Recipe
- Note: You must be logged in to access this feature. 
- Click on the Add New Recipe button below the categories on the home page. This will take you to the add new recipe page. 
- Here you can fill in all the details of your recipe. Title, subtitle, and description are required. At least one instruction, one category, and one ingredient are required as well. You can upload a main image, and images for each instruction. The main image is required, but the instruction images are optional. 
	- You can also add macronutrients, but these are not required. Admins will be required to verify or fill this section in. 

### Admin Functionality
These features are only available to admin users. Admins have all the functionality of normal users as well. 

#### Approving/Rejecting Recipes
- Note: you must be logged in as an admin to access this feature. 
- Navigate to the admin page by hovering over the user icon on the top right corner of the homepage and click on admin page.  
- Find the recipe you wish to approve/reject and click the corresponding button
  - Green Checkmark: Approve
  - Red 'X': Reject
- If you would like to see more details about the recipe or edit the recipe, you can click on the preview. This will take you to a detailed recipe page where you can edit any field necessary. You can then click approve or reject at the bottom of the page. Note that the macro nutrients must be filled in to approve a recipe.  

#### Ban Users
- Note: you must be logged in as an admin to access this feature. 
- Admins have the ability to ban users by navigating to their profile and clicking the "Ban User" button. You can navigate to anyone's profile by clicking on their user icon. 
- The user will still be able to login and create recipes, but no one will be able to view their recipes. There will also be a banned status on the banned user's profile page. 

#### Promote Users
- Admins have the ability to promote regular users to admins by navigating to their profile and clicking the "Promote User" button

#### Deleting Any Recipe as an Admin
- Note: you must be logged in as an admin to access this feature. 
- Admins can navigate to _any_ detailed recipe page and click on the garbage icon on the top right corner. This will delete the recipe forever. 

## Instructions for Accessing FitMeals

### Online access
FitMeals is currently being hosted on Heroku and can be accessed with the following URL: https://csc309-team14-fitmeals-website.herokuapp.com/

**Note:**
As FitMeals is currently under Heroku's free plan, the website may take a longer time than usual to load when it has not been accessed in a while.

### Offline access
FitMeals is powered by React and uses Yarn to manage dependencies and launch the application.
- Open the project and run `yarn install` to install all the required dependencies for the web application
- Once you have completed installing all dependencies, run `yarn start` to bring up FitMeals in your browser
  - The application will run at http://localhost:3000 in your browser

## API Documentation
Our API is hosted on Heroku at the following URL: https://csc309-team14-fitmeals-api.herokuapp.com/

The full documentation for our API was created using Postman and can be found at the following link: [API docs](https://documenter.getpostman.com/view/15303556/TzCTa5pU)

## Login Credentials
| User | Admin |
|------|-------|
| Username: user | Username: user |
| Password: user | Password: admin |

## Changes From Initial Proposal and Phase 1
Our core vision for the application throughout this process has remained consistent, but there were a few additional features and changes we decided to implement for phase 2. 

-   **Forgot Password:**  
	If a user forgets their password, they now have the ability to request an email to be sent to them, providing a temporary link that allows them to change their password securely.
    
-   **Remember Login:**  
	If the user selects the Remember Me checkbox when logging in, the website will keep the user logged in even if they refresh the page.
	
-   **Account Settings:**  
We decided to add a dedicated account settings page which allows users to view their account information, and change their profile image, full name, email, and password. 
   
-   **Removal of Third Party Nutrition API:**
We originally had plans to integrate a third-party API that would estimate calories based on the ingredients that were input by the user. As we began development, we realized that using the API in this way would greatly limit our flexibility regarding ingredient input. We instead decided to allow the user to directly input nutrition info if so desired, and our expert nutritionist admins can override this nutrition info prior to approval.

## Third Party Libraries
#### Frontend
- React
- Yarn
- React Router DOM
- Ant Design and Ant Design Icons
- React Minimal Pie Chart
- Framer Motion

#### Backend
- Express
- Mongoose
- CORS
- UUIDv4
- bcrypt
- Nodemailer
- Connect-Multiparty
- Cloudinary
