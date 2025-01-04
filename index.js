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


let taskList = getLocalStorage("localTask") || [];
let completedList = getLocalStorage("localCompleted") || [];




//Menambah task
const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task")

addTask.addEventListener("click", function(e){
    // const divTask = document.createElement("div");
    // divTask.setAttribute("class", "task");
    // divTask.setAttribute("data-tindex", `${taskList.length}`)

    // divTask.innerHTML =`
    //                     <input type="checkbox">
    //                     <p>${inputTask.value}</p>`

    // taskList.push(divTask);

    createTaskDiv(inputTask.value, taskList.length);
    taskList.push(inputTask.value);

    inputTask.value = "";
    addContainer.style.display = "none";
    dark.style.display = "none";

    
    // displayTask();
})
//Container task
const todayTask = document.getElementById("today-task");
const completedTask = document.getElementById("completed-task");

//Display task
function displayTask(){
    completedTask.innerHTML = "";
    todayTask.innerHTML = "";
    
    for(let i = 0; i < taskDivList.length; i++){
        if(completedList.includes(taskDivList[i].dataset.tindex)){
            const taskCheck = taskDivList[i].querySelector(`input[type="checkbox"]`);
            taskCheck.checked = true;
            completedTask.appendChild(taskDivList[i]);
        }else{
            todayTask.appendChild(taskDivList[i]);
        }
    }
}


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
        console.log("clicked")
        if(taskCheck.checked == true){
            completedList.push(divTask.dataset.tindex);
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

    displayTask();
}

//Menampilkan task awal dari local storage
// let indexTemp = 0;
// taskList.forEach(element => {
//     console.log(taskList)
//     console.log(element)
//     createTaskDiv(element, indexTemp);
//     indexTemp++;
// });

for(let i = 0; i < taskList.length; i++){
    createTaskDiv(taskList[i], i);
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


function getLocalStorage(key){
    if(localStorage.getItem(key) != null && localStorage.getItem(key) != undefined){
        
        return JSON.parse(localStorage.getItem(key));
    }

    return null;
}
//Untuk menyimpan data
addEventListener("beforeunload", function(e){
    window.localStorage.removeItem("localTask");
    window.localStorage.removeItem("localCompleted");
    if(taskList.length != 0){
        console.log(taskList)
        localStorage.setItem("localTask", JSON.stringify(taskList));
        localStorage.setItem("localCompleted", JSON.stringify(completedList));
    }
    
})
