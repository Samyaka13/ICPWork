
import React, { useState, useEffect } from "react";
import { Project, Proposal, User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, Plus, Eye, Clock, DollarSign, CheckCircle, Target, TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const StatCard = ({ title, value, icon: Icon, isHighlighted = false }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        initial={{ opacity: 0, y: 20 }}
        className={`p-6 group cursor-pointer transition-all duration-500 border border-slate-700 rounded-xl ${
            isHighlighted 
            ? 'bg-gradient-to-r from-blue-500 to-pink-500' 
            : 'bg-slate-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500'
        } hover:shadow-xl hover:shadow-blue-500/25`}
    >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className={`text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300 ${
                isHighlighted ? 'text-white' : 'text-gray-400 group-hover:text-white'
            }`}>{title}</p>
            <p className={`text-4xl font-bold font-mono transition-colors duration-300 ${
                isHighlighted ? 'text-white' : 'text-white'
            }`}>{value}</p>
          </div>
          <div className={`w-12 h-12 flex items-center justify-center transition-colors duration-300 ${
              isHighlighted ? 'text-white' : 'text-gray-400 group-hover:text-white'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
    </motion.div>
);

export default function MyProjects() {
  const [user, setUser] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const [myProposals, setMyProposals] = useState([]);
  const [activeTab, setActiveTab] = useState("posted");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      const projects = await Project.filter({ client_id: currentUser.id }, "-created_date");
      setMyProjects(projects);
      const proposals = await Proposal.filter({ freelancer_id: currentUser.id }, "-created_date");
      setMyProposals(proposals);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };
  
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
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-2">
                My Projects
              </h1>
              <p className="text-gray-400">
                Manage your projects and proposals
              </p>
            </div>
            <div className="flex gap-3">
                <Button className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105 rounded-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Project
                </Button>
                <Button variant="outline" className="bg-slate-800 border-slate-600 hover:bg-slate-700 hover:text-white rounded-lg">
                    <Eye className="w-4 h-4 mr-2" />
                    Analytics
                </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Projects" value="0" icon={Briefcase} />
          <StatCard title="Pending Proposals" value="0" icon={Clock} />
          <StatCard title="Completed" value="0" icon={CheckCircle} isHighlighted={true} />
          <StatCard title="Total Value" value="$0" icon={DollarSign} />
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-slate-800 border border-slate-700 rounded-xl">
            <TabsList className="p-0 h-auto bg-transparent border-b border-slate-700 w-full justify-start rounded-t-xl overflow-hidden">
                <TabsTrigger value="posted" className="px-6 py-3 font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-none">
                    My Posted Projects
                </TabsTrigger>
                <TabsTrigger value="proposals" className="px-6 py-3 font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-none">
                    My Proposals
                </TabsTrigger>
            </TabsList>
            
            <TabsContent value="posted" className="p-6">
              <div className="text-center py-16">
                <Briefcase className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
                <p className="text-gray-400 mb-6">Start by posting your first project</p>
                <Button className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105 rounded-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Project
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="proposals" className="p-6">
              <div className="text-center py-16">
                <Target className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                <h3 className="text-xl font-semibold text-white mb-2">No proposals yet</h3>
                <p className="text-gray-400 mb-6">Submit proposals to start earning</p>
                <Link to={createPageUrl("Projects")}>
                  <Button className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105 rounded-lg">
                      Browse Projects
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
