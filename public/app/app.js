var ingredNum = 4;
var instructNum = 4;
var loggedIn = false;

var IMAGES = ["recipe-pilaf.jpg","recipe-burger.jpg", "recipe-pizza.jpg","recipe-chowmein.jpg" ]

var USER_RECIPES = [
    {
        "recipeName": "Supreme Pizza",
        "recipeDescription": "Make Pizza night super duper out of this world wigth homemad pizza. this recipe is supreme with vegetables and two types of meat",
        "recipeImage": "recipe-pizza.jpg",
        "recipePrep": " 1h 24 min",
        "recipeServings": "4",
        "recipeIng": ["1/4 batch pizza dough", "2 tablespoons Last-Minute Pizza Sauce,", "1 cup cooked and crumbled Italian sausage", "2 large mushrooms, sliced" ],
        "recipeIns": ["Preheat the oven to 475°. Spray pizza pan with nonstick cooking or line a baking sheet with parchment paper.", "Flatten dough into a thin round and place on the pizza pan.", "Spread pizza sauce over the dough." ,"Layer the toppings over the dough in the order listed "]
      },
];



function viewRecipe(index){

  MODEL.changePage("view");
  setTimeout(function(){MODEL.loadView(index)}, 80);

}

function loadEditRecipe(index){
  
  MODEL.changePage("edit");
  setTimeout(function(){MODEL.loadEdit(index)}, 120);
  

}

function deleteRecipe(index) {
  USER_RECIPES.splice(index, 1)
  MODEL.changePage("your");
  setTimeout(function(){MODEL.loadYour(index)}, 120);
  
}

function submitEditRecipe(index){
  //console.log(index)

  var NEW_USER_RECIPES ={
    "recipeName": "",
    "recipeDescription": "",
    "recipeImage": "",
    "recipePrep": "",
    "recipeServings": "",
    "recipeIng": [],
    "recipeIns": []
  };
  var x = document.getElementById("editImg");
  var i = x.selectedIndex;
  //console.log(i);
  NEW_USER_RECIPES.recipeImage = IMAGES[i];
  NEW_USER_RECIPES.recipeName = $("#recipe-name1").val();
  NEW_USER_RECIPES.recipeDescription = $("#recipe-desc1").val();
  NEW_USER_RECIPES.recipePrep = $("#recipe-time1").val();
  NEW_USER_RECIPES.recipeServings = $("#recipe-serv1").val();
  //console.log(NEW_USER_RECIPES.recipeName)


  $(".addIng").map(function(){

    NEW_USER_RECIPES.recipeIng.push($(this).val())
   // console.log($(this).val());

  })
  $(".addIns").map(function(){
    NEW_USER_RECIPES.recipeIns.push($(this).val())


  })

  USER_RECIPES.splice(index,0, NEW_USER_RECIPES)
  USER_RECIPES.splice(index+1, 1 )
  
  //console.log(USER_RECIPES);

  MODEL.changePage("your",MODEL.loadYour);

}

function createRecipe(){
  

  var NEW_USER_RECIPES ={
    "recipeName": "",
    "recipeDescription": "",
    "recipeImage": "",
    "recipePrep": "",
    "recipeServings": "",
    "recipeIng": [],
    "recipeIns": []
  };


  var x = document.getElementById("createImg");
  var i = x.selectedIndex;
  //console.log(i);
  NEW_USER_RECIPES.recipeImage = IMAGES[i];
  
  NEW_USER_RECIPES.recipeName = $("#recipe-name").val();
  NEW_USER_RECIPES.recipeDescription = $("#recipe-desc").val();
  NEW_USER_RECIPES.recipePrep = $("#recipe-time").val();
  NEW_USER_RECIPES.recipeServings = $("#recipe-serv").val();
  //console.log(NEW_USER_RECIPES.recipeName)


  $(".addIng").map(function(){

    NEW_USER_RECIPES.recipeIng.push($(this).val())
   // console.log($(this).val());

  })
  $(".addIns").map(function(){
    NEW_USER_RECIPES.recipeIns.push($(this).val())
   // console.log($(this).val());

  })
  
  


  
  USER_RECIPES.push(NEW_USER_RECIPES);
  //console.log(USER_RECIPES);

  MODEL.changePage("your",MODEL.loadYour);

}



function route(){
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#/","");
    //pageID holds page name

    if(pageID === "view"){
      //MODEL.changePage("view", MODEL.loadView);


      }else if( !pageID){
        MODEL.changePage("home");
        

    }else if(pageID === "browse"){
        MODEL.changePage("browse", MODEL.loadBrowse);      

    }else if(pageID === "your"){
        MODEL.changePage("your",MODEL.loadYour);

    }else{
        MODEL.changePage(pageID);


    }


}
function initFirebase(){
    firebase
    .auth()
    .onAuthStateChanged(function(user){
        if(user){

            loggedIn = true;
            
            $("#logOut").css("display","block");
            $("#login").css("display","none");

            $("#recipe").css("display","block");
            $("#recipe-mobile").css("display","block");


            $("#logOut-mobile").css("display","block");
            $("#login-mobile").css("display","none");

            //console.log("user detected");
        }else{
            $("#login").css("display","block");
            $("#logOut").css("display","none");

            $("#logOut-mobile").css("display","none");
            $("#login-mobile").css("display","block");

            $("#recipe").css("display","none");
            $("#recipe-mobile").css("display","none");
            //console.log("user not there");
        }
    })

}
function createUser(){
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let email = $("#email").val();
    let password = $("#pw").val();

    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {

    $("#fName").val("");
    $("#lName").val("");
    $("#email").val("");
    $("#pw").val("");
    var user = userCredential.user;
    Swal.fire({
        background: "#ffd666",
        title: "Account Created",
        text: 'you have been logged in.',
        confirmButtonColor: '#A7E8BD'

      })

    //console.log("account created")
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    Swal.fire({
        background: "#ffd666",
        title: "Error",
        text: 'There has been an unexpected error in account creation',
        confirmButtonColor: '#F25C54'

      })
  });


}

function logInUser(){
    let email = $("#email-li").val();
    let password = $("#pw-li").val();
    
   // console.log("login");
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    $("#email-li").val("");
    $("#pw-li").val("");
    var user = userCredential.user;
    Swal.fire({
        icon: 'success',
        text: "You have successfully logged in.",
        background: "#ffd666" ,
        confirmButtonColor: '#A7E8BD'
      })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    Swal.fire({
        background: "#ffd666",
        title: "Error",
        text: 'There has been an unexpected error in Login.',
        confirmButtonColor: '#F25C54'

      })
  });

}
function signOut(){

    Swal.fire({
        text: "Are you sure you want to log out?",
        icon: 'warning',
        background: "#ffd666" ,
        showCancelButton: true,
        confirmButtonColor: '#A7E8BD',
        cancelButtonColor: '#F25C54',
        confirmButtonText: 'Yes, logout',
        customClass: {
            container: 'popup-back',
            popup: 'popup',
            header: 'head',

        }

      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            background: "#ffd666",
            text: 'You have been logged out.',
            confirmButtonColor: '#A7E8BD'

          })
          firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
          
        }
      })

}

function initlistener(){

 
    $(window).on("hashchange",route);
//when the hamburger menu is clicked, display the mobile nav
    $("nav .fa-bars").click(function(){
        $(".mobile-nav").css("display", "flex");
        $(".mobile-nav").css("animation", "nav-in 1s");
    });

    //when the background of a mobile nav is clicked, remove it
    $("body").on("click", ".mobile-nav", function(e) {
        $(".mobile-nav").css("animation", "nav-out 1s");
        setTimeout(() => {
            $(".mobile-nav").css("display", "none");
        }, 1000);
    });
    $("div#logIn").click(function(){createUser();});


    route();
}
function underlineActivePage(){
    $(".nav-buttons a").click(function(){
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });
    $(".mobile-nav a").click(function(){
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });
    
}

function addIngred(e){
    $(".ingredients").append(`
    <input class="addIng" id="ind${ingredNum}" type="text" placeholder="Ingredient #${ingredNum}" />
    `)

    ingredNum ++;  

}

function addInstruct(e){
    $(".instructions").append(`
    <input class="addIns" id="ind${instructNum}" type="text" placeholder="Instruction #${instructNum}" />
    `)

    instructNum ++;  

}


$(document).ready(function(){
    try{
        initFirebase();
        initlistener();
        underlineActivePage();
      //  browseRecipes();

        
        let app = firebase.app();
    }catch{
        console.log("gwa");
    }
    
})