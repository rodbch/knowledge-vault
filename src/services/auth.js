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

export async function resetPassword(email) {
  return supabase.auth.resetPasswordForEmail(email) 
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