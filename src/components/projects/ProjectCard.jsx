import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, DollarSign, Star, Zap, ChevronRight 
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index, userSkills = [] }) {
  const calculateMatchScore = () => {
    if (!userSkills.length || !project.required_skills?.length) return 0;
    const matchingSkills = project.required_skills.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    return Math.round((matchingSkills.length / project.required_skills.length) * 100);
  };

  const matchScore = calculateMatchScore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="border border-gray-200 hover:border-indigo-300 transition-all duration-300 h-full flex flex-col">
        <CardContent className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors flex-1 pr-4">
              {project.title}
            </h3>
            {matchScore > 50 && (
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="transform -rotate-90" width="60" height="60" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200" strokeWidth="2"></circle>
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            className="stroke-current text-indigo-500"
                            strokeWidth="2"
                            strokeDasharray={`${matchScore}, 100`}
                            strokeLinecap="round"
                        ></circle>
                    </svg>
                    <span className="absolute text-sm font-bold text-indigo-600">{matchScore}%</span>
                </div>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.required_skills?.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {project.required_skills?.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.required_skills.length - 4} more
              </Badge>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center text-sm mb-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold text-base text-green-600">
                    ${project.budget_min} - ${project.budget_max}
                  </span>
                </div>
                 <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{project.timeline}</span>
                </div>
            </div>

            <Button 
              size="sm" 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              View Details
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}