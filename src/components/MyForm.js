import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const MyForm = ({ handleSubmited }) => {
    const [local_data, setLocalData] = useState(JSON.parse(localStorage.getItem('local_data')));
    const [form_type, setFormType] = useState(true);

    useEffect(() => {
        console.log(form_type);
    }, [form_type]);

    const submitData = (val) => {
        if (Array.isArray(local_data)) {
            localStorage.setItem('local_data', JSON.stringify([...local_data, val]));
            setLocalData([...local_data, val]);
        } else {
            localStorage.setItem('local_data', JSON.stringify([val]));
            setLocalData([val]);
        }
        handleSubmited(true);
    };
    return (
        <div>
            <div>
                <div className='form-header'>
                    <h2> Registration Form </h2>
                    <a href="#!" className='header-link' onClick={() => {handleSubmited(true)}}>View Table</a>
                </div>
                <div className='link-box'>
                    <a href="#!" className={`tab-link ${form_type && "active"}`} onClick={() => {setFormType(true)}}>
                        student
                    </a>
                    <a href="#!" className={`tab-link ${!form_type && "active"}`} onClick={() => {setFormType(false)}}>
                        faculty
                    </a>
                </div>
            </div>
                <Formik
                    enableReinitialize
                    initialValues={{ fullName: "", email: "", password: "", userName: "", branch: "", gender: "" }}
                    validationSchema={Yup.object({
                        fullName: Yup.string().required("full name is required."),
                        userName: Yup.string().required("user name is required."),
                        email: Yup.string().required("email is required."),
                        password: Yup.string().required("password is required.").min(8, "password must be 8 char long."),
                    })}
                    onSubmit={submitData}
                >
                    {({ values, handleSubmit, errors, handleChange, handleBlur }) =>
                        <Form onSubmit={handleSubmit} className="custom-form-wrap">
                            <div className="custom-form">
                            <div className='filed-box'>
                                <label htmlFor="fullname" > Full Name : </label>
                                <div className="field"><Field id="fullname" type="text" name="fullName" />
                                    <span style={{ color: "red" }}>{errors.fullName}</span>
                                </div>
                            </div>
                            <div className='filed-box'>
                                <label htmlFor="email" > Email : </label>
                                <div className="field"><Field id="email" type="text" name="email" />
                                <span style={{ color: "red" }}>{errors.email}</span></div>
                            </div>
                            <div className='filed-box'>
                                <label htmlFor="Password" > Password : </label>
                                <div className="field"><Field type="password" id="password" name="password" />
                                <span style={{ color: "red" }}>{errors.password}</span></div>
                            </div>
                            {form_type && <>
                            <div className='filed-box'>
                                <label htmlFor="userName" > User Name : </label>
                                <div className="field"><Field type="text" id="userName" name="userName" />
                                <span style={{ color: "red" }}>{errors.userName}</span></div>
                            </div>
                            <div className='filed-box'>
                                <label htmlFor="branch" > Branch : </label>
                                <select id="branch" name="branch" value={values.branch} onChange={handleChange} onBlur={handleBlur} >
                                    <option value="">Select branch</option>
                                    <option value="one">One</option>
                                    <option value="two">Two</option>
                                </select>
                                <span style={{ color: "red" }}>{errors.branch}</span>
                            </div>
                            </>
                            }
                            <div className='filed-box'>
                                <label > Gender : </label>
                                <div className='radio-group'>
                                    <div>
                                        <Field type="radio" name="gender" value="male" />
                                        <label htmlFor='gender'> Male : </label>
                                    </div>
                                    <div>
                                        <Field type="radio" name="gender" value="female" />
                                        <label htmlFor='gender'> Female : </label>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <button className='btn' type='submit' >Submit</button>
                        </Form>
                    }
                </Formik>
        </div>
    )
}

export default MyForm