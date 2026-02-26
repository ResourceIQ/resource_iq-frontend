"use client";

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
import { FormEvent, useState } from "react"

interface BestFitFormProps {
  onSearch: (title: string, description: string) => void
  isLoading: boolean
}

export function BestFitForm({ onSearch, isLoading }: BestFitFormProps) {

  const [project, setProject] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const taskDescriptions: Record<string, string> = {
    task1: "UI Design related task.",
    task2: "Backend API related task.",
    task3: "Performance optimization task."
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    setDescription(taskDescriptions[value] || '')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(title, description)
  }

  return (
    <div className="w-full flex justify-center">
      <form className="w-full max-w-xl space-y-6" onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>

              {/* Project Select */}
              <Field>
                <FieldLabel htmlFor="project">
                  Project
                </FieldLabel>
                <select
                  id="project"
                  required
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select a project</option>
                  <option value="project1">Project 1</option>
                  <option value="project2">Project 2</option>
                  <option value="project3">Project 3</option>
                </select>
              </Field>

              {/* Title Select */}
              <Field>
                <FieldLabel htmlFor="task-title">
                  Title
                </FieldLabel>
                <select
                  id="task-title"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select a title</option>
                  <option value="task1">UI Improvement</option>
                  <option value="task2">API Integration</option>
                  <option value="task3">Performance Fix</option>
                </select>
              </Field>

              {/* Description Auto Fill */}
              <Field>
                <FieldLabel htmlFor="task-description">
                  Description
                </FieldLabel>
                <Textarea
                  id="task-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description will auto fill or you can edit..."
                  required
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </Field>

            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <div className="flex flex-row-reverse">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : "Find Best Fits"}
            </Button>
          </div>

        </FieldGroup>
      </form>
    </div>
  )
}
