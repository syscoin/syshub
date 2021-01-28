import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { withTranslation } from "react-i18next";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .matches(
      /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
      "Must include lower, upper, number, special characters and a min length of 8"
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords does not match")
    .required("You have to confirm your password"),
});

/**
 * Component that shows the inside of the add admin modal
 * @component
 * @subcategory admin
 * @param {*} t t prop received from withTranslation
 * @param {*} onAddAdmin function to add a new admin
 * @example
 * const onAddAdmin = () => {}
 * return (
 *  <UsersAddModal onAddAdmin={onAddAdmin} />
 * )
 */
const UsersAddModal = ({ t, onAddAdmin }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  
  return (
    <>
      <h3>{t("admin.users.modal.title")}</h3>
      <div className="input-form">
        <form onSubmit={handleSubmit(onAddAdmin)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="styled"
              name="email"
              type="email"
              id="email"
              ref={register}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <small>
                  <p style={{ lineHeight: "1.5" }}>{message}</p>
                </small>
              )}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="styled"
              name="name"
              type="text"
              id="name"
              ref={register}
            />
            <small>
              <p style={{ lineHeight: "1.5" }}>
                This is a name just used in the database.
              </p>
            </small>
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <small>
                  <p style={{ lineHeight: "1.5" }}>{message}</p>
                </small>
              )}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="styled"
              name="password"
              type="password"
              id="password"
              ref={register}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <small>
                  <p style={{ lineHeight: "1.5" }}>{message}</p>
                </small>
              )}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm the password</label>
            <input
              className="styled"
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              ref={register}
            />
            <ErrorMessage
              errors={errors}
              name="confirmPassword"
              render={({ message }) => (
                <small>
                  <p style={{ lineHeight: "1.5" }}>{message}</p>
                </small>
              )}
            />
          </div>
          <small>
            <p style={{ lineHeight: "1.5" }}>
              WARNING: this user will be created as an account with admin
              privileges.
            </p>
          </small>
          <div className="btn-group text-center">
            <button className="btn btn--blue" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default withTranslation()(UsersAddModal);
