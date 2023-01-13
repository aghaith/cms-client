import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AxiosResponse } from 'axios';
import { userSignUp } from "api/services/auth.services";
import { RegisterUser } from "interfaces/auth.model";
import { AxiosError } from 'interfaces/errors.model';
import * as ROUTES from 'constants/routes';

const Register = () => {

    let navigate = useNavigate();

    const [gender, setGender] = useState<string>('m');

    const onGenderChange = (event: any) => {
        setGender(event.target.value)
    }

    const { formState: { errors }, register, watch, control, handleSubmit } = useForm<RegisterUser>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            gender: gender
        }
    });

    const signupFunc = useMutation(userSignUp, {
        async onSuccess(response: AxiosResponse) {
            toast.success(response.data.message);
            setTimeout(() => {
                navigate(ROUTES.LOGIN)
            }, 2000);
        },
        onError(error: AxiosError<{ error: string }>) {
            toast.error(error.response?.data.error);
        },
    });
    
    const onSubmit = (data:RegisterUser) => {
        let body = data;
        body = {
            ...body,
            gender: gender
        }
        signupFunc.mutate(body);
    }

    const signUpForm = () => (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-sm">
                    <div className="form-group">
                        <label className="text-muted">
                            Full Name <span className="text_danger"> *</span>
                        </label>
                        <input
                            {...register('fullname', {
                                required: {
                                    value: true,
                                    message: "Full name is required!"
                                }
                            })}
                            type="text"
                            className="form-control"
                            style={{
                                borderColor: !errors.fullname ? '' : 'red'
                            }}
                            name="fullname"
                        />
                        {errors["fullname"] && (
                            <p className="text_danger">{errors["fullname"].message as string}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Email <span className="text_danger"> *</span>
                        </label>
                        <input
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: "Email is required!"
                                },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            className="form-control"
                            style={{
                                borderColor: !errors.email ? '' : 'red'
                            }}
                            name="email"
                        />
                        {errors["email"] && (
                            <p className="text_danger">{errors["email"].message as string}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <Controller
                            control={control}
                            name="gender"
                            render={() => (
                                <>
                                    <label className="checkbox-inline">
                                        <input
                                            id="genderM"
                                            name="option"
                                            onChange={onGenderChange}
                                            checked={gender === 'm'}
                                            type="radio"
                                            value="m"
                                        />
                                        <label
                                            className="text-black ms-2"
                                            htmlFor="genderM"
                                        >
                                            Male
                                        </label>
                                    </label>
                                    <label className="checkbox-inline ms-3">
                                        <input
                                            id="genderF"
                                            name="option"
                                            onChange={onGenderChange}
                                            checked={gender === 'f'}
                                            type="radio"
                                            value="f"
                                        />
                                        <label
                                            className="text-black ms-2"
                                            htmlFor="genderF"
                                        >
                                            Female
                                        </label>
                                    </label>
                                </>
                            )}
                        />
                        {errors["gender"] && (
                            <p className="text_danger">Gender is required</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Country <span className="text_danger"> *</span>
                        </label>
                        <input
                            {...register('country', {
                                required: {
                                    value: true,
                                    message: "Country is required!"
                                }
                            })}
                            type="text"
                            className="form-control"
                            style={{
                                borderColor: !errors.country ? '' : 'red'
                            }}
                            name="country"
                        />
                        {errors["country"] && (
                            <p className="text_danger">{errors["country"].message as string}</p>
                        )}
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group">
                        <label className="text-muted">
                            Company <span className="text_danger"> *</span>
                        </label>
                        <input
                            {...register('company', {
                                required: {
                                    value: true,
                                    message: "Company is required!"
                                }
                            })}
                            type="text"
                            className="form-control"
                            style={{
                                borderColor: !errors.company ? '' : 'red'
                            }}
                            name="company"
                        />
                        {errors["company"] && (
                            <p className="text_danger">{errors["company"].message as string}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Password <span className="text_danger"> *</span>
                        </label>
                        <input
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required!"
                                },
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                                    message: 'Wrong password security criteria'
                                }
                            })}
                            style={{
                                borderColor: !errors.password ? '' : 'red'
                            }}
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                        {errors["password"] && (
                            <p className="text_danger">{errors["password"].message as string}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Confirm Password <span className="text_danger"> *</span>
                        </label>
                        <input
                            {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: "Confirm Password is required!"
                                },
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                                    message: 'Wrong password security criteria'
                                },
                                validate: (val: string | undefined) => {
                                    if (watch('password') !== val) {
                                        return "Your passwords do no match";
                                    }
                                }
                            })}
                            style={{
                                borderColor: !errors.confirmPassword ? '' : 'red'
                            }}
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                        />
                        {errors["confirmPassword"] && (
                            <p className="text_danger">{errors["confirmPassword"].message as string}</p>
                        )}
                    </div>
                </div>
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
        </form>
    )

    return (
        <section className="container">
            <ToastContainer />
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            {signUpForm()}
            <p className="my-1">
                Already have an account? <Link to={ROUTES.LOGIN}>Signin</Link>
            </p>
        </section>
    )
}

export default Register;