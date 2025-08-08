import React, { useState, useEffect, useCallback } from 'react';

interface CountdownProps {
  targetDate: string;
  guests: string[];
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, guests }) => {
  const calculateTimeLeft = useCallback((): TimeLeft | null => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    if (!timeLeft) {
        return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, timeLeft]);

  if (!timeLeft) {
    return (
        <section id="party-over" className="my-16 section-card text-center p-8">
            <h2 className="text-4xl font-black text-[var(--color-gold)] mb-4 animate-pulse-glow">¡Gracias por venir!</h2>
            <p className="text-xl text-white mb-6">Una vez más, gracias a todos los que vinieron a festejar conmigo. Lxs amo.</p>
            
            {guests && guests.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-lg text-[var(--color-warm-white)] max-w-3xl mx-auto p-4 bg-black/20 rounded-lg">
                  {guests.map((guest) => (
                    <span key={guest} className="font-bold transition-all hover:text-white hover:scale-110">
                      {guest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-2xl mt-8 font-bold text-white gold-text animate-pulse-glow">
                ¡Gracias por una noche increíble!
            </p>
        </section>
    );
  }

  const timeParts = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="my-16 section-card">
        <h2 className="text-4xl text-[var(--color-gold)] mb-6">¡La cuenta regresiva!</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {timeParts.map((part) => (
            <div key={part.label} className="bg-[var(--color-black)]/50 p-4 rounded-lg flex flex-col items-center justify-center transition-all duration-300 border-2 border-transparent hover:border-[var(--color-gold)]">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">{String(part.value).padStart(2, '0')}</span>
                <span className="text-sm font-bold text-[var(--color-gold)] uppercase">{part.label}</span>
            </div>
            ))}
      </div>
    </section>
  );
};

export default Countdown;