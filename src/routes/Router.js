import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';
// Supertokens - Temporarily disabled
// import { SessionAuth } from "supertokens-auth-react/recipe/session";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const EcommerceDash = Loadable(lazy(() => import('../views/dashboard/Ecommerce')));

/* ****Apps***** */
const Chats = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
// const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog')));
// const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogPost')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const Items = Loadable(lazy(() => import('../views/apps/items/Items')));
const Faxes = Loadable(lazy(() => import('../views/apps/faxes/Faxes')));
const Users = Loadable(lazy(() => import('../views/apps/users/Users')));
const Patients = Loadable(lazy(() => import('../views/apps/patients/Patients')));
const Pharmacies = Loadable(lazy(() => import('../views/apps/pharmacies/Pharmacies')));
const Pharmacists = Loadable(lazy(() => import('../views/apps/pharmacists/Pharmacists')));
const Physicians = Loadable(lazy(() => import('../views/apps/physicians/Physicians')));
const Ecommerce = Loadable(lazy(() => import('../views/apps/eCommerce/Ecommerce')));
const EcommerceDetail = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceDetail')));
const EcommerceAddProduct = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceAddProduct')));
const EcommerceEditProduct = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceEditProduct')));
const EcomProductList = Loadable(lazy(() => import('../views/apps/eCommerce/EcomProductList')));
const EcomProductCheckout = Loadable(
  lazy(() => import('../views/apps/eCommerce/EcommerceCheckout')),
);
const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile')));
const Followers = Loadable(lazy(() => import('../views/apps/user-profile/Followers')));
const Friends = Loadable(lazy(() => import('../views/apps/user-profile/Friends')));
const Gallery = Loadable(lazy(() => import('../views/apps/user-profile/Gallery')));
const InvoiceList = Loadable(lazy(() => import('../views/apps/invoice/List')));
const InvoiceCreate = Loadable(lazy(() => import('../views/apps/invoice/Create')));
const InvoiceDetail = Loadable(lazy(() => import('../views/apps/invoice/Detail')));
const InvoiceEdit = Loadable(lazy(() => import('../views/apps/invoice/Edit')));
const RequestList = Loadable(lazy(() => import('../views/apps/request/List')));
const RequestCreate = Loadable(lazy(() => import('../views/apps/request/Create')));
const RequestDetail = Loadable(lazy(() => import('../views/apps/request/Detail')));
const RequestEdit = Loadable(lazy(() => import('../views/apps/request/Edit')));
const Kanban = Loadable(lazy(() => import('../views/apps/kanban/Kanban')));

// Pages
const RollbaseCASL = Loadable(lazy(() => import('../views/pages/rollbaseCASL/RollbaseCASL')));
const Treeview = Loadable(lazy(() => import('../views/pages/treeview/Treeview')));
const Pricing = Loadable(lazy(() => import('../views/pages/pricing/Pricing')));
const AccountSetting = Loadable(
  lazy(() => import('../views/pages/account-setting/AccountSetting')),
);
const Faq = Loadable(lazy(() => import('../views/pages/faq/Faq')));

// widget
const WidgetCards = Loadable(lazy(() => import('../views/widgets/cards/WidgetCards')));
const WidgetBanners = Loadable(lazy(() => import('../views/widgets/banners/WidgetBanners')));
const WidgetCharts = Loadable(lazy(() => import('../views/widgets/charts/WidgetCharts')));

// form elements
const MuiAutoComplete = Loadable(
  lazy(() => import('../views/forms/form-elements/MuiAutoComplete')),
);
const MuiButton = Loadable(lazy(() => import('../views/forms/form-elements/MuiButton')));
const MuiCheckbox = Loadable(lazy(() => import('../views/forms/form-elements/MuiCheckbox')));
const MuiRadio = Loadable(lazy(() => import('../views/forms/form-elements/MuiRadio')));
const MuiSlider = Loadable(lazy(() => import('../views/forms/form-elements/MuiSlider')));
const MuiDateTime = Loadable(lazy(() => import('../views/forms/form-elements/MuiDateTime')));
const MuiSwitch = Loadable(lazy(() => import('../views/forms/form-elements/MuiSwitch')));

// form layout
const FormLayouts = Loadable(lazy(() => import('../views/forms/FormLayouts')));
const FormCustom = Loadable(lazy(() => import('../views/forms/FormCustom')));
const FormWizard = Loadable(lazy(() => import('../views/forms/FormWizard')));
const RequestWizard = Loadable(lazy(() => import('../views/forms/RequestWizard')));
const FormValidation = Loadable(lazy(() => import('../views/forms/FormValidation')));
const QuillEditor = Loadable(lazy(() => import('../views/forms/quill-editor/QuillEditor')));
const FormHorizontal = Loadable(lazy(() => import('../views/forms/FormHorizontal')));
const FormVertical = Loadable(lazy(() => import('../views/forms/FormVertical')));

// tables
const BasicTable = Loadable(lazy(() => import('../views/tables/BasicTable')));
const CollapsibleTable = Loadable(lazy(() => import('../views/tables/CollapsibleTable')));
const EnhancedTable = Loadable(lazy(() => import('../views/tables/EnhancedTable')));
const FixedHeaderTable = Loadable(lazy(() => import('../views/tables/FixedHeaderTable')));
const PaginationTable = Loadable(lazy(() => import('../views/tables/PaginationTable')));
const SearchTable = Loadable(lazy(() => import('../views/tables/SearchTable')));

//react tables
const ReactBasicTable = Loadable(lazy(() => import('../views/react-tables/basic/page')));
const ReactColumnVisibilityTable = Loadable(
  lazy(() => import('../views/react-tables/columnvisibility/page')),
);
const ReactDenseTable = Loadable(lazy(() => import('../views/react-tables/dense/page')));
const ReactDragDropTable = Loadable(lazy(() => import('../views/react-tables/drag-drop/page')));
const ReactEditableTable = Loadable(lazy(() => import('../views/react-tables/editable/page')));
const ReactEmptyTable = Loadable(lazy(() => import('../views/react-tables/empty/page')));
const ReactExpandingTable = Loadable(lazy(() => import('../views/react-tables/expanding/page')));
const ReactFilterTable = Loadable(lazy(() => import('../views/react-tables/filtering/page')));
const ReactPaginationTable = Loadable(lazy(() => import('../views/react-tables/pagination/page')));
const ReactRowSelectionTable = Loadable(
  lazy(() => import('../views/react-tables/row-selection/page')),
);
const ReactSortingTable = Loadable(lazy(() => import('../views/react-tables/sorting/page')));
const ReactStickyTable = Loadable(lazy(() => import('../views/react-tables/sticky/page')));

// chart
const LineChart = Loadable(lazy(() => import('../views/charts/LineChart')));
const GredientChart = Loadable(lazy(() => import('../views/charts/GredientChart')));
const DoughnutChart = Loadable(lazy(() => import('../views/charts/DoughnutChart')));
const AreaChart = Loadable(lazy(() => import('../views/charts/AreaChart')));
const ColumnChart = Loadable(lazy(() => import('../views/charts/ColumnChart')));
const CandlestickChart = Loadable(lazy(() => import('../views/charts/CandlestickChart')));
const RadialbarChart = Loadable(lazy(() => import('../views/charts/RadialbarChart')));

// ui
const MuiAlert = Loadable(lazy(() => import('../views/ui-components/MuiAlert')));
const MuiAccordion = Loadable(lazy(() => import('../views/ui-components/MuiAccordion')));
const MuiAvatar = Loadable(lazy(() => import('../views/ui-components/MuiAvatar')));
const MuiChip = Loadable(lazy(() => import('../views/ui-components/MuiChip')));
const MuiDialog = Loadable(lazy(() => import('../views/ui-components/MuiDialog')));
const MuiList = Loadable(lazy(() => import('../views/ui-components/MuiList')));
const MuiPopover = Loadable(lazy(() => import('../views/ui-components/MuiPopover')));
const MuiRating = Loadable(lazy(() => import('../views/ui-components/MuiRating')));
const MuiTabs = Loadable(lazy(() => import('../views/ui-components/MuiTabs')));
const MuiTooltip = Loadable(lazy(() => import('../views/ui-components/MuiTooltip')));
const MuiTransferList = Loadable(lazy(() => import('../views/ui-components/MuiTransferList')));
const MuiTypography = Loadable(lazy(() => import('../views/ui-components/MuiTypography')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(
  lazy(() => import('../views/authentication/auth2/ForgotPassword2')),
);
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
// Supertokens - Temporarily disabled
// const VerifyEmail = Loadable(lazy(() => import('../views/authentication/auth2/VerifyEmail')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

// landingpage
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

// front end pages
const Homepage = Loadable(lazy(() => import('../views/pages/frontend-pages/Homepage')));
const About = Loadable(lazy(() => import('../views/pages/frontend-pages/About')));
const Contact = Loadable(lazy(() => import('../views/pages/frontend-pages/Contact')));
const Portfolio = Loadable(lazy(() => import('../views/pages/frontend-pages/Portfolio')));
const PagePricing = Loadable(lazy(() => import('../views/pages/frontend-pages/Pricing')));
const BlogPage = Loadable(lazy(() => import('../views/pages/frontend-pages/Blog')));
const BlogPost = Loadable(lazy(() => import('../views/pages/frontend-pages/BlogPost')));
const PatientsPage = Loadable(lazy(() => import('../views/pages/frontend-pages/Patients')));

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      // Added - Requests - V1.0
      { path: '', element: <Navigate to="/landingpage" /> },
      { path: 'request-wizard', element: <RequestWizard /> },
      // End Added
      { path: 'auth/404', element: <Error /> },
      { path: 'auth/login2', element: <Login /> },
      { path: 'auth/login', element: <Login2 /> },
      { path: 'auth/register2', element: <Register /> },
      { path: 'auth/register', element: <Register2 /> },
      // Supertokens - Temporarily disabled
      // { path: 'auth/verify-email', element: <VerifyEmail /> },
      { path: 'auth/forgot-password2', element: <ForgotPassword /> },
      { path: 'auth/forgot-password', element: <ForgotPassword2 /> },
      { path: 'auth/two-steps2', element: <TwoSteps /> },
      { path: 'auth/two-steps', element: <TwoSteps2 /> },
      { path: 'auth/maintenance', element: <Maintenance /> },
      { path: 'landingpage', element: <Landingpage /> },
      { path: 'frontend-pages/homepage', element: <Homepage /> },
      { path: 'frontend-pages/about', element: <About /> },
      { path: 'frontend-pages/contact', element: <Contact /> },
      { path: 'frontend-pages/portfolio', element: <Portfolio /> },
      { path: 'frontend-pages/pricing', element: <PagePricing /> },
      { path: 'frontend-pages/blog', element: <BlogPage /> },
      { path: 'frontend-pages/blog/detail/:id', element: <BlogPost /> },
      { path: 'patients', element: <PatientsPage /> },
    ],
  },
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '', element: <Navigate to="/dashboards/modern" /> },
      { path: 'dashboards/modern', exact: true, element: <ModernDash /> },
      { path: 'dashboards/ecommerce', exact: true, element: <EcommerceDash /> },
      // { path: 'apps/chats', element: <Chats /> },
      // { path: 'apps/notes', element: <Notes /> },
      // { path: 'apps/calendar', element: <Calendar /> },
      // { path: 'apps/email', element: <Email /> },
      // { path: 'apps/tickets', element: <Tickets /> },
      { path: 'apps/items', element: <Items /> },
      { path: 'apps/faxes', element: <Faxes /> },
      { path: 'apps/users', element: <Users /> },
      { path: 'apps/patients', element: <Patients /> },
      { path: 'apps/locations', element: <Pharmacies /> },
      { path: 'apps/pharmacists', element: <Pharmacists /> },
      { path: 'apps/doctors', element: <Physicians /> },
      // { path: 'apps/ecommerce/shop', element: <Ecommerce /> },
      // { path: 'apps/ecommerce/eco-product-list', element: <EcomProductList /> },
      // { path: 'apps/ecommerce/eco-checkout', element: <EcomProductCheckout /> },
      // { path: 'apps/ecommerce/add-product', element: <EcommerceAddProduct /> },
      // { path: 'apps/ecommerce/edit-product', element: <EcommerceEditProduct /> },
      // { path: 'apps/ecommerce/detail/:id', element: <EcommerceDetail /> },
      // { path: 'apps/kanban', element: <Kanban /> },
      // { path: 'apps/invoice/list', element: <InvoiceList /> },
      // { path: 'apps/invoice/create', element: <InvoiceCreate /> },
      // { path: 'apps/invoice/detail/:id', element: <InvoiceDetail /> },
      // { path: 'apps/invoice/edit/:id', element: <InvoiceEdit /> },
      // Removed - Requests - V1.0
      // { path: 'apps/request/list', element: <RequestList /> },
      // Added - Requests - V1.0
      { path: 'apps/requests', element: <RequestList /> },
      // End Added
      { path: 'apps/request/create', element: <RequestCreate /> },
      { path: 'apps/request/detail/:id', element: <RequestDetail /> },
      { path: 'apps/request/edit/:id', element: <RequestEdit /> },
      // { path: 'apps/followers', element: <Followers /> },
      // { path: 'apps/friends', element: <Friends /> },
      // { path: 'apps/gallery', element: <Gallery /> },
      { path: 'user-profile', element: <UserProfile /> },
      // { path: 'pages/casl', element: <RollbaseCASL /> },
      // { path: 'pages/treeview', element: <Treeview /> },
      // { path: 'pages/pricing', element: <Pricing /> },
      // Removed - Requests - V1.0
      // { path: 'pages/account-settings', element: <AccountSetting /> },
      // Added - Requests - V1.0
      { path: 'apps/account-settings', element: <AccountSetting /> },
      // End Added
      // { path: 'pages/faq', element: <Faq /> },
      // { path: 'forms/form-elements/autocomplete', element: <MuiAutoComplete /> },
      // { path: 'forms/form-elements/button', element: <MuiButton /> },
      // { path: 'forms/form-elements/checkbox', element: <MuiCheckbox /> },
      // { path: 'forms/form-elements/radio', element: <MuiRadio /> },
      // { path: 'forms/form-elements/slider', element: <MuiSlider /> },
      // { path: 'forms/form-elements/date-time', element: <MuiDateTime /> },
      // { path: 'forms/form-elements/date-range', element: <MuiDateTime /> },
      // { path: 'forms/form-elements/switch', element: <MuiSwitch /> },
      // { path: 'forms/form-elements/switch', element: <MuiSwitch /> },
      // { path: 'forms/quill-editor', element: <QuillEditor /> },
      // { path: 'forms/form-layouts', element: <FormLayouts /> },
      // { path: 'forms/form-horizontal', element: <FormHorizontal /> },
      // { path: 'forms/form-vertical', element: <FormVertical /> },
      // { path: 'forms/form-custom', element: <FormCustom /> },
      // { path: 'forms/form-wizard', element: <FormWizard /> },
      // { path: 'forms/form-validation', element: <FormValidation /> },
      // { path: 'tables/basic', element: <BasicTable /> },
      // { path: 'tables/collapsible', element: <CollapsibleTable /> },
      // { path: 'tables/enhanced', element: <EnhancedTable /> },
      // { path: 'tables/fixed-header', element: <FixedHeaderTable /> },
      // { path: 'tables/pagination', element: <PaginationTable /> },
      // { path: 'tables/search', element: <SearchTable /> },
      // { path: 'charts/line-chart', element: <LineChart /> },
      // { path: 'charts/gredient-chart', element: <GredientChart /> },
      // { path: 'charts/doughnut-pie-chart', element: <DoughnutChart /> },
      // { path: 'charts/area-chart', element: <AreaChart /> },
      // { path: 'charts/column-chart', element: <ColumnChart /> },
      // { path: 'charts/candlestick-chart', element: <CandlestickChart /> },
      // { path: 'charts/radialbar-chart', element: <RadialbarChart /> },
      // { path: 'ui-components/alert', element: <MuiAlert /> },
      // { path: 'ui-components/accordion', element: <MuiAccordion /> },
      // { path: 'ui-components/avatar', element: <MuiAvatar /> },
      // { path: 'ui-components/chip', element: <MuiChip /> },
      // { path: 'ui-components/dialog', element: <MuiDialog /> },
      // { path: 'ui-components/list', element: <MuiList /> },
      // { path: 'ui-components/popover', element: <MuiPopover /> },
      // { path: 'ui-components/rating', element: <MuiRating /> },
      // { path: 'ui-components/tabs', element: <MuiTabs /> },
      // { path: 'ui-components/tooltip', element: <MuiTooltip /> },
      // { path: 'ui-components/transfer-list', element: <MuiTransferList /> },
      // { path: 'ui-components/typography', element: <MuiTypography /> },
      // { path: 'widgets/cards', element: <WidgetCards /> },
      // { path: 'widgets/banners', element: <WidgetBanners /> },
      // { path: 'widgets/charts', element: <WidgetCharts /> },
      // { path: 'react-tables/basic', element: <ReactBasicTable /> },
      // { path: 'react-tables/column-visiblity', element: <ReactColumnVisibilityTable /> },
      // { path: 'react-tables/drag-drop', element: <ReactDragDropTable /> },
      // { path: 'react-tables/dense', element: <ReactDenseTable /> },
      // { path: 'react-tables/editable', element: <ReactEditableTable /> },
      // { path: 'react-tables/empty', element: <ReactEmptyTable /> },
      // { path: 'react-tables/expanding', element: <ReactExpandingTable /> },
      // { path: 'react-tables/filter', element: <ReactFilterTable /> },
      // { path: 'react-tables/pagination', element: <ReactPaginationTable /> },
      // { path: 'react-tables/row-selection', element: <ReactRowSelectionTable /> },
      // { path: 'react-tables/sorting', element: <ReactSortingTable /> },
      // { path: 'react-tables/sticky', element: <ReactStickyTable /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
