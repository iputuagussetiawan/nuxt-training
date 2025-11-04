import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
    const auth = useAuthStore()

    // Initialize and load token/user if not already done
    if (!auth.token) {
        await auth.init()
    }

    // If the user is not logged in and trying to access a protected page
    if (!auth.token && to.meta.requiresAuth) {
        return navigateTo('/login')
    }

    // Redirect logged-in users away from routes like /login or /register
    if (auth.token && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/dashboard')
    }
})
