import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Taskname is required'),
  info: Yup.string().required('Taskinfo is required'),
});
