import { getDemoEmpleador, getDemoProcesosContacto } from '$lib/demo-data';

export async function load(data) {
  const currentEmpleador = getDemoEmpleador()
  const procesosContacto = getDemoProcesosContacto().filter(p => p.idEmpleador === currentEmpleador.id)

  const parentData = await data.parent()

  const { certificacionesDataMap, certificaciones } = parentData

  return { currentEmpleador, procesosContacto, certificacionesDataMap, certificaciones }
}