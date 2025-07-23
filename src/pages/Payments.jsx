
import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, CreditCard, ArrowUpRight, ArrowDownLeft, 
  Clock, CheckCircle, AlertCircle, Wallet, Plus, 
  Download, Filter, TrendingUp 
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

import PaymentCard from "../components/payments/PaymentCard";
import WalletBalance from "../components/payments/WalletBalance";
import TransactionHistory from "../components/payments/TransactionHistory";

export default function Payments() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for demonstration
  const [transactions] = useState([
    {
      id: 1,
      type: "received",
      amount: 1250,
      currency: "ICP",
      description: "Payment for DeFi Dashboard project",
      date: "2024-01-15T10:30:00Z",
      status: "completed",
      from: "client@example.com"
    },
    {
      id: 2,
      type: "sent",
      amount: 85,
      currency: "ICP",
      description: "Platform fee",
      date: "2024-01-15T10:32:00Z",
      status: "completed",
      to: "platform"
    },
    {
      id: 3,
      type: "received",
      amount: 750,
      currency: "ckBTC",
      description: "Payment for NFT Marketplace design",
      date: "2024-01-10T14:20:00Z",
      status: "pending",
      from: "designer@example.com"
    }
  ]);

  const [walletBalance] = useState({
    icp: 2.45,
    ckbtc: 0.025,
    usd_equivalent: 2450
  });

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
                Payments & Wallet
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your earnings and transactions on ICP
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="bg-slate-800 border-slate-600 hover:bg-slate-700 hover:text-white text-gray-300 rounded-lg">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105 rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Funds
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Wallet Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <WalletBalance 
            title="Total Balance"
            amount={`$${walletBalance.usd_equivalent.toLocaleString()}`}
            subtitle="USD Equivalent"
            icon={DollarSign}
            gradient="from-green-500 to-green-600"
          />
          <WalletBalance 
            title="ICP Balance"
            amount={`${walletBalance.icp} ICP`}
            subtitle="~$2,205 USD"
            icon={Wallet}
            gradient="from-blue-500 to-blue-600"
          />
          <WalletBalance 
            title="ckBTC Balance"
            amount={`${walletBalance.ckbtc} ckBTC`}
            subtitle="~$1,085 USD"
            icon={CreditCard}
            gradient="from-orange-500 to-orange-600"
          />
        </div>

        {/* Main Content */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
        <Card className="border-slate-700 bg-slate-800 rounded-xl">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-700 border border-slate-600 p-1 rounded-lg">
                <TabsTrigger value="overview" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white text-gray-300 rounded-md">Overview</TabsTrigger>
                <TabsTrigger value="transactions" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white text-gray-300 rounded-md">Transactions</TabsTrigger>
                <TabsTrigger value="escrow" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white text-gray-300 rounded-md">Escrow</TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white text-gray-300 rounded-md">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="overview">
                <div className="space-y-8">
                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      Recent Activity
                    </h3>
                    <div className="grid gap-4 mt-4">
                      {transactions.slice(0, 5).map((transaction, index) => (
                        <PaymentCard key={transaction.id} transaction={transaction} index={index} />
                      ))}
                    </div>
                  </div>

                  {/* Payment Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-slate-700 bg-slate-800/50 rounded-xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-400">This Month</p>
                            <p className="text-2xl font-bold text-white">$3,250</p>
                          </div>
                          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <p className="text-sm text-green-400 mt-2">+15% from last month</p>
                      </CardContent>
                    </Card>

                    <Card className="border-slate-700 bg-slate-800/50 rounded-xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-400">Platform Fees</p>
                            <p className="text-2xl font-bold text-white">$32.50</p>
                          </div>
                          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                            <ArrowDownLeft className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <p className="text-sm text-blue-400 mt-2">Only 1% fee</p>
                      </CardContent>
                    </Card>

                    <Card className="border-slate-700 bg-slate-800/50 rounded-xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-400">Pending</p>
                            <p className="text-2xl font-bold text-white">$750</p>
                          </div>
                          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600">
                            <Clock className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <p className="text-sm text-yellow-400 mt-2">In escrow</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="transactions">
                <TransactionHistory transactions={transactions} />
              </TabsContent>

              <TabsContent value="escrow">
                <div className="text-center py-12">
                  <Wallet className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Active Escrow</h3>
                  <p className="text-gray-400">Your escrow transactions will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Wallet Settings</h3>
                    <div className="space-y-4 mt-4">
                      <Card className="border-slate-700 bg-slate-800/50 rounded-xl">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Auto-withdraw</h4>
                              <p className="text-sm text-gray-400">Automatically withdraw earnings above threshold</p>
                            </div>
                            <Button variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600 rounded-lg">Configure</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-slate-700 bg-slate-800/50 rounded-xl">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Payment Notifications</h4>
                              <p className="text-sm text-gray-400">Get notified about payment activities</p>
                            </div>
                            <Button variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600 rounded-lg">Manage</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </div>
  );
}
