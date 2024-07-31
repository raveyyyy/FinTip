import React, { useEffect, useState } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import { useSelector } from "react-redux";
import formatCurrency from "../../../../services/utilities/formatCurrency";
export default function ReactCalendar() {
  const { collections } = useSelector(({ expenses }) => expenses);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    var arr = [];
    collections
      .filter(e => e.deleted === false)
      .forEach(e => {
        var a = moment(e.start);
        var b = moment(e.end);
        a.diff(b, "days"); // =1
        arr.push({
          title: `Expenses for  ${e?.name?.toUpperCase()} in ${b.diff(
            a,
            "days"
          )} day(s) (${new Date(e.start).toISOString().split("T")[0]} / ${
            new Date(e.end).toISOString().split("T")[0]
          }) is ${formatCurrency(e.amount)}`,
          start: moment(e.start).toDate(),
          end: moment(e.end).toDate(),
          bgColor: e.color || "#54B4D3",
        });
      });
    setEvents([...arr]);
  }, [collections]);
  return (
    <Calendar
      eventPropGetter={(event, start, end, isSelected) => {
        return {
          style: { backgroundColor: event.bgColor },
        };
      }}
      localizer={Calendar.momentLocalizer(moment)}
      defaultDate={new Date()}
      step={60}
      events={events}
      popup={true}
      style={{ height: "70vh", marginBottom: "1.5rem" }}
    />
  );
}
