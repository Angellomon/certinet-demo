import { getContext } from 'svelte';
import type { LocalObjectStore } from './localstore.svelte';
import type {
	AdminsSchema,
	CalificacionesProceso,
	Certificaciones,
	Compras,
	Empleadores,
	ID,
	ProcesosContacto,
	Profesionistas,
	SeccionAdminConfigSchema,
	Theme
} from './entities';
import { error } from '@sveltejs/kit';

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
	const profesionista = getProfesionistasContext().value.find((p) => p.id === idProfesionista);
	if (!profesionista) error(404, `profesionista no encontrado (id=${idProfesionista})`);

	return profesionista;
}

export function getCalificacionesProcesoContext() {
	return getContext('calificaciones-proceso') as LocalObjectStore<CalificacionesProceso>;
}

export function getCalificacionProceso(idCalificacion: string | null) {
	const calificaciones = getCalificacionesProcesoContext();

	return calificaciones.value.find((c) => c.id === idCalificacion);
}

export function getComprasContext() {
	return getContext('compras') as LocalObjectStore<Compras>;
}

export function getCompraContext(idCompra: string) {
	const compras = getComprasContext();

	return compras.value.find((c) => c.id === idCompra);
}

export function getEmpleadoresContext() {
	return getContext('empleadores') as LocalObjectStore<Empleadores>;
}

export function getEmpleadorContext(idEmpleador: string) {
	const empleador = getEmpleadoresContext().value.find((e) => e.id === idEmpleador);

	if (!empleador) error(404, `empleador not found (id=${idEmpleador})`);

	return empleador;
}

export function getThemeContext() {
	return getContext('theme') as LocalObjectStore<Theme>;
}

export function getIdEmpleadorContext() {
	return getContext('id-empleador') as LocalObjectStore<ID>;
}

export function getIdProfesionistaContext() {
	return getContext('id-profesionista') as LocalObjectStore<ID>;
}

export function getIdAdminContext() {
	return getContext('id-admin') as LocalObjectStore<ID>;
}

export function getCurrentEmpleadorContext() {
	const idEmpleadorStore = getIdEmpleadorContext();

	return getEmpleadorContext(idEmpleadorStore.value);
}

export function getCurrentProfesionistaContext() {
	const idProfesionistaStore = getIdProfesionistaContext();

	return getProfesionistaContext(idProfesionistaStore.value);
}

export function getAdmins() {
	return getContext('admins') as LocalObjectStore<AdminsSchema>;
}

export function getSeccionAdminConfigContext() {
	return getContext('seccion-admin-config-store') as LocalObjectStore<SeccionAdminConfigSchema>;
}
