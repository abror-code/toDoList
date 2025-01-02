document.addEventListener("dblclick", (e)=> {
    document.documentElement.requestFullscreen(); 
})


//Untuk memuncukan container add task
const addShow = document.getElementById("add-show");
const addContainer = document.getElementById("add-container");
const dark = document.getElementById("dark");

addShow.addEventListener("click", function(){
    addContainer.style.display = "block";
    dark.style.display = "block"
})


//Menambah task
let taskList = [];
const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task")

addTask.addEventListener("click", function(e){
    const divTask = document.createElement("div");
    divTask.setAttribute("class", "task");
    divTask.setAttribute("data-tindex", `${taskList.length}`)

    divTask.innerHTML =`
                        <input type="checkbox">
                        <p>${inputTask.value}</p>`

    taskList.push(divTask);

    inputTask.value = "";
    addContainer.style.display = "none";
    dark.style.display = "none";

    
    displayTask();

    //Completed Task
    const taskCheck = divTask.querySelector(`input[type="checkbox"]`);
    taskCheck.addEventListener("click", function(){
        if(taskCheck.checked == true){
            completedList.push(divTask.dataset.tindex);
            // delete taskList[divTask.dataset.tindex];
            console.log(divTask.dataset.tindex)
            
        }else{
            console.log(divTask.dataset.tindex)
            delete completedList[completedList.indexOf(divTask.dataset.tindex)];
            completedList = completedList.filter(function(item){
                return item != undefined;
            })
        }
        displayTask();
    })
})

//Completed Task
let completedList = [];
const todayTask = document.getElementById("today-task");
const completedTask = document.getElementById("completed-task");


//Display task
function displayTask(){
    completedTask.innerHTML = "";
    todayTask.innerHTML = "";

    for(let i = 0; i < taskList.length; i++){
        if(completedList.includes(taskList[i].dataset.tindex)){
            completedTask.appendChild(taskList[i]);
        }else{
            todayTask.appendChild(taskList[i]);
        }
    }
}


//change or add category
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


//Untuk display none
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
