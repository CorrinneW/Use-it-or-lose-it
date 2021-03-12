//initialize query selectors
//navbar and links
const navbar = document.querySelector('#navbar');
const homeLink = document.querySelector('#home');
const recipesLink = document.querySelector('#recipes');
const mealsLink = document.querySelector('#meals')
const groceryLink = document.querySelector('#groceries')
//input and button to add pantry items
const userInput = document.querySelector('#user-input');
const addBtn = document.querySelector('#add-btn');
//user pantry
const pantryContainer = document.querySelector('#pantry-container');

//dynamically created
let userItem;
let pantryItem;
let deleteBtn;

//buttons
const clearBtn = document.querySelector('#clear-btn');
const getRecipes = document.querySelector('#get-recipes');

//API
const apiBaseUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
const apiKey = "3bf0573f77794a1fbc310965fd52f563";
const numResults = 5;

//nav links - add locations when available
homeLink.addEventListener('click', function () {
    location.pathname = '/Meal-Plan/index.html'
});
recipesLink.addEventListener('click', function () {
    location.pathname = '#'
});
mealsLink.addEventListener('click', function () {
    location.pathname = '#'
});
groceryLink.addEventListener('click', function () {
    location.pathname = '#'
});

//initialize localStorage for userItems
const itemArr = JSON.parse(localStorage.getItem('userItem')) || [];

window.onload = function () {
    itemArr.forEach(item => {
        //add pantryItem to pantryContainer
        pantryItem = document.createElement('div');
        pantryItem.className = "pantry-item";
        pantryContainer.appendChild(pantryItem);
        //create and style deleteBtn
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = "X";
        let pantryText = document.createElement('p');
        pantryText.innerHTML = item;
        pantryItem.appendChild(pantryText);
        pantryItem.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', function () {
            //removes item from local storage  
            let target = itemArr.indexOf(pantryText.innerHTML);
            itemArr.splice(target, 1);
            localStorage.setItem('userItem', JSON.stringify(itemArr));
            //removes item from pantryContainer        
            pantryText.remove();
            deleteBtn.remove();
        });
    });
}

//generate userItem, push to itemArr, set to local Storage. generate pantryItem div w/ userItem and deleteBtn.
addBtn.addEventListener('click', function (event) {
    event.preventDefault();
    userItem = userInput.value;
    // reset the input to be blank
    userInput.value = "";
    itemArr.push(userItem);
    localStorage.setItem('userItem', JSON.stringify(itemArr));
    //creates div for each userItem and adds it to pantryContainer
    //add pantryItem to pantryContainer
    pantryItem = document.createElement('div');
    pantryContainer.appendChild(pantryItem);
    //create and style deleteBtn
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = "X";
    let pantryText = document.createElement('p');
    pantryText.innerHTML = userItem;
    pantryItem.appendChild(pantryText);
    pantryItem.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function () {
        //removes item from local storage
        let target = itemArr.indexOf(pantryText.innerHTML);
        itemArr.splice(target, 1);
        localStorage.setItem('userItem', JSON.stringify(itemArr));
        //removes item from pantryContainer       
        pantryText.remove();
        deleteBtn.remove();
    });
});

//clearBtn removes all pantryItems
clearBtn.addEventListener('click', function () {
    pantryContainer.innerHTML = '';
    localStorage.removeItem('userItem');
    // console.log(itemArr);
    for (var i = 0; i < itemArr.length; i++) {
        itemArr.pop();
    }
    // console.log(itemArr);
});

//getRecipes takes user to recipe page (fill in path when available)
getRecipes.addEventListener('click', function () {
    // location.pathname = '#';
    // itemArr = ["chicken", "onion", "garlic"];
    let queryString = itemArr.join(",+");
    console.log(queryString);

    fetch(apiBaseUrl + queryString + "&number=" + numResults + "&apiKey=" + apiKey)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    // pantryItems = data;
                    localStorage.setItem("pantryItems", JSON.stringify(data));
                    // Take user to recipes page

                    // location.pathname = '#';

                    location.pathname = './assets/html/recipe-results.html';

                })
            } else {
                // This is for testing purposes
                alert("There was an error with API, please try again.");
            }
        })
});