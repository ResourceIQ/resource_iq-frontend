"use client"

import React from "react"
import {Card, CardContent} from "@/components/ui/card"
import { Avatar,AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {Github, Laptop2, LinkIcon, Mail, MapPin, Phone} from "lucide-react"

export default function DeveloperProfilePage(){
    return(
        <div className="p-0.1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">

                <div className="md:col-span-3 lg:col-span-3">
                    <Card className="overflow-hidden border-2 border-purple-500/20 rounded-1rem bg-card shadow-lg">
                        <CardContent className="pt-1 pb-1 px-6 flex flex-col items-center text-center">
                            <div className="relative mb-2">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                                    <AvatarImage src="https://github.com.shadcn.png" alt="Developer" />
                                    <AvatarFallback>NA</AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-800"> Avishka Chasith</h2>
                                <p className="text-slate-500 text-sm font-medium">RPA Developer</p>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <Button variant="outline" size="icon" className="rounded-xl h-12 w-12 border-slate-200 shadow-sm hover:bg-slate-50">
                                    <Github className="h-6 w-6 text-slate-700"/>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-xl h-12 w-12 border-slate-200 shadow-sm hover:bg-slate-50">
                                    <Laptop2 className="h-6 w-6 text-slate-700"/>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-xl h-12 w-12 border-slate-200 shadow-sm hover:bg-slate-50">
                                    <Mail className="h-6 w-6 text-slate-700"/>
                                </Button>
                            </div>
                            <div className="w-full h-px bg-border my-5"/>
                        
                            <div className="w-full sp-y-4 text-sm text-slate-600 px-1">
                                <div className="flex items-center gap-3 pb-1">
                                    <Mail className="h-4 w-4 text-slate-400"/>
                                    <span>avishka.gunathilaka@iit.com</span>
                                </div>
                                <div className="flex items-center gap-3 pb-1">
                                    <Phone className="h-4 w-4 text-slate-400"/>
                                    <span> +94 714571965</span>
                                </div>
                                <div className="flex items-center gap-3 pb-1">
                                    <MapPin className="h-4 w-4 text-slate-400"/>
                                    <span>Colombo 09</span>
                                </div>
                                <div className="flex items-center gap-3 pb-1">
                                    <Github className="h-4 w-4 text-slate-400"/>
                                    <span>@avishka-chasith</span>
                                </div>
                                <div className="flex items-center gap-3 pb-1">
                                    <LinkIcon className="h-4 w-4 text-slate-400"/>
                                    <span className="truncate">Avishka Chasith</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-7 lg:col-span-9 space-y-6">
                    <div className="p-12 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400">
                        Workload & Track Record (Days 2 & 3 content will go here)
                    </div>
                </div>
            </div>
        </div>
    )
}