import type { Curriculum, Profesionista, Profesionistas } from "$lib/entities";
import { SearchIndex } from "./search-index";

export class IndexProfesionistas extends SearchIndex<Profesionista> {
  constructor() {
    super();
  }

  search(searchTerm: string): string[] {
    const text = this.escapeRegExp(searchTerm);
    return this.index.search(text) as any;
  }

  convertCurriculum(data: Curriculum[]) {
    let result = '';

    const tags = new Set();

    for (let curr of data) {
      for (let tech of curr.tech) {
        tags.add(tech);
      }
    }

    result = result.concat(Array.from(tags).join(','));

    return result;
  }

  convertProfesionista(data: Profesionista) {
    let result = '';

    result = result.concat(`${data.nombre},`);
    result = result.concat(`${data.apellidos.replaceAll(' ', '')},`);
    result = result.concat(`${data.profesion},`);
    result = result.concat(`${data.correo},`);
    result = result.concat(this.convertCurriculum(data.trayectoria.laboral));
    result = result.concat(this.convertCurriculum(data.trayectoria.proyectos));

    return result;
  }

  addToIndex(...data: Profesionistas): void {
    for (let profesionista of data) {
      const profesionistaStr = this.convertProfesionista(profesionista);
      this.index.add(profesionista.id, profesionistaStr);
    }
  }

  updateIndex(data: Profesionista) {
    if (this.index.contain(data.id)) this.index.update(data.id, this.convertProfesionista(data));
    else this.addToIndex(data);
  }

  removeFromIndex(id: string): void {
    if (this.index.contain(id)) this.index.remove(id);
  }
}

export function newIndexProfesionistas(...data: Profesionistas) {
  if (!data) return new IndexProfesionistas();

  const index = new IndexProfesionistas();

  index.addToIndex(...data);

  return index;
}