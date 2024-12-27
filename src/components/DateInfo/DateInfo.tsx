import { useEffect, useState } from 'react';

import { months } from '../../constants';

import './DateInfo.scss';
import { getFormattedTime } from '../../utils';

export const DateInfo = () => {
  const [date, setDate] = useState<Date>(new Date());

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const hours = getFormattedTime(date.getHours());
  const minutes = getFormattedTime(date.getMinutes());

  useEffect(() => {
    const timer = setInterval(() => {
      const today = new Date();

      setDate(today);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p>Today</p>

      <div className="date">
        <p>{`${day} ${month}, ${year}`}</p>

        <div className="date__time">
          <div className="date__icon"></div>

          <p>{`${hours}:${minutes}`}</p>
        </div>
      </div>
    </div>
  );
};
