import AuthLayout from "@/layouts/auth-layout"

export default function AuthLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>
}
