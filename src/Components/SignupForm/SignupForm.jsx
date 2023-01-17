import './SignupForm.css'
import { Formik, Form,Field, ErrorMessage } from 'formik';

import {SignupFormValidation} from './SignupFormValidation'

export function SignupForm() {
    return ( 
    <>
    <div className='signup'>
    <div className='signup-title'>Форма регистрации</div>
           <Formik
         initialValues={{
           email:  "",
           group: "",
           password: ""
         }}
         validationSchema={SignupFormValidation}
         onSubmit={(values) => {
          console.log(values)
         }}
       >
         <Form className='signup-form'>
         <label className='signup-form__label' htmlFor="email">Электронная почта</label>
         <Field placeholder='Электронная почта' className='signup-form__input' name="email" type="text" />
         <ErrorMessage name="email" />
 
         <label className='signup-form__label' htmlFor="group">Группа</label>
         <Field placeholder='sm9' className='signup-form__input' name="group" type="text" />
         <ErrorMessage name="group" />
 
         <label className='signup-form__label' htmlFor="password">Пароль</label>
         <Field placeholder='Должен содержать от 4 до 8 чисел' className='signup-form__input' name="password" type="password" />
         <ErrorMessage name="password" />
 
         <button className='signup-form__button' type="submit">Регистрация</button>
         </Form>
       </Formik>
    </div>
    </>
     );
}

