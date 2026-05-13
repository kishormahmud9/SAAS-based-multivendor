import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
    <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordForm />
    </Suspense>
}
