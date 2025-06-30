import './Clock.css'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const getMinutesSinceMidnight = (date) => {
  return date.getHours() * 60 + date.getMinutes();
};

function DayTime (date)
{
  let dayTime  = getMinutesSinceMidnight (date);
  if (dayTime < 360) return 'night';        // до 6 утра
  if (dayTime < 720) return 'morning';      // до 12
  if (dayTime < 1022) return 'afternoon';   // до 18
  return 'evening';                         // до 24
}

function DayOfWeek (date)
{
  const dayOfWeek = date.getDay();
  return dayOfWeek > 5 || dayOfWeek === 0 ? 'weekend' : 'weekday';
}

function TimeOfYear (date)
{
  const dayOfYear = date.getMonth();
  return dayOfYear > 4 & dayOfYear < 8 && 'summer';
}


// ===== СТИЛИ =====

const ClockWrapper = styled.div`
  padding: 20px;
  text-align: center;
  font-family: sans-serif;
  border-radius: 10px;

  background-color: ${({ timeOfYear }) =>
    timeOfYear === 'summer' ? '#fffae3' : '#f0f0f0'};
`;

const DateText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ dayType }) => (dayType === 'weekend' ? 'tomato' : '#333')};
`;

const TimeText = styled.div`
  font-size: 2rem;
  margin-top: 10px;
  color: ${({ dayTime }) => {
  switch (dayTime) {
    case 'night': return '#4a4e69';
    case 'morning': return '#ffb703';
    case 'afternoon': return '#219ebc';
    case 'evening': return '#6a0572';
    default: return '#000';
  }
}};
`;

// ===== СТИЛИ =====



export default function MyClock(){

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeOfYear = TimeOfYear(currentTime);
  const dayType = DayOfWeek(currentTime);
  const dayTime = DayTime(currentTime);

  return (
      <ClockWrapper timeOfYear={timeOfYear}>
        <DateText dayType={dayType}>{currentTime.toLocaleDateString()}</DateText>
        <TimeText dayTime={dayTime}>{currentTime.toLocaleTimeString()}</TimeText>
      </ClockWrapper>
  )
}