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
                    <Card className="overflow-hidden border-2 border-purple-500/20 rounded-1rem bg-card shadow-lg mb-4">
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
                    {/*SKILLS SECTION*/}
                    <Card className="rounded-1rem border-2 border-purple-500/20 bg-card shadow-md">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-slate-700">Skills</h3>
                                <Button variant="outline" className="border-2 border-purple-200 text-purple-600 font-bold rounded-full px-4 h-8 text-xs hover:bg-purple-50">
                                    Add Skill +
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Figma", "HTML", "React", "Tailwind CSS", "Java", "JavaScript", 
                                    "Python", "Node.js", "Laravel", "Photoshop", "Selenium", 
                                    "Appium", "Springboot", "FastAPI", "Oracle", "Github"
                                ].map((skill) => (
                                    <div key={skill} className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-xs hover:border-purple-400 hover:text-purple-600 transition-all cursor-pointer bg-white">
                                        {skill}
                                    </div>
                                 ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-7 lg:col-span-9 space-y-6">
                    {/*WORKLOAD SECTION*/}
                    <Card className="rounded-1rem border-2 border-purple-500/20 bg-card shadow-md overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-700">My work Load</h3>
                            <Button className="bg-gradient-to-r from-purple-400 to-emarald-400 hover:opacity-90 text-slate-900 font-bold rounded-full px-6 h-9 border-none shadow-sm">
                                Assign a Task
                            </Button>
                        </div>
                        <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                            {[
                                {id:"AD-18756",status:"Inprogress"},
                                {id: "AD-12354",status:"PR Review"},
                                {id: "AD-43523",status:"Ready To Close"},

                            ].map((task,index)=>(
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-purple-200 transition-all cursor-default group">
                                    <div className="flex items-center gap-4">
                                        <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded-md text-[10px] font-bold min-w-[70px] text-center group-hover:bg-purple-100 transition-colors">
                                            {task.id}
                                        </span>
                                        <p className="text-xs font-medium text-slate-600">
                                            Role Based Authentication for ResourceIQ back end
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-semibold text-slate-400 italic">
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className="text-[10px] font-bold flex items-center gap-1 bg-emerald-400/10 text-emerald-600 px-4 py-1 rounded-full hover:bg-emerald-200/30 transition-all">
                                See more <span className="text-[8px]">▼</span>
                            </button>
                        </div>
                    </CardContent>
                    </Card>

                    
                    {/* <div className="p-12 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400">
                        Workload & Track Record (Days 2 & 3 content will go here)
                    </div> */}
                </div>
            </div>
        </div>
    )
}