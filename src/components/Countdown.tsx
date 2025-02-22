"use client";

import { useState, useEffect, useCallback } from "react";
import CircularProgress from "./CircularProgress";

interface TimeLeft {
  Dias: number;
  Horas: number;
  Min: number;
  Seg: number;
}

const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      Dias: 0,
      Horas: 0,
      Min: 0,
      Seg: 0,
    };

    if (difference > 0) {
      timeLeft = {
        Dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Min: Math.floor((difference / 1000 / 60) % 60),
        Seg: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [targetDate]);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, targetDate]);

  const getProgressValue = (interval: keyof TimeLeft) => {
    const maxValues = {
      Dias: 30, // Asumiendo un mes máximo
      Horas: 24,
      Min: 60,
      Seg: 60,
    };
    return (
      ((maxValues[interval] - timeLeft[interval]) / maxValues[interval]) * 100
    );
  };

  return (
    <div className="flex justify-center space-x-4 text-2xl">
      {(Object.keys(timeLeft) as Array<keyof TimeLeft>).map((interval) => (
        <div key={interval} className="flex flex-col items-center">
          <CircularProgress
            label={timeLeft[interval]}
            value={getProgressValue(interval)}
            strokeWidth={3}
            interval={interval}
            color={"rgb(159 18 57)"}
          />
        </div>
      ))}
    </div>
  );
};

export default Countdown;
