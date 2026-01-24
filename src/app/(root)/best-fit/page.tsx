
'use client'

import { useEffect, useState, useRef } from 'react'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'
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
import { FieldLegend } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from '@/components/ui/scroll-area'
import { useScoreGetBestFits } from '@/api/generated/score/score'
import { ScoreProfile } from '@/api/model/scoreProfile'
import { useHeaderLoader } from '@/hooks/use-header-loader'


export default function BestFitPage() {
    const [selectedFit, setSelectedFit] = useState<ScoreProfile | null>(null)
    const { start, finish } = useHeaderLoader()
    const {
        mutate, // This is the function to trigger the POST
        data: apiResponse,
        isPending,
        isError,
        error
    } = useScoreGetBestFits()

    // Access the data safely, supporting both raw array and { data: [] } shapes
    const bestFitsList = Array.isArray(apiResponse)
        ? apiResponse
        : (apiResponse?.data && Array.isArray(apiResponse.data))
            ? apiResponse.data
            : [];

    // Auto-select the first result when data arrives
    useEffect(() => {
        if (bestFitsList.length > 0 && !selectedFit) {
            setSelectedFit(bestFitsList[0])
            finish()
        }
    }, [bestFitsList, selectedFit])

    const handleSearch = (taskTitle: string, taskDescription: string) => {
        setSelectedFit(null)
        start()
        // Execute the Mutation
        mutate({
            data: {
                task_title: taskTitle,
                task_description: taskDescription,
            }
        }, {
            onError: () => finish()
        })
    }

    const handleFitChange = (fit: ScoreProfile) => {
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
                        {/* 8. Connect the form prop */}
                        <BestFitForm
                            onSearch={handleSearch}
                            isLoading={isPending}
                        />
                        {isError && (
                            <p className="text-red-500 mt-2">
                                Error: {typeof error === 'object' && error && 'detail' in error
                                    ? (error as any).detail
                                    : 'Failed to fetch'}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="w-2/5">
                <div className="flex flex-col gap-4">
                    {/* best fit card */}
                    {selectedFit ? (
                        <Card className="rounded-3xl shadow-[-3px_3px_3px_rgba(45,212,191,0.3),3px_-3px_3px_rgba(168,85,247,0.4)]">
                            <CardHeader>
                                <CardTitle className="text-3xl">{selectedFit.user_name}</CardTitle>
                                <CardDescription className="text-xl">{selectedFit.user_name}</CardDescription>
                                <CardAction className="text-3xl">
                                    {parseFloat(selectedFit.total_score.toFixed(2))}
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
                    ) : (
                        <Card className="rounded-3xl border-dashed border-2 border-gray-300 h-64 flex items-center justify-center">
                            <CardContent>
                                <p className="text-gray-500">No Best Fit Selected</p>
                            </CardContent>
                        </Card>
                    )}
                    {/* best fits list */}
                    <Card className="flex-1 flex flex-col">
                        <CardHeader>
                            <CardTitle>Best-Fits</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-hidden">
                            <ScrollArea className="h-[calc(100vh-500px)]">
                                {bestFitsList.map((fit) => {
                                    return (
                                        <div key={fit.user_id} className="mb-2">
                                            <div
                                                className="flex items-center justify-between cursor-pointer"
                                                onClick={() => handleFitChange(fit)}
                                            >
                                                <div>
                                                    <FieldLegend className="m-0">{fit.user_name}</FieldLegend>
                                                </div>
                                                <div className="flex items-center gap-4 m-4">
                                                    {parseFloat(fit.total_score.toFixed(2))}
                                                    <Checkbox
                                                        id={`row-${fit.user_name}-checkbox`}
                                                        name={`row-${fit.user_name}-checkbox`}
                                                        checked={selectedFit?.user_name === fit.user_name}
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