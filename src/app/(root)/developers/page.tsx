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
            </Card>
        </div>
    )
}
