type Practitioner = {
  id: number;
  name: string;
  level: number;
}

type Appointment = {
  id: number;
  date: string;
  client_name: string;
  appointment_type: string;
  duration: number;
  revenue: number;
  cost: number;
  practitioner_id: number;
};

type Option = {
  key: string,
  value: string
}

type ButtonType = "submit" | "reset" | "button" | undefined;

type Pagination = {
  currentPage: number;
  totalPages: number;
}

type FormState = {
  practitioner: string;
  dateFrom: string;
  dateTo: string;
}

type Action = {
  type: string;
  payload?: any;
};

type ConfigurationState = {
  isLoadingPractitionerList: boolean,
  isReportGenerated: boolean,
  recordsPerPage: number,
  currentRevenuesPage: number,
  currentAppointmentsPage: number,
  showAppointments: boolean,
  showAppointmentDetails: boolean,
  selectedReportMonth: string
}

type RevenueReportPayload = {
  totalCount: number,
  data: {
    date: string,
    revenue: number,
    cost: number
  }[]
}

type AppointmentsReportPayload = {
  totalCount: number,
  data: { id: number, date: string, revenue: number, cost: number }[]
}

type AppointmentDetailsPayload = {
  id: number,
  date: string,
  client_name: string,
  appointment_type: string,
  duration: number,
  revenue: number,
  cost: number,
  practitioner_id: number
}

export type {
  Appointment,
  Practitioner,
  Option,
  ButtonType,
  Pagination,
  FormState,
  Action,
  ConfigurationState,
  RevenueReportPayload,
  AppointmentsReportPayload,
  AppointmentDetailsPayload
}