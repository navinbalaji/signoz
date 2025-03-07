import { CheckCircle } from "lucide-react";
import { useDrag } from "react-use-gesture";
import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";

export const Dialog = ({ task }) => {
  const [tasks, setTasks] = useState(task);

  const markCompleted = (id) => {
    if (!id) return;
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, isCompleted: true } : task)));
  };

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bindDrag = useDrag(({ offset: [dx, dy] }) => {
    api.start({ x: dx, y: dy });
  });

  return (
    <animated.div {...bindDrag()} style={{ x, y }} className="task-container">
      <div className="header">
        <h2>Ready To build your base?</h2>
      </div>

      <div className="task-list">
        {tasks
          .filter((task) => !task.isCompleted)
          .map((task) => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                disabled={task.isCompleted}
                checked={task.isCompleted}
                onChange={() => markCompleted(task.id)}
              />
              <div className="task-content">
                <h3 className={task.isCompleted ? "completed" : ""}>{task.name}</h3>
                {!task.isCompleted && (
                  <button data-id={task.id} onClick={(e) => markCompleted(e.currentTarget.getAttribute("data-id"))}>
                    Continue
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="completed-section">
        <h4>COMPLETED</h4>
        {tasks
          .filter((task) => task.isCompleted)
          .map((task) => (
            <div key={task.id} className="completed-task">
              <CheckCircle className="completed-icon" />
              <span className="completed-text">{task.name}</span>
            </div>
          ))}
      </div>
    </animated.div>
  );
};
