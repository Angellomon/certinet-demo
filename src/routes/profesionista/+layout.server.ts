import {
  getDemoCertificaciones,
  getDemoProfesionista,
  getDemoProcesosContacto
} from '$lib/demo-data.js';
import type { Certificacion } from '$lib/entities.js';

export function load(data) {
  const currentProfesionista = getDemoProfesionista();

  const procesos = getDemoProcesosContacto().filter((p) => p.idProfesionista === currentProfesionista.id);
  const procesosContacto = procesos.slice(0, 10);
  const totalProcesos = procesos.length;

  const certificaciones = getDemoCertificaciones().filter(c => c.idProfesionista == currentProfesionista.id);
  const totalCertificaciones = certificaciones.length
  const certificacionesDataMap: Record<string, Certificacion> = {};

  certificaciones.forEach((c) => {
    // const cert = certificaciones.find((c) => c.id == p.idCertificacion);
    // if (!cert) return;

    certificacionesDataMap[c.id] = c;
  });

  return {
    currentProfesionista,
    procesosContacto,
    totalProcesos,
    certificaciones,
    certificacionesDataMap,
    totalCertificaciones
  };
}
