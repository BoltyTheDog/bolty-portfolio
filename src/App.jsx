import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";

import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { DynamicModel, preloadModels } from "./components/DynamicModel";
import { Pause, Play } from "lucide-react";

function easeInOutBack(t) {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
}

function CameraAnimator({ play, onAngleTrigger }) {
  const angleRef = useRef(-10);
  const triggered = useRef({
    "-3.33": false,
    "3.33": false,
  });
  const smoothingRef = useRef(null);

  useFrame((state, delta) => {
    if (!play) return;

    if (smoothingRef.current) {
      const { from, to, duration, elapsed } = smoothingRef.current;
      const newElapsed = elapsed + delta;
      const t = Math.min(newElapsed / duration, 1);
      const eased = easeInOutBack(t);
      angleRef.current = from + (to - from) * eased;

      if (t >= 1) {
        smoothingRef.current = null;
        triggered.current = { "-3.33": false, "3.33": false };
        onAngleTrigger(0);
      } else {
        smoothingRef.current.elapsed = newElapsed;
      }
    } else {
      angleRef.current += delta * 2;
      let angle = angleRef.current;

      if (angle >= 10) {
        smoothingRef.current = {
          from: angle,
          to: -10,
          duration: 2, // seconds
          elapsed: 0,
        };
        return;
      }

      if (angle >= -3.33 && !triggered.current["-3.33"]) {
        triggered.current["-3.33"] = true;
        onAngleTrigger(1);
      }
      if (angle >= 3.33 && !triggered.current["3.33"]) {
        triggered.current["3.33"] = true;
        onAngleTrigger(2);
      }
    }

    const rad = (angleRef.current * Math.PI) / 180;
    const radius = 100;
    state.camera.position.x = Math.sin(rad) * radius;
    state.camera.position.z = Math.cos(rad) * radius;
    state.camera.position.y = 0;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Hero({ titles }) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Preload models once on mount
  useEffect(() => {
    preloadModels();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Play/Pause button in top-left */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="p-2 rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors border border-white/20 flex items-center justify-center"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>

      <Canvas
        className="absolute inset-0 z-0"
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 100], fov: 20 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#e8f6ff", 1); // with alpha
        }}
      >

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <CameraAnimator
          play={isPlaying}
          onAngleTrigger={(newIndex) => setIndex(newIndex)}
        />

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
            titles[index] === "Vision" ? "#c21408" :
            titles[index] === "GeoWorks" ? "#2aba27" :
            titles[index] === "Studios" ? "#32f0fa" :
            "#FFFFFF" // fallback white
          }
          anchorX="left"
          anchorY="middle"
          toneMapped={false}
        >
          {titles[index]}
        </Text>


        {/* Model */}
        <group scale={0.1}>
          <DynamicModel key={titles[index]} modelName={titles[index]} />
        </group>

        <Environment preset="city" />
      </Canvas>

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
    </section>
  );
}

export default function App() {
  const titles = ["Vision", "GeoWorks", "Studios"];
  const [index, setIndex] = useState(0);
  const [lang, setLang] = useState("en");

  const translations = {
    en: {
      contact: "Contact Me",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message",
    },
    es: {
      contact: "Contáctame",
      name: "Tu Nombre",
      email: "Tu Correo",
      message: "Tu Mensaje",
      send: "Enviar Mensaje",
    },
    ca: {
      contact: "Contacta'm",
      name: "El teu Nom",
      email: "El teu Correu",
      message: "El teu Missatge",
      send: "Enviar Missatge",
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
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
      })
      .catch((error) => {
        alert("Oops! There was an error sending your message.");
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-mono">
      <div className="fixed top-4 right-4 flex space-x-2 z-30">
        {Object.keys(translations).map((l) => (
          <Button
            key={l}
            size="sm"
            className={`
              ${
                lang === l
                  ? "bg-gray-700/75 text-white font-semibold" // Selected: darker gray, 90% opacity
                  : "bg-gray-500/50 text-white hover:bg-gray-600/80" // Unselected: medium gray, 70% opacity
              }
              rounded-sm px-3 py-1 transition-colors border border-white/20
            `}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </Button>
        ))}
      </div>

      <Hero titles={titles} index={index} />

      {/* Portfolio Section */}
      <section className="min-h-screen w-full flex items-center justify-center border-t border-gray-200">
        <div className="max-w-6xl w-full p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((sample) => (
            <Card
              key={sample}
              className="shadow-md hover:shadow-lg transition rounded-2xl"
            >
              <CardContent className="p-4 flex flex-col items-center">
                <img
                  src={`/images/portfolio${sample}.jpg`}
                  alt={`Portfolio project ${sample}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-600"
                  style={{ display: "none" }}
                >
                  Portfolio Item {sample}
                </div>
                <p className="text-center text-gray-700">
                  Sample description {sample}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen w-full flex items-center justify-center border-t border-gray-200">
        <div className="max-w-3xl w-full p-6 bg-white rounded-2xl shadow-md">
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

      <footer className="mt-12 mb-6 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Bolty. All rights reserved.
      </footer>
    </div>
  );
}
