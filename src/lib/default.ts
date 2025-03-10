import type { Empleador, Profesionista } from './entities';
import {} from 'date-fns';

export const demoProfesionista: Profesionista = {
	id: 'test-profesionista',
	nombre: 'Juan',
	apellidos: 'Pérez Casas',
	cedula: 'asdf19998941',
	correo: 'profesionista@test.com',
	fechaNacimeinto: new Date(1996, 6, 3),
  profesion: "Programador",
  verificado: true
};

export const demoEmpleador: Empleador = {
  id: 'test-empleador',
  correo: "empleador@test.com",
  fechaEstablecimiento: new Date(2005, 10, 2),
  giro: "tech",
  razonSocial: "Test & Co.",
  verificado: true
}
