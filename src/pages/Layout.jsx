

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User as CurrentUser } from "@/api/entities";
import {
  Home, Search, MessageSquare, User, Briefcase,
  DollarSign, TrendingUp, Settings, Bell, Zap,
  ChevronDown, LogOut, UserCircle, Trophy, Calendar, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  { title: "Dashboard", url: createPageUrl("Dashboard"), icon: Home },
  { title: "Browse Projects", url: createPageUrl("Projects"), icon: Search },
  { title: "My Projects", url: createPageUrl("MyProjects"), icon: Briefcase },
  { title: "Bounties", url: createPageUrl("Bounties"), icon: Trophy },
  { title: "Hackathons", url: createPageUrl("Hackathons"), icon: Calendar },
  { title: "Messages", url: createPageUrl("Messages"), icon: MessageSquare, badge: 3 },
  { title: "Payments", url: createPageUrl("Payments"), icon: DollarSign },
  { title: "Analytics", url: createPageUrl("Analytics"), icon: TrendingUp },
];

export default function Layout({ children, currentPageName }) {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const currentUser = await CurrentUser.me();
            setUser(currentUser);
        } catch (error) {
            setUser({
                full_name: "Alex Rodriguez",
                email: "alex@icpwork.com",
                username: "alexrodriguez",
                user_type: "freelancer",
                reputation_score: 98,
                availability: "Available"
            });
        }
    };

    // If it's the landing page, don't wrap it with the main layout
    if (currentPageName === 'landing') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white" style={{fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif'}}>
            {/* Top Navigation Bar */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 h-16">
                <div className="flex items-center justify-between h-full px-6">
                    <div className="flex items-center space-x-6">
                        {/* Logo with gradient colors - Now clickable and redirects to landing */}
                        <Link to={createPageUrl("landing")} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm rounded-full">
                                ∞
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">ICPWork</span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-2">
                            {navigationItems.map((item) => {
                                const isActive = location.pathname === item.url;
                                return (
                                    <Link
                                        key={item.title}
                                        to={item.url}
                                        className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-300 relative rounded-lg ${
                                            isActive
                                                ? 'text-white bg-gradient-to-r from-blue-500/30 to-pink-500/30'
                                                : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                                        }`}
                                    >
                                        <item.icon className="w-4 h-4 mr-2" />
                                        <span>{item.title}</span>
                                        {item.badge && (
                                            <Badge className="ml-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-md">
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Search */}
                        <div className="relative hidden lg:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search..."
                                className="pl-10 w-48 bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:w-64 focus:border-blue-500 transition-all duration-300 rounded-full"
                            />
                        </div>

                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white hover:bg-slate-700/50 transition-colors duration-300 rounded-full">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full border-2 border-slate-900"></span>
                        </Button>
                        
                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-300 rounded-full p-1">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold text-sm flex items-center justify-center rounded-full">
                                        {user?.full_name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                                    </div>
                                    <span className="hidden md:block text-sm font-medium pr-2">{user?.username || 'User'}</span>
                                    <ChevronDown className="w-4 h-4 hidden md:block mr-1 text-gray-500" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-slate-800/90 backdrop-blur-xl border-slate-700 rounded-xl mt-2">
                                <DropdownMenuLabel className="text-gray-300">
                                    <div>
                                        <p className="font-medium text-white">{user?.full_name || user?.username}</p>
                                        <p className="text-xs text-gray-400">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-slate-700" />
                                <DropdownMenuItem className="text-gray-300 hover:!text-white hover:!bg-slate-700/50 rounded-md cursor-pointer">
                                    <UserCircle className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 hover:!text-white hover:!bg-slate-700/50 rounded-md cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                 <DropdownMenuItem className="text-gray-300 hover:!text-white hover:!bg-slate-700/50 rounded-md cursor-pointer">
                                    <DollarSign className="mr-2 h-4 w-4" />
                                    <span>Balance: $2,850</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-slate-700" />
                                <DropdownMenuItem className="text-red-400 hover:!text-red-300 hover:!bg-red-500/20 rounded-md cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} className="text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-full">
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
                        className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-xl md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-0 right-0 h-full w-full max-w-xs bg-slate-900 p-6 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">Menu</span>
                                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="-mr-2">
                                    <X className="w-6 h-6 text-gray-400" />
                                </Button>
                            </div>
                            <nav className="flex flex-col space-y-2">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        to={item.url}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                    >
                                        <item.icon className="w-5 h-5 mr-4" />
                                        <span>{item.title}</span>
                                        {item.badge && (
                                            <Badge className="ml-auto bg-gradient-to-r from-blue-500 to-pink-500 text-white">
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content - Applying padding here to push all children down */}
            <main className="pt-16">
                {children}
            </main>
        </div>
    );
}

