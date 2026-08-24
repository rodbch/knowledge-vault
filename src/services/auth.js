import { supabase } from '../lib/supabase'

export async function signUp(email, password) {
  return supabase.auth.signUp({
    email,
    password
  });
}

export async function signIn(email, password) {
  return supabase.auth.signInWithPassword({
    email,
    password
  });
}

export async function resetPassword(email, redirectTo) {
  return supabase.auth.resetPasswordForEmail(email, { redirectTo })
}

export async function updatePassword(password) {
  return supabase.auth.updateUser({ password })
}

export async function getSession() {
  return supabase.auth.getSession()
}

export async function signOut() {
  return supabase.auth.signOut()
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}