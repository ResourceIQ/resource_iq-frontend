'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { ChevronRightIcon, Loader2, UserCheck } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { JiraIcon } from '@atlaskit/logo';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { jiraApi } from '@/lib/api-client'
import { toast } from '@/lib/toast'


interface CreatedIssue {
    issue_key: string
    issue_url: string
    assigned_to: string | null
}


export default function BestFitPage() {
    const [selectedFit, setSelectedFit] = useState<ScoreProfile | null>(null)
    const [selectedProject, setSelectedProject] = useState('')
    const [selectedIssueType, setSelectedIssueType] = useState('Task')
    const [createdIssue, setCreatedIssue] = useState<CreatedIssue | null>(null)
    const [isCreatingTask, setIsCreatingTask] = useState(false)
    const [isAssigning, setIsAssigning] = useState(false)
    const taskTitleRef = useRef('')
    const taskDescriptionRef = useRef('')
    const { start, finish } = useHeaderLoader()
    const {
        mutate,
        data: apiResponse,
        isPending,
        isError,
        error
    } = useScoreGetBestFits()

    const bestFitsList = Array.isArray(apiResponse)
        ? apiResponse
        : (apiResponse?.data && Array.isArray(apiResponse.data))
            ? apiResponse.data
            : [];

    useEffect(() => {
        if (bestFitsList.length > 0 && !selectedFit) {
            setSelectedFit(bestFitsList[0])
            finish()
        }
    }, [bestFitsList, selectedFit])

    const handleSearch = (taskTitle: string, taskDescription: string) => {
        setSelectedFit(null)
        taskTitleRef.current = taskTitle
        taskDescriptionRef.current = taskDescription
        start()
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

    const handleNewTask = useCallback(() => {
        setSelectedFit(null)
        setCreatedIssue(null)
        setIsCreatingTask(false)
        setIsAssigning(false)
        taskTitleRef.current = ''
        taskDescriptionRef.current = ''
    }, [])

    const handleCreateTask = useCallback(async (title: string, description: string, issueType: string) => {
        taskTitleRef.current = title
        taskDescriptionRef.current = description
        if (!selectedProject) {
            toast.error('Please select a Jira project first')
            return
        }
        if (!title) {
            toast.error('Task title is required')
            return
        }

        setIsCreatingTask(true)
        try {
            const result = await jiraApi.createIssue({
                project_key: selectedProject,
                summary: title,
                description: description || undefined,
                issue_type: issueType,
            })
            setCreatedIssue({
                issue_key: result.issue_key,
                issue_url: result.issue_url,
                assigned_to: null,
            })
            toast.success(`Created ${result.issue_key}`)
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : 'Failed to create Jira issue')
        } finally {
            setIsCreatingTask(false)
        }
    }, [selectedProject])

    const handleCreateAndAssign = useCallback(async () => {
        if (!selectedProject) {
            toast.error('Please select a Jira project first')
            return
        }
        if (!taskTitleRef.current) {
            toast.error('Task title is required')
            return
        }
        if (!selectedFit) {
            toast.error('Please select a user to assign')
            return
        }

        setIsAssigning(true)
        try {
            const result = await jiraApi.createIssue({
                project_key: selectedProject,
                summary: taskTitleRef.current,
                description: taskDescriptionRef.current || undefined,
                issue_type: selectedIssueType,
                assignee_user_id: selectedFit.user_id,
            })
            setCreatedIssue({
                issue_key: result.issue_key,
                issue_url: result.issue_url,
                assigned_to: result.assigned_to,
            })
            toast.success(`Created ${result.issue_key} and assigned to ${result.assigned_to}`)
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : 'Failed to create and assign Jira issue')
        } finally {
            setIsAssigning(false)
        }
    }, [selectedProject, selectedFit, selectedIssueType])

    const handleAssign = useCallback(async () => {
        if (!createdIssue) return
        if (!selectedFit) {
            toast.error('Please select a user to assign')
            return
        }

        setIsAssigning(true)
        try {
            const result = await jiraApi.assignIssue(createdIssue.issue_key, selectedFit.user_id)
            setCreatedIssue(prev => prev ? { ...prev, assigned_to: result.assigned_to } : prev)
            toast.success(`${createdIssue.issue_key} assigned to ${result.assigned_to}`)
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : 'Failed to assign issue')
        } finally {
            setIsAssigning(false)
        }
    }, [createdIssue, selectedFit])

    return (
        <div className="w-full mx-auto flex justify-between gap-4">

            <div className="w-3/5">
                <Card>
                    <CardHeader>
                        <CardTitle>Find Your Best Fit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BestFitForm
                            onSearch={handleSearch}
                            onCreateTask={handleCreateTask}
                            onNewTask={handleNewTask}
                            isLoading={isPending}
                            isCreatingTask={isCreatingTask}
                            createdIssue={createdIssue}
                            selectedProject={selectedProject}
                            onProjectChange={setSelectedProject}
                            selectedIssueType={selectedIssueType}
                            onIssueTypeChange={setSelectedIssueType}
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
                    {selectedFit ? (
                        <Card className="rounded-3xl shadow-[-3px_3px_3px_rgba(45,212,191,0.3),3px_-3px_3px_rgba(168,85,247,0.4)]">
                            <CardHeader>
                                    <CardTitle className="text-3xl">{selectedFit.user_name}</CardTitle>
                                    <CardDescription className="text-xl">{selectedFit.position}</CardDescription>
                                <CardAction className="text-3xl">
                                    {parseFloat(selectedFit.total_score.toFixed(2))}
                                </CardAction>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="github">
                                    <TabsList>
                                        <TabsTrigger value="github"><SiGithub className="size-4" />GitHub</TabsTrigger>
                                        <TabsTrigger value="jira"><JiraIcon appearance="inverse" size="medium" />Jira</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="github">
                                        <Card>
                                            <CardHeader>
                                                <CardDescription>{selectedFit.user_name}&apos;s most relevant GitHub activities</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                {selectedFit.pr_info?.map((pr) => (
                                                    <Item key={pr.pr_id} className="m-1" variant={'outline'} size={'sm'} asChild>
                                                        <a href={pr.pr_url} target="_blank" rel="noopener noreferrer">
                                                            <ItemContent>
                                                                <ItemTitle>{pr.pr_title}</ItemTitle>
                                                                <ItemDescription>
                                                                    {pr.pr_description}
                                                                </ItemDescription>
                                                            </ItemContent>
                                                            <ItemActions>
                                                                <ChevronRightIcon className="size-4" />
                                                            </ItemActions>
                                                        </a>
                                                    </Item>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2">
                                {createdIssue && (
                                    <div className="w-full flex items-center justify-between rounded-md border p-3">
                                        <div className="flex flex-col gap-0.5">
                                            <a
                                                href={createdIssue.issue_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium underline"
                                            >
                                                {createdIssue.issue_key}
                                            </a>
                                            {createdIssue.assigned_to ? (
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <UserCheck className="size-3" />
                                                    {createdIssue.assigned_to}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">Unassigned</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {!createdIssue ? (
                                    <Button
                                        className="w-full"
                                        disabled={isAssigning}
                                        onClick={handleCreateAndAssign}
                                    >
                                        {isAssigning ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : (
                                            'Create and Assign'
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full"
                                        disabled={isAssigning}
                                        onClick={handleAssign}
                                    >
                                        {isAssigning ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : (
                                            createdIssue.assigned_to ? 'Reassign' : 'Assign'
                                        )}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ) : (
                        <Card className="rounded-3xl border-dashed border-2 border-gray-300 h-64 flex items-center justify-center">
                            <CardContent>
                                <p className="text-gray-500">No Best Fit Selected</p>
                            </CardContent>
                        </Card>
                    )}
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
                                                        aria-hidden="true"
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
