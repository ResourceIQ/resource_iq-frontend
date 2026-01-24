import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

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
              <Field>
                <FieldLabel htmlFor="task-title">
                  Title
                </FieldLabel>
                <Input
                  id="task-title"
                  placeholder="Access Token Issue"
                  required
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
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <div className="flex flex-row-reverse">
            <Button type="submit">Find Best Fits</Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}
