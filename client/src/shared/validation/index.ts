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
  charges: Yup.string()
    .required('Charges is required')
    .matches(
      /^(([a-zA-Z0-9 ](,)?)*)+$/,
      'The List must be separated by a comma and a space. Sample: Word1, Word2'
    ),
  pre_trial_restrictions: Yup.string().max(255),
  on_bail_postal_address: Yup.string().max(255),
  in_custody_location: Yup.string().max(255)
})

export const CourtAppearanceSchema = Yup.object().shape({
    date: Yup.string().required('This field is required'),
    next_court_date: Yup.string().required('This field is required'),
    time: Yup.string().required('This field is required'),
    court: Yup.string().max(255).nullable(),
    judicial_officer: Yup.string().max(255).nullable(),
    orders: Yup.string().max(255).nullable(),
    other_notes: Yup.string().max(255).nullable(),
})

export const EntryFormSchema = Yup.object().shape({
  description: Yup.string().max(255),
  date: Yup.date().required('Must be a valid date'),
  extension: Yup.string().max(255),
  type: Yup.string().max(255),
  hoursUnit: Yup.number().typeError('Hours/Unit must be a valid number'),
  ratePerHour: Yup.number(),
  amount: Yup.number()
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

export const GrantOfAidSchema = Yup.object().shape({
  extension: Yup.string().required('Extension is required'),
  date_effective: Yup.string().required('Date Effective is required'),
  codes: Yup.array(
    Yup.object({
      code: Yup.string().required('Code is required')
    })
  )
})

export const EditGrantOfAidSchema = Yup.object().shape({
  extension: Yup.string().required('Extension is required'),
  date_effective: Yup.string().required('Date Effective is required'),
  codes: Yup.array(
    Yup.object({
      id: Yup.string().required('Code is required')
    })
  )
})
