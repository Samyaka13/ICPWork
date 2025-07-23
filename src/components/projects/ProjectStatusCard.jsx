import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, Users, DollarSign, Eye, MessageSquare, 
  MoreHorizontal, CheckCircle, AlertCircle 
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProjectStatusCard({ project, index }) {
  const getStatusBadgeVariant = (status) => {
    const variants = {
      open: "default",
      in_progress: "secondary",
      completed: "outline",
      cancelled: "destructive"
    };
    return variants[status] || "secondary";
  };

  const getStatusColor = (status) => {
    const colors = {
      open: "text-blue-600",
      in_progress: "text-yellow-600",
      completed: "text-green-600",
      cancelled: "text-red-600"
    };
    return colors[status] || "text-gray-600";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open": return <Clock className="w-4 h-4" />;
      case "in_progress": return <Clock className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "cancelled": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
            <div className={`flex items-center gap-2 text-sm ${getStatusColor(project.status)}`}>
              {getStatusIcon(project.status)}
              <span>{project.status.replace('_', ' ')}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-gray-600 line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.required_skills?.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline">{skill}</Badge>
          ))}
          {project.required_skills?.length > 4 && (
            <Badge variant="outline">+{project.required_skills.length - 4} more</Badge>
          )}
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span className="font-medium text-green-600">
            ${project.budget_min} - ${project.budget_max}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{project.timeline}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-4 h-4" />
          <span>{project.proposals_count || 0} proposals</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-xs">
            Posted {format(new Date(project.created_date), "MMM d")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}