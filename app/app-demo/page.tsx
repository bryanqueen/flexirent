"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Calendar, CreditCard, Home, TrendingUp, User, Bell } from "lucide-react"

export default function AppDemoPage() {
    return (
        <div className="h-screen bg-gradient-to-b from-background to-accent/10 overflow-hidden flex flex-col">
            {/* App content */}
            <div className="flex-1 overflow-y-auto pb-24">
                    {/* Header */}
                    <motion.div
                        className="px-6 pt-4 pb-6"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Welcome back,</p>
                                <h1 className="font-serif text-2xl font-bold">John Doe</h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Bell className="w-6 h-6 text-foreground" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                                </div>
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main rent card */}
                    <motion.div
                        className="px-6 mb-6"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="noise-bg border-2 border-border overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Next Payment</p>
                                        <p className="font-serif text-3xl font-bold">₦50,000</p>
                                    </div>
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                        <Home className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Due Date</span>
                                        <span className="font-semibold">Dec 28, 2024</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-semibold">4/12 months</span>
                                    </div>
                                </div>
                                {/* Progress bar */}
                                <div className="mb-4">
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: '33%' }}></div>
                                    </div>
                                </div>
                                <Button size="lg" className="w-full font-serif text-lg">
                                    Pay Now
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Quick actions */}
                    <motion.div
                        className="px-6 mb-6"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="font-serif text-lg font-semibold mb-3">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <Card className="border-border cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                        <Calendar className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <p className="font-serif text-sm font-semibold">Payment History</p>
                                </CardContent>
                            </Card>
                            <Card className="border-border cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                        <CreditCard className="w-6 h-6 text-green-600" />
                                    </div>
                                    <p className="font-serif text-sm font-semibold">Payment Methods</p>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>

                    {/* Recent activity */}
                    <motion.div
                        className="px-6 mb-6"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="font-serif text-lg font-semibold mb-3">Recent Activity</h2>
                        <Card className="border-border">
                            <CardContent className="p-0 divide-y">
                                <div className="p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">Payment Successful</p>
                                        <p className="text-xs text-muted-foreground">Nov 28, 2024</p>
                                    </div>
                                    <p className="font-semibold text-green-600">₦50,000</p>
                                </div>
                                <div className="p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">Payment Successful</p>
                                        <p className="text-xs text-muted-foreground">Oct 28, 2024</p>
                                    </div>
                                    <p className="font-semibold text-green-600">₦50,000</p>
                                </div>
                                <div className="p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">Payment Successful</p>
                                        <p className="text-xs text-muted-foreground">Sept 28, 2024</p>
                                    </div>
                                    <p className="font-semibold text-green-600">₦50,000</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
            </div>

            {/* Bottom navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border py-3 px-6 z-50">
                <div className="flex items-center justify-around">
                    <div className="flex flex-col items-center gap-1">
                        <Home className="w-6 h-6 text-primary" />
                        <span className="text-xs font-semibold text-primary">Home</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Calendar className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Payments</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <CreditCard className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Cards</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <User className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Profile</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
