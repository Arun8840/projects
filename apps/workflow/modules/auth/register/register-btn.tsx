"use client"

import { Button } from "@repo/ui/button"
import { useFormStatus } from "react-dom"

const RegisterButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" size={"sm"} type="submit" disabled={pending}>
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  )
}

export default RegisterButton
