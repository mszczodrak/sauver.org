import React, { useRef, useEffect, useState } from 'react';
import { Shield, Target, Zap, Users, Terminal, ArrowRight, Github, Mail, ShieldAlert, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const App = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transforms for Hero
  const heroTextY = useTransform(smoothY, [0, 0.2], [0, 100]);
  const heroBgY = useTransform(smoothY, [0, 0.5], ["0%", "20%"]);
  const heroOpacity = useTransform(smoothY, [0, 0.15], [1, 0]);

  // Section 2 (Enemy) transforms
  const enemyOpacity = useTransform(smoothY, [0.1, 0.25], [0, 1]);
  const enemyScale = useTransform(smoothY, [0.1, 0.25], [0.8, 1]);

  // Section 4 (Rock) animation state
  const [isLaunching, setIsLaunching] = useState(false);
  const rockLaunchRef = useRef(null);
  const { scrollYProgress: rockScroll } = useScroll({
    target: rockLaunchRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="relative selection:bg-cyan-500/30 selection:text-white">
      <div className="noise-overlay" />
      
      {/* Dynamic Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-gold-500 to-crimson-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <nav className="fixed w-full z-50 px-8 py-8 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="text-cyan-500 w-8 h-8 relative z-10" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute inset-0 bg-cyan-500 blur-md rounded-full -z-0" 
            />
          </div>
          <span className="text-2xl font-black tracking-widest uppercase">Sauver</span>
        </div>
        
        <div className="hidden md:flex gap-12 items-center">
          {["The Problem", "The Shield", "The Rock", "Collective"].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-cyan-400 transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="https://github.com/mszczodrak/sauver" 
            className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors group"
          >
            <Github className="w-5 h-5 group-hover:text-cyan-400" />
          </a>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section className="relative h-screen flex items-center justify-start overflow-hidden px-8 md:px-24">
        <motion.div style={{ y: heroBgY, opacity: heroOpacity }} className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#0a0a0a]/60 z-10" />
          <img 
            src="/Section1_hero_v7.avif" 
            alt="Hero Background" 
            className="w-full h-[120%] object-cover object-center grayscale brightness-[0.4] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent z-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(0,255,255,0.15)_0%,_transparent_60%)] z-20" />
        </motion.div>

        <motion.div style={{ y: heroTextY }} className="relative z-30 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="mb-6 flex items-center gap-4 text-cyan-400"
          >
            <div className="h-[1px] w-12 bg-cyan-500/50" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Digital Sovereignty Protocol</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase italic"
          >
            Your Attention <br />is the <span className="text-amber-400 underline decoration-cyan-500/30">Prize</span>.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
          >
            <div>
              <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-10 max-w-xl">
                They want your data. They steal your time. Stop being the target. <br />
                <span className="text-white font-medium italic">Join the movement to reclaim your digital sovereignty.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group relative px-10 py-6 bg-white text-black font-black uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95">
                  <span className="relative z-10 flex items-center gap-3">
                    Pick up the Shield <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                
                <div className="flex items-center gap-4 group cursor-pointer px-6 py-4 border border-white/10 bg-white/5 backdrop-blur-md hover:border-cyan-500/40 transition-all">
                  <Terminal className="w-5 h-5 text-gray-500 group-hover:text-cyan-400" />
                  <div className="text-left">
                    <div className="text-[8px] uppercase tracking-widest text-gray-500 font-bold mb-1">One-line Setup</div>
                    <code className="text-xs font-mono text-cyan-400/80">gemini extensions install...</code>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block text-right pb-4">
               <div className="text-crimson-500 text-[10rem] font-black opacity-10 select-none">ROCK</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Detail Elements */}
        <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-12 right-24 text-[10px] font-mono text-white/20 tracking-[1em] rotate-90 origin-bottom-right uppercase">
          01 // INITIALIZING VANGUARD
        </div>
      </section>

      {/* Section 2: The Enemy (The Noise) */}
      <section id="the-problem" className="relative py-48 bg-black overflow-hidden px-8 md:px-24">
        <motion.div style={{ opacity: enemyOpacity, scale: enemyScale }} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 relative z-10">
              <div className="inline-block p-4 bg-crimson-500/10 border border-crimson-500/20 rounded-2xl mb-8">
                <ShieldAlert className="w-8 h-8 text-crimson-500" />
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.85] uppercase">
                The Noise <br /><span className="text-crimson-500">They</span> Created.
              </h2>
              <div className="space-y-8">
                <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
                  They’ve weaponized your attention. Every email is an attempt to take from you—time, energy, privacy. The mental cost of maintaining order is too high. 
                </p>
                <p className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
                  "You are not overwhelmed; you are <span className="text-crimson-500 underline decoration-crimson-500/30">outnumbered</span>."
                </p>
              </div>
            </div>

            <div className="md:col-span-7 relative">
              <motion.div 
                className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/5 glow-crimson"
              >
                <img 
                  src="/Section2_v5.avif" 
                  alt="Digital Chaos" 
                  className="w-full h-full object-cover mix-blend-screen opacity-70 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Simulated Data Cloud Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <AnimatePresence>
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 }}
                        animate={{ 
                          opacity: [0, 0.5, 0],
                          x: Math.random() * 400 - 200,
                          y: Math.random() * 400 - 200,
                          scale: [0.5, 1, 0.5]
                        }}
                        transition={{ repeat: Infinity, duration: 3 + Math.random() * 5, delay: Math.random() * 5 }}
                        className="absolute text-crimson-500/40 text-[8px] font-mono whitespace-nowrap"
                      >
                        RE: RE: URGENT ACTION REQUIRED // TRACKING_ID: {Math.random().toString(16).slice(2, 8)}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
              
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-crimson-500/10 blur-[120px] rounded-full -z-10" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 3: The Shield (Vanguard) */}
      <section id="the-shield" className="relative py-48 bg-charcoal overflow-hidden px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center gap-24">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.85] uppercase text-cyan-400">
                  Automated <br />Vanguard.
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light mb-16">
                  Sauver is an agent that works only for you. Built on the <span className="text-white font-bold underline decoration-cyan-500/30">Model Context Protocol (MCP)</span>, it acts as a digital barrier that automatically analyzes noise before it even hits your screen.
                </p>
                
                <div className="grid grid-cols-1 gap-12">
                  {[
                    { title: "Intelligent Labeling", icon: Zap, color: "text-cyan-400" },
                    { title: "Privacy-First Auditing", icon: Shield, color: "text-amber-400" },
                    { title: "Automated Task Triaging", icon: Target, color: "text-crimson-500" }
                  ].map((feature, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="flex gap-8 group"
                    >
                      <div className={`p-4 bg-white/5 border border-white/10 rounded-2xl group-hover:border-cyan-500/50 transition-all ${feature.color}`}>
                        <feature.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">{feature.title}</h4>
                        <div className="h-1 w-0 group-hover:w-full bg-cyan-500/30 transition-all duration-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="md:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-square rounded-[3rem] overflow-hidden border border-cyan-500/20 glow-cyan"
              >
                <img 
                  src="/Section3_v1.avif" 
                  alt="The Shield" 
                  className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-transparent to-transparent" />
                
                {/* Tech HUD overlay */}
                <div className="absolute top-12 left-12 right-12 bottom-12 border border-cyan-500/10 pointer-events-none flex flex-col justify-between p-4">
                   <div className="flex justify-between items-start">
                     <div className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest">Protocol: Active</div>
                     <div className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest">Local-First AI</div>
                   </div>
                   <div className="h-[2px] w-full bg-cyan-500/20">
                     <motion.div 
                       animate={{ x: ["0%", "100%", "0%"] }}
                       transition={{ repeat: Infinity, duration: 4 }}
                       className="h-full w-24 bg-cyan-500 shadow-[0_0_10px_#00ffff]" 
                     />
                   </div>
                </div>
              </motion.div>
              <div className="absolute -left-20 -top-20 w-80 h-80 bg-cyan-500/10 blur-[150px] rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Rock (Offense) */}
      <section id="the-rock" ref={rockLaunchRef} className="relative py-48 bg-black overflow-hidden px-8 md:px-24">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-[12rem] font-black tracking-tighter mb-16 leading-none uppercase italic"
          >
            Don't Just Settle. <br /><span className="text-crimson-500 italic decoration-gold-500 underline underline-offset-8">Fight Back.</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center text-left">
            <div>
              <p className="text-2xl md:text-3xl text-gray-400 leading-relaxed font-light mb-12">
                Deflection isn't victory. Sauver empowers you to take action. Every automated action is a <span className="text-white font-bold italic">rock you throw back</span> at the chaos they created.
              </p>
              
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 blur-3xl -z-10" />
                <h4 className="text-xl font-black uppercase tracking-widest text-gold-500 flex items-center gap-3">
                  <Zap className="w-5 h-5" /> Kinetic Strike Capable
                </h4>
                <p className="text-gray-500">
                  Generate instant technical challenges, recursive-request deflectors, and hyper-specific domain traps.
                </p>
                <button 
                  onMouseEnter={() => setIsLaunching(true)}
                  onMouseLeave={() => setIsLaunching(false)}
                  className="w-full py-4 bg-gold-500 text-black font-black uppercase tracking-[0.2em] hover:bg-white transition-all"
                >
                  Engage Response Matrix
                </button>
              </div>
            </div>

            <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-gold-500/20 shadow-2xl shadow-gold-500/10">
              <motion.img 
                animate={isLaunching ? { x: [0, 5, -5, 5, 0], y: [0, -2, 2, -2, 0] } : {}}
                transition={{ repeat: Infinity, duration: 0.2 }}
                src="/Section4_v9.avif" 
                alt="The Rock" 
                className="w-full h-full object-cover grayscale brightness-90 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Kinetic visualization */}
              <AnimatePresence>
                {isLaunching && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5], opacity: [0, 0.5, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-64 h-64 border-4 border-gold-500 rounded-full blur-md" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Background Text Accent */}
        <div className="absolute bottom-0 left-0 text-[20rem] font-black text-white/5 select-none -mb-20 -ml-10 tracking-tighter">
          RETALIATE
        </div>
      </section>

      {/* Section 5: The Collective */}
      <section id="collective" className="relative py-48 bg-charcoal px-8 md:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-5xl md:text-9xl font-black tracking-tighter mb-12 uppercase">
              The Silent Majority <br />is <span className="text-cyan-400">Finding Its Voice</span>.
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
              Digital Sovereignty isn't a technical issue. It's a fundamental right. Join thousands who have moved from overwhelm to empowerment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Marcin M.", quote: "Sauver gave me my focus back. I’m no longer drowning." },
              { name: "Sovereign-01", quote: "The pixel stripping alone saved my privacy sanity." },
              { name: "Engineer-X", quote: "I finally have an agent that actually works for me." }
            ].map((testi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-12 bg-black border border-white/5 rounded-[3rem] text-left relative overflow-hidden group hover:border-cyan-500/40 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
                <div className="mb-8 p-3 bg-white/5 border border-white/10 rounded-2xl w-fit">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-2xl font-light italic text-gray-300 mb-10 leading-relaxed">"{testi.quote}"</p>
                <div className="h-[1px] w-full bg-white/10 mb-6" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-cyan-500">— {testi.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Network points visualization simulated with CSS */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.2, 1]
              }}
              transition={{ repeat: Infinity, duration: 2 + Math.random() * 4, delay: Math.random() * 2 }}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%` 
              }}
            />
          ))}
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <footer className="relative py-48 bg-black overflow-hidden px-8 md:px-24">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="mb-16 inline-block"
          >
            <div className="relative">
              <Shield className="w-32 h-32 text-white/5 hover:text-white transition-all duration-1000 cursor-none" />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full -z-10" 
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gold-500 rounded-full animate-ripple" />
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-16 leading-[0.85] uppercase italic">
            Claim Your <span className="text-amber-400">Silence</span>.
          </h2>
          
          <div className="flex flex-col items-center gap-12">
            <button className="px-16 py-8 bg-white text-black font-black uppercase tracking-[0.3em] hover:bg-gold-500 hover:scale-105 transition-all text-xl shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              Pick up the Shield
            </button>
            
            <div className="flex gap-12 text-xs font-black uppercase tracking-widest text-gray-500">
              <a href="https://github.com/mszczodrak/sauver" className="hover:text-cyan-400 transition-colors">GitHub Repository</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Vanguard Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Shield</a>
            </div>
            
            <div className="mt-12 text-center">
              <div className="text-[10px] font-mono text-gray-700 uppercase tracking-[1em] mb-4">RefractSystems // Sovereign Intelligence Unit</div>
              <p className="text-gray-700 text-[10px] uppercase tracking-widest">© 2026 Sauver Vanguard Protocol. All Rights Reserved.</p>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.05)_0%,_transparent_70%)] pointer-events-none" />
      </footer>
    </div>
  );
};

export default App;
