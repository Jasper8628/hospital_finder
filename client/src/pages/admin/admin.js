import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import './admin.css'
function Admin() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    API.getUsers()
      .then(res => {
        const users = res.data.data
        console.log(users)
        setUsers(users);
      })
      .catch(err => console.log(err));
  }

  const deleteUser = (event) => {
    const data = {
      id: event.target.name
    };
    API.deleteUser({ data })
      .then(res => {
        console.log(res)
        getUsers();
      })
      .catch(err => console.log(err));
  }
  return (
    <div className='admin-container' >
      {users.length ? (
        <div className='patient-container' >
          {users.map((user, index) => (
            <div className='patient-card' key={index}>
              <div className='patient-header'>
                <h2>Name: {user._fieldsProto.name ? user._fieldsProto.name.stringValue : 'n/a'}</h2>
                <p>Age: {user._fieldsProto.age ? user._fieldsProto.age.stringValue : 'n/a'}</p>
                <p>Gender: {user._fieldsProto.gender ? user._fieldsProto.gender.stringValue : 'n/a'}</p>
                <p>Pain level: {user._fieldsProto.painLevel ? user._fieldsProto.painLevel.integerValue : 'n/a'}</p>
              </div>
              <div className='patient-body'>
                <ul>
                  <h4>Symptoms</h4>
                  {JSON.parse(user._fieldsProto.illnesses.stringValue).length ?
                    JSON.parse(user._fieldsProto.illnesses.stringValue).map((symptom, index) => (
                      <li key={index} >{symptom}</li>
                    )) : 'no symptoms reported'}
                </ul>
                <div className='bottom-container'>
                  <button
                    name={user._ref._path.segments[1]}
                    onClick={deleteUser}>
                    <span className='fas fa-trash-alt' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No users in the database</div>
      )}
    </div>
  )
}

export default Admin
