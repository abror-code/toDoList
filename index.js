document.addEventListener("dblclick", (e)=> {
    document.documentElement.requestFullscreen(); 
})

const addShow = document.getElementById("add-show");
const addContainer = document.getElementById("add-container");
const dark = document.getElementById("dark");

addShow.addEventListener("click", function(){
    addContainer.style.display = "block";
    dark.style.display = "block"
})


const changeCategory = document.getElementById("change-container");

categoryContainer = document.querySelector("#change-container div");


changeCategory.addEventListener("click", function(){
    categoryContainer.style.display = "flex";
})


const category = document.querySelectorAll("#change-container div div");

category.forEach(function(i){
    i.addEventListener("click", function(e){
        e.stopPropagation();
        if(i.getAttribute("id") != "create-category"){
            document.querySelector("#change-container span").innerHTML = i.innerText;
        }
        categoryContainer.style.display = "none";
    })
})


const addCategory = document.getElementById("create-category");
const createCategoryContainer = document.getElementById("create-category-container");
const cancelCreateCategory = document.querySelector("#create-category-container div .cancel");

cancelCreateCategory.addEventListener("click", function(){
    createCategoryContainer.style.display = "none";
})

addCategory.addEventListener("click", function(){
    createCategoryContainer.style.display = "block";
})

document.addEventListener("click", function(e){
    if(createCategoryContainer.style.display == "none"){
        if(!addContainer.contains(e.target) && e.target != addShow){
            console.log(e.target)
            addContainer.style.display = "none";
            dark.style.display = "none"
        }
    
        if(!changeCategory.contains(e.target)){
            categoryContainer.style.display = "none";
        }
    }else{
        if(!createCategoryContainer.contains(e.target)){
            createCategoryContainer.style.display = "none";
        }
    }
})
