import React from 'react';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

const formSchema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
});

export default function RegisterForm(props) {

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema)
  });
  const onSubmit = data => {
    props.onRegister(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" name="firstName" ref={register} />
      <p>{errors.firstName ? 'error en el nombre': ''}</p>
        
      <input type="text" name="age" ref={register} />
      <p>{errors.age ? 'error en la edad': ''}</p>
      
      <input type="submit" />
    </form>
  );
}
