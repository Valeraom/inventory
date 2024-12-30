import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { months } from '../../constants';
import { getFormattedTime } from '../../utils';

import './DateInfo.scss';

export const DateInfo = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [activeSessions, setActiveSessions] = useState<number>(0);

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

    const socket: Socket = io('http://localhost:3000');
    socket.on('updateSessions', (count: number) => {
      setActiveSessions(count);
    });

    return () => {
      clearInterval(timer);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="date__container">
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

      <div className="date__sessions">
        <p>{`Кол-во сессий:`}</p>

        <p>{activeSessions}</p>
      </div>
    </div>
  );
};
