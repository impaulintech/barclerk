import * as Yup from 'yup'

export const SignInFormSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required('Password is required')
})

export const ResetLinkSubmitFormSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email')
})

export const ForgotPasswordFormSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(9, 'Password length should be at least 9 characters')
    .max(15, 'Password cannot exceed more than 15 characters'),
  password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .max(15, 'Password cannot exceed more than 15 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
})

export const SignUpFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('Name is required')
    .min(2, 'Should have atleast 2 characters')
    .max(30, 'Should have max length of 30 characters'),
  last_name: Yup.string()
    .required('Name is required')
    .min(2, 'Should have atleast 2 characters')
    .max(30, 'Should have max length of 30 characters'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string()
    .required('Password is required')
    .min(9, 'Password length should be at least 9 characters')
    .max(15, 'Password cannot exceed more than 15 characters'),
  password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .max(15, 'Password cannot exceed more than 15 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
})

export const MatterFormSchema = Yup.object().shape({
  client_name: Yup.string().required('Client name is required'),
  matter_name: Yup.string().required('Matter name is required'),
  email: Yup.string().email().required().label('Email'),
  phone: Yup.string().required('Phone number is required'),
  postal_address: Yup.string().required('Postal Address is required'),
  contribution: Yup.string().label('Contribution'),
  court: Yup.string().required('Court is required'),
  charges: Yup.string().required('Charges is required'),
  pre_trial_restrictions: Yup.string(),
  on_bail_postal_address: Yup.string(),
  in_custody_location: Yup.string()
})
