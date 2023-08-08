import React, { useState, useEffect } from 'react'
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { useForm, FormProvider } from 'react-hook-form'
import UserTable from '../../components/UserTable'
import AddUserForm from '../../components/AddUserForm'
import db from '../../components/firebaseConfig' // Import the Firebase configuration

const Dashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const methods = useForm()
  const { handleSubmit, setValue } = methods
  const [users, setUsers] = useState([])

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
    const dbRef = db.ref(`Users/${editedUser.id}`)
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
    const dbRef = db.ref(`Users/${userId}`)
    dbRef.remove()
  }

  return (
    <FormProvider {...methods}>
      <>
        <CContainer className="py-5">
          <CRow>
            <CCol md="13">
              <CCard md="5">
                <CCardHeader>Users</CCardHeader>
                <CCardBody>
                  <UserTable
                    users={users}
                    editableUser={editableUser}
                    handleEditUser={handleEditUser}
                    handleSaveUser={handleSaveUser}
                    handleDeleteUser={handleDeleteUser}
                    setValue={setValue}
                  />
                </CCardBody>
              </CCard>
              <CCard>
                <CCardHeader>Add User</CCardHeader>
                <CCardBody>
                  <AddUserForm
                    handleSubmit={handleSubmit}
                    handleAddUser={handleAddUser}
                    setValue={setValue}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </>
    </FormProvider>
  )
}

export default Dashboard
