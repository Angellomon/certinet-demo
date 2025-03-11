import { getDemoEmpleador, getDemoProcesosContacto, getDemoProfesionista } from '$lib/demo-data';

export async function load(data) {
  const currentProfesionista = getDemoProfesionista()
  const procesosContacto = getDemoProcesosContacto().filter(p => p.idProfesionista === currentProfesionista.id)

  const parentData = await data.parent()

  const { certificacionesDataMap, certificaciones } = parentData

  return { currentProfesionista, procesosContacto, certificacionesDataMap, certificaciones }
}