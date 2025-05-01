import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '../../features/appointments/appointmentSlice';
import './Add.css'

const Add = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const appointments = useSelector((state) => state.appointments.list);


    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const newAppointment = {
            id: Date.now(),
            ...data,
        };
        dispatch(addAppointment(newAppointment));
        reset();
        console.log('Appointment added:', newAppointment);
    };
    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        className={errors.name ? "input-error" : ""}
                        {...register("name", { required: "name is required" })} />

                </div>
                {errors.name && <p className="error">{errors.name.message}</p>}

                <div className="form-group">
                    <label htmlFor="date">Appointment Date:</label>
                    <input type="date"
                        className={errors.name ? "input-error" : ""}
                        {...register('date', { required: "Date is required" })} />
            
                </div>
                {errors.date && <p className="error">{errors.date.message}</p>}

                <button type="submit">Add Appointment</button>
            </form>
        </section>
    )
}

export default Add
