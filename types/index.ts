export interface Usuario {
  id_usuario: number;
  username: string;
  email: string;
  nombre: string;
  rol: string;
  fecha_creacion: string;
  fecha_edicion: string | null;
}

export interface UsuarioCreate {
  username: string;
  email: string;
  password_hash: string;
  nombre: string;
  rol?: string;
}

export interface UsuarioUpdate {
  username?: string;
  email?: string;
  nombre?: string;
  rol?: string;
}

export interface Animal {
  id: number;
  nombre: string;
  edad: number;
  especie: string;
  tipo: string;
  id_usuario_creacion: number;
  id_usuario_edita: number | null;
  fecha_creacion: string;
  fecha_edicion: string | null;
}

export interface AnimalCreate {
  nombre: string;
  edad: number;
  especie: string;
  tipo?: string;
  id_usuario_creacion: number;
}

export interface AnimalUpdate {
  nombre?: string;
  edad?: number;
  especie?: string;
  id_usuario_edita?: number;
}

export interface GatoCreate extends AnimalCreate {
  tipo: 'gato';
}

export interface PerroCreate extends AnimalCreate {
  tipo: 'perro';
}

export interface Cita {
  id: number;
  fecha: string;
  hora: string;
  tipo: string;
  estado: string;
  id_animal: number;
  id_veterinario: number;
  id_usuario_creacion: number;
  id_usuario_edita: number | null;
  fecha_creacion: string;
  fecha_edicion: string | null;
}

export interface CitaCreate {
  fecha: string;
  hora: string;
  tipo?: string;
  estado?: string;
  id_animal: number;
  id_veterinario: number;
  id_usuario_creacion: number;
}

export interface CitaUpdate {
  fecha?: string;
  hora?: string;
  tipo?: string;
  estado?: string;
  id_usuario_edita?: number;
}

export interface Consulta {
  id: number;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string | null;
  tipo_consulta: string;
  motivo_revision: string | null;
  proxima_cita: string | null;
  nivel_urgencia: number | null;
  sintomas: string | null;
  id_cita: number;
  id_animal: number;
  id_veterinario: number;
  id_usuario_creacion: number;
  id_usuario_edita: number | null;
  fecha_creacion: string;
  fecha_edicion: string | null;
}

export interface ConsultaCreate {
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  observaciones?: string;
  tipo_consulta: string;
  motivo_revision?: string;
  proxima_cita?: string;
  nivel_urgencia?: number;
  sintomas?: string;
  id_cita: number;
  id_animal: number;
  id_veterinario: number;
  id_usuario_creacion: number;
}

export interface ConsultaUpdate {
  fecha?: string;
  diagnostico?: string;
  tratamiento?: string;
  observaciones?: string;
  tipo_consulta?: string;
  motivo_revision?: string;
  proxima_cita?: string;
  nivel_urgencia?: number;
  sintomas?: string;
  id_usuario_edita?: number;
}

export interface ListResponse<T> {
  total: number;
  items: T[];
}