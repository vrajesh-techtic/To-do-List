import * as fs from "fs";

// for creating new task
export function createTask(val, desc) {
  fs.writeFileSync(`./todo/${val}.txt`, desc, function (err) {
    if (err) throw err;
  });
  console.log(`${val} task created!`);
}

// to display existing task
export function readTask(val) {
  let x = fs.readFileSync(`./todo/${val}.txt`, "utf-8");
  console.log("\nFile name: " + val);
  console.log("File Content: " + x);
}

// To update title of the task
export function updateTitle(val, newVal) {
  fs.renameSync(`./todo/${val}.txt`, `./todo/${newVal}.txt`, function (err) {
    if (err) throw err;
  });
  console.log(`${val} updated to ${newVal}`);
}

// to add new description of task
export function updateNewDesc(val, desc) {
  fs.writeFileSync(`./todo/${val}.txt`, desc, function (err) {
    if (err) throw err;
  });
  console.log(`New Description of ${val} Task added!!!`);
}

// to append new description to task
export function appendDesc(val, desc) {
  fs.appendFileSync(`./todo/${val}.txt`, "\n" + desc, function (err) {
    if (err) throw err;
  });
  console.log(`New Description appended to ${val} Task !!!`);
}

// To remove task
export function deleteTask(val) {
  fs.unlink(`./todo/${val}.txt`, function (err) {
    if (err) throw err;
  });
  console.log(`${val} task removed!`);
}

// To print list of all tasks 
export function printAllFiles(fileNames) {
  console.log(
    "\n\n*********************  List of Tasks  **********************"
  );

  if (fileNames.length <= 0) {
    console.log("No tasks available!!");
  }

  for (let i = 0; i < fileNames.length; i++) {
    console.log(`${i + 1}. ${fileNames[i]}`);
  }

  console.log("************************************************************");
}

export function fetchFile(fileNames, i) {
  return fileNames[i];
}
