
import React, { useState, useEffect } from "react";
import { Project } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search, SlidersHorizontal, Star, Clock, DollarSign,
  Briefcase, Code, Palette, PenSquare, Filter
} from "lucide-react";
import { motion } from "framer-motion";

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

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-slate-800 border border-slate-700 p-6 group cursor-pointer transition-all duration-500 hover:bg-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 rounded-xl"
    >
      <div className="flex justify-between items-start mb-4">
        <Badge className="bg-blue-600 text-white font-mono text-xs uppercase px-2 py-1 rounded-md">
          {project.experience_level || "EXPERT"}
        </Badge>
        <Badge className="bg-slate-700 text-gray-300 border border-slate-600 rounded-md">
          {project.category?.replace("_", " ") || "Development"}
        </Badge>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {project.title || "Smart Contract Audit for DeFi Protocol"}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-3 mb-4 group-hover:text-gray-300 transition-colors">
        {project.description || "We need an experienced smart contract auditor to review our new DeFi lending protocol. The audit should cover potential vulnerabilities, gas optimization, and security best practices."}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {(project.required_skills || ["Solidity", "Smart Contracts", "Security", "DeFi"]).slice(0, 4).map((skill) => (
          <Badge key={skill} className="bg-slate-700 text-gray-300 border border-slate-600 hover:bg-slate-600 transition-colors rounded-md">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Budget</span>
          <span className="text-green-400 font-mono">
            ${project.budget_min || 5000} - ${project.budget_max || 8000}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Timeline</span>
          <span className="text-white font-mono">
            {project.timeline || "2-3 weeks"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Proposals</span>
          <span className="text-white font-mono">
            {project.proposals_count || 7}
          </span>
        </div>
      </div>

      <Button className="w-full bg-slate-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 text-white transition-all duration-300 transform hover:scale-105 border border-slate-600 hover:border-transparent rounded-lg">
        Apply Now
      </Button>
    </motion.div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "icp_development", label: "ICP Development" },
    { id: "web_development", label: "Web Development" },
    { id: "blockchain", label: "Blockchain" },
    { id: "design", label: "Design" },
    { id: "ai_ml", label: "AI/ML" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const allProjects = await Project.filter({ status: "open" }, "-created_date", 50);
      setProjects(allProjects);
      setFilteredProjects(allProjects);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  // Add some demo projects if none exist
  const displayProjects = filteredProjects.length > 0 ? filteredProjects : [
    { id: 1, title: "Smart Contract Audit for DeFi Protocol", category: "blockchain", experience_level: "EXPERT", description: "We need an experienced smart contract auditor to review our new DeFi lending protocol. The audit should cover potential vulnerabilities, gas optimization, and security best practices.", required_skills: ["Solidity", "Smart Contracts", "Security", "DeFi"], budget_min: 5000, budget_max: 8000, timeline: "2-3 weeks", proposals_count: 7 },
    { id: 2, title: "UI/UX Design for Arbitrum Wallet", category: "design", experience_level: "INTERMEDIATE", description: "Design a sleek and intuitive user interface for a new Arbitrum-based crypto wallet, focusing on ease of use and security.", required_skills: ["UI/UX", "Figma", "Web3 Design"], budget_min: 3000, budget_max: 6000, timeline: "4-6 weeks", proposals_count: 5 },
  ];

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
              Browse Projects
            </h1>
            <p className="text-gray-400">
              Discover {displayProjects.length} active bounties across the ICP ecosystem
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <Input
                    placeholder="Search bounties, skills, keywords..."
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

          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
    </div>
  );
}
