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

  const certificaciones = getDemoCertificaciones();
  const totalCertificaciones = certificaciones.filter(c => c.idProfesionista == currentProfesionista.id).length
  const certificacionesDataMap: Record<string, Certificacion> = {};

  procesos.forEach((p) => {
    const cert = certificaciones.find((c) => c.id == p.idCertificacion);
    if (!cert) return;

    certificacionesDataMap[p.idCertificacion] = cert;
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
