import api from "./api";

export function login(credentials) {
    return api.post("/auth/signin", credentials);
};

export function register(userData) {
    return api.post("/auth/signup", userData);
};
export function forgotPassword(email) {
    return api.post("/auth/forgotPasswords", email);
};
export function verifyResetCode(resetCode) {
    return api.post("/auth/verifyResetCode", resetCode);
};
export function resetPassword(data) {
    return api.put("/auth/resetPassword", data);
};
