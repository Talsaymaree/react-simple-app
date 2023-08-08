import React from 'react'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CFormInput,
} from '@coreui/react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const UserTable = ({ users, handleEditUser, handleDeleteUser, handleSaveUser, editableUser }) => {
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

  return (
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
                  onChange={(e) => handleEditUser({ ...editableUser, name: e.target.value })}
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
                  onChange={(e) => handleEditUser({ ...editableUser, dateOfBirth: e.target.value })}
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
                  onChange={(selectedOption) => {
                    handleEditUser({ ...editableUser, country: selectedOption, city: null })
                  }}
                  isClea
                  isClearable
                />
              ) : (
                user.country?.label
              )}
            </CTableDataCell>
            <CTableDataCell>
              {editableUser?.id === user.id ? (
                <Select
                  options={cities[editableUser?.country?.value] || []}
                  value={editableUser.city}
                  onChange={(selectedOption) =>
                    handleEditUser({ ...editableUser, city: selectedOption })
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
                  <CButton size="sm" color="success" onClick={() => handleSaveUser(editableUser)}>
                    Save
                  </CButton>
                  <CButton size="sm" color="danger" onClick={() => handleEditUser(null)}>
                    Cancel
                  </CButton>
                </>
              ) : (
                <>
                  <CButton
                    size="sm"
                    color="info"
                    className="mr-4"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </CButton>
                  <CButton size="sm" color="danger" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </CButton>
                </>
              )}
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  handleSaveUser: PropTypes.func.isRequired,
  editableUser: PropTypes.object,
  userSelectedCountry: PropTypes.object,
}

export default UserTable
