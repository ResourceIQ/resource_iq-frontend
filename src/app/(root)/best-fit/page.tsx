
'use client'

import { useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { BestFitForm } from "@/app/(root)/best-fit/best-fit-input-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldLabel, FieldLegend } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from '@/components/ui/scroll-area'

const ListBestFits = [
    {
        name: "Senuja Jayasekara",
        role: "Back-End Developer",
        score: 523.5,
    },
    {
        name: "Amaya Perera",
        role: "Front-End Developer",
        score: 498.2,
    },
    {
        name: "Nishantha Fernando",
        role: "Full-Stack Developer",
        score: 475.0,
    },
    {
        name: "Nishantha Fersnando",
        role: "Full-Stack Developer",
        score: 475.0,
    },
    {
        name: "Nishaantha Fersnando",
        role: "Full-Stack Developer",
        score: 475.0,
    },
    {
        name: "Nishafntha Fesrnando",
        role: "Full-Stack Developer",
        score: 475.0,
    },
    {
        name: "Nigshantha Fearnadndo",
        role: "Full-Stack Developer",
        score: 475.0,
    },
    {
        name: "Nisfhantha Fernando",
        role: "Full-Stack Developer",
        score: 475.0,
    },
    {
        name: "Nishadntha Feadsaadrnando",
        role: "Full-Stack Developer",
        score: 475.0,
    },
    {
        name: "Nisdhantha Fsdernafasdndo",
        role: "Full-Stack Developer",
        score: 475.0,
    },
    {
        name: "Nisahantha Fesfadsrnando",
        role: "Full-Stack Developer",
        score: 475.0,
    },
]

export default function BestFitPage() {
    const [selectedFit, setSelectedFit] = useState(ListBestFits[0])

    const handleFitChange = (fit: typeof ListBestFits[0]) => {
        setSelectedFit(fit)
    }

    return (
        <div className="w-full mx-auto flex justify-between gap-4">

            <div className="w-3/5">
                <Card>
                    <CardHeader>
                        <CardTitle>Find Your Best Fit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BestFitForm />
                    </CardContent>
                </Card>
            </div>
            <div className="w-2/5">
                <div className="flex flex-col gap-4">
                    {/* best fit card */}
                    <Card className="rounded-3xl shadow-[-3px_3px_3px_rgba(45,212,191,0.3),3px_-3px_3px_rgba(168,85,247,0.4)]">
                        <CardHeader>
                            <CardTitle className="text-3xl">{selectedFit.name}</CardTitle>
                            <CardDescription className="text-xl">{selectedFit.role}</CardDescription>
                            <CardAction className="text-3xl">
                                {selectedFit.score}
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                Assign
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="flex-1 flex flex-col">
                        <CardHeader>
                            <CardTitle>Best-Fits</CardTitle>
                        </CardHeader>
                            <CardContent className="flex-1 overflow-hidden">
                                <ScrollArea className="h-[calc(100vh-500px)]">
                                {ListBestFits.map((fit) => {
                                    return (
                                        <div key={fit.name}>
                                            <div
                                                className="flex items-center justify-between cursor-pointer"
                                                onClick={() => handleFitChange(fit)}
                                            >
                                                <div>
                                                    <FieldLegend className="m-0">{fit.name}</FieldLegend>
                                                </div>
                                                <div className="flex items-center gap-4 m-4">
                                                    <p>{fit.score}</p>
                                                    <Checkbox
                                                        id={`row-${fit.name}-checkbox`}
                                                        name={`row-${fit.name}-checkbox`}
                                                        checked={selectedFit.name === fit.name}
                                                        onCheckedChange={() => handleFitChange(fit)}
                                                    />
                                                </div>
                                            </div>
                                            <Separator />
                                        </div>
                                    )
                                })}
                                </ScrollArea>
                            </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}