/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
'use client'

import React, { useEffect } from 'react';
import NavLink from "./nav-link";
import Image from "next/image";
import { DashboardOutlined, ExtensionOutlined, GroupOutlined, GroupAddOutlined, LogoutOutlined } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { componentsActions } from "../store/components";
import Logo from '@/app/components/logo';

const sideBarData = [
    { name: "DASHBOARD", href: "/dashboard", icon: DashboardOutlined },
    { name: "COMPONENTS", href: "/dashboard/components", icon: ExtensionOutlined },
    { name: "USERS", href: "/dashboard/users", icon: GroupAddOutlined },
    { name: "CUSTOMERS", href: "/dashboard/customers", icon: GroupOutlined },
]

export default function Sidebar({ models, categories, brands, presets, builds, modelsPresets, colorsPresets, colors, accessories, accessoryModels, buildsAndModelsBuilds, products, productTypes }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(componentsActions.updateModels(models));
        dispatch(componentsActions.updateCategories(categories));
        dispatch(componentsActions.updateBrands(brands));
        dispatch(componentsActions.updatePresets(presets));
        dispatch(componentsActions.updateBuilds(builds));
        dispatch(componentsActions.updateModelsPresets(modelsPresets));
        dispatch(componentsActions.updateColorsPresets(colorsPresets));
        dispatch(componentsActions.updateColors(colors));
        dispatch(componentsActions.updateAccessories(accessories));
        dispatch(componentsActions.updateAccessoryModels(accessoryModels));
        dispatch(componentsActions.updateBuildsAndModelsBuilds(buildsAndModelsBuilds));
        dispatch(componentsActions.updateProducts(products));
        dispatch(componentsActions.updateProductTypes(productTypes));
    }, [])
    return (
        <div className='flex flex-col justify-between py-12 h-full'>
            <div className='max-w-[80%] mx-auto'>
                <Logo />
            </div>
            <div className='flex flex-col gap-8 items-center'>
                {
                    sideBarData.map(data => {
                        const Icon = data.icon;
                        return (
                            <NavLink key={data.name} href={data.href}>
                                <Icon width={20} height={20} />
                                {data.name}
                            </NavLink>
                        )
                    })
                }
            </div>
            <div className="flex w-full justify-center items-center">
                <NavLink type='submit'>
                    <LogoutOutlined width={60} height={60} />
                    LOGOUT
                </NavLink>
            </div>
        </div>
    )
}
