import { browser } from '$app/environment';
import type { Certificacion } from '$lib/entities';

const CERTS_KEY = 'certificados';

class CertificacionesLocalStore {
	certificaciones: Certificacion[] = $state([]);
	constructor(initialCerts: Certificacion[] = []) {
		this.certificaciones = initialCerts;

		if (browser) {
			const localCerts = this.loadCertificaciones();
			this.certificaciones = [...this.certificaciones, ...localCerts];
		}
	}

	saveCertificaciones() {
		localStorage.setItem(CERTS_KEY, JSON.stringify(this.certificaciones));
	}

	loadCertificaciones() {
		const localData: Record<string, any>[] = JSON.parse(localStorage.getItem(CERTS_KEY) || '[]');
		const localCerts: Certificacion[] = [];

		for (let ld of localData) {
			localCerts.push({
				...(ld as any),
				fechaObtencion: new Date(ld.fechaObtencion)
			});
		}

		return localCerts;
	}

	clearCertificaciones() {
		localStorage.removeItem(CERTS_KEY);
	}

	addCertificacion(cert: Certificacion) {
		this.certificaciones.push(cert);
	}

	removeCertificacion(idCert: string) {
		let i = 0;
		for (let c of this.certificaciones) {
			if (c.id === idCert) {
				this.certificaciones.splice(i, 1);
				break;
			}
			i += 1;
		}
	}
}

export const certificacionesLocalStore = new CertificacionesLocalStore();
