'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { AccountCircleOutlined } from "@mui/icons-material";
import { authActions } from "@/app/store/auth";
import { usersActions } from "@/app/store/users";
import { useSearchParams } from "next/navigation";

export default function Topbar({ users }: { users: any }) {
    const [userEmail, setUserEmail] = useState("");

    const dispatch = useDispatch();

    const searchParams = useSearchParams();
    const userEmailLogin = searchParams.get("email");

    useEffect(() => {
        if (userEmailLogin) {
            localStorage.setItem("email", userEmailLogin);
            dispatch(usersActions.updateUsers(users));
            dispatch(authActions.updateUser(users.filter((user: any) => user.email === userEmailLogin)?.[0]));
            setUserEmail(userEmailLogin);
        } else if (localStorage.getItem("email")) {
            const userEmailLocalStorage = localStorage.getItem("email");
            if (userEmailLocalStorage) {
                setUserEmail(userEmailLocalStorage);
                dispatch(authActions.updateUser(users.filter((user: any) => user.email === userEmailLocalStorage)?.[0]));
            }
            dispatch(usersActions.updateUsers(users));
        }
    }, [userEmailLogin, dispatch, users])

    return (
        <div className='flex justify-end py-5'>
            <p className='flex items-center gap-2 text-primary bg-white p-2 rounded-lg'><AccountCircleOutlined />  { userEmail }</p>
        </div>
    )
}
