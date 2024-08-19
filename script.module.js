
import { getUserTasks } from "./scripts/getTasks.mjs";
import { addUserTask } from "./scripts/addTasks.mjs";
import { getUserTaskById } from "./scripts/getTaskById.mjs";
import { updateUserTask } from "./scripts/updateTask.mjs";

let days = document.getElementById("days");
let monthYear = document.getElementById("monthYear");
let prevMonth = document.getElementById("prevMonth");
let nextMonth = document.getElementById("nextMonth");
let taskLists = document.getElementById("tasks");
let taskListsBox = document.getElementById("task-list-box");
let taskBackground = document.getElementById("task-background");
let addTaskPlusButton = document.getElementById("add-task");
let addTaskButton = document.getElementById("add");
let updateTaskButton = document.getElementById("update");
let cancel = document.getElementById("cancel");
let taskInputBox = document.getElementById("task-input-box");
let userSelectedDate = undefined;
let taskName = document.getElementById("task-name")
let hours = document.getElementById("hours")
let minutes = document.getElementById("minutes")
let amPm = document.getElementById("am-pm")
let date = new Date();
let div;
let statusBox = document.querySelectorAll('.status-box')
let updateTaskStatusSection = document.getElementById("update-task-status-section")
let taskStatusTime = document.getElementById("task-status-time")
let taskStatusState = 'new'
let taskToUpdateIndex = undefined
let selectedDate;
let todayDate;
let isUpdating = false
let currentlySelectedTaskId = undefined
let tasks = {
  2024: {
    8: {
      12: [
        {
          task: "Task1  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, sit.",
          time: "09:30 am",
          hour:"09",
          minute:"30",
          amPms:"am",
          fullDate: `8/12/2024`,
          taskStatus: 'new'
        },
      ],
    },
  },
};

const getYearMonthDay = () => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return { year, month, day };
};

const clearTaskValues = () => {
  taskName.innerText = ''
  hours.selectedIndex = 0
  minutes.selectedIndex = 0
  amPm.selectedIndex = 0
}

const handleAddTask = async () => {
  const { year, month, day } = getYearMonthDay();
  if(taskName.innerText.length < 10){
    alert('Please write the appropriate task')
    return
  }
  // const newTask = {
  //   task: taskName.innerText,
  //   time: `${hours.value}:${minutes.value} ${amPm.value}`,
  //   fullDate: `${month}/${day}/${year}`,
  //   taskStatus: taskStatusState,
  //   hour: hours.value,
  //   minute: minutes.value,
  //   amPms: amPm.value
  // };

  let newTask = {
    taskname: taskName.innerText,
    time: `${hours.value}:${minutes.value}`,
    am_pm: amPm.value,
    task_status: taskStatusState
  }

  if(userSelectedDate){
    newTask = {...newTask, date: `${year}-${month}-${userSelectedDate}`}
  }
  else{
    newTask = {...newTask, date: `${year}-${month}-${day}`}
  }

  const taskResponse = await addUserTask(newTask)
  if(taskResponse.status){
    alert(taskResponse.message)
    taskInputBox.style.visibility = "hidden";
    const fetchTask = await getUserTasks(newTask.date)
    if(fetchTask){
      displayTask(fetchTask);
    }
    userSelectedDate = undefined
    clearTaskValues()
    return 
  }
  return alert(taskResponse.message)

  // if (userSelectedDate) {
  //   // addTask(year, month, userSelectedDate, newTask);
  //   newTask = {...newTask, date: `${year}-${month}-${userSelectedDate}`}
  //   const taskResponse = await addUserTask(newTask)
  //   if(taskResponse.status){
  //     alert(taskResponse.message)
  //     const fetchTask = await getUserTasks(newTask.date)
  //     displayTask(fetchTask)
  //   }
  //   return alert(taskResponse.message)
  //   // displayTask(getTasks(year, month, userSelectedDate));
  // } else {
  //   // addTask(year, month, day, newTask);
  //   displayTask(getTasks(year, month, day));
  // }

};


const displayUpdatedText = (taskUpdated) => {
  if(taskUpdated){
    alert("Task is updated successfully !!!")
    updateTaskStatusSection.style.visibility = 'hidden'
    taskStatusState = 'new'
    return 
  }
  alert("Task cannot be updated !!!")
  updateTaskStatusSection.style.visibility = 'hidden'
  taskStatusState = 'new'
}

const updateTask = async () => {
  
  const { year, month, day } = getYearMonthDay();
  let isUpdated
  if(taskName.innerText.length < 10){
    alert('Please write the appropriate task')
    return
  }
  // const newTask = {
  //   task: taskName.innerText,
  //   time: `${hours.value}:${minutes.value} ${amPm.value}`,
  //   taskStatus: taskStatusState,
  //   hour: hours.value,
  //   minute: minutes.value,
  //   amPms: amPm.value,
  //   fullDate: `${month}/${day}/${year}`
  // };
  const newTask = {
    taskname: taskName.innerText,
    time: `${hours.value}:${minutes.value}`,
    task_status: taskStatusState,
    am_pm: amPm.value,
    taskid: currentlySelectedTaskId
  };

  const updatedResponse = await updateUserTask(newTask)
  if(!updatedResponse.status) return alert(updatedResponse.message)
  
  alert(updatedResponse.message)
  currentlySelectedTaskId = undefined
  clearTaskValues()
  taskInputBox.style.visibility = "hidden";
  let dateToFetchUpdatedTask = ''

  if (userSelectedDate) {
    dateToFetchUpdatedTask = `${year}-${month}-${userSelectedDate}`
    // isUpdated = updateTaskFromIndex(year, month, userSelectedDate, taskToUpdateIndex, newTask);
    // displayUpdatedText(isUpdated)
    // clearTaskValues()
    // displayTask(getTasks(year, month, userSelectedDate));
  } else {
    dateToFetchUpdatedTask = `${year}-${month}-${day}`
    // isUpdated = updateTaskFromIndex(year, month, day, taskToUpdateIndex, newTask);
    // displayUpdatedText(isUpdated)
    // clearTaskValues()
    // displayTask(getTasks(year, month, day));
  }
  const getTaskList = await getUserTasks(dateToFetchUpdatedTask)
  if(!getTaskList.status) return alert(getTaskList.message)
  updateTaskStatusSection.style.visibility = 'hidden'
  taskInputBox.style.visibility = "hidden";
  taskStatusState = 'new'  
  if(getTaskList){
    displayTask(getTaskList);
  }

}

const updateTaskFromIndex = (year, month, day,index,newTask) => {
  let updated = false
  if (tasks[year] && tasks[year][month] && tasks[year][month][day]) {
    tasks[year][month][day].splice(index,1,newTask)
    updated = true
  }
  return updated
}

function addTask(year, month, day, task) {
  if (!tasks[year]) {
    tasks[year] = {};
  }
  if (!tasks[year][month]) {
    tasks[year][month] = {};
  }
  if (!tasks[year][month][day]) {
    tasks[year][month][day] = [];
  }
  tasks[year][month][day].push(task);
}

function getTasks(year, month, day) {
  if (tasks[year] && tasks[year][month] && tasks[year][month][day]) {
    return tasks[year][month][day];
  } else {
    return [];
  }
}

const getTaskFromToIndex = (year,month,day,index) => {
  return tasks[year][month][day][index]
}

const getIndexofDate = (e) => {
  return Array.from(days.children).indexOf(e.target);
};

const handleEditTask = async (e) => {
  let selectedTask
  
  // updateTaskStatusSection.style.visibility = 'visible'
  
  const taskId = parseInt(e.target.getAttribute('data-index'))
  selectedTask = await getUserTaskById(taskId)

  if(!selectedTask.status) return alert(selectedTask.message)

    addTaskButton.style.display = 'none'
    updateTaskButton.style.display = 'inline-block'
    taskInputBox.style.visibility = "visible";
    updateTaskStatusSection.style.visibility = 'visible'
    
    const {am_pm, taskname, time, taskid, task_status} = selectedTask.tasks[0]
    const hour = time.split(":")[0]
    const minute = time.split(":")[1]
    taskName.innerText = taskname
    hours.value = hour
    minutes.value = minute
    amPm.value = am_pm
    currentlySelectedTaskId = taskid
  
  // taskToUpdateIndex = index
  // if(userSelectedDate){
  //   selectedTask =  getTaskFromToIndex(date.getFullYear(), date.getMonth() + 1, userSelectedDate, index)
   
  // }else{
  //   selectedTask = getTaskFromToIndex(date.getFullYear(), date.getMonth() + 1, date.getDate(), index)
  // }
  // const {task, hour, minute,amPms } = selectedTask
  // taskInputBox.style.visibility = "visible";
  // taskName.innerText = task
  // hours.value = hour
  // minutes.value = minute
  // amPm.value = amPms
}

const displayTask = (dailyTasks) => {
  taskLists.innerHTML = "";
  if (dailyTasks && dailyTasks.tasks.length != 0) {
    dailyTasks.tasks.forEach((taskObj,index) => {
      const { taskname, time,task_status,am_pm,taskid } = taskObj;
      let li = document.createElement("li");
      let p = document.createElement("p")
      let div = document.createElement('div')
      // let status = document.createElement('span')
      let amPmTime = document.createElement('span')
      let small = document.createElement("small");
      let edit = document.createElement('i')

      div.setAttribute("id","task-status-time")
      // status.setAttribute("id","status")
      li.classList.add(`status-color-${task_status}`)
       
      amPmTime.setAttribute("id","time")
      edit.setAttribute('data-index',taskid)
      edit.classList.add('fa-solid','fa-pen')
      p.textContent = taskname;
      small.textContent = `${time} ${am_pm}`;

      // div.appendChild(status)
      amPmTime.appendChild(small)
      amPmTime.appendChild(edit)
      div.appendChild(amPmTime)

      li.appendChild(p)
      li.appendChild(div)
      // li.appendChild(small);
      // li.appendChild(edit)

      edit.onclick = handleEditTask
      taskLists.appendChild(li);
    });
  } else {
    taskLists.innerHTML += `<li> No Task To List </li>`;
  }
};

const setBgColor = async (e) => {
  userSelectedDate = parseInt(e.target.innerText);
  if (selectedDate && selectedDate != getIndexofDate(e)) {
    days.children[selectedDate].classList.remove("selectedDate");
  }
  if (getIndexofDate(e) < todayDate) {
    return;
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = userSelectedDate

  if (e.target.classList.contains("selectedDate")) {
    e.target.classList.remove("selectedDate");
    // const dailyTasks = getTasks(year, month, date.getDate());
    userSelectedDate = undefined
    const taskDate = `${year}-${month}-${date.getDate()}`
    const dailyTasks = await getUserTasks(taskDate) 
    if(dailyTasks){
      displayTask(dailyTasks);
    }
  } else {
    selectedDate = getIndexofDate(e);
    e.target.classList.add("selectedDate");
    const taskDate = `${year}-${month}-${day}`
    // const dailyTasks = getTasks(year, month, day);
    const dailyTasks = await getUserTasks(taskDate)
    if(dailyTasks){
      displayTask(dailyTasks);
    }
    
  }
};

const handleMouseOver = (e) => {
  let todayDate = parseInt(e.target.innerText);
  if (!(todayDate == date.getDate())) {
    e.target.classList.add("hoverDate");
  }
};

const handleMouseLeave = (e) => {
  let todayDate = parseInt(e.target.innerText);
  if (!(todayDate == date.getDate())) {
    e.target.classList.remove("hoverDate");
  }
};

const renderCalendar = async () => {
  days.innerHTML = "";
  let year = date.getFullYear();
  let month = date.getMonth();
  let firstDay = new Date(year, month, 1).getDay();
  todayDate = firstDay;
  let lastDay = new Date(year, month + 1, 0).getDate();
  monthYear.textContent = `${date.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  for (let i = 0; i < firstDay; i++) {
    div = document.createElement("div");
    days.appendChild(div);
  }
  for (let i = 1; i <= lastDay; i++) {
    let dateDiv = document.createElement("div");
    dateDiv.onclick = setBgColor;
    dateDiv.onmouseover = handleMouseOver;
    dateDiv.onmouseleave = handleMouseLeave;
    dateDiv.textContent = i;
    days.appendChild(dateDiv);
    if (i == date.getDate()) {
      dateDiv.classList.add("todayDate");
    }
  }
  
  // const dailyTasks = getTasks(year, month + 1, date.getDate());
  const dateToFetchTask = `${year}-${month + 1}-${date.getDate()}`
  const dailyTasks = await getUserTasks(dateToFetchTask)
  if(dailyTasks){
    displayTask(dailyTasks);
  }
  
};
renderCalendar();

const changeMonth = (month) => {
  userSelectedDate = undefined;
  date.setMonth(date.getMonth() + month);
  renderCalendar();
};

addTaskPlusButton.onclick = () => {
  taskInputBox.style.visibility = "visible";
  addTaskButton.style.display = 'inline-block'
  updateTaskButton.style.display = 'none'
  document.body.style.overflowY = "hidden";
};

updateTaskButton.onclick = updateTask

cancel.onclick = () => {
  taskInputBox.style.visibility = "hidden";
  document.body.style.overflowY = "auto";
  updateTaskButton.style.display = 'none'
  updateTaskStatusSection.style.visibility = "hidden"
  clearTaskValues()
};
let currentlySelectedTaskStatusIndex = undefined
let previousSelectedTaskStatusIndex = undefined
let ele = document.getElementById("update-task-status-box")

const getcurrentlySelectedTaskStatusIndex = (e) => {
  
  let index = Array.from(ele.children).indexOf(e.target)
  return index
}

const handleTaskStatusUpdateColor = (e) => {
  let selectedTaskIndex = getcurrentlySelectedTaskStatusIndex(e)

  const getTaskStatus = e.target.getAttribute('data-status')

  if(e.target.classList.contains('set-task-status-border')){

    taskStatusState = 'new'
    e.target.classList.remove('set-task-status-border')
    return 
  }
    taskStatusState = getTaskStatus

    if(previousSelectedTaskStatusIndex){

      ele.children[previousSelectedTaskStatusIndex].classList.remove('set-task-status-border')

    }

    e.target.classList.add('set-task-status-border')
    previousSelectedTaskStatusIndex = selectedTaskIndex

}

statusBox.forEach((status) => {
  status.onclick = handleTaskStatusUpdateColor
})


addTaskButton.onclick = handleAddTask;
prevMonth.onclick = () => changeMonth(-1);
nextMonth.onclick = () => changeMonth(+1);