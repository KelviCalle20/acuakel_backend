export interface RegisterDto {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  contrasena: string;
  roles?: number[];           // IDs de los roles a asignar
  usuarioCreacion?: number;   // ID del usuario que crea este usuario (opcional)
}
