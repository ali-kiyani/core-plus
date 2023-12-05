const BASE_URL = "http://localhost:5279";

const fetchData = (url: string, options?: object, asJson?: boolean) => {
  if (options === undefined) {
    options = {};
  }

  options = { ...options, mode: "cors", headers: { Accept: "application/json", "Access-Control-Allow-Origin": "*" } }

  return fetch(url, options).then(x => {
    return (asJson !== undefined && asJson === false) ? x : x.json();
  }).then(y => {
    // console.log("Response");
    return y;
  }).catch((err) => {
    // console.log("Error");
    return err;
  });
}

export const getPractitionersList = () => {
  return fetchData(`${BASE_URL}/practitioners`, { method: "get" }, true);
}

export const getSupervisorsList = () => {
  return fetchData(`${BASE_URL}/practitioners/supervisors`, { method: "get" }, true);
}

export const getRemainingList = () => {
  return fetchData(`${BASE_URL}/practitioners/remaining`, { method: "get" }, true);
}

export const getPractitionerAppointments = (practitionerId: number, startDate: string, endDate: string) => {
  return fetchData(`${BASE_URL}/practitioners/${practitionerId}/appointments?startDate=${startDate}&endDate=${endDate}`, { method: "get" }, true);
}

export const getAppointmentById = (practitionerId: number, appointmentId: number) => {
  return fetchData(`${BASE_URL}/practitioners/${practitionerId}/appointments/${appointmentId}`, { method: "get" }, true);
}

export const getAppointmentsByMonth = (practitionerId: number, month: string, pageNum: number, recordsCount: number) => {
  return fetchData(`${BASE_URL}/practitioners/${practitionerId}/appointments?date=${month}&skip=${pageNum}&count=${recordsCount}`, { method: "get" }, true);
}

export const getPractitionerAppointmentsByMonth = (practitionerId: number, startDate: string, endDate: string, pageNum: number, recordsCount: number) => {
  return fetchData(`${BASE_URL}/practitioners/${practitionerId}/appointmentsByMonth?startDate=${startDate}&endDate=${endDate}&skip=${pageNum}&count=${recordsCount}`, { method: "get" }, true);
}