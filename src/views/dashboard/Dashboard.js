import React, { useState, useEffect } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CFormLabel,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

const Dashboard = () => {
  const { handleSubmit, control, setValue } = useForm()
  const [users, setUsers] = useState([])
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

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

  const config = {
    apiKey: 'AIzaSyCZUd6A8AQAXV_WHQ83TlTFgVELWsQCafA',
    authDomain: 'simple-react-app-99fa8.firebaseapp.com',
    databaseURL: 'https://simple-react-app-99fa8-default-rtdb.firebaseio.com',
    projectId: 'simple-react-app-99fa8',
    storageBucket: 'simple-react-app-99fa8.appspot.com',
    messagingSenderId: '310625271477',
    appId: '1:310625271477:web:3af03390597c10adfbc8fc',
    measurementId: 'G-3FCW474E10',
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }

  const db = firebase.database()

  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    // Listen for changes to the selected country value
    // and update the city field value accordingly
    setValue('city', null) // Reset the city value
  }, [selectedCountry])

  useEffect(() => {
    handleFetchUsers() // Fetch users from Firebase when the component mounts.
  }, [])

  const handleFetchUsers = () => {
    const dbRef = db.ref('Users') // Use the Firebase Realtime Database instance.
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const userArray = Object.entries(data).map(([id, user]) => ({ id, ...user }))
        setUsers(userArray)
      } else {
        setUsers([])
      }
    })
  }

  const handleAddUser = (data) => {
    const dbRef = db.ref('Users') // Use the Firebase Realtime Database instance.
    dbRef.push(data)
    setValue('name', '')
    setValue('dateOfBirth', '')
    setValue('country', null)
    setValue('city', null)
  }

  const [editableUser, setEditableUser] = useState(null)

  const handleEditUser = (user) => {
    setEditableUser(user)
  }

  const handleSaveUser = (editedUser) => {
    handleEditUser(null) // Clear the editableUser state to exit edit mode
    const dbRef = firebase.database().ref(`Users/${editedUser.id}`)
    dbRef
      .update(editedUser)
      .then(() => {
        console.log('User updated successfully!')
      })
      .catch((error) => {
        console.error('Error updating user:', error)
      })
  }

  const handleDeleteUser = (userId) => {
    const dbRef = firebase.database().ref(`Users/${userId}`)
    dbRef.remove()
  }

  return (
    <>
      <CContainer className="py-5">
        <CRow>
          <CCol md="13">
            <CCard md="5">
              <CCardHeader>Users</CCardHeader>
              <CCardBody>
                <CTable responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Date of Birth</CTableHeaderCell>
                      <CTableHeaderCell>Country</CTableHeaderCell>
                      <CTableHeaderCell>City</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {users.map((user) => (
                      <CTableRow key={user.id}>
                        <CTableDataCell>
                          {editableUser?.id === user.id ? (
                            <CFormInput
                              value={editableUser.name}
                              onChange={(e) =>
                                setEditableUser({ ...editableUser, name: e.target.value })
                              }
                            />
                          ) : (
                            user.name
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {editableUser?.id === user.id ? (
                            <CFormInput
                              type="date"
                              value={editableUser.dateOfBirth}
                              onChange={(e) =>
                                setEditableUser({ ...editableUser, dateOfBirth: e.target.value })
                              }
                            />
                          ) : (
                            user.dateOfBirth
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {editableUser?.id === user.id ? (
                            <Select
                              options={countries}
                              value={editableUser.country}
                              onChange={(selectedOption) =>
                                setEditableUser({ ...editableUser, country: selectedOption })
                              }
                              isClearable
                            />
                          ) : (
                            user.country?.label
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {editableUser?.id === user.id ? (
                            <Select
                              options={cities[editableUser.country?.value] || []}
                              value={editableUser.city}
                              onChange={(selectedOption) =>
                                setEditableUser({ ...editableUser, city: selectedOption })
                              }
                              isClearable
                            />
                          ) : (
                            user.city?.label
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {editableUser?.id === user.id ? (
                            <>
                              <CButton
                                size="sm"
                                color="success"
                                onClick={() => handleSaveUser(editableUser)}
                              >
                                Save
                              </CButton>
                              <CButton
                                size="sm"
                                color="danger"
                                onClick={() => setEditableUser(null)}
                              >
                                Cancel
                              </CButton>
                            </>
                          ) : (
                            <CButton
                              size="sm"
                              color="info"
                              className="mr-4"
                              onClick={() => handleEditUser(user)}
                            >
                              Edit
                            </CButton>
                          )}
                          <CButton
                            size="sm"
                            color="danger"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
            <CCard>
              <CCardHeader>Add User</CCardHeader>
              <CCardBody>
                <form onSubmit={handleSubmit(handleAddUser)}>
                  <div className="mb-3">
                    <CFormLabel>Name</CFormLabel>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: 'Name is required' }}
                      render={({ field, fieldState }) => (
                        <CFormInput {...field} invalid={fieldState.invalid} />
                      )}
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
                      render={({ field }) => {
                        setSelectedCountry(field.value) // Update selectedCountry state
                        return <Select options={countries} {...field} isClearable />
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>City</CFormLabel>
                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: 'City is required' }}
                      render={({ field }) => {
                        const cityOptions = cities[selectedCountry?.value] || [] // Use selectedCountry from state
                        return <Select options={cityOptions} {...field} isClearable />
                      }}
                    />
                  </div>
                  <CButton type="submit" color="primary">
                    Add User
                  </CButton>
                </form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Dashboard
