import { AppointmentDetailsPayload } from '../../types';

const AppointmentDetails = (props: {
  appointmentDetails: AppointmentDetailsPayload;
}): JSX.Element => {
  const { appointmentDetails } = props;

  return (
    <div>
      <h2 className="sec-heading">Appointment Details</h2>
      <hr />
      <div className="mt-3">
        <div className='grid grid-cols-3 mb-2'><span className='sec-heading sec-underline'>Appointment ID:</span> {appointmentDetails?.id}</div>
        <div className='grid grid-cols-3 mb-2'><span className='sec-heading sec-underline'>Date:</span> {appointmentDetails?.date}</div>
        <div className='grid grid-cols-3 mb-2'><span className='sec-heading sec-underline'>Client Name:</span> {appointmentDetails?.client_name}</div>
        <div className='grid grid-cols-3 mb-2'><span className='sec-heading sec-underline'>Appointment Type:</span> {appointmentDetails?.appointment_type}</div>
        <div className='grid grid-cols-3 mb-2'><span className='sec-heading sec-underline'>Duration:</span> {appointmentDetails?.duration}</div>
        <div className='grid grid-cols-3 mb-2'><span className='sec-heading sec-underline'>Cost:</span> {appointmentDetails?.cost}</div>
        <div className='grid grid-cols-3 mb-2'><span className='sec-heading sec-underline'>Revenue:</span> {appointmentDetails?.revenue}</div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
