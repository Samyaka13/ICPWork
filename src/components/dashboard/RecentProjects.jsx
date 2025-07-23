import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentProjects({ projects, userType }) {
  const getStatusBadge = (status) => {
    const styles = {
      open: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800"
    };
    return (
      <Badge className={`capitalize ${styles[status]}`}>{status.replace('_', ' ')}</Badge>
    );
  };

  return (
    <Card className="border-none shadow-sm rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-bold">Project Management</span>
          <Button variant="ghost" size="sm">View All <ArrowRight className="w-4 h-4 ml-2"/></Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.length === 0 ? (
             <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="font-medium">No active projects</p>
                <p className="text-sm">Your current projects will appear here.</p>
            </div>
          ) : (
            <div className="space-y-2">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-semibold text-gray-500">
                    <div className="col-span-5">Project Title</div>
                    <div className="col-span-3">Budget</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="grid grid-cols-12 gap-4 items-center p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <div className="col-span-5 font-semibold text-gray-800">{project.title}</div>
                        <div className="col-span-3 text-gray-600">${project.budget_min} - ${project.budget_max}</div>
                        <div className="col-span-2">{getStatusBadge(project.status)}</div>
                        <div className="col-span-2 text-right">
                            <Button variant="outline" size="sm">Manage</Button>
                        </div>
                    </motion.div>
                ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}