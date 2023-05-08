import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [toDos, setToDos] = useState(() => {
    const saved = localStorage.getItem("Storage");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [toDo, setToDo] = useState("");

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const day = dayNames[date.getDay()];

  const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const curDate = new Date();
  const hours = curDate.getHours();
  const AMorPM = hours >= 12 ? "PM" : "AM";
  var hour = hours % 12;
  const hour12 = () => {
    if (hour === 0) hour = 12;
    return hour;
  };
  const toDoDate =
    curDate.getDate() +
    "." +
    (curDate.getMonth() + 1) +
    "." +
    curDate.getFullYear();
  const toDoDay = dayNamesShort[curDate.getDay()];
  const toDoTime =
    hour12() +
    ":" +
    curDate.getMinutes() +
    ":" +
    curDate.getSeconds() +
    "" +
    AMorPM;

  const toDoTimeDateDay = toDoDate + "/ " + toDoDay + "/ " + toDoTime;

  const resetInput = () => {
    setToDo("");
  };

  useEffect(() => {
    localStorage.setItem("Storage", JSON.stringify(toDos));
  }, [toDos]);

  const inputSubmit = (e) => {
    e.preventDefault();
    if (toDo) {
      setToDos([
        ...toDos,
        {
          id: Date.now(),
          text: toDo,
          toDoTime: toDoTimeDateDay,
          doneStatus: false,
          dropedStatus: false,
          removeStatus: false,
          retriveStatus: false,
        },
      ]);
      setToDo("");
    }
  };

  return (
    <>
      <div className="app">
        <div className="HeaderSection">
          <div className="mainHeading">
            <h1>ToDo List</h1>
          </div>
          <div className="subHeading">
            <br />
            <h2>Whoops, Its {day} 🌝 ☕ </h2>
          </div>
          <form action="">
            <div className="input">
              <input
                value={toDo}
                onChange={(event) => setToDo(event.target.value)}
                type="text"
                placeholder="🖊️ Add Task..."
              />
              <i onClick={resetInput} className="fa fa-eraser"></i>
              <i onClick={inputSubmit} className="fas fa-plus"></i>
            </div>
          </form>
        </div>
        <div className="wholeContainer">
          <div className="todos done">
            <h3 style={{ marginTop: "10px" }}>DONE</h3>
            {toDos.map((obj, index) => {
              if (obj.doneStatus && !obj.removeStatus) {
                return (
                  <>
                    <div key={index} className="todo">
                      <div className="left">{obj.text}</div>
                      <div className="right">
                        <i
                          onClick={(event) => {
                            event.target.value = true;
                            setToDos(
                              toDos.map((obj2) => {
                                if (obj2.id === obj.id) {
                                  obj2.removeStatus = event.target.value;
                                }
                                return obj2;
                              })
                            );
                          }}
                          value={obj.removeStatus}
                          className="fas fa-times"
                        ></i>
                      </div>
                    </div>
                    <div className="bottom">
                      <p>{obj.toDoTime}</p>
                    </div>
                  </>
                );
              }
            })}
          </div>

          {/*  */}

          <div className="todos ongoing">
            <h3 style={{ marginTop: "10px" }}>ONGOING</h3>
            {toDos.map((obj, index) => {
              if (!obj.doneStatus && !obj.dropedStatus) {
                return (
                  <>
                    <div key={index} className="todo">
                      <div className="left">
                        <input
                          onChange={(event) => {
                            setToDos(
                              toDos.filter((obj2) => {
                                if (obj2.id === obj.id) {
                                  obj.doneStatus = event.target.checked;
                                }
                                return obj2;
                              })
                            );
                          }}
                          value={obj.doneStatus}
                          type="checkbox"
                          name=""
                          id=""
                        />
                        {obj.text}
                      </div>

                      <div className="right">
                        <i
                          onClick={(event) => {
                            event.target.value = true;
                            setToDos(
                              toDos.map((obj2) => {
                                if (obj2.id === obj.id) {
                                  obj2.dropedStatus = event.target.value;
                                }
                                return obj2;
                              })
                            );
                          }}
                          value={obj.dropedStatus}
                          className="fas fa-times"
                        ></i>
                      </div>
                    </div>
                    <div className="bottom">
                      <p>{obj.toDoTime}</p>
                    </div>
                  </>
                );
              } else if (obj.retriveStatus && !obj.doneStatus) {
                return (
                  <>
                    <div key={index} className="todo">
                      <div className="left">
                        <input
                          onChange={(event) => {
                            setToDos(
                              toDos.filter((obj2) => {
                                if (obj2.id === obj.id) {
                                  obj.doneStatus = event.target.checked;
                                }
                                return obj2;
                              })
                            );
                          }}
                          value={obj.doneStatus}
                          type="checkbox"
                          name=""
                          id=""
                        />
                        {obj.text}
                      </div>
                      <div className="right">
                        <i
                          onClick={(event) => {
                            event.target.value = true;
                            setToDos(
                              toDos.filter((obj2) => {
                                if (obj2.id === obj.id) {
                                  obj2.dropedStatus = event.target.value;
                                  obj2.retriveStatus = !event.target.value;
                                }
                                return obj2;
                              })
                            );
                          }}
                          value={obj.dropedStatus}
                          className="fas fa-times"
                        ></i>
                      </div>
                    </div>
                    <div className="bottom">
                      <p>{obj.toDoTime}</p>
                    </div>
                  </>
                );
              }
            })}
          </div>

          {/*  */}

          <div className="todos drop">
            <h3 style={{ marginTop: "10px" }}>DROPED</h3>
            {toDos.map((obj, index) => {
              if (obj.dropedStatus && !obj.retriveStatus && !obj.removeStatus) {
                return (
                  <>
                    <div key={index} className="todo">
                      <div className="left">{obj.text}</div>
                      <div className="right">
                        <i
                          onClick={(event) => {
                            event.target.value = true;
                            setToDos(
                              toDos.filter((obj2) => {
                                if (obj2.id === obj.id) {
                                  obj2.dropedStatus = !event.target.value;
                                  obj2.retriveStatus = event.target.value;
                                }
                                return obj2;
                              })
                            );
                          }}
                          value={obj.retriveStatus}
                          className="fa fa-undo"
                        ></i>
                        <i
                          onClick={(event) => {
                            event.target.value = true;
                            setToDos(
                              toDos.map((obj2) => {
                                if (obj2.id === obj.id) {
                                  obj2.removeStatus = event.target.value;
                                }
                                return obj2;
                              })
                            );
                          }}
                          value={obj.removeStatus}
                          className="fas fa-times"
                        ></i>
                      </div>
                    </div>
                    <div className="bottom">
                      <p>{obj.toDoTime}</p>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
