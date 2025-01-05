document.addEventListener("dblclick", (e)=> {
    document.documentElement.requestFullscreen(); 
})


//Untuk memuncukan container add task
const addShow = document.getElementById("add-show");
const addContainer = document.getElementById("add-container");
const dark = document.getElementById("dark");
let isAdd = true;

addShow.addEventListener("click", function(){
    addContainer.style.display = "block";
    dark.style.display = "block"

    isAdd = true;
})


let taskList = getLocalStorage("localTask") || [];
let completedList = getLocalStorage("localCompleted") || [];




//Menambah task
const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task")

addTask.addEventListener("click", function(e){
    if(isAdd){
        createTaskDiv(inputTask.value, taskList.length);
        taskList.push(inputTask.value);
    }else{
        taskList[whoOpenOption] = inputTask.value;
        taskDivList[whoOpenOption].querySelector("p").innerHTML = inputTask.value;
    }

    inputTask.value = "";
    addContainer.style.display = "none";
    dark.style.display = "none";
})

//Container task
const todayTask = document.getElementById("today-task");
const completedTask = document.getElementById("completed-task");

//Display task
function displayTask(){
    completedTask.innerHTML = "";
    todayTask.innerHTML = "";
    
    for(let i = 0; i < taskDivList.length; i++){
        if(taskDivList[i] == undefined) continue;
        
        if(completedList.includes(taskDivList[i].dataset.tindex)){
            const taskCheck = taskDivList[i].querySelector(`input[type="checkbox"]`);
            taskCheck.checked = true;
            completedTask.appendChild(taskDivList[i]);
        }else{
            todayTask.appendChild(taskDivList[i]);
        }
    }
}

const optionTask = document.getElementById("option-task");
let whoOpenOption;

//Membuat taskDiv
let taskDivList = [];
function createTaskDiv(value, index){
    const divTask = document.createElement("div");
    divTask.setAttribute("class", "task");
    divTask.setAttribute("data-tindex", `${index}`);
    
    divTask.innerHTML =`
    <input type="checkbox">
    <p>${value}</p>`
    
    taskDivList.push(divTask);

    // Completed Task
    const taskCheck = divTask.querySelector(`input[type="checkbox"]`);
    taskCheck.addEventListener("click", function(){
        if(taskCheck.checked == true){
            completedList.push(divTask.dataset.tindex);
        }else{
            delete completedList[completedList.indexOf(divTask.dataset.tindex)];
            completedList = completedList.filter(function(item){
                return item != undefined;
            })
        }
        displayTask();
    })

    //Show Option Task
    divTask.addEventListener("click", function(e){
        if(e.target !== taskCheck){
            optionTask.style.display = "flex";
            optionTask.style.top = `${e.clientY}px`;
            optionTask.style.left = `${e.clientX}px`;
            console.log("clicked")

            whoOpenOption = divTask.dataset.tindex;
        }else{
            console.log("Not clicked")
        }
    })

    displayTask();
}


//create taskDiv pertama kali
for(let i = 0; i < taskList.length; i++){
    createTaskDiv(taskList[i], i);
}

//Option Task
const deleteTask = document.getElementById("delete-task");
const editTask = document.getElementById("edit-task");

deleteTask.addEventListener("click", function(){
    optionTask.style.display = "none";
    delete taskDivList[whoOpenOption];

    delete taskList[whoOpenOption];
    if(completedList.includes(whoOpenOption)){
        delete completedList[completedList.indexOf(whoOpenOption)];
        completedList = completedList.filter(function(item){
            return item != undefined;
        })
    }

    displayTask();
})

editTask.addEventListener("click", function(){
    addContainer.style.display = "block";
    dark.style.display = "block";
    optionTask.style.display = "none";
    isAdd = false;
})

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
    function checkTarget(i){
        return !i.contains(e.target);
    }

    if(createCategoryContainer.style.display == "none"){
        if(!addContainer.contains(e.target) && e.target != addShow && e.target !=editTask){
            addContainer.style.display = "none";
            dark.style.display = "none"
        }
    
        if(!changeCategory.contains(e.target)){
            categoryContainer.style.display = "none";
        }

        if(!optionTask.contains(e.target) && taskDivList.every(function(i){
            return !i.contains(e.target);
        })){
            optionTask.style.display = "none";
        }
    }else{
        if(!createCategoryContainer.contains(e.target)){
            createCategoryContainer.style.display = "none";
        }
    }
})

//Untuk menyimpan data
function getLocalStorage(key){
    if(localStorage.getItem(key) != null && localStorage.getItem(key) != undefined){
        
        return JSON.parse(localStorage.getItem(key));
    }

    return null;
}
//Untuk menyimpan data
addEventListener("beforeunload", function(e){
    
    taskDivList = taskDivList.filter(function(item){
        return item != undefined;
    })
    taskList = taskList.filter(function(item){
        return item != undefined;
    })

    window.localStorage.removeItem("localTask");
    window.localStorage.removeItem("localCompleted");
    if(taskList.length != 0){
        localStorage.setItem("localTask", JSON.stringify(taskList));
        localStorage.setItem("localCompleted", JSON.stringify(completedList));
    }  
})
