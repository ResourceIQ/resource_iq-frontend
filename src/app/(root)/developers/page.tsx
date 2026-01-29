"use client "

import * as React from "react"
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

export type Developer = {
    id: string
    name: string
    jiraEmail: string
    githubEmail: string
    role: string
}

const developers: Developer[] =[
    {id: "1", name: "Avishka Chasith", jiraEmail: "achasith@gmail.com", githubEmail: "achasith@gmail.com", role: ""},
    {id: "2", name: "Avishka Chasith", jiraEmail: "achasith@gmail.com", githubEmail: "achasith@gmail.com", role: ""},
    {id: "3", name: "Avishka Chasith", jiraEmail: "achasith@gmail.com", githubEmail: "achasith@gmail.com", role: ""}
]

export default function DevelopersPage() {
    return (
        <div className="p-1 space-y-2">
            <h1 className="text-4xl font-bold font-heading">Developers</h1>
                <p className="text-muted-foreground">Manage your engineering team members and their assignments.</p>
            <Card className="shadow-sm-border-muted/40">
                <CardHeader className="flex flex-row items-center  justify-between space-y-0 pb-4">
                    <div className="flex items-center w-full max-w-sm gap-2">
                        <input placeholder="Filter name/emails...." className="h-9"/>
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
                                    developers.map((dev)=>(
                                        <TableRow key = {dev.id} className="hover:bg-muted/30">
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
                                }
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
