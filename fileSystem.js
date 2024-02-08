import PromptSync from "prompt-sync";
const prompt = PromptSync();
import {
  createTask,
  readTask,
  updateTitle,
  updateNewDesc,
  appendDesc,
  deleteTask,
  printAllFiles,
  fetchFile,
} from "./crudFunctions.js";
import * as fs from "fs";

let userChoice;

let runMore = "Y";
let displayMenu = 0;

do {
  let fileList = fs.readdirSync("./todo");

  let fileNames = [];

  for (let i = 0; i < fileList.length; i++) {
    let name = `${fileList[i]}`;
    fileNames[i] = name.slice(0, -4);
  }
  printAllFiles(fileNames);

  console.log(
    "\n\n***********************  To-do Menu  ***********************"
  );
  console.log("1. Add new task"); //Create
  console.log("2. Display task"); //Read
  console.log("3. Update task"); // Update
  console.log("4. Delete task"); //Delete
  console.log("5. Exit Menu");
  console.log("************************************************************");

  userChoice = prompt("Enter your choice (1-5): ");
  if (userChoice == 5) {
    break;
  }
  //   if(userChoice == 0) printAllFiles(fileNames);

  let choice;

  let taskTitle;
  if (!(userChoice == 1)) {
    if (fileNames.length <= 0) {
      console.log("No tasks present!!");
      userChoice = 5;
      break;
    }
    choice = prompt("Enter Sr. No. task to perform CRUD operations: ");
    taskTitle = fetchFile(fileNames, choice - 1);
  }

  switch (userChoice) {
    case "0":
      printAllFiles(fileNames);
      break;

    case "1": //Create New
      let newTaskTitle = prompt("Enter Task title: ");
      let taskDesc = prompt("Task Description: ");
      createTask(newTaskTitle, taskDesc);
      break;

    case "2": //Display Task
      readTask(taskTitle);
      break;

    case "3": //Update Task Title
      let changeTitle = prompt("Do you want change task title? (Y/N): ");
      if (changeTitle == "Y" || changeTitle == "y") {
        let newTitle = prompt("Enter New Title: ");
        updateTitle(taskTitle, newTitle);
        taskTitle = newTitle;
      }

      let changeDesc = prompt("Do you want to remove old description? (Y/N): ");
      if (changeDesc == "Y" || changeDesc == "y") {
        let newDesc = prompt("Enter new description: ");
        updateNewDesc(taskTitle, newDesc);
      } else {
        let addDesc = prompt("Add your description: ");
        appendDesc(taskTitle, addDesc);
      }

      break;

    case "4": // Update Task Desc
      deleteTask(taskTitle);
      break;

    case "5":
      break;

    default:
      console.log("Incorrect choice. Try Again!!!");
  }
  runMore = prompt("Do you want to exit? (Y/N): ");
  if (runMore == "Y" || runMore == "y") {
    displayMenu = 0;
  } else {
    displayMenu = 1;
  }
} while (displayMenu);
