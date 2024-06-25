import { useEffect, useState, useRef } from "react";
import { Card, TextField, Button } from "@mui/material";
import ListTasks from "./ListTasks";

interface Task {
  text: string;
  finished: boolean;
}

function ToDoList() {
  const taskDefault = {
    text: "",
    finished: false,
  };
  const [task, setTask] = useState<Task>(taskDefault);
  const [list, setList] = useState<Task[]>(() => {
    const savedList = localStorage.getItem("taskList");
    return savedList ? JSON.parse(savedList) : [];
  });
  const inputFocus: any = useRef(null);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(list));
  }, [list]);

  function handleAddTask(task: Task, e: any = null): void {
    if (task.text == "") return;
    setList([...list, task]);
    setTask(taskDefault);
    inputFocus?.current.focus();
    e?.preventDefault();
  }

  return (
    <>
      <Card sx={{ bgcolor: "lightgray", padding: "15px", width: "100%" }}>
        <form onSubmit={(e) => handleAddTask(task, e)}>
          <TextField
            id="standard-basic"
            label="Ajouter une tâche ?"
            variant="standard"
            value={task.text}
            onChange={(e) => setTask({ text: e.target.value, finished: false })}
            inputRef={inputFocus}
            autoFocus
            sx={{ color: "red" }}
          />
          <Button onClick={() => handleAddTask(task)} variant="outlined">
            ajouter
          </Button>
        </form>
        <ListTasks
          list={list}
          setList={setList}
          task={task}
          setTask={setTask}
        />
      </Card>
    </>
  );
}

export default ToDoList;
