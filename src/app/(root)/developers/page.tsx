"use client"

//import * as React from "react"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { MoreHorizontal, ArrowUpDown, ChevronDown } from "lucide-react"
import { Item } from "@radix-ui/react-dropdown-menu"

export type Developer = {
    id: string
    name: string
    jiraEmail: string
    githubEmail: string
    role: string
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

    const [searchQuery, setSearchQuery] = useState("")  // State for the search text

    const[selectIds, setSelectIds] = useState<string[]>([])   // State for the chexbox selected developers

    const filteredDevelopers = developers.filter((dev) =>{   // Logic for filtering developers based on the search query
        const search = searchQuery.toLowerCase()
        return(
            dev.name.toLowerCase().includes(search) || dev.jiraEmail.toLowerCase().includes(search) || dev.githubEmail.toLowerCase().includes(search) || dev.role.toLowerCase().includes(search)
        )
    })

    const selectRow = (id: string)=>{
        setSelectIds((prev)=>prev.includes(id) ? prev.filter((item)=> item !== id) : [...prev, id]
        
    )
    }

    return (
        <div className="p-1 space-y-6">
            <h1 className="text-4xl font-bold font-heading">Developers</h1>
            <Card className="shadow-sm-border-muted/40">
                <CardHeader className="flex flex-row items-center  justify-between space-y-0 pb-4">
                    <div className="flex items-center w-full max-w-sm gap-2">
                        <input placeholder="Filter name/emails...." className="h-9" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
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
                                <TableHead className="w-[50px]"><input type="checkbox" />
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
                                {
                                    filteredDevelopers.length > 0 ? (
                                        filteredDevelopers.map((dev)=>(
                                            <TableRow key={dev.id}>
                                                <TableCell>
                                                <input type="checkbox" />
                                            </TableCell>
                                            <TableCell className="font-medium">{dev.name}</TableCell>
                                            <TableCell>{dev.jiraEmail}</TableCell>
                                            <TableCell>{dev.githubEmail}</TableCell>
                                            <TableCell>{dev.role}</TableCell>
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
