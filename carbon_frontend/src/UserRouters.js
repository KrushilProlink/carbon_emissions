import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserView from './pages/user/View'
import Lead from './pages/Lead/Lead';
import DashboardAppPage from './pages/DashboardAppPage';
import LeadView from './pages/Lead/View'
import Contact from './pages/contact/Contact';
import ContactView from './pages/contact/View'
import Policy from './pages/policy/Policy'
import PolicyView from './pages/policy/View'
import Calendar from './pages/Calendar/Calendar';
import Document from './pages/documents/Documents';
import Calls from './pages/calls/Call';
import CallsView from './pages/calls/View'
import Meeting from './pages/meeting/Meeting';
import MeetingView from './pages/meeting/View'
import Email from './pages/email/Email'
import EmailView from './pages/email/View'
import Task from './pages/task/Task';
import TaskView from './pages/task/View'
import Sms from './pages/sms/Sms';
import SmsView from './pages/sms/View';
import EmailTemplate from './pages/emailTemplate/EmailTemplate';
import AddEmailTemplate from './pages/emailTemplate/Add'
import ViewEmailTemplate from './pages/emailTemplate/View'
import ImportView from './components/Import/ImportView';
import Payment from './pages/Payment/Payment';
import PaymentView from './pages/Payment/View';
import SMSTemplate from './pages/smsTemplate/SMSTemplate';
import ViewSMSTemplate from './pages/smsTemplate/View';
import Page404 from './pages/Page404';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user/view/:id', element: <UserView /> },
        { path: 'lead', element: <Lead /> },
        { path: 'lead/view/:id', element: <LeadView /> },
        { path: 'contact', element: <Contact /> },
        { path: 'contact/view/:id', element: <ContactView /> },
        { path: 'policy', element: <Policy /> },
        { path: 'policy/view/:id', element: <PolicyView /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'document', element: <Document /> },

        { path: 'call', element: <Calls /> },
        { path: 'call/view/:id', element: <CallsView /> },
        { path: 'meeting', element: <Meeting /> },
        { path: 'meeting/view/:id', element: <MeetingView /> },
        { path: 'email', element: <Email /> },
        { path: 'email/view/:id', element: <EmailView /> },
        { path: 'task', element: <Task /> },
        { path: 'task/view/:id', element: <TaskView /> },
        { path: 'sms', element: <Sms /> },
        { path: 'sms/view/:id', element: <SmsView /> },
        { path: 'emailtemplate', element: <EmailTemplate /> },
        { path: 'emailtemplate/add', element: <AddEmailTemplate /> },
        { path: 'emailtemplate/view/:id', element: <ViewEmailTemplate /> },
        { path: ':view/import', element: <ImportView /> },
        { path: 'payment', element: <Payment /> },
        { path: 'payment/view/:id', element: <PaymentView /> },
        { path: 'smstemplate', element: <SMSTemplate /> },
        { path: 'smstemplate/view/:id', element: <ViewSMSTemplate /> },
        { path: '*', element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { path: '*', element: <Navigate to="/dashboard/app" />, index: true },
        // { path: '404', element: <Page404 /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}