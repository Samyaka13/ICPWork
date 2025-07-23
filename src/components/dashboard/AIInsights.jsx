import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Star } from "lucide-react";
import { motion } from "framer-motion";

const RecommendationCard = ({ title, description, match, color }) => (
    <div className={`p-4 rounded-xl border-l-4`} style={{borderColor: color}}>
        <div className="flex justify-between items-center mb-1">
            <h4 className="font-semibold text-sm">{title}</h4>
            <div className="flex items-center gap-1 text-sm font-bold" style={{color}}>
                <Star className="w-4 h-4 fill-current" />
                <span>{match}% Match</span>
            </div>
        </div>
        <p className="text-xs text-gray-600">{description}</p>
    </div>
);

export default function AIInsights({ user }) {
  return (
    <Card className="border-none shadow-sm rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Brain className="w-6 h-6 text-indigo-600" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RecommendationCard 
            title="DeFi Dashboard Frontend"
            description="Perfect for your React & Web3.js skills."
            match={94}
            color="#6366F1"
        />
        <RecommendationCard 
            title="NFT Marketplace Analytics"
            description="High-paying project matching your data visualization expertise."
            match={88}
            color="#8B5CF6"
        />
        <RecommendationCard 
            title="ICP Canister Optimization"
            description="Short-term consultation, excellent fit for your Motoko skills."
            match={82}
            color="#D946EF"
        />
        
        <Button className="w-full bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50">
            View All AI Matches
        </Button>
      </CardContent>
    </Card>
  );
}