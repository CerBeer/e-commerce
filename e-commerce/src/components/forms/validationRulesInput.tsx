import * as yup from 'yup';

// LOGIN FORM VALID
export const ValidationSchemaInputLogin = yup
  .object({
    email: yup
      .string()
      .test(
        'no-spaces',
        'Email must not contain spaces',
        (value) => !/\s/.test(value || '')
      )
      .email('Email must be properly formatted (e.g., example@email.com)')
      // .trim('Email must not contain leading or trailing whitespace') // если изменят требования на удаление пробелов - пусть побудет здесь
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one digit')
      .trim('Password must not contain leading or trailing whitespace')
      .required('Password is required'),
  })
  .required();

// REGISTER FORM VALID

// Age - Issue RSS-ECOMM-2_09: - Date of birth
const minimumAge = 13;
const today = new Date();
const minimumDateOfBirth = new Date(
  today.getFullYear() - minimumAge,
  today.getMonth(),
  today.getDate()
);

export const ValidationSchemaInputRegister = yup
  .object({
    email: yup
      .string() // RSS-ECOMM-2_01
      .required('Email is required')
      .test(
        'no-spaces',
        'Email must not contain spaces',
        (value) => !/\s/.test(value || '')
      )
      .email('Email must be properly formatted (e.g., example@email.com)'),
    // .trim('Email must not contain leading or trailing whitespace') // если изменят требования на удаление пробелов - пусть побудет здесь
    password: yup
      .string() // RSS-ECOMM-2_01
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one digit')
      .trim('Password must not contain leading or trailing whitespace'),
    firstName: yup
      .string() // RSS-ECOMM-2_09:
      .required('First name is required')
      .matches(
        /^[A-Za-z]+$/,
        'First name must contain at least one character and no special characters or numbers'
      ),
    lastName: yup
      .string() // RSS-ECOMM-2_09:
      .required('Last name is required')
      .matches(
        /^[A-Za-z]+$/,
        'Last name must contain at least one character and no special characters or numbers'
      ),
    dateOfBirth: yup
      .date() // RSS-ECOMM-2_09:
      .max(minimumDateOfBirth, 'You must be at least 13 years old')
      .required('Date of birth is required'),
    address: yup
      .object({
        // RSS-ECOMM-2_09:
        street: yup.string().required('Street is required'),
        city: yup
          .string() // RSS-ECOMM-2_09:
          .required('City is required')
          .matches(
            /^[A-Za-z\s]+$/,
            'City must contain at least one character and no special characters or numbers'
          ),
        postalCode: yup
          .string() // RSS-ECOMM-2_09: ?????????????????????????????????? 12345 или A1B 2C3 для США и Канады
          .required('Postal code is required')
          .matches(
            /^\d{5}(-\d{4})?$/,
            'Postal code must follow the format for the country'
          ),
        country: yup
          .string() // RSS-ECOMM-2_09: из предопределенного списка или поля автозаполнения. e-commerce - setting project - area
          .required('Country is required')
          .oneOf(
            ['USA', 'Canada', 'Mexico'], // e-commerce - setting project - area
            'Must be a valid country from the predefined list'
          ),
      })
      .required('Address is required'),
  })
  .required();

export const placeholder = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'example@email.com',
  dateOfBirth: minimumDateOfBirth,
};

export type FormDataRegister = yup.InferType<
  typeof ValidationSchemaInputRegister
>;
export type FormDataLogin = yup.InferType<typeof ValidationSchemaInputLogin>;
