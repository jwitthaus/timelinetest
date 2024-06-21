import { differenceInCalendarDays } from "date-fns";
import "./BackgroundColumn.css"; // Stile für die Timeline

const BackgroundColumn = ({ dates, minDate, maxDate }) => {
  const totalDuration = differenceInCalendarDays(maxDate, minDate);

  return (
    <div className="background-columns">
      {dates.map((date, index) => {
        const position =
          (differenceInCalendarDays(date, minDate) / totalDuration) * 100;
        return (
          <div
            key={index}
            className="background-column"
            style={{ left: `${position}%` }}
          >
            <div className="header-date">
              {new Date(date).toLocaleDateString()}
            </div>
            <div className="grid-line"></div>
          </div>
        );
      })}
    </div>
  );
};

export default BackgroundColumn;
