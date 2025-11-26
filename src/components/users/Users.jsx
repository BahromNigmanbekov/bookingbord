import React, { useEffect, useState } from 'react'
import "./users.css"
import { FaCheck } from "react-icons/fa";
import Modal from '../madal/Modal';
import api from '../../api/api';
import { deleteUsers, getUsers, putUsers } from '../../api/UsersData';
import { postUsers , } from '../../api/UsersData';
import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";

function Users() {
    const [data , setData] = useState([]);
    console.log(data);
    const [openMadal , setOpenMadal] = useState(false);
     const [openEditnMadal , setOpenEditMadal] = useState(false);
     const [editUserId, setEditUserId] = useState(null);

    const [name , setName] = useState("");
    const [age , setAge] = useState("");
    const [gender , setGender] = useState("");
    const [birthDate , setBirthDate] = useState("");

    const [EditName , setEditName] = useState("");
    const [EditAge , setEditAge] = useState("");
    const [EditGender , setEditGender] = useState("");
    const [EditBirthDate , setEditBirthDate] = useState("");
     useEffect(() => {
        getUsers().then(res => {
            if(res) setData(res);
        });
    }, []);

    
    function handleDelete(id){
        deleteUsers(id).then(res => {
            res ? getUsers().then( res => setData(res)): []
        })
    }


    function handleEditSumbmit(event) {
        event.preventDefault();

        console.log(event);
        

        let updatedUsers = {
            name: EditName,
            age: EditAge,
            gender: EditGender,
            birthDate: EditBirthDate
        };

         putUsers(editUserId, updatedUsers).then((res) => {
        if (res) getUsers().then((res) => setData(res));
    });

    }

   

    const renderData = (data) => {
        return data?.map((user, index) => {
            return(
                <ul className='ul_list' key={user.id}>
                    <div className='id'>Id : {index + 1}</div>
                    
                    <div className='user_card'>
                        <span className='user_ic'><FaUser /></span>
                    <p className='ism'>
                        {user.name} {user.lastName}
                    </p>
                    </div>
                    
                    <div className='time_card'>
                        <span className='time_ic'><IoTime /></span>
                        <p className='vaqt'>{user.age}</p>
                    </div>
                    

                    <p>{user.gender}</p>
                    

                    <div className='date_card'>
                        <span className='date_ic' ><FaCalendar /></span>
                        <p className='sana'>{user.birthDate}</p>
                    </div>

                    <div className='delete_td'>
                        <button className='btn_d' onClick={()=> handleDelete(user.id)}>Checked<FaCheck /></button>

                        <button className='btn_e' onClick={()=> {
                            setEditUserId(user.id);
                            setOpenEditMadal(true);
                            } }>Edit User<MdEdit />
                        </button>
                    </div>
                    <div className='edit_td'>
                        

                        <Modal isOpen={openEditnMadal} setIsOpen={setOpenEditMadal} >
                            <form action="" onSubmit={handleEditSumbmit} className='form-user'>
                                 <input
                     onChange={(event) => setEditName(event.target.value)}
                     value={EditName} 
                     type="text" 
                     placeholder='edit a name'  
                     name=''  
                     className='user-input'
                     required={true}
                     />


                    <input
                     onChange={(event) => setEditAge(event.target.value)}
                     value={EditAge}
                    type="time"
                    placeholder='edit time'
                    age='' 
                    className='user-input'
                    required={true}
                    />



                    <input
                     onChange={(event) => setEditBirthDate(event.target.value)}
                     type="date"
                     placeholder=' edit date'
                     birthdate='' 
                     className='user-input'
                     value={EditBirthDate}
                     required={true}
                        />


                        <button type="submit" className='edit-button'>edit user</button>
                            </form>

                        </Modal>
                    </div>
                </ul>
            )
        })
    }

    const handlSubmit = (e) => {
        e.preventDefault();

        let newUser = {
            name,
            age,
            gender,
            birthDate
        };

        postUsers(newUser).then( res => {
            if(res) getUsers().then((res) => setData(res));
        });
    }
    
    



  return (
    <>
        <section className='users'>
            <div className="">
                <button onClick={()=> setOpenMadal(true)} className='open'>open Madal</button>
                <Modal isOpen ={openMadal} setIsOpen={setOpenMadal}>
                    <form onSubmit={handlSubmit} action="" className='form-user'>
                    <input
                     onChange={(event) => setName(event.target.value)}
                     value={name} 
                     type="text" 
                     placeholder='enter a name'  
                     name=''  
                     className='user-input'
                     required={true}
                     />


                    <input
                     onChange={(event) => setAge(event.target.value)}
                     value={age}
                    type="time"
                    placeholder='enter time'
                    age='' 
                    className='user-input'
                    required={true}
                    />




                    <input
                     onChange={(event) => setBirthDate(event.target.value)}
                     type="date"
                     placeholder='enter date'
                     birthdate='' 
                     className='user-input'
                     value={birthDate}
                     required={true}
                        />

                        <br />
                    <button type='submit' className='add-button'>add user</button>
                    </form>
                </Modal>
            </div>
            
        <div>
            <ul>
            {renderData(data)}    
            </ul>
            
        </div>
                
            
        </section>
    </>
  )
}

export default Users
