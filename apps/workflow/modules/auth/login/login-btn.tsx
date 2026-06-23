"use client"

import { Button } from "@repo/ui/button"
import { useFormStatus } from "react-dom"

const LoginButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" size={"sm"} type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  )
}

export default LoginButton
