import { Button } from "@mui/material";

interface Task {
  text: string;
  finished: boolean;
}

interface ListTasksProps {
  list: Task[];
  setList: React.Dispatch<React.SetStateAction<Task[]>>;
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
}

function ListTasks({ list, setList, task, setTask }: ListTasksProps) {
  const taskDefault = {
    text: "",
    finished: false,
  };

  const handleChangeValues = (id: number) => {
    const updatedList = list.map((item, index) =>
      index === id ? { ...item, finished: !item.finished } : item
    );
    setList(updatedList);
    setTask(taskDefault);
  };

  const handleRemoveTask = (id: number) => {
    setList(list.filter((_: Task, index: number) => id != index));
  };

  return (
    <div style={{ textAlign: "start" }}>
      <h2>Liste de tâches</h2>
      {list.length === 0 && <p>Il n'y a aucun élément</p>}
      {list.length > 0 && (
        <p>
          Il y a {list.length} élément{list.length > 1 ? "s" : ""}
        </p>
      )}
      <table>
        <thead>
          <tr
            style={{
              marginBottom: "3px",
              marginTop: "3px",
              paddingBottom: "3px",
              borderBottom: "1px solid black",
              width: "100%",
              textAlign: "center",
            }}
          >
            <th>Tâches</th>
            <th>État de la tâches</th>
            <th>Changer l'état ?</th>
            <th>Suppression ?</th>
          </tr>
        </thead>
        <tbody>
          {list.map((el, id) => (
            <tr
              key={id}
              style={{
                marginBottom: "3px",
                borderBottom: "1px solid black",
                marginTop: "3px",
                width: "100%",
                textAlign: "center",
                backgroundColor: el.finished ? "green" : "transparent",
              }}
            >
              <td
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p> {el.text} </p>
              </td>
              <td
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {el.finished ? "Finie" : "À faire"}
              </td>
              <td
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => handleChangeValues(id)}
                  variant="outlined"
                  title={
                    el.finished
                      ? 'Mettre cette tâche en "A faire"'
                      : 'Mettre cette tâche en "Terminée"'
                  }
                  sx={{ fontSize: "1.25rem", padding: 0, border: "none" }}
                >
                  {el.finished ? "✅" : "☑️"}
                </Button>
              </td>
              <td
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => handleRemoveTask(id)}
                  variant="outlined"
                  title="Supprimer la tâche"
                  sx={{
                    fontSize: "1.25rem",
                    padding: 0,
                    border: "none",
                  }}
                >
                  ❌
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListTasks;
