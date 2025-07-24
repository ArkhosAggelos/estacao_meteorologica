import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

async function run() {
  const agora = new Date().toISOString()
  console.log(`⏰ Iniciando agregação às: ${agora}`)

  const { error } = await supabase.rpc('agregar_mes')
  if (error) {
    console.error('Erro ao agregar por mes:', error)
    process.exit(1)
  } else {
    console.log('✅ Agregação por mes realizada com sucesso.')
  }
}

run()