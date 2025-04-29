import { getContext, setContext } from 'svelte';
import type { LocalObjectStore } from './localstore.svelte';
import type {
	Admins,
	CalificacionesProceso,
	Certificaciones,
	Compras,
	Empleadores,
	ID,
	ProcesosContacto,
	Profesionistas,
	SeccionAdmin,
	SeccionAdminConfig,
	SeccionAdminEmpleador,
	SeccionAdminProfesionista,
	Theme
} from './entities';
import { error } from '@sveltejs/kit';
import type { IndexCertificaciones } from './search-indexes/index-certificaciones';
import type { IndexProfesionistas } from './search-indexes/index-profesionistas';
import type { BreadcrumbsState } from './breadcrumbs.svelte';
import type { IndexEmpleadores } from './search-indexes/index-empleadores';
import type { IndexProcesosContacto } from './search-indexes/index-procesos-contacto';

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
	return getContext('admins') as LocalObjectStore<Admins>;
}

export function setSeccionAdminConfigContext(data: LocalObjectStore<SeccionAdminConfig>) {
	setContext('seccion-admin-config-store', data);
}

export function getSeccionAdminConfigContext() {
	return getContext('seccion-admin-config-store') as LocalObjectStore<SeccionAdminConfig>;
}

export function getSeccionAdminProfesionistaContext() {
	return getContext(
		'seccion-admin-profesionista-store'
	) as LocalObjectStore<SeccionAdminProfesionista>;
}

export function setSeccionAdminProfesionistaContext(
	data: LocalObjectStore<SeccionAdminProfesionista>
) {
	setContext('seccion-admin-profesionista-store', data);
}

export function setSeccionAdminEmpleadorContext(data: LocalObjectStore<SeccionAdminEmpleador>) {
	setContext('seccion-admin-empleador-store', data);
}

export function getSeccionAdminEmpleadorContext() {
	return getContext('seccion-admin-empleador-store') as LocalObjectStore<SeccionAdminEmpleador>;
}

export function setSeccionAdminContext(data: LocalObjectStore<SeccionAdmin>) {
	setContext('seccion-admin-store', data);
}
export function getSeccionAdminContext() {
	return getContext('seccion-admin-store') as LocalObjectStore<SeccionAdmin>;
}

export function setBreadCrumbsContext(data: BreadcrumbsState) {
	setContext('breadcrumbs-data', data);
}

export function getBreadcrumbsContext() {
	return getContext('breadcrumbs-data') as BreadcrumbsState;
}

export function setIndexProfesionistasContext(index: IndexProfesionistas) {
	setContext('index-profesionistas', index);
}

export function getIndexProfesionistasContext() {
	return getContext('index-profesionistas') as IndexProfesionistas;
}

export function setIndexCertificacionesContext(index: IndexCertificaciones) {
	setContext('index-certificaciones', index);
}

export function getIndexCertificacionesContext() {
	return getContext('index-certificaciones') as IndexCertificaciones;
}

export function setIndexEmpleadoresContext(index: IndexEmpleadores) {
	setContext('index-empleadores', index);
}

export function getIndexEmpleadoresContext() {
	return getContext('index-empleadores') as IndexEmpleadores;
}

export function setIndexProcesosContext(index: IndexProcesosContacto) {
	setContext('index-procesos-contacto', index);
}

export function getIndexProcesosContext() {
	return getContext('index-procesos-contacto') as IndexProcesosContacto;
}
