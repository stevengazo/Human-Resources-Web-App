import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import {
  AlertCircle,
  ClipboardList,
  FileText,
  Palette,
  Pencil,
  Plane,
  Plus,
  RefreshCw,
  User,
} from 'lucide-react';

import SectionTitle from '../Components/SectionTitle';
import PageTitle from '../Components/PageTitle';
import Divider from '../Components/Divider';
import PrimaryButton from '../Components/PrimaryButton';
import SecondaryButton from '../Components/SecondaryButton';
import OffCanvasLarge from '../Components/OffCanvasLarge';

import ActionTable from '../Components/organisms/ActionTable';
import CertificationTable from '../Components/organisms/CertificationTable';
import CourseTable from '../Components/organisms/CourseTable';
import SalaryTable from '../Components/organisms/SalaryTable';
import EmployeeTableInfo from '../Components/organisms/EmployeeTableInfo';
import VacationsTable from '../Components/organisms/VacationsTable';
import VacationsAdd from '../Components/organisms/VacationsAdd';
import CourseAdd from '../Components/organisms/CourseAdd';
import CertificationAdd from '../Components/organisms/CertificationAdd';
import TablePayrollsData from '../Components/organisms/TablePayrollsData';
import MyProfileEdit from '../Components/organisms/MyProfileEdit';
import EmergencyContacts from '../Components/organisms/EmergencyContacts';
import LinkedAccounts from '../Components/organisms/LinkedAccounts';
import VacationsSummary from '../Components/organisms/VacationsSummary';
import ProfileCustomization from '../Components/organisms/ProfileCustomization';
import HelpButton from '../Components/molecules/HelpButton';

import { useAppContext } from '../context/AppContext';
import useUserPreferences from '../hooks/useUserPreferences';

import EmployeeApi from '../api/employeesApi';
import actionApi from '../api/actionApi';
import courseApi from '../api/courseApi';
import certificationApi from '../api/certificationApi';
import salaryApi from '../api/salaryApi';
import VacationsApi from '../api/vacationsApi';
import Employee_PayrollApi from '../api/Employee_PayrollApi';

const TABS = {
  INFO: 'Informacion',
  ACTIONS: 'Acciones',
  VACATIONS: 'Vacaciones',
  PAYROLLS: 'Comprobantes',
};

/**
 * Normaliza la respuesta de la capa `api/`.
 *
 * Los clientes no son consistentes: unos devuelven la respuesta completa de
 * Axios y otros ya devuelven `.data` (ver docs/ESTRUCTURA-Y-MEJORAS.md §4.1).
 * Este helper acepta ambos contratos para que la página no se rompa.
 */
const unwrap = (respuesta, fallback = []) => {
  if (!respuesta) return fallback;
  const datos = respuesta?.data !== undefined ? respuesta.data : respuesta;
  if (datos === null || datos === undefined) return fallback;
  if (Array.isArray(fallback) && !Array.isArray(datos)) return fallback;
  return datos;
};

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const MyProfilePage = () => {
  const { user } = useAppContext();
  const { fondoUrl, prefs } = useUserPreferences();
  const fondoOpacidad = (prefs?.backgroundOpacity ?? 100) / 100;

  const [myProfile, setMyProfile] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [actions, setActions] = useState([]);
  const [payrolls, setPayrolls] = useState([]);

  const [activeTab, setActiveTab] = useState(TABS.INFO);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [canvasTitle, setCanvasTitle] = useState('');
  const [canvasContent, setCanvasContent] = useState(null);

  const openCanvas = (title, content) => {
    setCanvasTitle(title);
    setCanvasContent(content);
    setOpen(true);
  };

  const userId = user?.id;

  /** Carga el perfil y todas sus colecciones. */
  const cargarDatos = useCallback(async () => {
    if (!userId) {
      setCargando(false);
      setError('No hay una sesión activa.');
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const perfil = await EmployeeApi.getEmployeeById(userId);
      setMyProfile(unwrap(perfil, null));
    } catch (e) {
      console.error('Error perfil:', e);
      setMyProfile(null);
      setError('No se pudo cargar tu perfil. Intenta de nuevo.');
    }

    /* Las colecciones son independientes: si una falla, las demás se
       muestran igual. Se piden en paralelo para no encadenar esperas. */
    const colecciones = [
      [courseApi.getCoursesByUser(userId), setCourses],
      [certificationApi.getCertificationsByUser(userId), setCertifications],
      [salaryApi.getSalariesByUser(userId), setSalaries],
      [actionApi.getActionsByUser(userId), setActions],
      [VacationsApi.getVacationsByUser(userId), setVacations],
      [Employee_PayrollApi.Search({ employeeId: userId }), setPayrolls],
    ];

    await Promise.all(
      colecciones.map(async ([promesa, asignar]) => {
        try {
          asignar(unwrap(await promesa, []));
        } catch (e) {
          console.error('Error cargando colección del perfil:', e);
          asignar([]);
        }
      })
    );

    setCargando(false);
  }, [userId]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  /** Cierra el drawer y refresca, para ver de inmediato lo recién agregado. */
  const cerrarYRefrescar = () => {
    setOpen(false);
    setCanvasContent(null);
    cargarDatos();
  };

  /** Abre el drawer de autoedición del perfil. */
  const editarPerfil = () =>
    openCanvas(
      'Editar mis datos',
      <MyProfileEdit
        profile={myProfile ?? {}}
        onSaved={cerrarYRefrescar}
        onCancel={() => setOpen(false)}
      />
    );

  /** Abre el panel de personalización (tema, acento, fondo). */
  const personalizar = () =>
    openCanvas(
      'Personalizar',
      <ProfileCustomization onClose={() => setOpen(false)} />
    );

  return (
    <>
      {/* Drawer de formularios */}
      <AnimatePresence>
        {open && (
          <OffCanvasLarge
            isOpen={open}
            onClose={cerrarYRefrescar}
            title={canvasTitle}
          >
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
            >
              {canvasContent}
            </motion.div>
          </OffCanvasLarge>
        )}
      </AnimatePresence>

      <motion.div
        className="space-y-6"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Portada personalizable */}
        {fondoUrl && (
          <motion.div
            variants={sectionVariants}
            className="relative -mt-2 mb-2 h-40 overflow-hidden rounded-xl border border-stroke-soft sm:h-52"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${fondoUrl})`, opacity: fondoOpacidad }}
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/40 to-transparent" />
          </motion.div>
        )}

        {/* Encabezado */}
        <motion.div variants={sectionVariants}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <PageTitle className="mb-0">Mi Perfil</PageTitle>
              <HelpButton area="perfil" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <SecondaryButton onClick={cargarDatos} disabled={cargando}>
                <RefreshCw
                  size={15}
                  className={cargando ? 'animate-spin' : undefined}
                />
                Actualizar
              </SecondaryButton>

              <SecondaryButton onClick={personalizar}>
                <Palette size={15} />
                Personalizar
              </SecondaryButton>

              <PrimaryButton
                onClick={editarPerfil}
                disabled={cargando || !myProfile}
              >
                <Pencil size={15} />
                Editar mis datos
              </PrimaryButton>
            </div>
          </div>

          {/* Error de carga */}
          {error && (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={cargarDatos}
                  className="mt-1 text-sm font-semibold text-red-700 underline hover:no-underline"
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}

          <EmployeeTableInfo
            employee={myProfile}
            loading={cargando && !myProfile}
            onEdit={editarPerfil}
            puedeEditarFoto
            emptyTitle="Todavía no podemos mostrar tu perfil"
            emptyHint="No encontramos tu expediente. Contacta a Recursos Humanos."
          />

        </motion.div>

        {/* Pestañas */}
        <div className="border-b border-stroke-soft">
          <nav className="flex gap-6 overflow-x-auto">
            <TabButton
              icon={User}
              active={activeTab === TABS.INFO}
              onClick={() => setActiveTab(TABS.INFO)}
              count={courses.length + certifications.length}
            >
              Perfil
            </TabButton>

            <TabButton
              icon={ClipboardList}
              active={activeTab === TABS.ACTIONS}
              onClick={() => setActiveTab(TABS.ACTIONS)}
              count={actions.length}
            >
              Acciones
            </TabButton>

            <TabButton
              icon={Plane}
              active={activeTab === TABS.VACATIONS}
              onClick={() => setActiveTab(TABS.VACATIONS)}
              count={vacations.length}
            >
              Vacaciones
            </TabButton>

            <TabButton
              icon={FileText}
              active={activeTab === TABS.PAYROLLS}
              onClick={() => setActiveTab(TABS.PAYROLLS)}
              count={payrolls.length}
            >
              Comprobantes
            </TabButton>
          </nav>
        </div>

        {/* Contenido */}
        <div className="rounded-xl border border-stroke-soft bg-surface p-6 shadow-sm">
          {cargando ? (
            <TablaSkeleton />
          ) : (
            <>
              {activeTab === TABS.INFO && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <SectionTitle className="mb-0">Cursos</SectionTitle>
                    <PrimaryButton
                      onClick={() =>
                        openCanvas(
                          'Agregar Curso',
                          <CourseAdd
                            userId={userId}
                            author={userId}
                            onAdded={cerrarYRefrescar}
                          />
                        )
                      }
                    >
                      <Plus size={16} />
                      Agregar
                    </PrimaryButton>
                  </div>
                  <CourseTable courses={courses} />

                  <Divider />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <SectionTitle className="mb-0">Certificaciones</SectionTitle>
                    <PrimaryButton
                      onClick={() =>
                        openCanvas(
                          'Agregar Certificación',
                          <CertificationAdd
                            userId={userId}
                            author={userId}
                            onAdded={cerrarYRefrescar}
                          />
                        )
                      }
                    >
                      <Plus size={16} />
                      Agregar
                    </PrimaryButton>
                  </div>
                  <CertificationTable certifications={certifications} />

                  <Divider />

                  <SectionTitle>Histórico de Salarios</SectionTitle>
                  <SalaryTable salaries={salaries} />

                  <Divider />

                  <EmergencyContacts userId={userId} />

                  <Divider />

                  <LinkedAccounts />
                </div>
              )}

              {activeTab === TABS.ACTIONS && (
                <div className="space-y-4">
                  <SectionTitle>Acciones de Personal</SectionTitle>
                  <ActionTable actions={actions} />
                </div>
              )}

              {activeTab === TABS.VACATIONS && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <SectionTitle className="mb-0">Vacaciones</SectionTitle>
                    <PrimaryButton
                      onClick={() =>
                        openCanvas(
                          'Solicitar Vacaciones',
                          <VacationsAdd id={userId} />
                        )
                      }
                    >
                      <Plus size={16} />
                      Solicitar Vacaciones
                    </PrimaryButton>
                  </div>

                  <VacationsSummary vacations={vacations} />

                  <VacationsTable vacations={vacations} />
                </div>
              )}

              {activeTab === TABS.PAYROLLS && (
                <div className="space-y-4">
                  <SectionTitle>Comprobantes de Pago</SectionTitle>

                  {payrolls.length > 0 ? (
                    <TablePayrollsData
                      items={payrolls}
                      HandleShowEdit={openCanvas}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-stroke bg-surface-alt py-16 text-ink-muted">
                      <FileText size={32} />
                      <p className="text-sm">
                        Todavía no tienes comprobantes de pago.
                      </p>
                      <p className="text-xs">
                        Aparecerán aquí en cuanto se procese tu primera
                        planilla.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

/** Placeholder mientras cargan las tablas de la pestaña activa. */
const TablaSkeleton = () => (
  <div className="space-y-3">
    <div className="h-5 w-40 animate-pulse rounded bg-stroke-soft" />
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="h-10 animate-pulse rounded-lg bg-surface-alt" />
    ))}
  </div>
);

const TabButton = ({ active, children, onClick, icon: Icon, count }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center gap-2 whitespace-nowrap pb-3 text-sm font-semibold transition-colors border-b-2
        ${
          active
            ? 'border-brand text-brand'
            : 'border-transparent text-ink-muted hover:text-ink hover:border-stroke'
        }
      `}
    >
      {Icon && <Icon size={16} />}
      {children}

      {count > 0 && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold
            ${active ? 'bg-brand-tint text-brand-700' : 'bg-surface-alt text-ink-muted'}`}
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default MyProfilePage;
