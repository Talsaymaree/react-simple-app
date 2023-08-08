import React from 'react'
import { CFormLabel, CFormInput, CButton } from '@coreui/react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

const AddUserForm = ({
  handleSubmit,
  control,
  setValue,
  selectedCountry,
  setSelectedCountry,
  handleAddUser,
}) => {
  const countries = [
    { value: 'Canada', label: 'Canada' },
    { value: 'USA', label: 'USA' },
  ]

  const cities = {
    Canada: [
      { value: 'Ottawa', label: 'Ottawa' },
      { value: 'Toronto', label: 'Toronto' },
    ],
    USA: [
      { value: 'Las Vegas', label: 'Las Vegas' },
      { value: 'Chicago', label: 'Chicago' },
    ],
  }

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption)
    setValue('country', selectedOption) // Update the form value for country
    setValue('city', null) // Reset the city value when the country changes
  }

  return (
    <form onSubmit={handleSubmit(handleAddUser)}>
      <div className="mb-3">
        <CFormLabel>Name</CFormLabel>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field, fieldState }) => <CFormInput {...field} invalid={fieldState.invalid} />}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Date of Birth</CFormLabel>
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{ required: 'Date of Birth is required' }}
          render={({ field, fieldState }) => (
            <CFormInput type="date" {...field} invalid={fieldState.invalid} />
          )}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Country</CFormLabel>
        <Controller
          name="country"
          control={control}
          rules={{ required: 'Country is required' }}
          render={({ field }) => (
            <Select
              options={countries}
              {...field}
              onChange={(selectedOption) => handleCountryChange(selectedOption)}
              isClearable
            />
          )}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>City</CFormLabel>
        <Controller
          name="city"
          control={control}
          rules={{ required: 'City is required' }}
          render={({ field }) => {
            const cityOptions = cities[selectedCountry?.value] || []
            return <Select options={cityOptions} {...field} isClearable />
          }}
        />
      </div>
      <CButton type="submit" color="primary">
        Add User
      </CButton>
    </form>
  )
}

AddUserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  selectedCountry: PropTypes.object,
  setSelectedCountry: PropTypes.func.isRequired,
  handleAddUser: PropTypes.func.isRequired,
}

export default AddUserForm
