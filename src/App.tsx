import { Shield, Target, Zap, Users, Terminal } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

const App = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-[#0a0a0a] text-[#ededed] font-sans overflow-x-hidden selection:bg-cyan-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/10">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <Shield className="text-cyan-400 w-8 h-8" />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">SAUVER</span>
        </div>
        <div className="flex gap-8 items-center">
          <a href="https://github.com/mszczodrak/sauver" className="text-sm font-medium hover:text-cyan-400 transition-colors uppercase tracking-widest">GitHub</a>
          <button className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all">Pick up the Shield</button>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.05)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          {/* Abstract Hero Graphic Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[150%] h-[150%] bg-[#050505] rotate-12 opacity-50 blur-3xl rounded-[100px]" />
          </div>
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 text-center px-4 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8"
          >
            YOUR ATTENTION IS THE PRIZE.<br />
            YOUR INBOX IS THE BATTLEFIELD.<br />
            <span className="text-cyan-400">SAUVER IS YOUR SHIELD.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            They want your data. They steal your time. Stop being the target. Join the movement to reclaim your digital sovereignty.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <button className="group relative px-8 py-4 bg-cyan-500 text-black font-bold uppercase tracking-widest overflow-hidden transition-all">
              <span className="relative z-10">Pick up the Shield</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <div className="bg-[#1a1a1a] p-1 pl-4 rounded flex items-center gap-4 border border-white/10 group cursor-pointer hover:border-cyan-500/50 transition-colors">
              <code className="text-sm font-mono text-gray-300">gemini extensions install...</code>
              <button className="p-3 bg-black/50 hover:bg-black transition-colors">
                <Terminal className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: The Enemy */}
      <section className="py-32 px-6 relative bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
              THE NOISE THEY CREATED.<br />
              THE SILENCE YOU DESERVE.
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              They’ve weaponized your attention. Every email is an attempt to take from you—time, energy, privacy. The mental cost of maintaining order is too high. You are not overwhelmed; you are outnumbered.
            </p>
          </div>
          <div className="md:w-1/2 relative aspect-square bg-[#111] rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center p-12">
             <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             <div className="relative z-10 grid grid-cols-4 gap-4 animate-pulse">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center border border-white/5">
                    <Target className="w-6 h-6 text-gray-600" />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Section 3: The Shield */}
      <section className="py-32 px-6 relative bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight text-cyan-400">
              AUTOMATED VANGUARD.<br />
              PERSONALIZED DEFENSE.
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-12">
              Sauver is an agent that works only for you. Built on the Model Context Protocol (MCP), it acts as a digital barrier. It automatically analyzes incoming noise, enforces your organizational rules, and filters the chaos before it even hits your screen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Intelligent Labeling", icon: Zap },
                { title: "Privacy-First Auditing", icon: Shield },
                { title: "Automated Triage", icon: Target }
              ].map((f, i) => (
                <div key={i} className="p-6 bg-[#1a1a1a] border border-white/5 hover:border-cyan-500/30 transition-all rounded-xl">
                  <f.icon className="w-6 h-6 text-cyan-400 mb-4" />
                  <h4 className="font-bold text-lg">{f.title}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 aspect-video bg-[#050505] border border-cyan-500/20 rounded-2xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent" />
            <Shield className="w-32 h-32 text-cyan-400/20" />
          </div>
        </div>
      </section>

      {/* Section 4: The Rock */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-crimson-500">
              DON'T JUST SETTLE.<br />
              <span className="text-amber-400">FIGHT BACK.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Deflection isn't victory. Sauver empowers you to take action. Automate intelligent responses to recursive requests. Every automated action is a rock you throw back at the chaos they created.
            </p>
          </div>
          
          <div className="relative h-[400px] flex items-center justify-center">
            <motion.div 
              animate={{ x: [0, 500], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeIn" }}
              className="w-20 h-20 bg-gradient-to-r from-red-600 to-amber-500 rounded-full blur-xl absolute left-0" 
            />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent absolute" />
          </div>
        </div>
      </section>

      {/* Section 5: The Collective */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <Users className="w-12 h-12 text-cyan-400 mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">
            THE SILENT MAJORITY IS<br />FINDING ITS VOICE.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Digital Sovereignty isn't a technical issue. It's a fundamental right. Join thousands who have moved from overwhelm to empowerment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[1, 2, 3].map(i => (
               <div key={i} className="p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                 <p className="text-gray-300 italic mb-6">"Sauver gave me my focus back. I’m no longer drowning."</p>
                 <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">— Sovereign User {i}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="py-32 px-6 border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
            THE BATTLE FOR YOUR ATTENTION IS OVER. <br />
            <span className="text-amber-400">CLAIM YOUR SILENCE.</span>
          </h2>
          <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95">
            Pick up the Shield
          </button>
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2 font-bold tracking-tighter text-gray-300">
              <Shield className="w-5 h-5" /> SAUVER
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">License</a>
            </div>
            <p>© 2026 RefractSystems. Reclaim Your Digital Sovereignty.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
