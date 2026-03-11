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
      <section ref={targetRef} className="relative h-screen flex items-center justify-start overflow-hidden px-6 md:px-20">
        <motion.div 
          style={{ y: backgroundY }} 
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="/Section1_hero_v7.avif" 
            alt="Cinematic Hero" 
            className="w-full h-[120%] object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(0,255,255,0.15)_0%,_transparent_50%)] z-20" />
        </motion.div>

        <motion.div 
          style={{ y: textY }} 
          className="relative z-30 text-left max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-[0.3em]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Vanguard Protocol Active
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
          >
            YOUR ATTENTION IS THE <span className="text-amber-400">PRIZE</span>.<br />
            YOUR INBOX IS THE <span className="text-crimson-500">BATTLEFIELD</span>.<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">SAUVER IS YOUR SHIELD.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-12 leading-relaxed font-light"
          >
            They want your data. They steal your time. Stop being the target. <br className="hidden md:block" />
            Join the movement to reclaim your <span className="text-white font-medium">digital sovereignty</span>.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-6 items-start md:items-center"
          >
            <button className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-cyan-400 hover:scale-105 active:scale-95">
              <span className="relative z-10">Pick up the Shield</span>
              <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-400 transition-colors">
                <Terminal className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition-colors" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">One-line Setup</div>
                <code className="text-sm font-mono text-cyan-400/80 group-hover:text-cyan-400 transition-colors">gemini extensions install...</code>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Asymmetrical Detail Element */}
        <div className="absolute right-0 bottom-0 w-1/3 h-1/2 bg-gradient-to-tl from-cyan-500/5 to-transparent pointer-events-none" />
      </section>

      {/* Section 2: The Enemy */}
      <section className="py-32 px-6 relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(220,20,60,0.05)_0%,_transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/2 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                THE <span className="text-gray-600">NOISE</span> THEY CREATED.<br />
                THE <span className="text-white">SILENCE</span> YOU DESERVE.
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8 font-light">
                They’ve weaponized your attention. Every email is an attempt to take from you—time, energy, privacy. 
              </p>
              <div className="h-px w-24 bg-crimson-500 mb-8" />
              <p className="text-lg text-gray-500 leading-relaxed italic">
                "The mental cost of maintaining order is too high. You are not overwhelmed; you are outnumbered."
              </p>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-crimson-500/10"
            >
              <img 
                src="/Section2_v5.avif" 
                alt="Digital Noise Chaos" 
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Overlay elements to enhance the 'chaos' feel */}
              <div className="absolute top-4 left-4 p-4 backdrop-blur-md bg-black/40 border border-white/10 rounded-lg max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-crimson-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-crimson-500">Tracking Pixel Detected</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-crimson-500"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Background decorative element */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-crimson-500/10 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Section 3: The Shield */}
      <section className="py-32 px-6 relative bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-20">
          <div className="md:w-1/2 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] text-cyan-400">
                AUTOMATED VANGUARD.<br />
                PERSONALIZED DEFENSE.
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-12 font-light">
                Sauver is an agent that works only for you. Built on the <span className="text-white">Model Context Protocol (MCP)</span>, it acts as a digital barrier. It automatically analyzes incoming noise, enforces your organizational rules (the <span className="text-amber-400">‘Vitals’</span>), and filters the chaos before it even hits your screen.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Intelligent Labeling", icon: Zap, desc: "Automatic categorization based on intent." },
                  { title: "Privacy-First Auditing", icon: Shield, desc: "Neutralize tracking pixels locally." },
                  { title: "Automated Task Triaging", icon: Target, desc: "Shift cognitive load back to the sender." }
                ].map((f, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-[#111] border border-white/5 hover:border-cyan-500/30 transition-all rounded-2xl group">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      <f.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{f.title}</h4>
                      <p className="text-gray-500 text-sm">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10"
            >
              <img 
                src="/Section3_v7.avif" 
                alt="Automated Shield Vanguard" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a] via-transparent to-transparent" />
              
              {/* Technical Detail Overlay */}
              <div className="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2">Protocol Status</div>
                    <div className="text-2xl font-mono text-white tracking-tighter">SECURE.LOCAL</div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-1 h-8 bg-cyan-400/20 rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ height: ["20%", "100%", "20%"] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className="w-full bg-cyan-400"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Background Glow */}
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
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
