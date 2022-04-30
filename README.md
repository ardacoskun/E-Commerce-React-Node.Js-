
### ****📲 About****

   This is the final project of the OSF Backend Academy. E-commerce site made by using React,Node.js and Rest Api.

## 🌏 Check out [ demo](https://ardacoskun-alibazon.herokuapp.com/)

---

### 🔎 Technologies

- Node.js
- Express
- React
- Bootstrap
- Sentry
- Stripe
- Jest
- Axios
---


## ✨ Main Features

- All Endpoints 
- Programming Language: Javascript
- Framework: Node.js/Express.js
- Database Engine: None
- Data Manipulation: Rest API
- Error Tracking: Sentry
- Deploy: Heroku
- Unit Testing
- MVC Pattern

---
## ✨ Extra Features

- Authentication(SignUp/Login/Logout)
- Product Search 
- Product Variations
- Profile Page
- Shopping Cart
- Wishlist
- Payment Screen 


---

## ⚙️****Installation****

1. Clone this repo, install dependencies.

```makefile
gh repo clone https://github.com/ardacoskun/OSF-Academy-Final-Project.git
npm install
cd frontend
npm install 
```

2- Create .env file like;

```makefile
PORT = <port number>
BASE_URL = <OSF Academy Base Url>
SECRET_KEY = <OSF Academy Secret Api Key>
STRIPE_KEY = <STRIPE API KEY>
```
3- cd frontend 
```makefile
React_App_STRIPE_KEY = <REACT_STRIPE API KEY>


```

4- Build and run project;

```makefile
npm run dev 
```
---
### ****🗺️ Project Files Map****

```makefile
osf
|--- frontend                              
|--- backend                                  
|     |--- controllers                         // Place where my controllers are stored                   
|     |      |--- authController.js            // Register, Login API's     
|     |      |--- cartController.js            // getCart, addItemToCart, removeItemFromCart, changeQuantityOfItem API's
|     |      |--- categoryController.js        // getRootCategories, getParentCategories, getParentSubCategories, getSubCategoryProducts, getSingleProduct, getAllCategories API's
|     |      |--- orderController.js           // payment, getOrders, createOrder API's
|     |      |--- wishlistController.js        // getWishlist, addItemToWishList, removeItemFromWishlist, changeQuantityOfWishlistItem API's.    
|     |--- errors                          
|     |      |--- badrequestError.js           // Error class which extends customApiError class with status code 400
|     |      |--- customApiError.js            // error class which extends Error 
|     |      |--- isNotAvailableError.js       // error class which extends customApiError class with status code 404
|     |      |--- notfoundError.js             // error class which extends customApiError class with status code 404
|     |      |--- outOfStockError.js           // error class which extends customApiError class with status code 401 
|     |      |--- unauthorizedError.js         // error class which extends customApiError class with status code 401
|     |--- middleware                     
|     |      |--- authorizeCheck.js            // This middleware checks for if token exists
|     |      |--- errorHandler.js              // This middleware catches the errors 
|     |      |--- notFound.js                  // This middleware checks 
|     |--- routes
|     |      |--- authRoutes.js                // This route defines the way auth client requests by the application endpoints.
|     |      |--- cartRoutes.js                // This route defines the way cart client requests by the application endpoints.
|     |      |--- categoryRoutes.js            // This route defines the way category/products client requests by the application endpoints.
|     |      |--- orderRoutes.js               // This route defines the way order client requests by the application endpoints.
|     |      |--- stripeRoutes.js              // This route defines the way payment client requests by the application endpoints.
|     |      |--- wishlistRoutes.js            // This route defines the way wishlist client requests by the application endpoints.         
|     |--- services                          
|     |      |--- CartServices.js              // Business logics about carts used in this service.
|     |      |--- CategoryServices.js          // Business logics about category/products used in this service..
|     |      |--- OrderServices.js             // Business logics about order used in this service.
|     |      |--- ProfileServices.js           // Business logics about profile used in this service.
|     |--- server.js                            
|--- .gitignore                            
|--- package-lock.json                     
|--- package.json                          
```

---
## ⚙️****Screenshots****

![Ekran Alıntısı1](https://user-images.githubusercontent.com/92170066/166089350-4c15ff8f-0d26-4e10-bd5c-1ecd7ab798d3.PNG)
![Ekran Alıntısı2](https://user-images.githubusercontent.com/92170066/166089356-fb48f696-54be-4bf1-b347-3bc04c1fdee7.PNG)
![Ekran Alıntısı3](https://user-images.githubusercontent.com/92170066/166089358-0ea1bb2c-a674-4f2f-807a-dce0a30cbe63.PNG)
![Ekran Alıntısı4](https://user-images.githubusercontent.com/92170066/166089361-bd7e6bda-8a4a-4051-8ba8-2937961af2f9.PNG)


---

### 📩 Contact

Arda Coşkun
[Linkedin](https://www.linkedin.com/in/mardacoskun/)

