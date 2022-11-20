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
  client_name: Yup.string().required('Client name is required').max(255),
  matter_name: Yup.string().required('Matter name is required').max(255),
  email: Yup.string().email().label('Email').max(255),
  phone_number: Yup.string().max(255),
  postal_address: Yup.string().max(255),
  contribution: Yup.number().label('Contribution').typeError('Contribution must be a valid number'),
  court: Yup.string().max(255),
  charges: Yup.string().required('Charges is required').matches(/^(([a-zA-Z0-9 ](,)?)*)+$/, 'The List must be separated by a comma and a space. Sample: Word1, Word2'),
  pre_trial_restrictions: Yup.string().max(255),
  on_bail_postal_address: Yup.string().max(255),
  in_custody_location: Yup.string().max(255)
})

export const ProfileFormSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email().required().label('Email')
})

export const SecurityFormSchema = Yup.object().shape({
  current_password: Yup.string().required('Current password is required'),
  new_password: Yup.string()
    .required('Password is required')
    .min(9, 'Password length should be at least 9 characters')
    .max(15, 'Password cannot exceed more than 15 characters'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .max(15, 'Password cannot exceed more than 15 characters')
    .oneOf([Yup.ref('new_password')], 'Passwords do not match')
})
