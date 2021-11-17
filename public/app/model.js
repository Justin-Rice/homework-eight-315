var MODEL = (function(){
    var _changePage = function(pageName, callback){
        $.get(`pages/${pageName}/${pageName}.html`, function(data){
            //console.log(data)
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

 var _yourRecipe = function(){
  // $.getJSON("data/data.json", function(recipes){

    $.each(USER_RECIPES, function(index, recipe){
        //console.log(recipe.recipeImage)
        console.log(recipe);
        console.log(recipe.recipeName)
        $("#your-flex").append(`
       <div class="flex">
        <div class="recipe">
        <div class="recipe__image" style="
        background-image: url(../img/${recipe.recipeImage});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;">
        <div class="button" id="${index}" onclick="viewRecipe(${index})">View
        </div>
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
      <div class="button" id="edit" onclick="editRecipe(${index})">Edit</div>
      <div class="button" id="delete" onclick="deleteRecipe(${index})">Delete</div>
      </div>
    </div>
      
        `)
      // $("#your-flex").append(`<p class="pain" >pain</p>`)
      //console.log("wacj")


    });
  // });

    
    


 }

    return {
        changePage : _changePage,
        yourRecipe : _yourRecipe,
        loadBrowse: _loadBrowse,

    }

})();