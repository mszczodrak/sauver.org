import React, { useRef, useState } from 'react';
import { 
  Shield, Target, Zap, Users, Terminal, ArrowRight, 
  Github, Mail, ShieldAlert, Cpu, CheckCircle2, 
  Lock, EyeOff, BarChart3, ChevronDown
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const App = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Navigation hover state
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);

  // Section 4 (Rock) animation state
  const [isLaunching, setIsLaunching] = useState(false);

  return (
    <div ref={containerRef} className="relative bg-charcoal text-white font-body overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      <div className="noise-overlay" />
      
      {/* Dynamic Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-gold-500 to-crimson-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <nav className="fixed w-full z-[90] px-6 py-6 md:px-12 flex justify-between items-center bg-charcoal/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <Shield className="text-cyan-500 w-7 h-7 relative z-10 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 rounded-full animate-pulse-slow" />
          </div>
          <span className="text-xl font-black tracking-widest uppercase bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Sauver</span>
        </div>
        
        <div className="hidden md:flex gap-10 items-center">
          {[
            { name: "The Problem", id: "the-problem" },
            { name: "The Shield", id: "the-shield" },
            { name: "The Rock", id: "the-rock" },
            { name: "Collective", id: "collective" }
          ].map((item) => (
            <a 
              key={item.name}
              href={`#${item.id}`}
              onMouseEnter={() => setHoveredNavItem(item.name)}
              onMouseLeave={() => setHoveredNavItem(null)}
              className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            >
              {item.name}
              {hoveredNavItem === item.name && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 right-0 h-[1px] bg-cyan-500"
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/mszczodrak/sauver" 
            className="hidden sm:flex p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
          >
            <Github className="w-4 h-4 text-white/60 group-hover:text-cyan-400" />
          </a>
          <button className="px-5 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-all rounded-sm active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Install
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Cinematic Background with constrained width for better focus */}
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <div className="relative w-full h-full max-w-[1800px]">
            <img 
              src="/Section1_hero_v7.avif" 
              alt="Hero Background" 
              className="w-full h-full object-cover grayscale brightness-[0.2] contrast-125 opacity-40 mask-radial-fade"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-charcoal" />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/20 mb-10"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400/80">Digital Sovereignty Protocol v1.0</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-black leading-tight tracking-tighter mb-8 uppercase"
          >
            Your Attention <br />is the <span className="text-amber-400 italic">Prize</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            They weaponize your inbox to steal your focus and data. <br className="hidden md:block" />
            Join the movement to <span className="text-white font-medium">reclaim your digital sovereignty</span> with Sauver.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 rounded-sm">
              <span className="relative z-10 flex items-center gap-3">
                Pick up the Shield <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <div className="flex items-center gap-4 group cursor-pointer px-6 py-4 border border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all rounded-sm">
              <Terminal className="w-5 h-5 text-cyan-500" />
              <div className="text-left">
                <div className="text-[8px] uppercase tracking-widest text-white/40 font-bold mb-0.5">Quick Setup</div>
                <code className="text-xs font-mono text-cyan-400/80">gemini extensions install...</code>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[8px] font-black uppercase tracking-[0.5em]">Scroll to Initialize</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* The Problem Section */}
      <section id="the-problem" className="relative py-32 md:py-48 bg-black overflow-hidden px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative z-10"
            >
              <div className="flex items-center gap-4 text-crimson-500 mb-8">
                <div className="p-3 bg-crimson-500/10 border border-crimson-500/20 rounded-xl">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Inbound Threat Analysis</span>
              </div>
              
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] uppercase">
                The Noise <br /><span className="text-crimson-500 italic">They</span> Created.
              </h2>
              
              <div className="space-y-6 max-w-xl">
                <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light">
                  Every email is a targeted attempt to extract your time, energy, and privacy. The mental cost of maintaining order manually is no longer sustainable. 
                </p>
                <div className="p-8 bg-gradient-to-br from-crimson-500/10 to-transparent border-l-2 border-crimson-500 rounded-r-2xl">
                  <p className="text-3xl md:text-4xl font-black text-white italic tracking-tighter leading-tight">
                    "You are not overwhelmed; <br />you are <span className="text-crimson-500">outnumbered</span>."
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 shadow-[0_0_50px_rgba(220,20,60,0.1)] group"
              >
                <img 
                  src="/Section2_v5.avif" 
                  alt="Digital Chaos" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Data HUD Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between">
                    <div className="text-[8px] font-mono text-crimson-500 uppercase tracking-widest bg-black/40 px-2 py-1 backdrop-blur-md border border-crimson-500/20">System Overload: Detected</div>
                    <div className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Active Surveillance</div>
                  </div>
                  
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="h-[1px] w-full bg-crimson-500/30 relative"
                      >
                        <div className="absolute right-0 -top-2 text-[6px] font-mono text-crimson-500/60 uppercase">Intrusion Point {i}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-crimson-500/10 blur-[120px] rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* The Shield Section */}
      <section id="the-shield" className="relative py-32 md:py-48 bg-charcoal overflow-hidden px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-24">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative z-10"
            >
              <div className="flex items-center gap-4 text-cyan-400 mb-8">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Personalized AI Defense</span>
              </div>

              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] uppercase text-cyan-400">
                Automated <br />Vanguard.
              </h2>
              
              <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light mb-12 max-w-xl">
                Sauver acts as a digital barrier that automatically analyzes incoming noise, enforcing your organizational rules (the <span className="text-amber-400 italic">‘Vitals’</span>) before they hit your screen.
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: "Intelligent Labeling", icon: Zap, color: "bg-cyan-500/10", border: "border-cyan-500/20", iconColor: "text-cyan-400" },
                  { title: "Privacy-First Auditing", icon: Shield, color: "bg-amber-500/10", border: "border-amber-500/20", iconColor: "text-amber-400" },
                  { title: "Automated Task Triaging", icon: Target, color: "bg-crimson-500/10", border: "border-crimson-500/20", iconColor: "text-crimson-500" }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-6 p-5 rounded-2xl border ${feature.border} ${feature.color} backdrop-blur-sm hover:border-white/20 transition-all cursor-default group`}
                  >
                    <div className="shrink-0">
                      <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-cyan-400 transition-colors">{feature.title}</h4>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="lg:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group"
              >
                <img 
                  src="/Section3_v1.avif" 
                  alt="The Shield" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-transparent to-transparent" />
                
                {/* Tech Scan Animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    className="h-1/3 w-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent blur-xl"
                  />
                  <motion.div 
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    className="h-[1px] w-full bg-cyan-500/40"
                  />
                </div>
              </motion.div>
              <div className="absolute -left-20 -top-20 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* The Rock Section */}
      <section id="the-rock" className="relative py-32 md:py-48 bg-black overflow-hidden px-6">
        <div className="container mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase italic">
              Don't Just Settle. <br /><span className="text-crimson-500">Fight Back.</span>
            </h2>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light max-w-2xl mx-auto">
              Deflection isn't victory. Every automated action is a <span className="text-white font-bold italic">rock you throw back</span> at the chaos they created.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 text-left order-2 lg:order-1">
              <div className="space-y-8">
                {[
                  { title: "Kinetic Response Matrix", desc: "Automate intelligent responses to recursive requests.", icon: Zap },
                  { title: "Expert Domain Traps", desc: "Force spammers to conform to your professional workflow.", icon: Lock },
                  { title: "Privacy Purifier", desc: "Automatically strip 1x1 tracking pixels locally.", icon: EyeOff }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group cursor-default"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-black transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-widest text-white mb-2 group-hover:text-gold-500 transition-colors">{item.title}</h4>
                      <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button 
                onMouseEnter={() => setIsLaunching(true)}
                onMouseLeave={() => setIsLaunching(false)}
                className="mt-12 w-full sm:w-auto px-10 py-5 bg-gold-500 text-black font-black uppercase tracking-[0.2em] hover:bg-white transition-all rounded-sm"
              >
                Engage Response Matrix
              </button>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <motion.div 
                className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group"
              >
                <motion.img 
                  animate={isLaunching ? { x: [0, 3, -3, 3, 0], y: [0, -1, 1, -1, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 0.15 }}
                  src="/Section4_v9.avif" 
                  alt="The Rock" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                {/* HUD Elements */}
                <div className="absolute top-6 right-6 p-4 backdrop-blur-xl bg-gold-500/10 border border-gold-500/20 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-gold-500" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-gold-500">Strike Confidence: 99.8%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The Collective Section */}
      <section id="collective" className="relative py-32 md:py-48 bg-charcoal overflow-hidden px-6">
        <div className="container mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 uppercase">
              The Silent Majority <br />is <span className="text-cyan-400">Finding Its Voice</span>.
            </h2>
            <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
              Digital Sovereignty isn't a technical issue. It's a fundamental right. Join thousands who have moved from overwhelm to empowerment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { name: "Marcin M.", role: "Lead Architect", quote: "Sauver gave me my focus back. I’m no longer drowning." },
              { name: "Sovereign-01", role: "Security Researcher", quote: "The pixel stripping alone saved my privacy sanity." },
              { name: "Engineer-X", role: "DevOps Lead", quote: "I finally have an agent that actually works for me." }
            ].map((testi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-black/40 border border-white/5 rounded-[2rem] relative overflow-hidden group hover:border-cyan-500/30 transition-all"
              >
                <Mail className="w-8 h-8 text-cyan-500/20 mb-8 group-hover:text-cyan-500 transition-colors" />
                <p className="text-xl font-light italic text-white/80 mb-10 leading-relaxed">"{testi.quote}"</p>
                <div>
                  <div className="text-sm font-black uppercase tracking-widest text-white">{testi.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-500/60 mt-1">{testi.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="relative py-32 md:py-64 bg-black overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="/Section6_v7.avif" 
            alt="Final Shield Background" 
            className="w-full h-full object-cover opacity-10 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 inline-block"
          >
            <div className="relative group">
              <Shield className="w-20 h-20 text-gold-500 animate-pulse-slow" />
              <div className="absolute inset-0 bg-gold-500 blur-2xl opacity-20 rounded-full" />
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-16 leading-[0.85] uppercase italic">
            Claim Your <br /><span className="text-amber-400">Silence</span>.
          </h2>
          
          <button className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-widest hover:scale-105 transition-all text-xl overflow-hidden rounded-sm">
            <span className="relative z-10">Pick up the Shield</span>
            <div className="absolute inset-0 bg-gold-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full mt-32 pt-12 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <a href="https://github.com/mszczodrak/sauver" className="hover:text-cyan-400 transition-colors">GitHub Repository</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Vanguard Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Shield</a>
          </div>
          
          <div className="mt-16 text-center opacity-20">
            <p className="text-[8px] uppercase tracking-[1em] mb-4">RefractSystems // Sovereign Intelligence Unit</p>
            <p className="text-[8px] uppercase tracking-widest">© 2026 Sauver Vanguard Protocol. Reclaim Your Sovereignty.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
