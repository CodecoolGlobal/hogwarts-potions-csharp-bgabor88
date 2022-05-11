import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useStudentActions } from "../../_actions/student.actions";

export default function LoginArea(props) {
  const studentActions = useStudentActions();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("e-Mail is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  const onSubmit = ({ email, password }) => {
    return studentActions.login(email, password).catch((error) => {
      setError("apiError", { message: error });
    });
  };

  return (
    <div className="my-login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            placeholder="e-Mail..."
            name="email"
            type="email"
            {...register("email")}
            className={`mt-2 form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="form-group">
          <input
            placeholder="Password..."
            name="password"
            type="password"
            {...register("password")}
            className={`mt-2 form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="d-flex flex-column justify-content-between flex-nowrap">
          <button disabled={isSubmitting} className="btn btn-primary p-2 m-2 mt-4">
            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Login
          </button>
        </div>
        {errors.apiError && <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>}
      </form>
    </div>
  );
}
