import { supabase } from './lib/supabaseClient'

chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed. Fetching data from Supabase...')
  const { data, error } = await supabase.from('my_table').select('*')
  console.log('Data:', data, 'Error:', error)
})
