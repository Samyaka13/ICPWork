import React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, DollarSign, MessageSquare, Eye, 
  CheckCircle, XCircle, AlertCircle 
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function ProposalCard({ proposal, index }) {
  const getStatusInfo = (status) => {
    const statuses = {
      pending: { color: "text-yellow-600", icon: <AlertCircle className="w-4 h-4" /> },
      accepted: { color: "text-green-600", icon: <CheckCircle className="w-4 h-4" /> },
      rejected: { color: "text-red-600", icon: <XCircle className="w-4 h-4" /> }
    };
    return statuses[status] || { color: "text-gray-600", icon: <AlertCircle className="w-4 h-4" /> };
  };

  const statusInfo = getStatusInfo(proposal.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white border border-gray-200 hover:shadow-md transition-shadow p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Proposal</h3>
          <div className={`flex items-center gap-2 text-sm font-medium ${statusInfo.color}`}>
            {statusInfo.icon}
            {proposal.status}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {format(new Date(proposal.created_date), "MMM d, yyyy")}
          </p>
        </div>
      </div>

      <p className="text-gray-600 line-clamp-3 mb-4">
        {proposal.cover_letter}
      </p>

      {proposal.milestones && proposal.milestones.length > 0 && (
        <div className="mb-4 border-t border-gray-100 pt-4">
          <h4 className="font-medium text-sm text-gray-500 mb-2">Milestones:</h4>
          <div className="space-y-2">
            {proposal.milestones.slice(0, 2).map((milestone, idx) => (
              <div key={idx} className="text-sm text-gray-600 flex justify-between">
                <span>{milestone.title}</span>
                <span className="font-medium text-gray-900">${milestone.amount}</span>
              </div>
            ))}
            {proposal.milestones.length > 2 && (
              <p className="text-xs text-gray-500">+{proposal.milestones.length - 2} more milestones</p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 mt-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span className="font-medium text-green-600">${proposal.bid_amount}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{proposal.estimated_timeline}</span>
        </div>
        {proposal.ai_match_score && (
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-xs">
              AI Match: {proposal.ai_match_score}%
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}