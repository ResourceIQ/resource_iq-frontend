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

export function NewTaskForm() {
  return (
    <div className="w-full flex justify-center">
      <form className="w-full">
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
