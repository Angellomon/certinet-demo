import type { Certificacion, Certificaciones } from "$lib/entities";
import { SearchIndex } from "./search-index";

export class IndexCertificaciones extends SearchIndex<Certificacion> {
  constructor() {
    super();
  }

  convertCertificado(data: Certificacion) {
    let result = '';

    result = result.concat(data.nombre);
    result = result.concat(data.serie);
    result = result.concat(data.organizacion);

    return result;
  }

  search(searchTerm: string): string[] {
    const text = this.escapeRegExp(searchTerm);

    return this.index.search(text) as any;
  }

  addToIndex(...data: Certificaciones): void {
    for (let cert of data) {
      const certificacionStr = this.convertCertificado(cert);
      this.index.add(cert.id, certificacionStr);
    }
  }

  updateIndex(data: Certificacion) {
    if (this.index.contain(data.id)) this.index.update(data.id, this.convertCertificado(data));
    else this.addToIndex(data);
  }

  removeFromIndex(id: string): void {
    if (this.index.contain(id)) this.index.remove(id);
  }
}

export function newIndexCertificaciones(...data: Certificaciones) {
  if (!data) return new IndexCertificaciones();

  const index = new IndexCertificaciones();

  index.addToIndex(...data);

  return index;
}