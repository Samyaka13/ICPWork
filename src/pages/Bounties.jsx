
import React, { useState, useEffect } from "react";
import { Bounty, BountySubmission, User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search, SlidersHorizontal, Star, Clock, DollarSign,
  Trophy, Code, Shield, Filter, Target, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

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

const BountyCard = ({ bounty, index }) => {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "bg-green-600 text-white",
      intermediate: "bg-yellow-600 text-white",
      advanced: "bg-orange-600 text-white",
      expert: "bg-red-600 text-white"
    };
    return colors[difficulty] || "bg-gray-600 text-white";
  };

  const getStatusColor = (status) => {
    const colors = {
      open: "bg-blue-600 text-white",
      in_progress: "bg-yellow-600 text-white",
      completed: "bg-green-600 text-white",
      expired: "bg-red-600 text-white"
    };
    return colors[status] || "bg-gray-600 text-white";
  };

  const daysUntilDeadline = Math.ceil((new Date(bounty.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-slate-800 border border-slate-700 p-6 group cursor-pointer transition-all duration-500 hover:bg-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 rounded-xl"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2">
          <Badge className={`${getDifficultyColor(bounty.difficulty)} font-mono text-xs uppercase px-2 py-1 rounded-md`}>
            {bounty.difficulty}
          </Badge>
          <Badge className={`${getStatusColor(bounty.status)} font-mono text-xs uppercase px-2 py-1 rounded-md`}>
            {bounty.status}
          </Badge>
        </div>
        <Badge className="bg-slate-700 text-gray-300 border border-slate-600 rounded-md">
          {bounty.category?.replace("_", " ")}
        </Badge>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {bounty.title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-3 mb-4 group-hover:text-gray-300 transition-colors">
        {bounty.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {bounty.required_skills?.slice(0, 4).map((skill) => (
          <Badge key={skill} className="bg-slate-700 text-gray-300 border border-slate-600 hover:bg-slate-600 transition-colors rounded-md">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Reward</span>
          <span className="text-green-400 font-mono flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            {bounty.reward_amount} {bounty.reward_token}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Deadline</span>
          <span className={`font-mono ${daysUntilDeadline < 7 ? 'text-red-400' : 'text-white'}`}>
            {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Expired'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Submissions</span>
          <span className="text-white font-mono">
            {bounty.submission_count || 0}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1 bg-slate-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 text-white transition-all duration-300 transform hover:scale-105 border border-slate-600 hover:border-transparent rounded-lg">
          Submit Solution
        </Button>
        {bounty.repository_url && (
          <Button variant="outline" size="icon" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-white rounded-lg">
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default function Bounties() {
  const [bounties, setBounties] = useState([]);
  const [filteredBounties, setFilteredBounties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "smart_contracts", label: "Smart Contracts" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "security", label: "Security" },
    { id: "documentation", label: "Documentation" },
    { id: "testing", label: "Testing" },
    { id: "design", label: "Design" }
  ];

  // Mock bounties for demo
  const mockBounties = [
    {
      id: 1,
      title: "Build a Decentralized Identity Canister",
      description: "Create a secure identity management system using ICP canisters with features for identity verification, credential storage, and privacy protection.",
      reward_amount: 5000,
      reward_token: "ICP",
      difficulty: "advanced",
      category: "smart_contracts",
      required_skills: ["Motoko", "Rust", "Identity Management", "Cryptography"],
      deadline: "2024-02-15",
      status: "open",
      submission_count: 3,
      repository_url: "https://github.com/example/identity-canister"
    },
    {
      id: 2,
      title: "Frontend Dashboard for DeFi Analytics",
      description: "Design and implement a responsive dashboard for DeFi analytics with real-time charts, portfolio tracking, and yield farming insights.",
      reward_amount: 3000,
      reward_token: "ICP",
      difficulty: "intermediate",
      category: "frontend",
      required_skills: ["React", "TypeScript", "Chart.js", "Web3"],
      deadline: "2024-02-20",
      status: "open",
      submission_count: 7,
      repository_url: "https://github.com/example/defi-dashboard"
    },
    {
      id: 3,
      title: "Security Audit for Multi-Sig Wallet",
      description: "Conduct a comprehensive security audit of a multi-signature wallet implementation, identifying vulnerabilities and providing detailed recommendations.",
      reward_amount: 8000,
      reward_token: "ckBTC",
      difficulty: "expert",
      category: "security",
      required_skills: ["Security Auditing", "Solidity", "Penetration Testing", "Smart Contract Security"],
      deadline: "2024-02-10",
      status: "open",
      submission_count: 1,
      repository_url: "https://github.com/example/multisig-wallet"
    },
    {
      id: 4,
      title: "API Documentation Generator",
      description: "Build an automated tool that generates comprehensive API documentation from ICP canister interfaces with examples and interactive testing.",
      reward_amount: 2500,
      reward_token: "ICP",
      difficulty: "intermediate",
      category: "documentation",
      required_skills: ["Python", "API Documentation", "Automation", "Technical Writing"],
      deadline: "2024-02-25",
      status: "open",
      submission_count: 5
    }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const allBounties = await Bounty.filter({ status: "open" }, "-created_date", 50);
      const bountiesToShow = allBounties.length > 0 ? allBounties : mockBounties;
      setBounties(bountiesToShow);
      setFilteredBounties(bountiesToShow);
    } catch (error) {
      console.error("Error loading bounties:", error);
      setBounties(mockBounties);
      setFilteredBounties(mockBounties);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let filtered = bounties;
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(bounty => bounty.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(bounty => 
        bounty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bounty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bounty.required_skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredBounties(filtered);
  }, [bounties, activeCategory, searchTerm]);

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
              Bounties
            </h1>
            <p className="text-gray-400">
              Discover {filteredBounties.length} active bounties and earn rewards for your skills
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                placeholder="Search bounties by title, skills, or keywords..."
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

          {/* Bounties Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBounties.map((bounty, index) => (
              <BountyCard key={bounty.id} bounty={bounty} index={index} />
            ))}
          </div>

          {filteredBounties.length === 0 && (
            <div className="text-center py-16">
              <Target className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-semibold text-white mb-2">No bounties found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
    </div>
  );
}
