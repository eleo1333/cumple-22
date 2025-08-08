import React, { useState, useEffect, useRef } from 'react';
import Typewriter from 'https://esm.sh/typewriter-effect';
import { RsvpData, FaqItem, Attendance } from './types';
import Countdown from './components/Countdown';
import FaqItemComponent from './components/FaqItem';
import BackToTopButton from './components/BackToTopButton';
import FloatingNames from './components/FloatingNames';
import ScrollDownArrow from './components/ScrollDownArrow';

// For using GSAP with CDN
declare const gsap: any;
declare const ScrollTrigger: any;


// --- CONFIGURATION ---
// All user-editable content is here for easy modification.
const config = {
    eventName: "House Fiesta Party",
    eventSubName: "Cumplo 22",
    eventTaglinePrefix: "Una noche estrellada,",
    eventTaglineVariations: [
        "musiquita piola...",
        "y gente bonita.",
        "¿te la vas a perder?",
    ],
    eventDate: "2025-08-23T22:00:00-03:00", // Target date: August 23, 2025, 22:00 Argentina Time (UTC-3)
    googleSheetsScriptUrl: "https://script.google.com/macros/s/AKfycbzmTPyE4WyPdm9HBQW5ZBebAFXquJVKInZD07GfH4KguOpV177_5p7yfSSqQVxQcv04/exec", // Paste the URL from your deployed Google Apps Script
    location: "Calle 132 nº1511 (e/ 63 y 64)",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.838597371911!2d-57.9259207236173!3d-34.9356391728283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e7c9f8016259%3A0xe5f9b5c2a13b868!2sC.%20132%201511%2C%20B1904%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1719504543445!5m2!1sen!2sus",
    dateText: "Sábado 23 de Agosto",
    timeText: "22:00hs en adelante",
    gifUrl: "https://i.imgur.com/kqu5DH4.png",
    spotifyPlaylistChillUrl: "https://open.spotify.com/playlist/1JeGmHbKD5rSt8ger8aRMp?si=14f5d42531dc420e&pt=b67b3a97ab0d721462963171a0b9c9b5", // Example chill playlist
    spotifyPlaylistDanceUrl: "https://open.spotify.com/playlist/6CmtW1K3qr0Uw3hIC1wZYg?si=107ed93dc47e4c62&pt=4d768337ddf6960f0e27365aba5c702d", // Example dance playlist
    faqData: [
        { question: "¿Puedo llegar más tarde?", answer: "Claro, pero si llegás a la mañana ya es desayuno, no fiesta." },
        { question: "¿Qué te regalo?", answer: "Tu presencia <333 o algo para tomar que traigas para compartir, con eso toy joya." },
        { question: "¿Por qué no lo hacías el viernes 22 a las 22 bien icónico?", answer: "Porque curso los sábados 7 am 🙂" }
    ]
};
// --- END CONFIGURATION ---


const App: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState<RsvpData>({
        name: '',
        attendance: Attendance.YES,
        contribution: '',
        songSuggestion: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [captchaError, setCaptchaError] = useState(false);
    const [guestList, setGuestList] = useState<string[]>([]);

    const isNotAttending = formState.attendance === Attendance.NO;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(".header-title", { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
            gsap.from(".header-subtitle", { opacity: 0, y: -30, duration: 1, delay: 0.2, ease: 'power3.out' });
            gsap.from(".logo-container", { opacity: 0, scale: 0.8, duration: 1.2, delay: 0.4, ease: 'elastic.out(1, 0.75)' });

            const sections = gsap.utils.toArray('section');
            sections.forEach((section: any) => {
                gsap.from(section, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            });
        }, mainRef);
        
        return () => ctx.revert();
    }, []);

    useEffect(() => {
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
                    const names = (result.data as any[])
                        .map(item => (item ? String(item).trim() : ''))
                        .filter(item => item);
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

    useEffect(() => {
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
    }, []);

    useEffect(() => {
        if (isNotAttending) {
            setFormState(prevState => ({
                ...prevState,
                contribution: '',
            }));
        }
    }, [isNotAttending]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (parseInt(captchaAnswer, 10) !== num1 + num2) {
            setCaptchaError(true);
            return;
        }
        setCaptchaError(false);

        if (config.googleSheetsScriptUrl.includes("YOUR_GOOGLE_APPS_SCRIPT_URL") || !config.googleSheetsScriptUrl) {
            alert("Error: La URL de Google Apps Script no está configurada.");
            return;
        }
        setIsSubmitting(true);
        setIsError(false);
        
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const response = await fetch(config.googleSheetsScriptUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Network error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            if (result.result === "success") {
                setIsSubmitted(true);
                if (formState.name && formState.attendance !== Attendance.NO) {
                    setGuestList(prevGuests => [...new Set([...prevGuests, formState.name.trim()])]);
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

    return (
        <>
            <FloatingNames guests={guestList} />
            <main ref={mainRef} className="container mx-auto px-4 py-8 md:py-12 max-w-5xl text-center relative z-10">
                
                <div className="relative flex items-center justify-center min-h-[calc(100vh_-_6rem)] md:min-h-0 mb-16">
                    <header className="grid md:grid-cols-2 gap-8 items-center w-full">
                        <div className="text-center md:text-left">
                            <h1 className="header-title text-5xl md:text-6xl text-[var(--color-warm-white)] drop-shadow-lg flex flex-col items-center md:items-start">
                               <span>{config.eventName}</span>
                               <span className="gold-text text-6xl md:text-7xl -mt-2">{config.eventSubName} ✨</span>
                            </h1>
                            <div className="header-subtitle text-xl md:text-2xl text-[var(--color-light-gray)] mt-4 font-semibold min-h-[5rem] md:min-h-[2.5rem] flex justify-center md:justify-start items-center">
                                <div>
                                    <span>{config.eventTaglinePrefix}&nbsp;</span>
                                     <Typewriter
                                        options={{
                                            strings: config.eventTaglineVariations,
                                            autoStart: true,
                                            loop: true,
                                            delay: 60,
                                            deleteSpeed: 40,
                                            wrapperClassName: "inline-block gold-text font-bold",
                                            cursorClassName: "text-[var(--color-silver)]",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="logo-container flex justify-center items-center">
                            <div className="w-full mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--color-gold)]">
                                <img src={config.gifUrl} alt="Fiesta disco ball GIF" className="w-full h-full object-cover"/>
                            </div>
                        </div>
                    </header>
                    <ScrollDownArrow />
                </div>
                
                <Countdown targetDate={config.eventDate} guests={guestList} />

                <section id="details" className="section-card my-16">
                    <h2 className="text-4xl text-[var(--color-gold)] mb-6">Detalles del evento</h2>
                    <div className="flex flex-col items-center gap-4 text-center text-lg">
                        <p className="font-bold text-white">📅 Fecha: <span className="font-normal text-[var(--color-light-gray)]">{config.dateText}</span></p>
                         <p className="font-bold text-white">⏰ Horario: <span className="font-normal text-[var(--color-light-gray)]">{config.timeText}</span></p>
                        <p className="font-bold text-white">📍 Lugar: <span className="font-normal text-[var(--color-light-gray)]">{config.location}</span></p>
                        
                        <iframe
                            src={config.googleMapsEmbedUrl}
                            className="w-full max-w-lg h-64 mt-2 rounded-xl border-2 border-[var(--color-deep-blue)]"
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación del evento en Google Maps"
                        ></iframe>
                    </div>
                </section>
                
                <section id="playlist" className="section-card my-16">
                    <h2 className="text-4xl text-[var(--color-gold)] mb-4">Sumá tu magia a la música</h2>
                    <p className="text-[var(--color-light-gray)] mb-6 max-w-2xl mx-auto">La noche necesita tus temazos. Agregá lo que no puede faltar en dos modos distintos:</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                        <a href={config.spotifyPlaylistChillUrl} target="_blank" rel="noopener noreferrer" title="Abrir playlist chill" className="inline-block bg-[var(--color-medium-blue)] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-[var(--color-deep-blue)] transition-all duration-300 transform hover:scale-105">
                            🎧 Playlist chill
                        </a>
                        <a href={config.spotifyPlaylistDanceUrl} target="_blank" rel="noopener noreferrer" title="Abrir playlist para bailar" className="inline-block bg-[var(--color-gold)] text-[var(--color-black)] font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
                            💃 Playlist bailable
                        </a>
                    </div>
                </section>
                
                <section id="extras" className="section-card my-16 text-left">
                     <h2 className="text-4xl text-[var(--color-gold)] mb-6 text-center">Tené en cuenta</h2>
                     <ul className="space-y-4 text-[var(--color-light-gray)] text-lg">
                        <li className="flex items-start"><span className="gold-text mr-3 text-xl">🍹</span><div><span className="font-bold text-white">Bebidas:</span> Podés traer lo que tomes como para colaborar, igual va a haber acá pero se agradecería.</div></li>
                        <li className="flex items-start"><span className="gold-text mr-3 text-xl">🍔</span><div><span className="font-bold text-white">Comida:</span> Hay torta de cumpleaños y heladito, pero vení cenado (sobre todo si vas a tomar, porfi).</div></li>
                        <li className="flex items-start"><span className="gold-text mr-3 text-xl">🕑</span><div><span className="font-bold text-white">Horarios:</span> Mientras para las 11 am no haya nadie, todo bien.</div></li>
                        <li className="flex items-start"><span className="gold-text mr-3 text-xl">😴</span><div><span className="font-bold text-white">Si te quedás a dormir:</span> Nadie puede dormir, beso.</div></li>
                     </ul>
                </section>

                 <section id="rsvp" className="section-card my-16">
                     <h2 className="text-4xl text-[var(--color-gold)] mb-6">Confirmá tu asistencia</h2>
                    {isSubmitted ? (
                        <div className="text-center p-8 bg-green-500/20 border border-green-500 rounded-lg">
                            <h3 className="text-2xl font-bold text-white">¡Gracias por confirmar! 😄</h3>
                            <p className="text-green-300 mt-2">¡Tus datos fueron enviados! Te espero para festejar.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-[var(--color-light-gray)] mb-2">Tu nombre:</label>
                                <input type="text" id="name" name="name" value={formState.name} onChange={handleInputChange} className="w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" required />
                            </div>
                            <div>
                                <label htmlFor="attendance" className="block text-sm font-bold text-[var(--color-light-gray)] mb-2">¿VAS A VENIR? 👀 (más te vale)</label>
                                <select id="attendance" name="attendance" value={formState.attendance} onChange={handleInputChange} className="w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]">
                                    {Object.values(Attendance).map(val => <option key={val} value={val}>{val}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="contribution" className="block text-sm font-bold text-[var(--color-light-gray)] mb-2">¿Traés algo para compartir? (Opcional)</label>
                                <input type="text" id="contribution" name="contribution" value={formState.contribution} onChange={handleInputChange} placeholder="Ej: Un vinito, unas papitas, tu presencia estelar" disabled={isNotAttending} className="w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed" />
                            </div>
                             <div>
                                <label htmlFor="songSuggestion" className="block text-sm font-bold text-[var(--color-light-gray)] mb-2">Sugerí una canción (o un artista):</label>
                                <input type="text" id="songSuggestion" name="songSuggestion" value={formState.songSuggestion} onChange={handleInputChange} placeholder="Nombre del tema o link de Spotify" className="w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-[var(--color-light-gray)] mb-2">Dejame un mensaje a mí (mua):</label>
                                <textarea id="message" name="message" rows={3} value={formState.message} onChange={handleInputChange} placeholder="¡Feliz cumple, diosa astral!" className="w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"></textarea>
                            </div>
                            
                            <div className="pt-2">
                                <label htmlFor="captcha" className="block text-sm font-bold text-[var(--color-light-gray)] mb-2">Verificación anti-bots: ¿Cuánto es {num1} + {num2}?</label>
                                <input
                                    type="number"
                                    id="captcha"
                                    name="captcha"
                                    value={captchaAnswer}
                                    onChange={(e) => {
                                        setCaptchaAnswer(e.target.value);
                                        setCaptchaError(false);
                                    }}
                                    className="w-full bg-[var(--color-black)] border-2 border-gray-600 rounded-md py-2 px-3 text-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                                    required
                                    aria-describedby="captcha-error"
                                />
                                {captchaError && <p id="captcha-error" className="mt-2 text-red-500 font-bold text-sm">Respuesta incorrecta. ¡Intenta de nuevo!</p>}
                            </div>

                             {isError && <p className="text-center text-red-400 font-bold">Hubo un error al enviar. Por favor, intentá de nuevo.</p>}
                            <div className="text-center pt-4">
                                <button type="submit" disabled={isSubmitting} className="bg-[var(--color-gold)] text-[var(--color-black)] font-bold py-3 px-10 rounded-full text-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[var(--color-gold)] disabled:bg-gray-500 disabled:cursor-not-allowed">
                                    {isSubmitting ? 'Enviando...' : 'Enviar Confirmación'}
                                </button>
                            </div>
                        </form>
                    )}
                </section>
                
                <section id="faq" className="my-16 text-left">
                     <h2 className="text-4xl text-[var(--color-gold)] mb-6 text-center">Preguntas Frecuentes</h2>
                     <div className="section-card">
                        {config.faqData.map((item, index) => <FaqItemComponent key={index} question={item.question} answer={item.answer} />)}
                     </div>
                </section>
                
                <footer className="mt-16 py-8 border-t-2 border-gray-700/50">
                    <p className="text-2xl text-[var(--color-gold)] mt-8 font-bold font-['Playfair_Display'] animate-pulse-glow flex justify-center items-center gap-x-2">
                        <span>Te espero</span>
                       <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 81.63 115.38"
  fill="currentColor"
  class="w-6 h-6"
  aria-hidden="true"
  preserveAspectRatio="xMidYMid meet"
>
  <path d="M81.63.15v10.26c0,.7-1.24,1.37-1.89,1.3H14.36c-3.34.21-3.52,4.18-2.48,6.58,2.54,3.46,5.34,6.73,7.94,10.15,3.37,4.43,6.76,9.8,10.43,13.89.4.45,1.62,1.3,2.2,1.3h48.72v12.47h-44.31c-.05,0-.89.19-.99.22-.79.27-1.39.96-1.37,1.82,2.79,13.67,3.14,27.34-3.31,40.01-.71,1.39-2.85,4.24-2.78,5.6.03.58.53,1.59,1.15,1.59h51.76v8.28c0,.1-.22.95-.3,1.07-.11.2-.81.68-1,.68H.46c-.22-21.76.29-43.54,0-65.3,0-.43-.16-.8-.17-1.2-.02-1.05-.16-3.2.01-4.11.05-.25.16-.42.41-.51,4.77-.37,9.56-.03,14.34-.26C11.17,37.2,5.93,31.3.18,26.04L0,0l81.63.15ZM18.21,56.29c-1.18.03-3.99-.04-4.82.23-.84.27-1.49,1.2-1.59,2.06v43.02c.16,1.72,1.77,2.8,3.43,2.21,1.43-.51,3.12-3.57,3.89-4.92,6.87-12.05,7.69-25.83,3.55-39.02-.93-2.95-1.01-3.68-4.36-3.6Z"/>
</svg>
                        <span>Eleonora</span>
                    </p>
                </footer>
            </main>
            <BackToTopButton />
        </>
    );
};

export default App;