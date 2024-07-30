'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { AccountCircleOutlined } from "@mui/icons-material";
import { authActions } from "@/app/store/auth";
import { usersActions } from "@/app/store/users";
import { useSearchParams } from "next/navigation";

export default function Topbar({ users }: { users: any }) {
    const userEmailRedux = useSelector((state: any) => state.authReducer.userEmail);

    const dispatch = useDispatch();

    const searchParams = useSearchParams();
    const userEmail = searchParams.get("email");

    useEffect(() => {
        if (userEmail) {
            dispatch(authActions.updateUserEmail(userEmail));
            dispatch(usersActions.updateUsers(users));
            dispatch(authActions.updateUser(users.filter((user: any) => user.email === userEmail)?.[0]));
        }
    }, [userEmail, dispatch, users])

    return (
        <div className='flex justify-end py-5'>
            <p className='flex items-center gap-2 text-primary bg-white p-2 rounded-lg'><AccountCircleOutlined />  { userEmail || userEmailRedux }</p>
        </div>
    )
}
