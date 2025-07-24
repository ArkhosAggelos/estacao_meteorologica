import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

async function run() {
  const { error } = await supabase.rpc('agregar_hora')
  if (error) {
    console.error('Erro ao agregar por hora:', error)
    process.exit(1)
  } else {
    console.log('✅ Agregação por hora realizada com sucesso.')
  }
}

run()