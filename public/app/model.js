var MODEL = (function(){
    var _changePage = function(pageName, callback){
        $.get(`pages/${pageName}/${pageName}.html`, function(data){
           // console.log(data)
            $("#app").html(data);
            if(callback){
              callback();
    
            }
        });
        
    }

 var _loadBrowse = function(){
        $.getJSON("data/data.json", function(recipes){
            $.each(recipes.PUBLIC_RECIPES, function(index, recipe){
                //console.log(recipe.recipeImage)
                //console.log(recipe);
                $("#recipe-flex").append(`
                <div class="recipe">
        <div class="recipe__image" style="
        background-image: url(../img/${recipe.recipeImage});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;">
        </div>
        <div class="recipe__info">
          <div class="name">${recipe.recipeName}</div>
          <div class="description">${recipe.recipeDescription}</div>
          <div class="prep">
            <div class="time">
              <img src="../img/time.svg">
              <div class="time__info"> ${recipe.recipePrep}</div>
            </div>
            <div class="servings">
              <img src="../img/servings.svg">
              <div class="servings__info"> ${recipe.recipeServings} servings</div>
            </div>
          </div>
        </div>
      </div>
     `)
    });
  });
 }

 var _loadYour = function(){


    $.each(USER_RECIPES, function(index, recipe){
        //console.log(recipe.recipeImage)
        // console.log(recipe);
        $("#your-flex").append(`
       <div class="flex">
        <div class="recipe">
        <div class="recipe__image" style="
        background-image: url(../img/${recipe.recipeImage});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;">
        <a style="text-decoration: none; color: black;" "href="#/view">
        <div class="button" onclick="viewRecipe(${index})" id="${index}">View
        </div>
        </a>
        </div>
        <div class="recipe__info">
          <div class="name">${USER_RECIPES[index].recipeName}</div>
          <div class="description">${USER_RECIPES[index].recipeDescription}
          </div>
          <div class="prep">
            <div class="time">
              <img src="../img/time.svg">
              <div class="time__info"> ${USER_RECIPES[index].recipePrep}</div>
            </div>
            <div class="servings">
              <img src="../img/servings.svg">
              <div class="servings__info"> ${USER_RECIPES[index].recipeServings} servings
            </div>
          </div>
          </div>
        </div>
      </div>
      <div class="button-holder">
      <a style="text-decoration: none; color: black;"  href="#/edit">
      <div class="button" id="edit${index}" onclick="loadEditRecipe(${index})">Edit</div>
      </a>
      <div class="button" id="delete${index}" onclick="deleteRecipe(${index})">Delete</div>
      </div>
    </div>
      
        `)

    });

    
    


 }

 var _loadView =  function(index){
  $("#view-card").append(`
    
    <div class="top">
    <div class="header">
      <p>${USER_RECIPES[index].recipeName}</p>
      <div class="image" style="
      background-image: 
      url(../img/${USER_RECIPES[index].recipeImage});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      "
      ></div>
    </div>
    <div class="info">
      <h1>Description:</h1>
      <p>
      ${USER_RECIPES[index].recipeDescription}
      </p>
      <h2>Total Time:</h2>
      <p>      
      ${USER_RECIPES[index].recipePrep}
      </p>
      <h2>Servings:</h2>
      <p>     
       ${USER_RECIPES[index].recipeServings}
       servings</p>
    </div>
  </div>



  
  <div class="ingredients" >
    <h1>Ingredients:</h1>
    <ul id ="viewIngred">
      
    </ul>
  </div>
  <div class="instructions">
    <h1>Instructions:</h1>
    <ol id="viewInstruct">
    </ol>
  </div>
  <div class="button" onclick="editRecipe()">Edit Recipe</div>
  `)

  $.each(USER_RECIPES[index].recipeIng, function(indexs, ingred){
    $("#viewIngred").append(`
    <li>${ingred}</li>
   `)
  })

  $.each(USER_RECIPES[index].recipeIns, function(indexs, ins){
    $("#viewInstruct").append(`
    <li>${ins}</li>
   `)
  })
 }

 var _loadEdit = function(index){

 $(".form").append(`<div onclick="submitEditRecipe(${index})" class="edit-recipe" >Create Recipe</div>
  `);  
 }

    return {
        loadEdit   :  _loadEdit,
        changePage : _changePage,
        loadYour : _loadYour,
        loadBrowse: _loadBrowse,
        loadView : _loadView,

    }

})();