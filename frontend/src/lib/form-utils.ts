import { UseFormSetError, FieldValues, Path } from "react-hook-form"

/**
 * Maps backend structured errors to React Hook Form errors.
 * 
 * @param backendErrors Array of { field: string, message: string }
 * @param setError React Hook Form's setError function
 */
export const handleBackendErrors = <T extends FieldValues>(
    backendErrors: { field: string | number; message: string }[],
    setError: UseFormSetError<T>
) => {
    if (!backendErrors || !Array.isArray(backendErrors)) return

    backendErrors.forEach((error) => {
        if (error.field) {
            setError(error.field as Path<T>, {
                type: "server",
                message: error.message
            })
        }
    })

    // Focus first error
    const firstError = backendErrors[0]
    if (firstError?.field) {
        const element = document.querySelector(`[name="${firstError.field}"]`) as HTMLElement
        if (element) {
            element.focus()
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }
}
