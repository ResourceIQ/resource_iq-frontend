import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ExternalLink, Loader2, RotateCcw } from "lucide-react"
import { FormEvent, useEffect, useState } from "react"
import { jiraApi, JiraIssueType, JiraProject } from "@/lib/api-client"

interface CreatedIssue {
  issue_key: string
  issue_url: string
  assigned_to: string | null
}

interface BestFitFormProps {
  onSearch: (title: string, description: string) => void
  onCreateTask: (title: string, description: string, issueType: string) => void
  onNewTask: () => void
  isLoading: boolean
  isCreatingTask: boolean
  createdIssue: CreatedIssue | null
  selectedProject: string
  onProjectChange: (projectKey: string) => void
  selectedIssueType: string
  onIssueTypeChange: (issueType: string) => void
}

export function BestFitForm({
  onSearch,
  onCreateTask,
  onNewTask,
  isLoading,
  isCreatingTask,
  createdIssue,
  selectedProject,
  onProjectChange,
  selectedIssueType,
  onIssueTypeChange,
}: BestFitFormProps) {
  const isTaskCreated = !!createdIssue

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projects, setProjects] = useState<JiraProject[]>([])
  const [projectsLoading, setProjectsLoading] = useState(false)
  const [issueTypes, setIssueTypes] = useState<JiraIssueType[]>([])
  const [issueTypesLoading, setIssueTypesLoading] = useState(false)

  useEffect(() => {
    setProjectsLoading(true)
    jiraApi.getProjects()
      .then((data) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setProjectsLoading(false))

    setIssueTypesLoading(true)
    jiraApi.getIssueTypes()
      .then((data) => {
        setIssueTypes(data)
        if (data.length > 0 && !selectedIssueType) {
          const taskType = data.find(t => t.name === 'Task')
          onIssueTypeChange(taskType ? taskType.name : data[0].name)
        }
      })
      .catch(() => setIssueTypes([]))
      .finally(() => setIssueTypesLoading(false))
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(title, description)
  }

  return (
    <div className="w-full flex justify-center">
      <form className="w-full" onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <div className="flex gap-3">
                <Field className="flex-1">
                  <FieldLabel htmlFor="jira-project">
                    Jira Project
                  </FieldLabel>
                  <Select
                    value={selectedProject}
                    onValueChange={onProjectChange}
                    disabled={projectsLoading || isTaskCreated}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={projectsLoading ? "Loading..." : "Select a project"} />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((p) => (
                        <SelectItem key={p.key} value={p.key}>
                          {p.key} — {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="issue-type">
                    Issue Type
                  </FieldLabel>
                  <Select
                    value={selectedIssueType}
                    onValueChange={onIssueTypeChange}
                    disabled={issueTypesLoading || isTaskCreated}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder={issueTypesLoading ? "Loading..." : "Type"} />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((t) => (
                        <SelectItem key={t.id} value={t.name}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="task-title">
                  Title
                </FieldLabel>
                <Input
                  id="task-title"
                  placeholder="Access Token Issue"
                  required
                  readOnly={isTaskCreated}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="task-description">
                  Description
                </FieldLabel>
                <Textarea
                  id="task-description"
                  placeholder="Describe the issue or task in detail"
                  required
                  readOnly={isTaskCreated}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <div className="flex flex-row-reverse gap-2">
            {isTaskCreated && (
              <>
                <Button type="button" variant="outline" onClick={onNewTask}>
                  <RotateCcw className="size-4" />
                  New Task
                </Button>
                <Button type="button" variant="outline" asChild>
                  <a href={createdIssue!.issue_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-4" />
                    View in Jira
                  </a>
                </Button>
              </>
            )}
            <Button
              type="submit"
              disabled={isLoading || !selectedProject || !title || !description}
            >
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Find Best Fits'}
            </Button>
            {!isTaskCreated && (
              <Button
                type="button"
                variant="outline"
                disabled={isCreatingTask || !selectedProject || !title}
                onClick={() => onCreateTask(title, description, selectedIssueType)}
              >
                {isCreatingTask ? <Loader2 className="size-4 animate-spin" /> : 'Create Task'}
              </Button>
            )}
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}
