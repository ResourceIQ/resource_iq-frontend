"use client"

import React, {useEffect,useState} from "react"
import {Card, CardContent} from "@/components/ui/card"
import { Avatar,AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {Github, Laptop2, LinkIcon, Loader2, Mail, MapPin, Phone} from "lucide-react"
import { useParams } from "next/navigation"


export default function DeveloperProfilePage(){
    const params = useParams()
    const developerId = params.id

    const [profile,setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function fetchProfile(){
            try{
                setLoading(true)
                const token = localStorage.getItem("access_token");
                const response = await fetch(`http://127.0.0.1:8000/api/v1/profiles/${developerId}`,{
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if(!response.ok) throw new Error("Failed to fetch profile");
                const data = await response.json()
                console.log("Full profile data: ",data)
                setProfile(data)
            }catch(error){
                console.error("Error: ",error)
            }finally{
                setLoading(false)
            }
        }
        if(developerId) fetchProfile()
    },[developerId])
    if (loading){
        return(
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-purple-600"/>
                <p className="text-slate-500 font-medium">Fetching Developer Details...</p>
            </div>
        )
    }
    if(!profile){
        return(
            <div className="p-20 text-center text-red-500">Profile not found!</div>
        )
    }
    return(
        <div className="p-0.1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                {/*LEFT SIDE GRID */}
                <div className="md:col-span-3 lg:col-span-3">
                    {/*PROFILE CARD SECTION*/}
                    <Card className="transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 shadow-md hover:shadow-xl hover:shadow-500/10 bg-card rounded-1rem overflow-hidden mb-4">
                        <CardContent className="pt-1 pb-1 px-6 flex flex-col items-center text-center">
                            <div className="relative mb-2">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                                    <AvatarImage src={profile.github_avatar_url} alt="Developer" />
                                    <AvatarFallback>{(profile.jira_display_name || "D")[0]}</AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white-800 "> {profile.jira_display_name || profile.github_display_name || "Unknown Developer"}</h2>
                                <p className="text-slate-500 text-sm font-medium">{profile.position}</p>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <Button variant="ghost" size="icon" className="h-10 w-10 border-none bg-black shadow-lg hover:bg-zinc-900 transition-all overflow-hidden"
                                    onClick={()=> profile.github_login && window.open(`https://github.com/${profile.github_login}`,'_blank')}>
                                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="h-8 w-8 contrast-0"/>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-10 w-10 border-slate-700 bg-slate-800/50 shadow-sm hover:bg-slate-700 transition-all overflow-hidden"
                                    onClick={()=>profile.jira_account_id && window.open(`https://id.atlassin.com/manage-profile`,'_blank')}>
                                    <img src="https://cdn.worldvectorlogo.com/logos/jira-1.svg" alt="Jira" className="h-8 w-8 object-contain"/>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-10 w-10 border-slate-200 shadow-sm hover:bg-slate-50"
                                    onClick={()=>{
                                        const email = profile.jira_email || profile.github_email || "contact@resourceiq.lk";
                                        window.location.href = `mailto:${email}`
                                    }}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="h-8 w-8 object-contain"/>
                                </Button>
                            </div>
                            <div className="w-full h-px bg-border my-5"/>
                        
                            <div className="w-full sp-y-4 text-sm text-slate-600 px-1">
                                <div className="flex items-center gap-3 pb-1">
                                    <Mail className="h-4 w-4 text-slate-400"/>
                                    <span>{profile.jira_email || profile.github_email || "No email available"}</span>
                                </div>
                                <div className="flex items-center gap-3 pb-1">
                                    <Phone className="h-4 w-4 text-slate-400"/>
                                    <span> {profile.phone_number||"Contact number not provided"}</span>
                                </div>
                                <div className="flex items-center gap-3 pb-1">
                                    <MapPin className="h-4 w-4 text-slate-400"/>
                                    <span>{profile.address}</span>
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
                    <Card className="transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 shadow-md hover:shadow-xl hover:shadow-500/10 bg-card rounded-1rem overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-slate-700">Skills</h3>
                                {/* <Button variant="outline" className="border-2 border-purple-200 text-purple-600 font-bold rounded-full px-4 h-8 text-xs hover:bg-purple-50">
                                    Add Skill +
                                </Button> */}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills && profile.skills.length > 0 ? (
                                    profile.skills.map((skill:string)=>(
                                        <div key={skill} className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-xs bg-white">
                                            {skill}
                                        </div>
                                    ))
                                ):(
                                    <p className="text-xs text-slate-400">No skills listed</p>
                                )}
                                {/* {[
                                    "Figma", "HTML", "React", "Tailwind CSS", "Java", "JavaScript", 
                                    "Python", "Node.js", "Laravel", "Photoshop", "Selenium", 
                                    "Appium", "Springboot", "FastAPI", "Oracle", "Github"
                                ].map((skill) => (
                                    <div key={skill} className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-xs hover:border-card hover:text-purple-600 transition-all cursor-pointer bg-white hover:bg-card">
                                        {skill}
                                    </div>
                                 ))} */}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-7 lg:col-span-9 space-y-6">
                    {/*WORKLOAD SECTION*/}
                    <Card className="transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 shadow-md hover:shadow-xl hover:shadow-500/10 bg-card rounded-1rem overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-700">My Work Load</h3>
                            <Button className="bg purple-400 to-emarald-400 hover:opacity-90 text-slate-900 font-bold px-6 h-9 border-none shadow-sm">
                                Assign a Task
                            </Button>
                        </div>
                        <div className="space-y-2 max-h-[350px] overflow-y-auto pr-20 custom-scrollbar">
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
                            <button className="text-[10px] font-bold flex items-center gap-1 bg-emerald-400/10 text-emerald-600 px-4 py-1  hover:bg-emerald-200/30 transition-all">
                                See more <span className="text-[8px]">▼</span>
                            </button>
                        </div>
                    </CardContent>
                    </Card>

                    {/* WORK PLACE TRACK RECORD SECTION*/}
                    <div className="mt-8 space-y-4">
                        <h3 className="text-xl font-bold text-slate-700 ml-2"> Workplace Track Record</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[
                                {label:"Review PRs",value:"12",color:"bg-purple-100 text-purple-600"},
                                {label:"Merged PRs",value:"08",color:"bg-emerald-100 text-emerald-600"},
                                {label:"Coments for PRs",value:"24",color:"bg-blue-100 text-blue-600"},
                                {label:"Tickets solved",value:"15",color:"bg-orange-100 text-orange-600"},
                                { label: "Code smells", value: "02", color: "bg-red-100 text-red-600" },
                                { label: "Bugs reported", value: "04", color: "bg-rose-100 text-rose-600"},
                                { label: "Active days", value: "18", color: "bg-indigo-100 text-indigo-600" },
                                { label: "Total Tasks", value: "30", color: "bg-slate-100 text-slate-600" },
                                { label: "Assigned PRs", value: "05", color: "bg-cyan-100 text-cyan-600" },
                                { label: "Reopened Tickets", value: "01", color: "bg-amber-100 text-amber-600" },
                                { label: "Meeting hours", value: "12h", color: "bg-violet-100 text-violet-600" },
                                { label: "Velocity Score", value: "85%", color: "bg-teal-100 text-teal-600" }
                            ].map((stat,index)=>(
                                <Card key={index} className="transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 shadow-md hover:shadow-xl hover:shadow-500/10 bg-card rounded-1rem overflow-hidden">
                                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                                        <div className={`bg-card-black${stat.color} py-3 flex items-center justify-center font-extrabold text-4xl shadow-inner`}>
                                            {stat.value}
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                            {stat.label}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    
                    {/* <div className="p-12 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400">
                        Workload & Track Record (Days 2 & 3 content will go here)
                    </div> */}
                </div>
            </div>
        </div>
    )
}