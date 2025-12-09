'use server'

import { createClient } from "@/utils/supabase/server"

export const fetchHistoryRecords = async (userId: string | undefined) => {
    const supabase = await createClient()

    const { data: historyRecords, error } = await supabase
    .from('active_balances')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

    if (error) return {success: false, error}

    return {success: true, data: historyRecords}
}

export const fetchSubscriptions = async (userId: string | undefined) => {
    const supabase = await createClient()

    const { data: subscriptions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

    if (error) return {success: false, error}

    return {success: true, data: subscriptions}
}