import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // router
import "./users.css";
import { FaCheck } from "react-icons/fa";
import Modal from '../../components/madal/Modal';
import { deleteUsers, getUsers, putUsers, postUsers } from '../../api/UsersData';
import { MdEdit } from "react-icons/md";
import { FaUser, FaPlusCircle } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { Button, message, Space } from 'antd';

function Users() {

    const navigate = useNavigate();
    const [data , setData] = useState([]);
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

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");
        if (!loggedIn) navigate("/"); 
    }, [navigate]);

    useEffect(() => {
        getUsers().then(res => {
            if(res) setData(res);
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        navigate("/");
    }

       const handleDelete = (id) => {
        deleteUsers(id).then(res => {
            success('User checked successfully');
            if (res) getUsers().then(res => setData(res));
        })
        .catch(err => {
            error('Failed to check user');
        });
    }


     const success = (text) => {
    messageApi.open({
      type: 'success',
      content: 'User checked successfully',
    });
  };
  const error = (text) => {
    messageApi.open({
      type: 'error',
      content: 'User not checked successfully',
    });
  };

    const handleEditSumbmit = (event) => {
        event.preventDefault();

        let updatedUsers = {
            name: EditName,
            age: EditAge,
            gender: EditGender,
            birthDate: EditBirthDate
        };

        putUsers(editUserId, updatedUsers).then((res) => {
            if (res) getUsers().then((res) => setData(res));
            setOpenEditMadal(false);
        });
    }

    const renderData = (data) => {
        return data?.map((user, index) => (
            <ul className='ul_list' key={user.id}>

               

                <div className='user_card'>
                    <span className='user_ic'><FaUser /></span>
                    <p className='ism'>{user.name}</p>
                </div>

                <div className='time_card'>
                    <span className='time_ic'><IoTime /></span>
                    <p className='vaqt'>{user.age}</p>
                </div>

                <p>{user.gender}</p>

                <div className='date_card'>
                    <span className='date_ic'><FaCalendar /></span>
                    <p className='sana'>{user.birthDate}</p>
                </div>

                <div className='delete_td'>
                    <button className='btn_d' onClick={() => handleDelete(user.id)}>
                        Checked <FaCheck />
                    </button>

                    <button
                        className='btn_e'
                        onClick={() => {
                            setEditUserId(user.id);
                            setEditName(user.name);
                            setEditAge(user.age);
                            setEditBirthDate(user.birthDate);
                            setOpenEditMadal(true);
                        }}
                    >
                        Edit User <MdEdit />
                    </button>
                </div>

            </ul>
        ));
    };


    const handlSubmit = (e) => {
        e.preventDefault();

        let newUser = { name, age, gender, birthDate };

        postUsers(newUser).then(res => {
            if(res) getUsers().then((res) => setData(res));
        });
    }

    return (
        <>
            {contextHolder}
            <section className='users'>
                <div className="">
                    <div className="just_btn">
                        <button onClick={()=> setOpenMadal(true)} className='open'>
                            Add User <FaPlusCircle />
                        </button>
                        <button onClick={handleLogout} className='logout-btn'>
                            Exit <ImExit />
                        </button>
                    </div>

                    {/* ADD USER MODAL */}
                    <Modal isOpen={openMadal} setIsOpen={setOpenMadal}>
                        <form onSubmit={handlSubmit} className='form-user'>
                            <input
                                onChange={(event) => setName(event.target.value)}
                                value={name}
                                type="text"
                                placeholder='enter a name'
                                className='user-input'
                                required
                            />
                            <input
                                onChange={(event) => setAge(event.target.value)}
                                value={age}
                                type="time"
                                placeholder='enter time'
                                className='user-input'
                                required
                            />
                            <input
                                onChange={(event) => setBirthDate(event.target.value)}
                                value={birthDate}
                                type="date"
                                placeholder='enter date'
                                className='user-input'
                                required
                            />
                            <br />
                            <button type='submit' className='add-button'>add user</button>
                        </form>
                    </Modal>

                </div>

                {/* 🟡 EDIT USER MODAL — to‘g‘ri joyi shu */}
                <Modal isOpen={openEditnMadal} setIsOpen={setOpenEditMadal}>
                    <form onSubmit={handleEditSumbmit} className='form-user'>

                        <input
                            onChange={(e) => setEditName(e.target.value)}
                            value={EditName}
                            type="text"
                            placeholder='edit name'
                            className='user-input'
                            required
                        />

                        <input
                            onChange={(e) => setEditAge(e.target.value)}
                            value={EditAge}
                            type="time"
                            placeholder='edit time'
                            className='user-input'
                            required
                        />

                        <input
                            onChange={(e) => setEditBirthDate(e.target.value)}
                            value={EditBirthDate}
                            type="date"
                            placeholder='edit date'
                            className='user-input'
                            required
                        />

                        <button type='submit' className='edi_user'>edit user</button>
                    </form>
                </Modal>

                <div>
                    <ul>
                        {renderData(data)}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Users;
