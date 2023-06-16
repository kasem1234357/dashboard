import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import DaysBox from "./DaysBox";
import axios from "axios";
function CalendarBox({ month, year }) {
  const days = ["San", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];

  const [boxs, setBoxs] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [filterTasks, setFilterTask] = useState([]);
  const [data, setData] = useState({
    year: year,
    month: month,
  });
  const [startDays, setStartDays] = useState(1);
  const [length, setLength] = useState(31);
  const [previosLength, setPrevios] = useState(30);
  const daysNumber = () => {
    const d = [];
    for (let i = 0; i < 35; i++) {
      d.push(i);
    }
    setBoxs(d);
  };
  const filter = () => {
    const data2 = taskData?.filter((task) => {
      return (
        parseInt(task.reminderDate.split("-")[0]) === year &&
        parseInt(task.reminderDate.split("-")[1]) - 1 === month
      );
    });
    setFilterTask(data2);
  };
  useEffect(() => {
    daysNumber();
    setPrevios(numberDaysInMonth(year, month - 1));
    setLength(numberDaysInMonth(year, month));
    setStartDays(dayOfTheMonth(year, month));
  }, [year, month]);
  useEffect(() => {
    filter();
  }, [taskData, month, year]);
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8800/api/tasks/calendar/tasks`)
        .then((res) => {
          setTaskData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  function numberDaysInMonth(year, month) {
    let numberDaysInMonth = new Date(year, month + 1, 0).getDate();
    console.log(numberDaysInMonth);
    return numberDaysInMonth;
  }
  function dayOfTheMonth(year, month) {
    let dayOfTheMonth = new Date(year, month).getDay() + 1;
    console.log(dayOfTheMonth);
    return dayOfTheMonth;
  }

  return (
    <>
      <div className="days--name flex">
        {days.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className="days--box flex ">
        {boxs?.map((box, index) => {
          if (index + 1 < startDays)
            return (
              <DaysBox
                className={"prev--days days"}
                key={index}
                dayDate={`${data.year}-${data.month + 1}-${
                  index + 1 - startDays + 1
                }`}
                dataNumber={filterTasks.length + 1}
                number={previosLength - (startDays - 2) + index}
              />
            );

          if (index - startDays + 2 > length)
            return (
              <DaysBox
                key={index}
                className="next--days days"
                dataNumber={filterTasks.length + 1}
                number={index - startDays + 2 - length}
                dayDate={`${data.year}-${data.month + 1}-${
                  index + 1 - startDays + 1
                }`}
              />
            );
          if (
            index + 1 - startDays + 1 === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
          ) {
            return (
              <DaysBox
                active={true}
                key={index}
                className="days"
                number={index + 1 - startDays + 1}
                dayDate={`${data.year}-${data.month + 1}-${
                  index + 1 - startDays + 1
                }`}
                dataNumber={filterTasks.length + 1}
              />
            );
          }
          for (let i = 0; i < filterTasks.length; i++) {
            if (
              index + 1 - startDays + 1 ===
              parseInt(filterTasks[i].reminderDate.split("-")[2])
            ) {
              return (
                <DaysBox
                  key={index}
                  className="days active-task"
                  number={index + 1 - startDays + 1}
                  dayDate={`${data.year}-${data.month + 1}-${
                    index + 1 - startDays + 1
                  }`}
                  dataNumber={i + 1}
                  data={filterTasks[i]}
                />
              );
            }
          }
          return (
            <DaysBox
              key={index}
              className="days"
              number={index + 1 - startDays + 1}
              dayDate={`${data.year}-${data.month + 1}-${
                index + 1 - startDays + 1
              }`}
              dataNumber={filterTasks.length + 1}
            />
          );
        })}
      </div>
    </>
  );
}

export default CalendarBox;
