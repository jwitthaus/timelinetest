import { addDays, differenceInCalendarDays, parseISO } from "date-fns";
import React from "react";
import BackgroundColumn from "./BackgroundColumn";
import Bar from "./Bar";
import "./BarChart.css"; // Stile für die Timeline

// Function to calculate the percentage difference between two dates
const calculatePercentage = (
  startDate,
  endDate,
  minDate,
  maxDate,
  scale = 200
) => {
  const totalDuration = maxDate - minDate;
  const startPosition = ((startDate - minDate) / totalDuration) * scale;
  const width = ((endDate - startDate) / totalDuration) * scale;
  return { startPosition, width };
};

const BarChart = ({ bars }) => {
  //const minDate = Math.min(...bars.map((bar) => new Date(bar.Beginn_Datum)));
  //const maxDate = Math.max(...bars.map((bar) => new Date(bar.Ende_Datum)));

  // Calculate minDate and maxDate from nested bookings
  let allStartDates = [];
  let allEndDates = [];
  bars.forEach((item) => {
    item.bookings.forEach((booking) => {
      allStartDates.push(parseISO(booking.Beginn_Datum));
      allEndDates.push(parseISO(booking.Ende_Datum));
    });
  });

  const minDate = new Date(Math.min(...allStartDates));
  const maxDate = new Date(Math.max(...allEndDates));

  // Calculate the scale factor to fit exactly 7 days in the visible range
  const visibleDays = 31;
  const visibleRange = visibleDays * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const containerWidth = 100; // 100% of the container's width
  const timelineLength = differenceInCalendarDays(maxDate, minDate);
  const scale = (containerWidth / visibleDays) * timelineLength;

  const headerDates = Array.from({ length: timelineLength + 1 }, (_, i) =>
    addDays(minDate, i)
  );

  return (
    <div className="bar-chart-container">
      <BackgroundColumn
        dates={headerDates}
        minDate={minDate}
        maxDate={maxDate}
      />
      <div className="bar-chart">
        {bars.map((category, index) => {
          return (
            <div className="bar-wrapper">
              {category.bookings.map((bar, idx) => {
                const { startPosition, width } = calculatePercentage(
                  new Date(bar.Beginn_Datum),
                  new Date(bar.Ende_Datum),
                  minDate,
                  maxDate,
                  scale
                );
                return (
                  <Bar
                    key={`${index}-${idx}`} // Verwenden Sie eine eindeutige Kombination aus index und idx für den key
                    startPosition={startPosition}
                    width={width}
                    index={index}
                    label={bar.Beginn_Datum}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
