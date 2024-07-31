import React, { useEffect, useState } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import { useSelector } from "react-redux";
export default function ReactCalendar() {
  const { collections } = useSelector(({ goals }) => goals);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    var arr = [];
    collections.forEach(e => {
      arr.push({
        title: e.saving?.name ? e.saving?.name : e.investment?.name,
        start: moment(e.start).toDate(),
        end: moment(e.start).toDate(),
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
      style={{ height: "70vh", marginBottom: "1.5rem" }}
    />
  );
}
