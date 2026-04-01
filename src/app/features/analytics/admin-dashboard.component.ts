import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

// PrimeNG 21
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DatePicker } from 'primeng/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PrimeNG } from 'primeng/config';

// Modelos y Servicios
import { EstadoConfig } from './models/report.model';

interface UserData {
  id: number;
  usuario: string;
  perfil: 'Administrador' | 'Soporte';
  estado: 'Activo' | 'Inactivo';
}

type TagSeverity = "success" | "info" | "warn" | "danger" | "secondary" | "contrast" | undefined;

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    CheckboxModule,
    ButtonModule,
    TableModule,
    TagModule,
    DatePicker,
    TooltipModule,
    AutoCompleteModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  filterForm!: FormGroup;

  // Configuración de estados
  estadosList: EstadoConfig[] = [];
  
  // Lista de archivos disponibles
  archivosList: string[] = [];

  // Datos y estado
  userData = signal<UserData[]>([]);
  filteredData = signal<UserData[]>([]);
  isLoading = signal<boolean>(false);

  // Usuarios simulados de Active Directory
  adUsers: string[] = [
    'ana.gomez', 'jorge.martinez', 'lucia.hernandez', 'maria.sanchez', 'carlos.perez',
    'pedro.garcia', 'sofia.lopez', 'diego.rodriguez', 'valentina.martinez', 'mateo.fernandez',
    'camila.gonzalez', 'sebastian.diaz', 'isabella.torres', 'nicolas.ramirez', 'emilia.flores'
  ];
  filteredAdUsers: string[] = [];
  selectedUser: string = '';

  // Paginación personalizada
  currentPage = 0;
  pageSize = 5;

  constructor(
    private fb: FormBuilder,
    private primeng: PrimeNG
  ) {
    // Alguna configuración de filtros conservada
    this.initializeForm();
  }

  ngOnInit(): void {
    this._configurarIdioma();
    this._cargarDatos();
  }

  /**
   * Configura el idioma español para el datepicker
   */
  private _configurarIdioma(): void {
    this.primeng.setTranslation({
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: 'Hoy',
      clear: 'Limpiar',
      dateFormat: 'dd/mm/yy',
      firstDayOfWeek: 1
    });
  }

  /**
   * Carga los datos iniciales desde el servicio
   */
  private _cargarDatos(): void {
    this.isLoading.set(true);

    const usuarios: UserData[] = [
      { id: 1, usuario: 'ana.gomez', perfil: 'Administrador', estado: 'Activo' },
      { id: 2, usuario: 'jorge.martinez', perfil: 'Soporte', estado: 'Activo' },
      { id: 3, usuario: 'lucia.hernandez', perfil: 'Administrador', estado: 'Inactivo' },
      { id: 4, usuario: 'maria.sanchez', perfil: 'Soporte', estado: 'Activo' },
      { id: 5, usuario: 'carlos.perez', perfil: 'Soporte', estado: 'Inactivo' }
    ];

    this.userData.set(usuarios);
    this.filteredData.set(usuarios);
    this.isLoading.set(false);
  }

  /**
   * Inicializa el formulario reactivo sin suscripción automática
   */
  private initializeForm(): void {
    this.filterForm = this.fb.group({
      fechaDesde: [null],
      fechaHasta: [null],
      estados: this.fb.array(this.estadosList.map(() => false)),
      archivos: this.fb.array(this.archivosList.map(() => false)),
      selectedUser: ['']
    });
  }

  /**
   * Ejecuta la búsqueda con filtros (se dispara al presionar botón "Buscar")
   */
  onSearch(): void {
    this.isLoading.set(true);
    this.filteredData.set(this.userData());
    this.isLoading.set(false);
  }

  /**
   * Limpia los filtros del formulario y recarga todos los datos
   */
  onClear(): void {
    this.filterForm.reset({
      fechaDesde: null,
      fechaHasta: null,
      estados: this.estadosList.map(() => false),
      archivos: this.archivosList.map(() => false),
      selectedUser: ''
    });

    this.filteredData.set(this.userData());
  }

  /**
   * Filtra usuarios de Active Directory para autocompletado
   */
  filterAdUsers(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredAdUsers = this.adUsers.filter(user =>
      user.toLowerCase().includes(query)
    );
  }

  /**
   * Agrega un usuario seleccionado a la tabla
   */
  addUser(): void {
    const selectedUser = this.filterForm.get('selectedUser')?.value;
    if (!selectedUser || typeof selectedUser !== 'string') {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Selecciona un usuario válido',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    // Verificar si el usuario ya existe
    const existingUser = this.userData().find(u => u.usuario === selectedUser);
    if (existingUser) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: 'El usuario ya está en la lista',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    // Agregar nuevo usuario
    const newUser: UserData = {
      id: Math.max(...this.userData().map(u => u.id), 0) + 1,
      usuario: selectedUser,
      perfil: 'Soporte', // Perfil por defecto
      estado: 'Activo'   // Estado por defecto
    };

    const updatedUsers = [...this.userData(), newUser];
    this.userData.set(updatedUsers);
    this.filteredData.set(updatedUsers);

    // Limpiar el campo de selección
    this.filterForm.patchValue({ selectedUser: '' });

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `Usuario ${selectedUser} agregado`,
      showConfirmButton: false,
      timer: 2000
    });
  }

  /**
   * Obtiene el label de un estado
   */
  getEstadoLabel(estado: string): string {
    const item = this.estadosList.find(e => e.key === estado);
    return item ? item.label : estado;
  }

  /**
   * Obtiene la severidad (tipo de badge) para un estado
   */
  getEstadoSeverity(estado: string): TagSeverity {
    if (estado === 'Activo') {
      return 'success';
    }

    if (estado === 'Inactivo') {
      return 'warn';
    }

    return 'secondary';
  }

  /**
   * Exporta los datos filtrados a Excel
   */
  exportToExcel(): void {
    if (this.filteredData().length === 0) {
      console.warn('No hay datos para exportar');
      return;
    }

    const data = this.filteredData().map(item => ({
      'Usuario': item.usuario,
      'Perfil': item.perfil,
      'Estado': item.estado
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');

    // Ajustar columnas
    ws['!cols'] = [
      { wch: 20 }, // Usuario
      { wch: 15 }, // Perfil
      { wch: 12 }  // Estado
    ];

    XLSX.writeFile(wb, `Usuarios_Admin_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

  /**
   * Obtiene el getter para el FormArray de estados
   */
  get estadosArray(): FormArray {
    return this.filterForm.get('estados') as FormArray;
  }

  /**
   * Obtiene el getter para el FormArray de archivos
   */
  get archivosArray(): FormArray {
    return this.filterForm.get('archivos') as FormArray;
  }

  /**
   * Obtiene la etiqueta de un archivo
   */
  getArchivoLabel(archivo: string): string {
    const labels: Record<string, string> = {
      'MO': 'Módulo Operativo',
      'MD': 'Módulo Datos',
      'ME': 'Módulo Exportación',
      'FL': 'Flujo Logístico'
    };
    return labels[archivo] || archivo;
  }

  /**
   * Abre un modal con detalles del usuario
   */
  showDetailModal(usuario: UserData): void {
    Swal.fire({
      title: `Usuario: ${usuario.usuario}`,
      html: `
        <p><strong>Perfil:</strong> ${usuario.perfil}</p>
        <p><strong>Estado:</strong> ${usuario.estado}</p>
      `,
      icon: 'info',
      confirmButtonText: 'Cerrar',
      width: '400px'
    });
  }

  /**
   * Cambia el estado del usuario
   */
  toggleEstado(usuario: UserData): void {
    const actualizados: UserData[] = this.filteredData().map(u => {
      if (u.id !== usuario.id) {
        return u;
      }

      const nuevoEstado: UserData['estado'] = u.estado === 'Activo' ? 'Inactivo' : 'Activo';
      return { ...u, estado: nuevoEstado };
    });

    this.filteredData.set(actualizados);
    this.userData.set(actualizados);

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `Estado ${usuario.usuario} actualizado`,
      showConfirmButton: false,
      timer: 1400
    });
  }

  /**
   * Elimina al usuario
   */
  deleteUser(usuario: UserData): void {
    const actualizados = this.filteredData().filter(u => u.id !== usuario.id);
    this.filteredData.set(actualizados);
    this.userData.set(actualizados);

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `Usuario ${usuario.usuario} eliminado`,
      showConfirmButton: false,
      timer: 1400
    });
  }

  /**
   * Verifica si está en vista móvil
   */
  isMobileView(): boolean {
    return window.innerWidth <= 768;
  }

  /**
   * TrackBy function para optimizar el rendimiento de ngFor
   */
  trackByUser(index: number, user: UserData): number {
    return user.id;
  }

  /**
   * Obtiene el índice inicial de la página actual
   */
  getStartIndex(): number {
    return this.currentPage * this.pageSize;
  }

  /**
   * Obtiene el índice final de la página actual
   */
  getEndIndex(): number {
    const endIndex = this.getStartIndex() + this.pageSize;
    return Math.min(endIndex, this.filteredData().length);
  }

  /**
   * Obtiene el total de páginas
   */
  getTotalPages(): number {
    return Math.ceil(this.filteredData().length / this.pageSize);
  }

  /**
   * Va a la página anterior
   */
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  /**
   * Va a la página siguiente
   */
  nextPage(): void {
    if (this.currentPage < this.getTotalPages() - 1) {
      this.currentPage++;
    }
  }
}
