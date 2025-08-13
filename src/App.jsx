import { useState, useEffect, Suspense } from "react";
import { useProgress } from "@react-three/drei";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import { Canvas } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";

import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { DynamicModel, preloadModels } from "./components/DynamicModel";
import { useFrame, useThree } from "@react-three/fiber";
import LiquidGlassTabs from "./components/ui/liquidglasstabs"; // Make sure path is correct

function easeInOutBack(t) {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
}

function CameraAnimator({ progress }) {
  const camera = useThree((state) => state.camera);
  // Detect mobile with a media query
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  useFrame(() => {
    const angleRange = 30; // degrees
    const startAngle = -15;
    const angle = startAngle + progress * angleRange;
    const rad = (angle * Math.PI) / 180;
    const baseRadius = 100;
    const radius = isMobile ? baseRadius * 3.5 : baseRadius;

    camera.position.x = Math.sin(rad) * radius;
    camera.position.z = Math.cos(rad) * radius;
    camera.position.y = 0;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

import { useRef } from "react";
export function Hero({ titles, scrollProgress, setIndex }) {
  // Determine index from scrollProgress
  const lastIndex = useRef(0);
  const timeoutRef = useRef();
  let index;
  if (scrollProgress < 0.2) {
    index = 0; // Vision
  } else if (scrollProgress < 0.7) {
    index = 1; // GeoWorks
  } else {
    index = 2; // Studios
  }

  // Debounce setIndex so it only updates after scrolling stops for 200ms
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (lastIndex.current !== index) {
        setIndex(index);
        lastIndex.current = index;
      }
    }, 200);
    return () => clearTimeout(timeoutRef.current);
  }, [index, setIndex]);

  return (
    <section
      style={{
        height: "400vh", // 4 viewport heights for scroll animation
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#e8f6ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Canvas
          gl={{ alpha: true }}
          camera={{ position: [0, 0, 100], fov: 20 }}
          onCreated={({ gl }) => {
            gl.setClearColor("#e8f6ff", 1);
          }}
          style={{ height: "100vh", width: "100vw" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <CameraAnimator progress={scrollProgress} />

          <Suspense fallback={null}>
            <group scale={0.1}>
              <DynamicModel key={titles[index]} modelName={titles[index]} />
            </group>
          </Suspense>

          {/* Fixed Brand Text */}
          <Text
            font="/fonts/JetBrainsMono-Bold.ttf"
            position={[-2, 0, -50]}
            fontSize={6}
            color="#FFFFFF"
            anchorX="right"
            anchorY="middle"
            toneMapped={false}
          >
            Bolty
          </Text>

          {/* Dynamic Title Text */}
          <Text
            font="/fonts/JetBrainsMono-Bold.ttf"
            position={[-1, 0, -50]}
            fontSize={6.5}
            color={
              titles[index] === "Vision"
                ? "#c21408"
                : titles[index] === "GeoWorks"
                ? "#2aba27"
                : titles[index] === "Studios"
                ? "#32f0fa"
                : "#FFFFFF"
            }
            anchorX="left"
            anchorY="middle"
            toneMapped={false}
          >
            {titles[index]}
          </Text>

          <Environment preset="city" />
        </Canvas>
      </div>
    </section>
  );
}

export default function App() {
  const titles = ["Vision", "GeoWorks", "Studios"];
  const [index, setIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lang, setLang] = useState("en");
const translations = {
  en: {
    contact: "Contact Me",
    name: "Your Name",
    email: "Your Email",
    message: "Your Message",
    send: "Send Message",
    about: {
      name: "David Garcia Cirauqui",
      location: "Based in Vilanova i la Geltrú, Barcelona",
      description: "Engineering student with certifications and extensive experience in photogrammetry, 3D design, CAD, VFX, and cinematography. With a hidden ace up my sleeve in web development."
    }
  },
  es: {
    contact: "Contáctame",
    name: "Tu Nombre",
    email: "Tu Correo",
    message: "Tu Mensaje",
    send: "Enviar Mensaje",
    about: {
      name: "David Garcia Cirauqui",
      location: "Con base en Vilanova i la Geltrú, Barcelona",
      description: "Estudiante de ingeniería con certificaciones y amplia experiencia en el mundo de la fotogrametría, diseño 3D, CAD, VFX y cinematografía. Con un as en la manga sobre desarrollo web."
    }
  },
  ca: {
    contact: "Contacta'm",
    name: "El teu Nom",
    email: "El teu Correu",
    message: "El teu Missatge",
    send: "Enviar Missatge",
    about: {
      name: "David Garcia Cirauqui",
      location: "Basat a Vilanova i la Geltrú, Barcelona",
      description: "Estudiant d'enginyeria amb certificacions i àmplia experiència en fotogrametria, disseny 3D, CAD, VFX i cinematografia. Amb un as a la màniga en el desenvolupament web."
    }
  }
};

  useEffect(() => {
    preloadModels();

    const animationHeight = window.innerHeight * 3;

    function onScroll() {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / animationHeight, 1);
      setScrollProgress(progress);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = new URLSearchParams();
    for (let [key, value] of formData) {
      data.append(key, value);
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString(),
    })
      .then(() => {
        alert("Thank you! Your message has been sent.");
        e.target.reset();
           
      });
  };

  const { progress, active } = useProgress();

  return (
    <>
      {active && <LoadingOverlay progress={progress} />}
      <div className="min-h-screen bg-gray-20 text-gray-900 font-mono">
      {/* Language Selector */}
      <div className="fixed top-4 right-4 flex space-x-2 z-30">
        {Object.keys(translations).map((l) => (
          <Button
            key={l}
            size="sm"
            className={`${
              lang === l
                ? "bg-gray-700 bg-opacity-80 text-white font-semibold"
                : "bg-gray-400 bg-opacity-60 text-white hover:bg-gray-600 hover:bg-opacity-80"
            } rounded-sm px-3 py-1 transition-colors border border-white/20`}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </Button>
        ))}
      </div>

  <Hero titles={titles} scrollProgress={scrollProgress} setIndex={setIndex} />

      {/* Tabs + Portfolio combined */}
      <section
        className="w-full flex justify-center"
        style={{
          background: "rgba(24, 26, 29, 0.6)", // Dark semi-transparent bg
          color: "#e0e6f0", // Light text for contrast
          backdropFilter: "blur(12px)", // Frosted glass blur effect
          WebkitBackdropFilter: "blur(12px)", // For Safari support
        }}
      >
        <LiquidGlassTabs />
      </section>

      {/* Contact & About Section */}
  <section className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center border-t border-gray-200 pt-12 pb-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <div className="w-full md:w-1/2 max-w-xl flex flex-col items-center md:items-end mb-10 md:mb-0 md:mr-8">
            <div className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center w-full">
              <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto md:h-full mb-6 md:mb-0">
                <img
                  src="/images/photo.png"
                  alt="Bolty portrait"
                  className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full border-4 border-blue-200 shadow-lg"
                  style={{ background: '#e0e6f0', objectPosition: 'center' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center md:items-start md:ml-8">
                <h3 className="text-2xl font-bold mb-1">{translations[lang].about.name}</h3>
                <div className="text-blue-700 text-sm mb-2">{translations[lang].about.location}</div>
                <p className="text-gray-700 text-center md:text-left text-base">
                  {translations[lang].about.description}
                </p>
              </div>
            </div>
            </div>
  <div className="w-full md:w-1/2 max-w-xl p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">{translations[lang].contact}</h2>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />

            {/* Hidden honeypot field */}
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <input
              type="text"
              name="name"
              placeholder={translations[lang].name}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder={translations[lang].email}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="message"
              placeholder={translations[lang].message}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              required
            ></textarea>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {translations[lang].send}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer Bar */}
      <footer className="w-full bg-gray-900 text-gray-200 py-4 flex flex-col md:flex-row items-center justify-between px-6 text-sm mt-0">
        <div>
          &copy; {new Date().getFullYear()} Bolty
        </div>
        <div className="mt-2 md:mt-0">
          Portfolio built with React, Vite, and Three.js
        </div>
      </footer>
      </div>
    </>
  );
}
