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
let taskCategory = getLocalStorage("localTaskCategory") || [];




//Menambah task
const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task")


addTask.addEventListener("click", function(e){

    // isAdd == true maka tambah task baru
    // else maka edit task
    if(isAdd){
        createTaskDiv(inputTask.value, taskList.length, categoryPreview.innerHTML);
        taskList.push(inputTask.value);
        taskCategory.push(categoryPreview.innerHTML);
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


//Hide task
function hideTask(category){
    if(category == "All"){
        taskDivList.forEach(function(i){
            i.style.display = "flex";
        })
    }else{
        taskDivList.forEach(function(i){
            if(i.dataset.category == category){
                i.style.display = "flex";
            }else{
                i.style.display = "none";
            }
        })
    }
    
}

const optionTask = document.getElementById("option-task");
let whoOpenOption;

//Membuat taskDiv
let taskDivList = [];
function createTaskDiv(value, index, taskCategoryParam){
    const divTask = document.createElement("div");
    divTask.setAttribute("class", "task");
    divTask.setAttribute("data-tindex", `${index}`);
    
    divTask.innerHTML =`
    <input type="checkbox">
    <p>${value}</p>`
    
    divTask.classList.add("All");
    divTask.setAttribute("data-category", taskCategoryParam);

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
    createTaskDiv(taskList[i], i, taskCategory[i]);
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


const categoryPreview =  document.querySelector("#change-container span");
const changeCategory = document.getElementById("change-container");
const categoryContainer = document.querySelector("#change-container div");

let categoryValueList = getLocalStorage("localCategory") || [];
let categoryDivList = [];
let categoryOptionList = [];
const categoryNav = document.getElementById("category");

function createCategory(value){
    const categoryDiv = document.createElement("div");
    categoryDiv.setAttribute("class", "category-button");
    categoryDiv.setAttribute("data-category", value);
    categoryDiv.innerHTML = value;

    categoryDiv.addEventListener("click", function(){
        hideTask(value);
    })
    categoryDivList.push(categoryDiv);

    const categoryOption = document.createElement("div");
    categoryOption.innerHTML = value;
    categoryOptionList.push(categoryOption);

    categoryOption.addEventListener("click", function(e){
        e.stopPropagation();
        categoryPreview.innerHTML = value;
        categoryContainer.style.display = "none";
    })
    displayCategory();
}

// Initial Category
const allCategory = document.createElement("div");
allCategory.setAttribute("class", "category-button");
allCategory.innerHTML = "All";
allCategory.onclick = function(){hideTask("All")};
categoryDivList.push(allCategory);

const optionCreateCategory = document.createElement("div");
optionCreateCategory.setAttribute("id", "create-category")
optionCreateCategory.innerHTML = "<span>+</span> Create New";
categoryOptionList.push(optionCreateCategory);
displayCategory()

categoryValueList.forEach(function(i){
    createCategory(i)
})

function displayCategory(){
    categoryNav.innerHTML = "";
    categoryDivList.forEach(function(i){
        categoryNav.appendChild(i);
    })

    categoryContainer.innerHTML = "";
    categoryOptionList.forEach(function(i){
        categoryContainer.insertBefore(i, categoryContainer.firstChild);
    })
}

    

//change or add category

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
const categoryInput = document.querySelector(`#create-category-container input[type='text']`);
const cancelCreateCategory = document.querySelector("#create-category-container div .cancel");
const saveCreateCategory = document.querySelector("#create-category-container div .save");

addCategory.addEventListener("click", function(){
    createCategoryContainer.style.display = "block";
})

cancelCreateCategory.addEventListener("click", function(){
    createCategoryContainer.style.display = "none";
})

saveCreateCategory.addEventListener("click", function(){
    createCategory(categoryInput.value);
    categoryValueList.push(categoryInput.value);
    
    categoryInput.value = "";
    createCategoryContainer.style.display = "none";
})

//Untuk display none
document.addEventListener("click", function(e){
    // ! Kemungkinan tidak dipakai
    // function checkTarget(i){
    //     return !i.contains(e.target);
    // }

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

//Untuk mendapatkan data daru local storage
function getLocalStorage(key){
    if(localStorage.getItem(key) != null && localStorage.getItem(key) != undefined){
        
        return JSON.parse(localStorage.getItem(key));
    }

    return null;
}
//Untuk menyimpan data dari local storage
addEventListener("beforeunload", function(e){
    
    taskDivList = taskDivList.filter(function(item){
        return item != undefined;
    })
    taskList = taskList.filter(function(item){
        return item != undefined;
    })

    window.localStorage.removeItem("localTask");
    window.localStorage.removeItem("localCompleted");
    window.localStorage.removeItem("localTaskCategory");
    window.localStorage.removeItem("localCategory");

    if(taskList.length != 0){
        localStorage.setItem("localTask", JSON.stringify(taskList));
        localStorage.setItem("localCompleted", JSON.stringify(completedList));
        localStorage.setItem("localTaskCategory", JSON.stringify(taskCategory));
    }

    if(categoryValueList.length != 0){
        localStorage.setItem("localCategory", JSON.stringify(categoryValueList));
    }
})
