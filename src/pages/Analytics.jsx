
import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, DollarSign, Users, Briefcase, 
  Calendar, Target, Award, Eye 
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from "recharts";

import AnalyticsCard from "../components/analytics/AnalyticsCard";
import ChartCard from "../components/analytics/ChartCard";

export default function Analytics() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  // Mock data for demonstration
  const earningsData = [
    { month: 'Jan', earnings: 1200, projects: 3 },
    { month: 'Feb', earnings: 1800, projects: 4 },
    { month: 'Mar', earnings: 2400, projects: 5 },
    { month: 'Apr', earnings: 1600, projects: 3 },
    { month: 'May', earnings: 3200, projects: 6 },
    { month: 'Jun', earnings: 2800, projects: 5 }
  ];

  const skillDistribution = [
    { name: 'ICP Development', value: 35, color: '#6366f1' },
    { name: 'React', value: 25, color: '#8b5cf6' },
    { name: 'Smart Contracts', value: 20, color: '#06b6d4' },
    { name: 'UI/UX Design', value: 15, color: '#10b981' },
    { name: 'Other', value: 5, color: '#f59e0b' }
  ];

  const projectStats = [
    { category: 'Web Dev', completed: 12, pending: 3 },
    { category: 'Blockchain', completed: 8, pending: 2 },
    { category: 'Design', completed: 6, pending: 1 },
    { category: 'ICP', completed: 15, pending: 4 }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                Track your performance and growth
              </p>
            </div>
            
            <div className="flex gap-2 p-1 bg-slate-800 border border-slate-700 rounded-lg">
              <Button 
                variant={timeRange === "7d" ? "primary" : "ghost"}
                onClick={() => setTimeRange("7d")}
                className={`rounded-md px-4 py-2 transition-all duration-300 ${timeRange === '7d' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-gray-400 hover:text-white hover:bg-slate-700/50'}`}
              >
                7 Days
              </Button>
              <Button 
                variant={timeRange === "30d" ? "primary" : "ghost"}
                onClick={() => setTimeRange("30d")}
                className={`rounded-md px-4 py-2 transition-all duration-300 ${timeRange === '30d' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-gray-400 hover:text-white hover:bg-slate-700/50'}`}
              >
                30 Days
              </Button>
              <Button 
                variant={timeRange === "90d" ? "primary" : "ghost"}
                onClick={() => setTimeRange("90d")}
                className={`rounded-md px-4 py-2 transition-all duration-300 ${timeRange === '90d' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-gray-400 hover:text-white hover:bg-slate-700/50'}`}
              >
                90 Days
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard
            title="Total Earnings"
            value="$12,450"
            change="+23%"
            changeType="increase"
            icon={DollarSign}
            gradient="from-green-400 to-green-600"
          />
          <AnalyticsCard
            title="Projects Completed"
            value="41"
            change="+15%"
            changeType="increase"
            icon={Briefcase}
            gradient="from-blue-400 to-blue-600"
          />
          <AnalyticsCard
            title="Client Rating"
            value="4.9/5"
            change="+0.2"
            changeType="increase"
            icon={Award}
            gradient="from-purple-400 to-purple-600"
          />
          <AnalyticsCard
            title="Profile Views"
            value="324"
            change="+8%"
            changeType="increase"
            icon={Eye}
            gradient="from-orange-400 to-orange-600"
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ChartCard title="Earnings Overview" subtitle="Monthly earnings and project count">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.7)" />
                <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                    borderColor: 'rgba(255, 255, 255, 0.2)' 
                  }}
                  formatter={(value, name) => [
                    name === 'earnings' ? `$${value}` : value,
                    name === 'earnings' ? 'Earnings' : 'Projects'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#818cf8" 
                  fill="url(#earningsGradient)" 
                />
                <defs>
                  <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Project Categories" subtitle="Distribution of completed projects">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                <XAxis dataKey="category" stroke="rgba(255, 255, 255, 0.7)" />
                <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                    borderColor: 'rgba(255, 255, 255, 0.2)' 
                  }}
                />
                <Bar dataKey="completed" fill="#6366f1" name="Completed" />
                <Bar dataKey="pending" fill="#475569" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skills Chart */}
          <Card className="lg:col-span-1 border-slate-700 bg-slate-800 rounded-xl">
            <CardHeader>
              <CardTitle>Skills Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                      borderColor: 'rgba(255, 255, 255, 0.2)' 
                    }}
                    formatter={(value) => [`${value}%`, 'Usage']} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {skillDistribution.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: skill.color }}
                      />
                      <span>{skill.name}</span>
                    </div>
                    <span className="font-medium text-white">{skill.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card className="lg:col-span-2 border-slate-700 bg-slate-800 rounded-xl">
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h4 className="font-semibold text-green-300">Strong Performance</h4>
                  </div>
                  <p className="text-green-400/80 text-sm">
                    Your earnings increased by 23% this month. You're in the top 10% of freelancers on the platform!
                  </p>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    <h4 className="font-semibold text-blue-300">Optimization Tip</h4>
                  </div>
                  <p className="text-blue-400/80 text-sm">
                    Consider increasing your rates for ICP development projects. Market data shows 15% higher rates for similar skills.
                  </p>
                </div>

                <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    <h4 className="font-semibold text-purple-300">Client Feedback</h4>
                  </div>
                  <p className="text-purple-400/80 text-sm">
                    Your client satisfaction score is exceptional at 4.9/5. Keep up the excellent work!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
