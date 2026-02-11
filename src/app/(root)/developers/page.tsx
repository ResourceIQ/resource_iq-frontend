"use client"

//import * as React from "react"
import React, { useState,useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { MoreHorizontal, ArrowUpDown, ChevronDown, Loader2 } from "lucide-react"
import { error, profile } from "console"

export type Developer = {
    id: string
    name: string
    jiraEmail: string
    githubEmail: string
    role: string
}

interface ResourceProfile{
    id: number
    user_id:string
    jira_display_name: string | null
    github_display_name: string | null
    jira_email:string|null
    github_email: string | null
    skills:string[]
    total_workload: number
}

const developers: Developer[] =[
    {id: "1", name: "Avishka Chasith", jiraEmail: "achasith@gmail.com", githubEmail: "achasith@gmail.com", role: "RPA Developer"},
    {id: "2", name: "Diluka Lahiru", jiraEmail: "lahiru@gmail.com", githubEmail: "lahiru@gmail.com", role: "RPA Developer"},
    {id: "3", name: "Senuja Imeth", jiraEmail: "senuja@gmail.com", githubEmail: "senuja@gmail.com", role: "Full Stack Developer"},
    {id: "4", name: "Hirusha Lakshan", jiraEmail: "hirusha@gmail.com", githubEmail: "hirusha@gmail.com", role: "IOT Developer"},
    {id: "5", name: "Nirodha Adikari", jiraEmail: "nirodha@gmail.com", githubEmail: "nirodha@gmail.com", role: "Full Stack Developer"},
    {id: "6", name: "Supuni Liyanage", jiraEmail: "supuni@gmail.com", githubEmail: "supuni@gmail.com", role: "Front-End Developer"}
]

export default function DevelopersPage() {

    const[profiles, setProfiles] = useState<ResourceProfile[]>([])  // For real data from API
    const[isLoading, setIsLoading] = useState(true)   // Loading status
    const [searchQuery, setSearchQuery] = useState("")  // State for the search text

    const[selectIds, setSelectIds] = useState<number[]>([])   // State for the chexbox selected developers
    useEffect(()=>{
        async function fetchProfiles(){
            try{
                setIsLoading(true)
                const response = await fetch("http:127.0.0.1:8000/profiles/")
                if(!response.ok) throw new Error("Failed to fetch")
                
                const data = await response.json()
                setProfiles(data)    
            }catch(error){
                console.error("Eroor conecting to python backend: error")
            }finally{
                setIsLoading(false)
            }
            
        }
        fetchProfiles()
    },[])

    //  const filteredDevelopers = developers.filter((dev) =>{   // Logic for filtering developers based on the search query
    //     const search = searchQuery.toLowerCase()
    //     return(
    //         dev.name.toLowerCase().includes(search) || dev.jiraEmail.toLowerCase().includes(search) || dev.githubEmail.toLowerCase().includes(search) || dev.role.toLowerCase().includes(search)
    //     )
    // })

    const filteredProfiles = profiles.filter((profile)=>{
        const search = searchQuery.toLowerCase()
        const name = (profile.jira_display_name || profile.github_display_name|| "").toLowerCase()
        const email = (profile.jira_email || profile.github_email|| "").toLowerCase()
        const skillMatch = profile.skills.some(s => s.toLowerCase().includes(search))

        return name.includes(search) || email.includes(search) || skillMatch
    })

    const selectRow = (id: number)=>{
        setSelectIds((prev)=>prev.includes(id) ? prev.filter((item)=> item !== id) : [...prev, id]
        
    )
    }

    const selectAllRow =()=>{
        if (selectIds.length === filteredProfiles.length){
            setSelectIds([])
        }
        else{
            setSelectIds(filteredProfiles.map((dev) => dev.id))
        }
    }

    return (
        <div className="p-1 space-y-6">
            <h1 className="text-4xl font-bold font-heading">Developers</h1>
            <Card className="shadow-sm-border-muted/40">
                <CardHeader className="flex flex-row items-center  justify-between space-y-0 pb-4">
                    <div className="flex items-center w-full max-w-sm gap-2">
                        <input placeholder="Filter by name, email, or skill..." className="h-9 w-60 pl-2" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
                    </div>

                    <Button variant="outline" size="sm" className="ml-auto h-9">
                        Columns  <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </CardHeader>

                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                <TableHead className="w-[50px]"><Checkbox checked={selectIds.length === filteredProfiles.length && filteredProfiles.length>0}onCheckedChange={selectAllRow} />
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="cursor-pointer hover:text-primary">Jira <ArrowUpDown className="inline ml-2 h-3 w-3"/>
                                </TableHead>
                                <TableHead>GitHub</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ?(
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin"/>
                                                Loading Resource Profiles...
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ): filteredProfiles.length>0 ?(
                                    filteredProfiles.map((profile)=>(
                                        <TableRow key={profile.id} className={selectIds.includes(profile.id)? "bg-muted/50":""}>
                                             <TableCell>
                                                <Checkbox checked={selectIds.includes(profile.id)}
                                                    onCheckedChange={()=> selectRow(profile.id)}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{profile.jira_display_name || profile.github_display_name|| "Unknown"}</TableCell>
                                            <TableCell>{profile.jira_email || "Not Linked"}</TableCell>
                                            <TableCell>{profile.github_email || "Not Linked"}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-1 flex-wrap">
                                                    {profile.skills.slice(0,2).map((skill,index)=>(
                                                        <span key={index} className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                            {skill}
                                                        </span>

                                                    ))}
                                                    {profile.skills.length > 2 &&  (
                                                        <span className="text-xs text-muted-foreground">
                                                            +{profile.skills.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4"/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))

                        

                                    ):(
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                                No developers found
                                            </TableCell>
                                        </TableRow>
                                    )
                                        
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-start space-x-2 py-4">
                        <Button variant="outline" size="sm" disabled>
                            Previous
                        </Button>
                        <Button variant="outline" size="sm">
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
