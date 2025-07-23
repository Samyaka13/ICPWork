
import React, { useState, useEffect } from "react";
import { Hackathon, HackathonRegistration, User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search, Calendar, Users, Trophy, MapPin, ExternalLink,
  Clock, Star, Target, Filter, Zap, Award
} from "lucide-react";
import { motion } from "framer-motion";
import { format, differenceInDays } from "date-fns";

const CategoryButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium transition-all duration-300 border border-slate-600 rounded-lg ${
      active
        ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white border-transparent'
        : 'text-gray-400 hover:text-white hover:bg-slate-700 hover:border-slate-500'
    }`}
  >
    {children}
  </button>
);

const HackathonCard = ({ hackathon, index }) => {
  const getStatusColor = (status) => {
    const colors = {
      upcoming: "bg-blue-600 text-white",
      registration_open: "bg-green-600 text-white",
      ongoing: "bg-yellow-600 text-white",
      judging: "bg-orange-600 text-white",
      completed: "bg-gray-600 text-white"
    };
    return colors[status] || "bg-gray-600 text-white";
  };

  const getStatusText = (status) => {
    const texts = {
      upcoming: "Coming Soon",
      registration_open: "Registration Open",
      ongoing: "In Progress",
      judging: "Judging Phase",
      completed: "Completed"
    };
    return texts[status] || status;
  };

  const daysUntilStart = differenceInDays(new Date(hackathon.start_date), new Date());
  const daysUntilEnd = differenceInDays(new Date(hackathon.end_date), new Date());
  const daysUntilRegistration = differenceInDays(new Date(hackathon.registration_deadline), new Date());

  const getTimelineText = () => {
    if (hackathon.status === 'upcoming') {
      return `Starts in ${daysUntilStart} days`;
    } else if (hackathon.status === 'registration_open') {
      return `Registration closes in ${daysUntilRegistration} days`;
    } else if (hackathon.status === 'ongoing') {
      return `Ends in ${daysUntilEnd} days`;
    } else {
      return format(new Date(hackathon.start_date), 'MMM d, yyyy');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-slate-800 border border-slate-700 p-6 group cursor-pointer transition-all duration-500 hover:bg-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 rounded-xl"
    >
      <div className="flex justify-between items-start mb-4">
        <Badge className={`${getStatusColor(hackathon.status)} font-mono text-xs uppercase px-2 py-1 rounded-md`}>
          {getStatusText(hackathon.status)}
        </Badge>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>{hackathon.location || "Virtual"}</span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {hackathon.title}
      </h3>
      <p className="text-sm text-blue-400 mb-3 font-medium">
        {hackathon.theme}
      </p>
      <p className="text-sm text-gray-400 line-clamp-3 mb-4 group-hover:text-gray-300 transition-colors">
        {hackathon.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {hackathon.categories?.slice(0, 3).map((category) => (
          <Badge key={category} className="bg-slate-700 text-gray-300 border border-slate-600 hover:bg-slate-600 transition-colors rounded-md">
            {category}
          </Badge>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Prize Pool</span>
          <span className="text-green-400 font-mono flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            ${hackathon.total_prize_pool?.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Timeline</span>
          <span className="text-white font-mono">
            {getTimelineText()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Participants</span>
          <span className="text-white font-mono flex items-center gap-1">
            <Users className="w-4 h-4" />
            {hackathon.current_participants || 0}/{hackathon.max_participants}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          className="flex-1 bg-slate-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 text-white transition-all duration-300 transform hover:scale-105 border border-slate-600 hover:border-transparent rounded-lg"
          disabled={hackathon.status !== 'registration_open'}
        >
          {hackathon.status === 'registration_open' ? 'Register Now' : 'View Details'}
        </Button>
        {hackathon.website_url && (
          <Button variant="outline" size="icon" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-white rounded-lg">
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default function Hackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "All Events" },
    { id: "registration_open", label: "Open Registration" },
    { id: "upcoming", label: "Upcoming" },
    { id: "ongoing", label: "Ongoing" },
    { id: "completed", label: "Completed" }
  ];

  // Mock hackathons for demo
  const mockHackathons = [
    {
      id: 1,
      title: "ICP Global Hackathon 2024",
      description: "Build the future of decentralized applications on the Internet Computer Protocol. Create innovative dApps that showcase the power of ICP's unique capabilities.",
      theme: "Decentralized Future",
      total_prize_pool: 100000,
      start_date: "2024-03-01",
      end_date: "2024-03-15",
      registration_deadline: "2024-02-20",
      status: "registration_open",
      max_participants: 500,
      current_participants: 287,
      categories: ["DeFi", "Social Media", "Gaming", "Enterprise"],
      location: "Virtual",
      website_url: "https://icphackathon.com"
    },
    {
      id: 2,
      title: "Web3 Security Challenge",
      description: "Focus on building secure, auditable smart contracts and identifying vulnerabilities in existing protocols. Help make Web3 safer for everyone.",
      theme: "Security First",
      total_prize_pool: 75000,
      start_date: "2024-02-25",
      end_date: "2024-03-10",
      registration_deadline: "2024-02-15",
      status: "registration_open",
      max_participants: 200,
      current_participants: 156,
      categories: ["Security", "Smart Contracts", "Auditing"],
      location: "Virtual",
      website_url: "https://web3security.dev"
    },
    {
      id: 3,
      title: "DeFi Innovation Summit",
      description: "Create the next generation of decentralized finance applications. Build innovative protocols, yield farming strategies, and financial tools.",
      theme: "Financial Innovation",
      total_prize_pool: 50000,
      start_date: "2024-04-01",
      end_date: "2024-04-07",
      registration_deadline: "2024-03-20",
      status: "upcoming",
      max_participants: 300,
      current_participants: 0,
      categories: ["DeFi", "Yield Farming", "Lending", "Trading"],
      location: "San Francisco, CA",
      website_url: "https://defiinnovation.org"
    },
    {
      id: 4,
      title: "AI x Blockchain Hackathon",
      description: "Combine artificial intelligence with blockchain technology to create groundbreaking applications that leverage both technologies.",
      theme: "AI Meets Blockchain",
      total_prize_pool: 80000,
      start_date: "2024-05-15",
      end_date: "2024-05-29",
      registration_deadline: "2024-05-01",
      status: "upcoming",
      max_participants: 400,
      current_participants: 0,
      categories: ["AI/ML", "Blockchain", "Data Science", "Automation"],
      location: "Virtual",
      website_url: "https://aiblockchain.tech"
    }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const allHackathons = await Hackathon.list("-created_date", 50);
      const hackathonsToShow = allHackathons.length > 0 ? allHackathons : mockHackathons;
      setHackathons(hackathonsToShow);
      setFilteredHackathons(hackathonsToShow);
    } catch (error) {
      console.error("Error loading hackathons:", error);
      setHackathons(mockHackathons);
      setFilteredHackathons(mockHackathons);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let filtered = hackathons;
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(hackathon => hackathon.status === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(hackathon => 
        hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.categories?.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredHackathons(filtered);
  }, [hackathons, activeCategory, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Hackathons
            </h1>
            <p className="text-gray-400">
              Join {filteredHackathons.length} exciting hackathons and compete for amazing prizes
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                placeholder="Search hackathons by title, theme, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-slate-800 border-slate-700 h-12 text-white placeholder-gray-400 rounded-lg"
              />
            </div>
            <Button variant="outline" className="bg-slate-800 border-slate-600 h-12 hover:bg-slate-700 hover:text-white text-gray-300 rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {categories.map(cat => (
              <CategoryButton
                key={cat.id}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </CategoryButton>
            ))}
          </div>

          {/* Hackathons Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredHackathons.map((hackathon, index) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} index={index} />
            ))}
          </div>

          {filteredHackathons.length === 0 && (
            <div className="text-center py-16">
              <Zap className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-semibold text-white mb-2">No hackathons found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
    </div>
  );
}
