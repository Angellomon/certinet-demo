import { getDemoProcesosContacto } from '$lib/demo-data.js'
import { error } from '@sveltejs/kit'

export function load(data) {
  const params = data.params

  const proceso = getDemoProcesosContacto().find(p => p.id === params.idProceso)

  if (!proceso) {
    error(404, {message: '[404] Proceso no encontrado...'})
  }

  return {
    proceso
  }
}