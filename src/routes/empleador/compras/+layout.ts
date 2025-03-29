import { getDemoCertificaciones, getDemoEmpleador, getDemoCompras } from '$lib/demo-data.js';

export const load = (e) => {
	const empleador = getDemoEmpleador();

	const compras = getDemoCompras().filter((c) => c.idEmpleador === empleador.id).reverse();

	const totalMontoCompras = compras.reduce((total, c) => total + c.monto, 0);

	const totalCompras = compras.length;

	let totalCertificacionesAdquiridas = 0;

	for (let compra of compras) {
		totalCertificacionesAdquiridas += compra.idsProcesosContacto.length;
	}

	const ultimaCompra = compras[0];

	return {
		compras,
		empleador,
		totalMontoCompras,
		totalCompras,
		totalCertificacionesAdquiridas,
		ultimaCompra
	};
};
