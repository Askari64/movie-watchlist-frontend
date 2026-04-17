import { api } from "./api";

/**
 * 
 * @param email - email of the user trying to sign in
 * @param password - password of the user trying to sign in
 * @returns user data and JWT token if successful, otherwise throws error with message from backend
 */
export async function signin(email: string, password: string) {
    return api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

/**
 * 
 * @param name - name of the user trying to sign up
 * @param email - email of the user trying to sign up
 * @param password - password of the user trying to sign up
 * @returns user data and JWT token if successful, otherwise throws error with message from backend
 */
export async function signup(name: string, email: string, password: string) {
    return api("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });
}

/**
 * 
 * @returns logout user by deleting cookie
 */
export async function logout() {
    return api("/auth/logout", {
        method: "POST",
    });
}