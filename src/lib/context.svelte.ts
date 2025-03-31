import { getContext } from 'svelte';
import type { LocalObjectStore } from './localstore.svelte';
import type {
	CalificacionesProceso,
	Certificaciones,
	Empleador,
	ProcesosContacto,
	Profesionistas
} from './entities';

export function getEmpleadorContext() {
	return getContext('empleador-store') as LocalObjectStore<Empleador>;
}

export function getProcesosContext() {
	return getContext('procesos-contacto') as LocalObjectStore<ProcesosContacto>;
}

export function getProcesoContext(idProceso: string) {
	const procesos = getProcesosContext();

	return procesos.value.find((p) => p.id === idProceso);
}

export function getCertificacionesContext() {
	return getContext('certificaciones') as LocalObjectStore<Certificaciones>;
}

export function getCertificacionContext(idCertificacion: string) {
	const certificaciones = getCertificacionesContext();

	return certificaciones.value.find((c) => c.id == idCertificacion);
}

export function getProfesionistasContext() {
	return getContext('profesionistas') as LocalObjectStore<Profesionistas>;
}

export function getProfesionistaContext(idProfesionista: string) {
	const profesionistas = getProfesionistasContext();

	return profesionistas.value.find((p) => p.id === idProfesionista);
}

export function getCalificacionesProcesoContext() {
	return getContext('calificaciones-proceso') as LocalObjectStore<CalificacionesProceso>;
}

export function getCalificacionProceso(idCalificacion: string | null) {
	const calificaciones = getCalificacionesProcesoContext();

	return calificaciones.value.find((c) => c.id === idCalificacion);
}
