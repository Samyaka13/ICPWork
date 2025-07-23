import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight, Shield, Users, Zap, Globe, Code,
    CheckCircle, Star, TrendingUp, Lock, Wallet,
    DollarSign, Cpu, BrainCircuit, Award, Target,
    BarChart3, Layers, Rocket, Network, Menu, X
} from "lucide-react";
import logo from '../../public/Logo.png';
export default function Landing() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { title: 'Features', href: '#features' },
        { title: 'Solution', href: '#solution' },
        { title: 'Use Cases', href: '#use-cases' },
    ];

    // Add CSS animations via useEffect
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gridMove {
                0% { transform: translate(0, 0); }
                100% { transform: translate(60px, 60px); }
            }
            
            @keyframes gridPulse {
                0%, 100% { opacity: 0.05; }
                50% { opacity: 0.15; }
            }
            
            @keyframes gridPoint {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.5); }
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                33% { transform: translateY(-10px) rotate(120deg); }
                66% { transform: translateY(5px) rotate(240deg); }
            }
        `;
        document.head.appendChild(style);

        // Clean up function
        return () => {
            document.head.removeChild(style);
        };
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
            {/* Enhanced Grid Background with Animation */}
            <div className="absolute inset-0">
                {/* Primary animated grid */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        animation: 'gridMove 30s linear infinite'
                    }}
                />

                {/* Secondary smaller grid */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(236, 72, 153, 0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(236, 72, 153, 0.4) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                        animation: 'gridMove 20s linear infinite reverse'
                    }}
                />

                {/* Larger accent grid */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(139, 92, 246, 0.6) 2px, transparent 2px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.6) 2px, transparent 2px)
                        `,
                        backgroundSize: '120px 120px',
                        animation: 'gridPulse 40s ease-in-out infinite'
                    }}
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/10 to-pink-900/10" />

                {/* Grid intersection highlights */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full opacity-60"
                        style={{
                            backgroundColor: ['#3B82F6', '#EC4899', '#8B5CF6'][Math.floor(Math.random() * 3)],
                            left: `${(Math.floor(Math.random() * 20) * 5)}%`,
                            top: `${(Math.floor(Math.random() * 20) * 5)}%`,
                            boxShadow: `0 0 15px currentColor`,
                            animation: `gridPoint ${Math.random() * 3 + 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}

                {/* Glowing orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Professional Header */}
            <header className="relative z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <img src={logo} alt="Logo" className="w-10 h-10 object-contain scale-150" />


                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.href}
                                    className="relative text-gray-300 hover:text-white transition-all duration-300 group"
                                >
                                    {item.title}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                        </nav>

                        <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <Link to='/' className="hidden md:block" >
                                Launch App
                            </Link>
                        </Button>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} className="text-gray-300 hover:text-white">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-xl md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-0 left-0 right-0 bg-slate-900 border-b border-slate-800 p-6 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl shadow-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                                        <img src="/logo.png" alt="ICPWork Logo" className="w-14 h-14" />
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="-mr-2">
                                    <X className="w-6 h-6 text-gray-400" />
                                </Button>
                            </div>
                            <nav className="flex flex-col items-center space-y-6 text-center">
                                {navLinks.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-2xl font-semibold text-gray-200 hover:text-white hover:scale-105 transition-all"
                                    >
                                        {item.title}
                                    </a>
                                ))}
                                <Link to={createPageUrl("Dashboard")} className="w-full pt-4">
                                    <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl shadow-lg">
                                        Launch App
                                    </Button>
                                </Link>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10">
                {/* Hero Section with Grid Integration */}
                <section className="min-h-screen flex items-center justify-center text-center px-6 relative">
                    {/* Grid overlay on hero */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage: `
                                    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                                `,
                                backgroundSize: '100px 100px',
                            }}
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl relative z-10"
                    >
                        <motion.h1
                            className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-pink-200 bg-clip-text text-transparent leading-tight mb-8"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            The Future of Work is Decentralized
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-8"
                        >
                            Welcome to ICP Work
                        </motion.div>
                        <motion.p
                            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            A global, trustless, and efficient freelance marketplace built on the Internet Computer Protocol.
                            Say goodbye to high fees, payment delays, and centralized control. Say hello to the new era of work.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Link to={createPageUrl("Dashboard")}>
                                <Button size="lg" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xl font-semibold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                                    Join ICP Work
                                    <ArrowRight className="ml-2 w-6 h-6" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="border-2 border-slate-600 bg-slate-800/50 backdrop-blur text-white text-xl font-semibold px-12 py-4 rounded-2xl hover:bg-slate-700/50 transition-all duration-300">
                                Start Building
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-pink-500 rounded-full mt-2 animate-pulse" />
                        </div>
                    </motion.div>
                </section>

                {/* Features Section with Grid Cards */}
                <section id="features" className="py-32 px-6 relative">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-6">
                                Why ICP Work?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Experience the next generation of freelancing with blockchain-powered features
                            </p>
                        </motion.div>

                        {/* Grid of Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: Shield,
                                    title: "Trustless Escrow",
                                    description: "Smart contracts secure your payments automatically",
                                    gradient: "from-blue-500 to-cyan-500"
                                },
                                {
                                    icon: Globe,
                                    title: "Global Talent Pool",
                                    description: "Access verified freelancers from around the world",
                                    gradient: "from-purple-500 to-pink-500"
                                },
                                {
                                    icon: Zap,
                                    title: "Ultra-Low Fees",
                                    description: "Save money with minimal transaction costs",
                                    gradient: "from-green-500 to-emerald-500"
                                },
                                {
                                    icon: Network,
                                    title: "True Decentralization",
                                    description: "Own your data and reputation forever",
                                    gradient: "from-orange-500 to-red-500"
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="relative group"
                                >
                                    {/* Grid border effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />

                                    <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl hover:border-slate-600 transition-all duration-300">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Solution Section */}
                <section id="solution" className="py-32 px-6 bg-slate-800/30 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                        The Problem: <span className="text-red-400">Centralization's Grip</span>
                                    </h2>
                                    <div className="space-y-4 text-gray-300">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                            <p>Exorbitant transaction fees ranging from 10% to 30%</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                            <p>Payment delays and security concerns</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                            <p>Centralized control of user data and reputation</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                            <p>Platform dependency and vendor lock-in</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                        The Solution: <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">ICP Work's Advantage</span>
                                    </h2>
                                    <div className="space-y-4 text-gray-300">
                                        <div className="flex items-start space-x-3">
                                            <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                                            <p>Trustless escrow system for secure payments</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                                            <p>Instant, low-cost transactions on ICP</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                                            <p>User-owned data and portable reputation</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                                            <p>True decentralization with no single point of failure</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-32 px-6 relative">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Powered by the Numbers
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { number: "$2.5M+", label: "Total Value Locked", icon: DollarSign },
                                { number: "10K+", label: "Projects Completed", icon: CheckCircle },
                                { number: "5K+", label: "Active Freelancers", icon: Users }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                                    <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl">
                                        <stat.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                            {stat.number}
                                        </div>
                                        <div className="text-gray-300 text-lg">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-32 px-6 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-pink-200 bg-clip-text text-transparent mb-8">
                                Ready to Join the Future?
                            </h2>
                            <p className="text-xl text-gray-300 mb-12">
                                Experience decentralized work today. Build, collaborate, and earn on the Internet Computer.
                            </p>
                            <Link to={createPageUrl("Dashboard")}>
                                <Button size="lg" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xl font-semibold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                                    Launch ICP Work
                                    <Rocket className="ml-3 w-6 h-6" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-16 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-3 mb-8 md:mb-0">
                            {/* <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"> */}
                            <img src="/logo.png" alt="ICPWork Logo" className="w-16 h-16" />
                            {/* </div> */}
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                ICPWork
                            </span>
                        </div>
                        <div className="text-gray-400 text-center md:text-right">
                            <p>&copy; 2024 ICPWork. Built on the Internet Computer.</p>
                            <p className="mt-2">Decentralizing the future of work.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}