import { useEffect, useState } from 'react';
// Quitamos 'Github' de aquí para que deje de tirar error
import { Mail, Code2, Server, Terminal, Shield, Cpu, ChevronRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion'; 

interface ProfileData {
  name: string;
  title: string;
  about: string;
  skills: { core: string[]; learning: string[] };
  fun_facts: string[];
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  }
};

// Solución definitiva: Creamos el ícono de GitHub manualmente con SVG
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.5 6.5-7a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.14c0 5.4 3.32 6.64 6.5 7.02a4.8 4.8 0 0 0-1 2.98v3.86"></path>
  </svg>
);

function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    // Consumimos la API que creamos en el backend
    fetch('http://localhost:8000/api/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Error cargando el perfil:", err));
  }, []);

  // Pantalla de carga mientras espera la respuesta del backend
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-12 md:px-24 md:py-20 max-w-6xl mx-auto selection:bg-blue-500/30">
      
      {/* SECCIÓN HERO (Encabezado) */}
      <motion.header 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer}
        className="mb-24 mt-8"
      >
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
          {profile.name}.
        </motion.h1>
        <motion.h2 variants={fadeUp} className="text-xl md:text-2xl text-gray-400 font-light mb-8">
          {profile.title}
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-300 max-w-2xl text-lg leading-relaxed mb-8">
          {profile.about}
        </motion.p>
        
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/Octti" target="_blank" rel="noreferrer" 
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            <GithubIcon /> GitHub
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:tuemail@ejemplo.com" 
            className="flex items-center gap-2 border border-gray-700 px-6 py-3 rounded-full font-medium text-white hover:border-gray-400 transition-colors"
          >
            <Mail size={20} /> Contact Me
          </motion.a>
        </motion.div>
      </motion.header>

      {/* SECCIÓN DE CONTENIDO (Bento Grid) */}
      <main className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Tecnologías */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="col-span-1 md:col-span-8 bg-neutral-900/40 p-8 rounded-[2rem] border border-neutral-800 backdrop-blur-sm hover:border-neutral-700 transition-colors duration-500"
        >
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="text-blue-500" size={28} />
            <h3 className="text-2xl font-semibold text-white">Tech Arsenal</h3>
          </div>
          
          <div className="mb-8">
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-semibold">Core & Experienced</h4>
            <div className="flex flex-wrap gap-3">
              {profile.skills.core.map((skill, index) => (
                <motion.span 
                  key={skill} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-neutral-800/80 border border-neutral-700 rounded-xl text-sm hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default select-none"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-semibold flex items-center gap-2">
              Currently Learning <span className="text-green-500">🌱</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {profile.skills.learning.map((skill, index) => (
                <motion.span 
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl text-sm select-none"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Áreas de enfoque y Extras */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="col-span-1 md:col-span-4 flex flex-col gap-6"
        >
          <motion.div variants={fadeUp} className="bg-neutral-900/40 p-8 rounded-[2rem] border border-neutral-800 flex-1 hover:border-neutral-700 transition-colors duration-500">
             <div className="flex items-center gap-3 mb-6">
              <Terminal className="text-green-400" />
              <h3 className="text-xl font-semibold text-white">Focus Areas</h3>
            </div>
            <ul className="space-y-5 text-gray-400 text-sm">
              <li className="flex items-center gap-3 group"><Server size={18} className="group-hover:text-white transition-colors"/> Backend & APIs</li>
              <li className="flex items-center gap-3 group"><Cpu size={18} className="group-hover:text-white transition-colors"/> CI/CD & Docker</li>
              <li className="flex items-center gap-3 group"><Shield size={18} className="group-hover:text-white transition-colors"/> Security & Linux</li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-gradient-to-br from-neutral-900 to-black p-8 rounded-[2rem] border border-neutral-800 relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <ChevronRight size={120} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-4 relative z-10">Beyond the code ⚡</h3>
            <div className="flex flex-wrap gap-2 relative z-10">
              {profile.fun_facts.map(fact => (
                <span key={fact} className="px-3 py-1.5 bg-neutral-800 rounded-full text-xs text-gray-300">
                  {fact}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.section>

      </main>
    </div>
  );
}

export default App;