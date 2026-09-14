import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ManagerLayout from '../layouts/ManagerLayout';
import PublicLayout from '../layouts/PublicLayout';

// Sitio público (marketing)
import LandingPage from '../pages/public/LandingPage';
import FeaturesPage from '../pages/public/FeaturesPage';
import HowItWorksPage from '../pages/public/HowItWorksPage';
import PricingPage from '../pages/public/PricingPage';
import ContactPage from '../pages/public/ContactPage';

// Pages
import MyProfilePage from '../pages/MyProfilePage';
import LoginPage from '../pages/LoginPage';
import SelectCompanyPage from '../pages/SelectCompanyPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import AcceptInvitePage from '../pages/AcceptInvitePage';
import UILibraryPage from '../pages/UILibraryPage';
import EmployeesPage from '../pages/EmployeesPage';
import ManagerPage from '../pages/ManagerPage';
import PayrollPage from '../pages/PayrollPage';
import ActionsPage from '../pages/ActionsPage';
import ViewEmployeePage from '../pages/ViewEmployeePage';
import SettingsPage from '../pages/SettingsPage';
import AuditPage from '../pages/AuditPage';
import ReportsPage from '../pages/ReportsPage';
import AutomationsPage from '../pages/AutomationsPage';
import NewPayrollPage from '../pages/NewPayrollPage';
import KPIPage from '../pages/KPIPage';
import PayrollView from '../pages/PayrollView';
import MyKPIs from '../pages/MyKPIs';
import MyCommissionsPage from '../pages/MyComissionsPage';
import MyPayrollsPage from '../pages/MyPayrollsPage';
import QuestionPage from '../pages/QuestionPage';
import ViewPerformancePage from '../pages/ViewPerformancePage';
import LoansPage from '../pages/LoansPage';
import ViewLoanPage from '../pages/ViewLoanPage';
import AbsencesPage from '../pages/AbsencesPage';
import MyLoansPage from '../pages/MyLoansPage';
import OrgChartPage from '../pages/OrgChartPage';
import PsychometricPage from '../pages/PsychometricPage';
import PsychometricTestEditorPage from '../pages/PsychometricTestEditorPage';
import PsychometricAssignmentPage from '../pages/PsychometricAssignmentPage';
import MyPsychometricsPage from '../pages/MyPsychometricsPage';
import TakePsychometricPage from '../pages/TakePsychometricPage';
import MessagesPage from '../pages/MessagesPage';
import AutomationEditorPage from '../pages/AutomationEditorPage';

/** Redirige la ruta antigua `/manager/perfornance/:id` a la corregida. */
const PerformanceRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/manager/performance/${id}`} replace />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sitio público (marketing) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/caracteristicas" element={<FeaturesPage />} />
          <Route path="/como-funciona" element={<HowItWorksPage />} />
          <Route path="/precios" element={<PricingPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Route>

        {/* Autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-company" element={<SelectCompanyPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/invite/:token" element={<AcceptInvitePage />} />
        {/* Rutas privadas con layout - Empleados */}
        <Route element={<MainLayout />}>
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/my-kpis" element={<MyKPIs />} />
          <Route path="/my-comissions" element={<MyCommissionsPage />} />
          <Route path="/my-payrolls" element={<MyPayrollsPage />} />
          <Route path="/my-loans" element={<MyLoansPage />} />
          <Route path="/my-evaluations" element={<MyPsychometricsPage />} />
          <Route path="/my-evaluations/:id" element={<TakePsychometricPage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Route>
        {/* Rutas de Administrador y RH */}

        <Route element={<ManagerLayout />}>
          <Route path="/manager" element={<ManagerPage />} />
          <Route path="/manager/employees" element={<EmployeesPage />} />
          <Route path="/manager/payroll" element={<PayrollPage />} />
          <Route path="/manager/payroll/:id" element={<PayrollView />} />
          <Route path="/manager/actions" element={<ActionsPage />} />
          <Route path="/manager/kpis" element={<KPIPage />} />

          <Route path="/manager/absences" element={<AbsencesPage />} />
          <Route path="/manager/loans" element={<LoansPage />} />
          <Route path="/manager/questions" element={<QuestionPage />} />
          <Route path="/manager/employees/:id" element={<ViewEmployeePage />} />
          {/* La gestión de roles vive ahora en Configuración; se redirige
              para no romper los enlaces que alguien tuviera guardados. */}
          <Route
            path="/manager/roles"
            element={<Navigate to="/settings" replace />}
          />
          <Route path="/manager/organigrama" element={<OrgChartPage />} />
          <Route
            path="/manager/performance/:id"
            element={<ViewPerformancePage />}
          />
          {/* Ruta anterior con typo; se conserva para no romper enlaces guardados. */}
          <Route
            path="/manager/perfornance/:id"
            element={<PerformanceRedirect />}
          />

          <Route path="/manager/loan/:id" element={<ViewLoanPage />} />
          <Route path="/manager/psicometria" element={<PsychometricPage />} />
          <Route
            path="/manager/psicometria/prueba/:id"
            element={<PsychometricTestEditorPage />}
          />
          <Route
            path="/manager/psicometria/aplicacion/:id"
            element={<PsychometricAssignmentPage />}
          />
          <Route path="/manager/auditoria" element={<AuditPage />} />
          <Route path="/manager/reportes" element={<ReportsPage />} />
          <Route
            path="/manager/automatizaciones"
            element={<AutomationsPage />}
          />
          <Route
            path="/manager/automatizaciones/:id"
            element={<AutomationEditorPage />}
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/payroll/new/:id" element={<NewPayrollPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />

        {/* Test */}
        <Route path="/ui" element={<UILibraryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
