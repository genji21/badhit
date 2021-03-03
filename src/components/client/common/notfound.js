import React from 'react';
 import { Formik } from 'formik';
import {withRouter} from 'react-router-dom'
import * as Yup from 'yup';



const validationSchema= Yup.object().shape({ // Validate form field
  name: Yup.string()
      .required('Username is required')
      .min(5, 'Username must have min 5 characters')
      .max(10, 'Username have max 10 characters')
})
 const BasicExample = (props) => (
   
   <div>
     <h1>My Form</h1>
     <Formik
        validationSchema={validationSchema}
       initialValues={{ name: 'jared' }}
       onSubmit={(values, actions) => {
         setTimeout(() => {
           props.history.push("/products")
           console.log({...values})
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);
       }}
     >
       {props => (
         <form onSubmit={props.handleSubmit}>
           <input
             type="text"
             onChange={props.handleChange}
             onBlur={props.handleBlur}
             value={props.values.name}
             name="name"
           />
           {props.errors.name && <div id="feedback">{props.errors.name}</div>}
           <button type="submit">Submit</button>
         </form>
       )}
     </Formik>
   </div>
 );
 export default withRouter(BasicExample) 