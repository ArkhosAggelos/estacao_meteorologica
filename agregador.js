import { createClient } from '@supabase/supabase-js'

// 🔐 Usa variáveis de ambiente (vindas dos segredos do GitHub)
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

// ✅ Inicializa o cliente Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function rodarAgregacao() {
  console.log('🚀 Iniciando agregação no Supabase...')

  const { error } = await supabase.rpc('agregar_tudo')

  if (error) {
    console.error('❌ Erro ao executar agregar_tudo:', error)
    process.exit(1)
  } else {
    console.log('✅ Agregação executada com sucesso em', new Date().toLocaleString())
  }
}

rodarAgregacao()
