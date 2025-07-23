
import React, { useState, useEffect } from "react";
import { User, Project } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  DollarSign, Briefcase, Target, Star,
  ArrowUpRight, ArrowRight, Plus, Eye, Search, MessageSquare, TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, subtitle, trend, icon: Icon, isSpecial = false }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }}
        initial={{ opacity: 0, y: 20 }}
        className={`p-6 bg-slate-800 border border-slate-700 group cursor-pointer transition-all duration-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:shadow-xl hover:shadow-blue-500/25 rounded-xl`}
    >
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors duration-300">{title}</p>
                </div>
                <p className="text-3xl font-bold text-white font-mono mb-1">{value}</p>
                {subtitle && <p className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">{subtitle}</p>}
            </div>
            {trend && (
                <div className="flex items-center text-green-400 text-sm font-mono group-hover:text-white transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    {trend}
                </div>
            )}
        </div>
    </motion.div>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="p-4 hover:bg-slate-700/50 transition-all duration-300 border-b border-slate-700 last:border-b-0 group hover:border-blue-500/50"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors mb-1">
          {project.title}
        </h4>
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors mb-2">
          {project.category?.replace('_', ' ')}
        </p>
        <p className="text-green-400 font-mono text-sm">
          ${project.budget_min} - ${project.budget_max}
        </p>
      </div>
      <div className="text-right">
        <Badge className="bg-green-700 text-green-100 text-xs px-2 py-1 mb-2">
          OPEN
        </Badge>
        <p className="text-xs text-gray-500">{project.timeline}</p>
      </div>
    </div>
  </motion.div>
);

const PerformanceMetric = ({ label, value, color = "text-white" }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className={`font-mono text-sm ${color}`}>{value}</span>
  </div>
);

const QuickActionButton = ({ children, variant = "primary" }) => (
  <Button
    className={`w-full justify-start text-left transition-all duration-300 rounded-lg ${
      variant === "primary"
        ? "bg-slate-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 text-white border border-slate-600 hover:border-transparent"
        : "bg-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white border border-slate-600"
    }`}
  >
    {children}
  </Button>
);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalEarnings: 12450,
    activeProjects: 5,
    completedProjects: 23,
    successRate: 98.5
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock projects for demo
  const mockProjects = [
    {
      id: 1,
      title: "ICP Canister Development - Social Media dApp",
      category: "icp_development",
      budget_min: 8000,
      budget_max: 12000,
      timeline: "6-8 weeks"
    },
    {
      id: 2,
      title: "UI/UX Design for Arbitrum Wallet",
      category: "design",
      budget_min: 2500,
      budget_max: 4000,
      timeline: "3-4 weeks"
    },
    {
      id: 3,
      title: "AI Trading Bot Development",
      category: "ai_ml",
      budget_min: 5000,
      budget_max: 10000,
      timeline: "5-6 weeks"
    },
    {
      id: 4,
      title: "React Frontend for NFT Marketplace",
      category: "web_development",
      budget_min: 3500,
      budget_max: 6000,
      timeline: "4-5 weeks"
    }
  ];

  useEffect(() => {
    // loadDashboardData();
  }, []);
  // const loadDashboardData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const currentUser = await User.me();
  //     setUser(currentUser);
  //     const recentProjects = await Project.filter({ status: "open" }, "-created_date", 5);
  //     setProjects(recentProjects.length > 0 ? recentProjects : mockProjects);
  //   } catch (error) {
  //     console.error("Error loading dashboard data, redirecting to landing:", error);
  //     // User is not authenticated, redirect to the landing page.
  //     window.location.href = createPageUrl("Landing");
  //     return; // Stop further execution
  //   }
  //   setIsLoading(false);
  // };

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
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-gray-400 text-sm">
                Welcome back, {user?.username || 'Satyam Singh'} • Last login: 2 hours ago
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-900/50 text-green-300 border border-green-600 font-mono text-xs px-3 py-1 rounded-md">
                AVAILABLE
              </Badge>
              <Button className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105 rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Earnings"
              value={`$${stats.totalEarnings.toLocaleString()}`}
              subtitle="USD equivalent"
              trend="+12.5%"
              icon={DollarSign}
            />
            <StatCard
              title="Active Projects"
              value={stats.activeProjects.toString()}
              subtitle="In progress"
              trend="+2"
              icon={Briefcase}
            />
            <StatCard
              title="Completed"
              value={stats.completedProjects.toString()}
              subtitle="Projects finished"
              trend="100%"
              icon={Target}
            />
            <StatCard
              title="Success Rate"
              value={`${stats.successRate}%`}
              subtitle="Client satisfaction"
              trend="+0.5%"
              icon={Star}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Projects - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl"
            >
              <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Recent Projects</h3>
                <Button className="bg-slate-700 hover:bg-gradient-to-r hover:from-blue-500 to-pink-500 text-white transition-all duration-300 transform hover:scale-105 border border-slate-600 hover:border-transparent rounded-lg px-4 py-2">
                  Browse All
                </Button>
              </div>
              <div>
                {projects.slice(0, 4).map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Performance Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-slate-800 border border-slate-700 p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-6">Performance</h3>
                <div className="space-y-3">
                  <PerformanceMetric label="Profile Views" value="1,247" />
                  <PerformanceMetric label="Proposals Sent" value="18" />
                  <PerformanceMetric label="Response Rate" value="89%" color="text-green-400" />
                  <PerformanceMetric label="Avg. Project Value" value="$2,650" color="text-blue-400" />
                </div>
              </motion.div>

              {/* Quick Actions Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-slate-800 border border-slate-700 p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <QuickActionButton variant="primary">
                    📝 Create New Proposal
                  </QuickActionButton>
                  <QuickActionButton>
                    💼 View Active Projects
                  </QuickActionButton>
                  <QuickActionButton>
                    📊 Check Analytics
                  </QuickActionButton>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
  );
}
