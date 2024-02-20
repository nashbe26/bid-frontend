import customAxios from "../axios/custom";

export async function RegisterFn(data) {
    const res = await customAxios.post("/api/v1/auth/register", { ...data });
    return res.data;
}

export async function LoginFn(data) {
    const res = await customAxios.post("/api/v1/auth/login", { ...data });
    return res.data;
}
export async function ForgotPassword(data) {
    const res = await customAxios.post("/api/v1/auth/forgot-password", { ...data });
    return res.data;
}
export async function ResetPassword(data) {
    const res = await customAxios.post("/api/v1/auth/reset-password", { ...data });
    return res.data;
}