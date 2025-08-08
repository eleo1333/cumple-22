// index.tsx
import React6 from "react";
import ReactDOM from "react-dom/client";

// App.tsx
import { useState as useState5, useEffect as useEffect4, useRef as useRef2 } from "react";
import Typewriter from "https://esm.sh/typewriter-effect";

// types.ts
var Attendance = /* @__PURE__ */ ((Attendance2) => {
  Attendance2["YES"] = "S\xED, obvio";
  Attendance2["NO"] = "No puedo :(";
  Attendance2["MAYBE"] = "Capaz caigo";
  return Attendance2;
})(Attendance || {});

// components/Countdown.tsx
import { useState, useEffect, useCallback } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Countdown = ({ targetDate, guests }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +/* @__PURE__ */ new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1e3 * 60 * 60 * 24)),
        hours: Math.floor(difference / (1e3 * 60 * 60) % 24),
        minutes: Math.floor(difference / 1e3 / 60 % 60),
        seconds: Math.floor(difference / 1e3 % 60)
      };
    }
    return null;
  }, [targetDate]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    if (!timeLeft) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1e3);
    return () => clearInterval(timer);
  }, [calculateTimeLeft, timeLeft]);
  if (!timeLeft) {
    return /* @__PURE__ */ jsxs("section", { id: "party-over", className: "my-16 section-card text-center p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black text-[var(--color-gold)] mb-4 animate-pulse-glow", children: "\xA1Gracias por venir!" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-white mb-6", children: "Una vez m\xE1s, gracias a todos los que vinieron a festejar conmigo. Lxs amo." }),
      guests && guests.length > 0 && /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-lg text-[var(--color-warm-white)] max-w-3xl mx-auto p-4 bg-black/20 rounded-lg", children: guests.map((guest) => /* @__PURE__ */ jsx("span", { className: "font-bold transition-all hover:text-white hover:scale-110", children: guest }, guest)) }) }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl mt-8 font-bold text-white gold-text animate-pulse-glow", children: "\xA1Gracias por una noche incre\xEDble!" })
    ] });
  }
  const timeParts = [
    { label: "D\xEDas", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "countdown", className: "my-16 section-card", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-4xl text-[var(--color-gold)] mb-6", children: "\xA1La cuenta regresiva!" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto", children: timeParts.map((part) => /* @__PURE__ */ jsxs("div", { className: "bg-[var(--color-black)]/50 p-4 rounded-lg flex flex-col items-center justify-center transition-all duration-300 border-2 border-transparent hover:border-[var(--color-gold)]", children: [
      /* @__PURE__ */ jsx("span", { className: "text-4xl md:text-5xl font-black text-white tracking-tighter", children: String(part.value).padStart(2, "0") }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-[var(--color-gold)] uppercase", children: part.label })
    ] }, part.label)) })
  ] });
};
var Countdown_default = Countdown;

// components/FaqItem.tsx
import { useState as useState2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ChevronDownIcon = ({ className }) => /* @__PURE__ */ jsx2("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 3, stroke: "currentColor", className, children: /* @__PURE__ */ jsx2("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" }) });
var FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState2(false);
  return /* @__PURE__ */ jsxs2("div", { className: "py-4", children: [
    /* @__PURE__ */ jsxs2(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "w-full flex justify-between items-center text-left text-lg font-semibold text-white hover:text-[var(--color-gold)] transition-colors duration-200 focus:outline-none",
        "aria-expanded": isOpen,
        children: [
          /* @__PURE__ */ jsx2("span", { children: question }),
          /* @__PURE__ */ jsx2(ChevronDownIcon, { className: `w-5 h-5 text-[var(--color-gold)] shrink-0 transform transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}` })
        ]
      }
    ),
    /* @__PURE__ */ jsx2(
      "div",
      {
        className: `grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}`,
        children: /* @__PURE__ */ jsx2("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx2("p", { className: "text-[var(--color-light-gray)] pr-6", children: answer }) })
      }
    )
  ] });
};
var FaqItem_default = FaqItem;

// components/BackToTopButton.tsx
import { useState as useState3, useEffect as useEffect2 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState3(false);
  useEffect2(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsx3(
    "button",
    {
      onClick: scrollToTop,
      className: `fixed bottom-6 right-6 bg-[var(--color-gold)] text-black p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-black)] focus:ring-[var(--color-gold)] z-50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`,
      "aria-label": "Volver arriba",
      children: /* @__PURE__ */ jsx3("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 3, stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx3("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" }) })
    }
  );
};
var BackToTopButton_default = BackToTopButton;

// components/FloatingNames.tsx
import { useState as useState4, useEffect as useEffect3, useRef } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var createNameStyle = () => {
  const scale = Math.random() * 0.4 + 0.9;
  const rotation = Math.random() * 50 - 25;
  return {
    top: `${Math.random() * 95}%`,
    left: `${Math.random() * 95}%`,
    transform: `rotate(${rotation}deg) scale(${scale})`,
    fontSize: `${Math.random() * 1.2 + 1.2}rem`,
    opacity: Math.random() * 0.15 + 0.05
    // made more subtle
  };
};
var FloatingNames = ({ guests }) => {
  const [positions, setPositions] = useState4(/* @__PURE__ */ new Map());
  const [visible, setVisible] = useState4(false);
  const animationTimeoutRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const updatePositions = () => {
    const newMap = /* @__PURE__ */ new Map();
    guests.forEach((name) => {
      newMap.set(name, createNameStyle());
    });
    setPositions(newMap);
  };
  useEffect3(() => {
    if (guests.length === 0) {
      setVisible(false);
      return;
    }
    const runAnimationCycle = () => {
      setVisible(false);
      animationTimeoutRef.current = window.setTimeout(() => {
        updatePositions();
        setVisible(true);
      }, 1e3);
    };
    updatePositions();
    animationTimeoutRef.current = window.setTimeout(() => {
      setVisible(true);
    }, 100);
    animationIntervalRef.current = window.setInterval(runAnimationCycle, 1e4);
    window.addEventListener("resize", updatePositions);
    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      window.removeEventListener("resize", updatePositions);
    };
  }, [guests]);
  if (!guests.length) return null;
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: "fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden pointer-events-none",
      "aria-hidden": "true",
      children: guests.map((name) => {
        const style = positions.get(name);
        if (!style) return null;
        return /* @__PURE__ */ jsx4(
          "span",
          {
            className: "absolute font-bold whitespace-nowrap font-['Playfair_Display']",
            style: {
              top: style.top,
              left: style.left,
              transform: style.transform,
              fontSize: style.fontSize,
              color: "var(--color-warm-white)",
              opacity: visible ? style.opacity : 0,
              transition: "opacity 1s ease-in-out"
            },
            children: name
          },
          name
        );
      })
    }
  );
};
var FloatingNames_default = FloatingNames;

// components/ScrollDownArrow.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var ScrollDownArrow = () => {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: "absolute bottom-4 -translate-x-1/2 md:hidden animate-bounce z-20 pointer-events-none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx5(
        "svg",
        {
          className: "w-10 h-10 text-[var(--color-gold)] drop-shadow-lg",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 3,
          stroke: "currentColor",
          children: /* @__PURE__ */ jsx5(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "m19.5 8.25-7.5 7.5-7.5-7.5"
            }
          )
        }
      )
    }
  );
};
var ScrollDownArrow_default = ScrollDownArrow;

// App.tsx
import { Fragment, jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var config = {
  eventName: "House Fiesta Party",
  eventSubName: "Cumplo 22",
  eventTaglinePrefix: "Una noche estrellada,",
  eventTaglineVariations: [
    "musiquita piola...",
    "y gente bonita.",
    "\xBFte la vas a perder?"
  ],
  eventDate: "2025-08-23T22:00:00-03:00",
  // Target date: August 23, 2025, 22:00 Argentina Time (UTC-3)
  googleSheetsScriptUrl: "https://script.google.com/macros/s/AKfycbzmTPyE4WyPdm9HBQW5ZBebAFXquJVKInZD07GfH4KguOpV177_5p7yfSSqQVxQcv04/exec",
  // Paste the URL from your deployed Google Apps Script
  location: "Calle 132 n\xBA1511 (e/ 63 y 64)",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.838597371911!2d-57.9259207236173!3d-34.9356391728283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e7c9f8016259%3A0xe5f9b5c2a13b868!2sC.%20132%201511%2C%20B1904%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1719504543445!5m2!1sen!2sus",
  dateText: "S\xE1bado 23 de Agosto",
  timeText: "22:00hs en adelante",
  gifUrl: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDM3cG5ldTMyZ2sxaW11bW44Zms1ajdycmJqdHhmbTFoaHRhbXpubyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/97wAdyX0zBVhfnejhJ/giphy.gif",
  spotifyPlaylistChillUrl: "https://open.spotify.com/playlist/1JeGmHbKD5rSt8ger8aRMp?si=14f5d42531dc420e&pt=b67b3a97ab0d721462963171a0b9c9b5",
  // Example chill playlist
  spotifyPlaylistDanceUrl: "https://open.spotify.com/playlist/6CmtW1K3qr0Uw3hIC1wZYg?si=107ed93dc47e4c62&pt=4d768337ddf6960f0e27365aba5c702d",
  // Example dance playlist
  faqData: [
    { question: "\xBFPuedo llegar m\xE1s tarde?", answer: "Claro, pero si lleg\xE1s a la ma\xF1ana ya es desayuno, no fiesta." },
    { question: "\xBFQu\xE9 te regalo?", answer: "Tu presencia <333 o algo para tomar que traigas para compartir, con eso toy joya." },
    { question: "\xBFPor qu\xE9 no lo hac\xEDas el viernes 22 a las 22 bien ic\xF3nico?", answer: "Porque curso los s\xE1bados 7 am \u{1F642}" }
  ]
};
var App = () => {
  const mainRef = useRef2(null);
  const [formState, setFormState] = useState5({
    name: "",
    attendance: "S\xED, obvio" /* YES */,
    contribution: "",
    songSuggestion: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState5(false);
  const [isSubmitted, setIsSubmitted] = useState5(false);
  const [isError, setIsError] = useState5(false);
  const [num1, setNum1] = useState5(0);
  const [num2, setNum2] = useState5(0);
  const [captchaAnswer, setCaptchaAnswer] = useState5("");
  const [captchaError, setCaptchaError] = useState5(false);
  const [guestList, setGuestList] = useState5([]);
  const isNotAttending = formState.attendance === "No puedo :(" /* NO */;
  useEffect4(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".header-title", { opacity: 0, y: -50, duration: 1, ease: "power3.out" });
      gsap.from(".header-subtitle", { opacity: 0, y: -30, duration: 1, delay: 0.2, ease: "power3.out" });
      gsap.from(".logo-container", { opacity: 0, scale: 0.8, duration: 1.2, delay: 0.4, ease: "elastic.out(1, 0.75)" });
      const sections = gsap.utils.toArray("section");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);
  useEffect4(() => {
    const fetchGuests = async () => {
      if (!config.googleSheetsScriptUrl || config.googleSheetsScriptUrl.includes("YOUR_GOOGLE_APPS_SCRIPT_URL")) {
        console.log("Google Sheets URL not configured. Skipping guest fetch.");
        return;
      }
      try {
        const response = await fetch(config.googleSheetsScriptUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch guest list");
        }
        const result = await response.json();
        if (result.result === "success" && Array.isArray(result.data)) {
          const names = result.data.map((item) => item ? String(item).trim() : "").filter((item) => item);
          const uniqueNames = [...new Set(names)];
          setGuestList(uniqueNames);
        } else {
          throw new Error(result.error || "Malformed data from guest list fetch");
        }
      } catch (error) {
        console.error("Could not fetch guest list:", error);
      }
    };
    fetchGuests();
  }, []);
  useEffect4(() => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  }, []);
  useEffect4(() => {
    if (isNotAttending) {
      setFormState((prevState) => ({
        ...prevState,
        contribution: ""
      }));
    }
  }, [isNotAttending]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(captchaAnswer, 10) !== num1 + num2) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    if (config.googleSheetsScriptUrl.includes("YOUR_GOOGLE_APPS_SCRIPT_URL") || !config.googleSheetsScriptUrl) {
      alert("Error: La URL de Google Apps Script no est\xE1 configurada.");
      return;
    }
    setIsSubmitting(true);
    setIsError(false);
    const formData = new FormData(e.target);
    try {
      const response = await fetch(config.googleSheetsScriptUrl, {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        throw new Error(`Network error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      if (result.result === "success") {
        setIsSubmitted(true);
        if (formState.name && formState.attendance !== "No puedo :(" /* NO */) {
          setGuestList((prevGuests) => [.../* @__PURE__ */ new Set([...prevGuests, formState.name.trim()])]);
        }
      } else {
        throw new Error(result.error || "An unknown error occurred in the script.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsx6(FloatingNames_default, { guests: guestList }),
    /* @__PURE__ */ jsxs3("main", { ref: mainRef, className: "container mx-auto px-4 py-8 md:py-12 max-w-5xl text-center relative z-10", children: [
      /* @__PURE__ */ jsxs3("div", { className: "relative flex items-center justify-center min-h-[calc(100vh_-_6rem)] md:min-h-0 mb-16", children: [
        /* @__PURE__ */ jsxs3("header", { className: "grid md:grid-cols-2 gap-8 items-center w-full", children: [
          /* @__PURE__ */ jsxs3("div", { className: "text-center md:text-left", children: [
            /* @__PURE__ */ jsxs3("h1", { className: "header-title text-5xl md:text-6xl text-[var(--color-warm-white)] drop-shadow-lg flex flex-col items-center md:items-start", children: [
              /* @__PURE__ */ jsx6("span", { children: config.eventName }),
              /* @__PURE__ */ jsxs3("span", { className: "gold-text text-6xl md:text-7xl -mt-2", children: [
                config.eventSubName,
                " \u2728"
              ] })
            ] }),
            /* @__PURE__ */ jsx6("div", { className: "header-subtitle text-xl md:text-2xl text-[var(--color-light-gray)] mt-4 font-semibold min-h-[5rem] md:min-h-[2.5rem] flex justify-center md:justify-start items-center", children: /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsxs3("span", { children: [
                config.eventTaglinePrefix,
                "\xA0"
              ] }),
              /* @__PURE__ */ jsx6(
                Typewriter,
                {
                  options: {
                    strings: config.eventTaglineVariations,
                    autoStart: true,
                    loop: true,
                    delay: 60,
                    deleteSpeed: 40,
                    wrapperClassName: "inline-block gold-text font-bold",
                    cursorClassName: "text-[var(--color-silver)]"
                  }
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsx6("div", { className: "logo-container flex justify-center items-center", children: /* @__PURE__ */ jsx6("div", { className: "w-full mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--color-gold)]", children: /* @__PURE__ */ jsx6("img", { src: config.gifUrl, alt: "Fiesta disco ball GIF", className: "w-full h-full object-cover" }) }) })
        ] }),
        /* @__PURE__ */ jsx6(ScrollDownArrow_default, {})
      ] }),
      /* @__PURE__ */ jsx6(Countdown_default, { targetDate: config.eventDate, guests: guestList }),
      /* @__PURE__ */ jsxs3("section", { id: "details", className: "section-card my-16", children: [
        /* @__PURE__ */ jsx6("h2", { className: "text-4xl text-[var(--color-gold)] mb-6", children: "Detalles del evento" }),
        /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center gap-4 text-center text-lg", children: [
          /* @__PURE__ */ jsxs3("p", { className: "font-bold text-white", children: [
            "\u{1F4C5} Fecha: ",
            /* @__PURE__ */ jsx6("span", { className: "font-normal text-[var(--color-light-gray)]", children: config.dateText })
          ] }),
          /* @__PURE__ */ jsxs3("p", { className: "font-bold text-white", children: [
            "\u23F0 Horario: ",
            /* @__PURE__ */ jsx6("span", { className: "font-normal text-[var(--color-light-gray)]", children: config.timeText })
          ] }),
          /* @__PURE__ */ jsxs3("p", { className: "font-bold text-white", children: [
            "\u{1F4CD} Lugar: ",
            /* @__PURE__ */ jsx6("span", { className: "font-normal text-[var(--color-light-gray)]", children: config.location })
          ] }),
          /* @__PURE__ */ jsx6(
            "iframe",
            {
              src: config.googleMapsEmbedUrl,
              className: "w-full max-w-lg h-64 mt-2 rounded-xl border-2 border-[var(--color-deep-blue)]",
              allowFullScreen: false,
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              title: "Ubicaci\xF3n del evento en Google Maps"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "playlist", className: "section-card my-16", children: [
        /* @__PURE__ */ jsx6("h2", { className: "text-4xl text-[var(--color-gold)] mb-4", children: "Sum\xE1 tu magia a la m\xFAsica" }),
        /* @__PURE__ */ jsx6("p", { className: "text-[var(--color-light-gray)] mb-6 max-w-2xl mx-auto", children: "La noche necesita tus temazos. Agreg\xE1 lo que no puede faltar en dos modos distintos:" }),
        /* @__PURE__ */ jsxs3("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mt-6", children: [
          /* @__PURE__ */ jsx6("a", { href: config.spotifyPlaylistChillUrl, target: "_blank", rel: "noopener noreferrer", title: "Abrir playlist chill", className: "inline-block bg-[var(--color-medium-blue)] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-[var(--color-deep-blue)] transition-all duration-300 transform hover:scale-105", children: "\u{1F3A7} Playlist chill" }),
          /* @__PURE__ */ jsx6("a", { href: config.spotifyPlaylistDanceUrl, target: "_blank", rel: "noopener noreferrer", title: "Abrir playlist para bailar", className: "inline-block bg-[var(--color-gold)] text-[var(--color-black)] font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105", children: "\u{1F483} Playlist bailable" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "extras", className: "section-card my-16 text-left", children: [
        /* @__PURE__ */ jsx6("h2", { className: "text-4xl text-[var(--color-gold)] mb-6 text-center", children: "Ten\xE9 en cuenta" }),
        /* @__PURE__ */ jsxs3("ul", { className: "space-y-4 text-[var(--color-light-gray)] text-lg", children: [
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx6("span", { className: "gold-text mr-3 text-xl", children: "\u{1F379}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx6("span", { className: "font-bold text-white", children: "Bebidas:" }),
              " Pod\xE9s traer lo que tomes como para colaborar, igual va a haber ac\xE1 pero se agradecer\xEDa."
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx6("span", { className: "gold-text mr-3 text-xl", children: "\u{1F354}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx6("span", { className: "font-bold text-white", children: "Comida:" }),
              " Hay torta de cumplea\xF1os y heladito, pero ven\xED cenado (sobre todo si vas a tomar, porfi)."
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx6("span", { className: "gold-text mr-3 text-xl", children: "\u{1F551}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx6("span", { className: "font-bold text-white", children: "Horarios:" }),
              " Mientras para las 11 am no haya nadie, todo bien."
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx6("span", { className: "gold-text mr-3 text-xl", children: "\u{1F634}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx6("span", { className: "font-bold text-white", children: "Si te qued\xE1s a dormir:" }),
              " Nadie puede dormir, beso."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "rsvp", className: "section-card my-16", children: [
        /* @__PURE__ */ jsx6("h2", { className: "text-4xl text-[var(--color-gold)] mb-6", children: "Confirm\xE1 tu asistencia" }),
        isSubmitted ? /* @__PURE__ */ jsxs3("div", { className: "text-center p-8 bg-green-500/20 border border-green-500 rounded-lg", children: [
          /* @__PURE__ */ jsx6("h3", { className: "text-2xl font-bold text-white", children: "\xA1Gracias por confirmar! \u{1F604}" }),
          /* @__PURE__ */ jsx6("p", { className: "text-green-300 mt-2", children: "\xA1Tus datos fueron enviados! Te espero para festejar." })
        ] }) : /* @__PURE__ */ jsxs3("form", { onSubmit: handleSubmit, className: "space-y-6 text-left", children: [
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx6("label", { htmlFor: "name", className: "block text-sm font-bold text-[var(--color-light-gray)] mb-2", children: "Tu nombre:" }),
            /* @__PURE__ */ jsx6("input", { type: "text", id: "name", name: "name", value: formState.name, onChange: handleInputChange, className: "w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]", required: true })
          ] }),
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx6("label", { htmlFor: "attendance", className: "block text-sm font-bold text-[var(--color-light-gray)] mb-2", children: "\xBFVAS A VENIR? \u{1F440} (m\xE1s te vale)" }),
            /* @__PURE__ */ jsx6("select", { id: "attendance", name: "attendance", value: formState.attendance, onChange: handleInputChange, className: "w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]", children: Object.values(Attendance).map((val) => /* @__PURE__ */ jsx6("option", { value: val, children: val }, val)) })
          ] }),
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx6("label", { htmlFor: "contribution", className: "block text-sm font-bold text-[var(--color-light-gray)] mb-2", children: "\xBFTra\xE9s algo para compartir? (Opcional)" }),
            /* @__PURE__ */ jsx6("input", { type: "text", id: "contribution", name: "contribution", value: formState.contribution, onChange: handleInputChange, placeholder: "Ej: Un vinito, unas papitas, tu presencia estelar", disabled: isNotAttending, className: "w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx6("label", { htmlFor: "songSuggestion", className: "block text-sm font-bold text-[var(--color-light-gray)] mb-2", children: "Suger\xED una canci\xF3n (o un artista):" }),
            /* @__PURE__ */ jsx6("input", { type: "text", id: "songSuggestion", name: "songSuggestion", value: formState.songSuggestion, onChange: handleInputChange, placeholder: "Nombre del tema o link de Spotify", className: "w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx6("label", { htmlFor: "message", className: "block text-sm font-bold text-[var(--color-light-gray)] mb-2", children: "Dejame un mensaje a m\xED (mua):" }),
            /* @__PURE__ */ jsx6("textarea", { id: "message", name: "message", rows: 3, value: formState.message, onChange: handleInputChange, placeholder: "\xA1Feliz cumple, diosa astral!", className: "w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "pt-2", children: [
            /* @__PURE__ */ jsxs3("label", { htmlFor: "captcha", className: "block text-sm font-bold text-[var(--color-light-gray)] mb-2", children: [
              "Verificaci\xF3n anti-bots: \xBFCu\xE1nto es ",
              num1,
              " + ",
              num2,
              "?"
            ] }),
            /* @__PURE__ */ jsx6(
              "input",
              {
                type: "number",
                id: "captcha",
                name: "captcha",
                value: captchaAnswer,
                onChange: (e) => {
                  setCaptchaAnswer(e.target.value);
                  setCaptchaError(false);
                },
                className: "w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]",
                required: true,
                "aria-describedby": "captcha-error"
              }
            ),
            captchaError && /* @__PURE__ */ jsx6("p", { id: "captcha-error", className: "mt-2 text-red-500 font-bold text-sm", children: "Respuesta incorrecta. \xA1Intenta de nuevo!" })
          ] }),
          isError && /* @__PURE__ */ jsx6("p", { className: "text-center text-red-400 font-bold", children: "Hubo un error al enviar. Por favor, intent\xE1 de nuevo." }),
          /* @__PURE__ */ jsx6("div", { className: "text-center pt-4", children: /* @__PURE__ */ jsx6("button", { type: "submit", disabled: isSubmitting, className: "bg-[var(--color-gold)] text-[var(--color-black)] font-bold py-3 px-10 rounded-full text-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[var(--color-gold)] disabled:bg-gray-500 disabled:cursor-not-allowed", children: isSubmitting ? "Enviando..." : "Enviar Confirmaci\xF3n" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "faq", className: "my-16 text-left", children: [
        /* @__PURE__ */ jsx6("h2", { className: "text-4xl text-[var(--color-gold)] mb-6 text-center", children: "Preguntas Frecuentes" }),
        /* @__PURE__ */ jsx6("div", { className: "section-card", children: config.faqData.map((item, index) => /* @__PURE__ */ jsx6(FaqItem_default, { question: item.question, answer: item.answer }, index)) })
      ] }),
      /* @__PURE__ */ jsx6("footer", { className: "mt-16 py-8 border-t-2 border-gray-700/50", children: /* @__PURE__ */ jsxs3("p", { className: "text-2xl text-[var(--color-gold)] mt-8 font-bold font-['Playfair_Display'] animate-pulse-glow flex justify-center items-center gap-x-2", children: [
        /* @__PURE__ */ jsx6("span", { children: "Te espero" }),
        /* @__PURE__ */ jsx6(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 81.63 115.38",
            fill: "currentColor",
            class: "w-6 h-6",
            "aria-hidden": "true",
            preserveAspectRatio: "xMidYMid meet",
            children: /* @__PURE__ */ jsx6("path", { d: "M81.63.15v10.26c0,.7-1.24,1.37-1.89,1.3H14.36c-3.34.21-3.52,4.18-2.48,6.58,2.54,3.46,5.34,6.73,7.94,10.15,3.37,4.43,6.76,9.8,10.43,13.89.4.45,1.62,1.3,2.2,1.3h48.72v12.47h-44.31c-.05,0-.89.19-.99.22-.79.27-1.39.96-1.37,1.82,2.79,13.67,3.14,27.34-3.31,40.01-.71,1.39-2.85,4.24-2.78,5.6.03.58.53,1.59,1.15,1.59h51.76v8.28c0,.1-.22.95-.3,1.07-.11.2-.81.68-1,.68H.46c-.22-21.76.29-43.54,0-65.3,0-.43-.16-.8-.17-1.2-.02-1.05-.16-3.2.01-4.11.05-.25.16-.42.41-.51,4.77-.37,9.56-.03,14.34-.26C11.17,37.2,5.93,31.3.18,26.04L0,0l81.63.15ZM18.21,56.29c-1.18.03-3.99-.04-4.82.23-.84.27-1.49,1.2-1.59,2.06v43.02c.16,1.72,1.77,2.8,3.43,2.21,1.43-.51,3.12-3.57,3.89-4.92,6.87-12.05,7.69-25.83,3.55-39.02-.93-2.95-1.01-3.68-4.36-3.6Z" })
          }
        ),
        /* @__PURE__ */ jsx6("span", { children: "Eleonora" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx6(BackToTopButton_default, {})
  ] });
};
var App_default = App;

// index.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
var root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsx7(React6.StrictMode, { children: /* @__PURE__ */ jsx7(App_default, {}) })
);
