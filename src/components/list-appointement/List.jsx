import React from 'react'
import { useState } from 'react'
import './List.css'
import { useDispatch, useSelector } from 'react-redux';
import { removeAppointment, clearAppointments, update_Appointment } from '../../features/appointments/appointmentSlice';

const List = () => {
    const [updateAppointment, setUpdateAppointment] = useState(null);

    const appointments = useSelector((state) => state.appointments.list);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(removeAppointment(id));
    }

    const handleClearAll = () => {
        dispatch(clearAppointments());
    }
    const handleUpdate = () => {
        dispatch(update_Appointment(updateAppointment));
        setUpdateAppointment(null);
    }

    const handleEdit = (id) => {
        const appointment = appointments.find(appointment => appointment.id === id);
        console.log(appointment);
        setUpdateAppointment(appointment);
    }

    return (
        <section>
            <h1>Appointment List</h1>
            <table>

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length !== 0 && appointments.map((appointment, idx) => (
                        <tr key={appointment.id}>
                            <td>{idx + 1}</td>
                            {updateAppointment && updateAppointment.id === appointment.id ? (
                                <>
                                    <td>
                                        <input type="text"
                                            value={updateAppointment.name}
                                            onChange={(e) => setUpdateAppointment({ ...updateAppointment, name: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input type="date"
                                            value={updateAppointment.date}
                                            onChange={(e) => setUpdateAppointment({ ...updateAppointment, date: e.target.value })} />
                                    </td>
                                    <td className='action-btns'>
                                        <button onClick={() => handleUpdate()}>save</button>
                                        <button onClick={() => setUpdateAppointment(null)}>Cancel</button>
                                    </td>
                                </>

                            ) : (
                                <>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.date}</td>
                                    <td className='action-btns'>
                                        <button onClick={() => handleDelete(appointment.id)}>Delete</button>
                                        <button onClick={() => handleEdit(appointment.id)}>Edit</button>
                                    </td>
                                </>

                            )}

                        </tr>
                    ))}



                </tbody>
            </table>

            <div className="clear-all-appointments">
                <button onClick={handleClearAll}>Clear All Appointments</button>
            </div>
        </section>
    )
}

export default List
