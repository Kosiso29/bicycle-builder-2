'use client'

import { useEffect, useState } from 'react';
import FeaturedBuilds from "@/app/components/featured-builds";
import { useDispatch } from "react-redux";
import { builderActions } from "@/app/store/builder";

export default function FeaturedBuildsContainer({ builds }: { builds: any }) {
    const [gridNumber, setGridNumber] = useState(2);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(builderActions.updateloadingScreen(false));
    })

    return (
        <div className="pt-32 wrapper">
            <h1 className="flex justify-between items-center text-3xl font-bold">
                <span>
                    Featured Builds
                    <span className="text-2xl font-normal ml-1">({builds.filter((build: any) => build.name !== "None").length})</span>
                </span>
                <span className='flex gap-2 [&>span]:cursor-pointer'>
                    <span onClick={() => setGridNumber(2)}>
                        {
                            gridNumber === 2 ?
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="1.5" width="10" height="10" fill="#202020"/>
                                <rect x="13" y="1.5" width="10" height="10" fill="#202020"/>
                                <rect x="1" y="13.5" width="10" height="10" fill="#202020"/>
                                <rect x="13" y="13.5" width="10" height="10" fill="#202020"/>
                            </svg> :
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1.44531" y="1.5" width="10" height="10" fill="#CACACA"/>
                                <rect x="13.4453" y="1.5" width="10" height="10" fill="#CACACA"/>
                                <rect x="1.44531" y="13.5" width="10" height="10" fill="#CACACA"/>
                                <rect x="13.4453" y="13.5" width="10" height="10" fill="#CACACA"/>
                            </svg>
                        }
                    </span>
                    <span onClick={() => setGridNumber(3)}>
                        {
                            gridNumber === 3 ?
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1.35742" y="1.41226" width="5.83565" height="5.83565" fill="#202020"/>
                                <rect x="9.52734" y="1.41229" width="5.83565" height="5.83565" fill="#202020"/>
                                <rect x="17.697" y="1.41229" width="5.83565" height="5.83565" fill="#202020"/>
                                <rect x="1.35742" y="9.58218" width="5.83565" height="5.83565" fill="#202020"/>
                                <rect x="9.52734" y="9.58218" width="5.83565" height="5.83565" fill="#202020"/>
                                <rect x="17.697" y="9.58218" width="5.83565" height="5.83565" fill="#202020"/>
                                <rect x="1.35742" y="17.7521" width="5.83565" height="5.83565" fill="#202020"/>
                                <rect x="9.52734" y="17.7521" width="5.83565" height="5.83565" fill="#202020"/>
                                <rect x="17.697" y="17.7521" width="5.83565" height="5.83565" fill="#202020"/>
                            </svg> :
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.912109" y="1.41226" width="5.83565" height="5.83565" fill="#CACACA"/>
                                <rect x="9.08203" y="1.41229" width="5.83565" height="5.83565" fill="#CACACA"/>
                                <rect x="17.2517" y="1.41229" width="5.83565" height="5.83565" fill="#CACACA"/>
                                <rect x="0.912109" y="9.58218" width="5.83565" height="5.83565" fill="#CACACA"/>
                                <rect x="9.08203" y="9.58218" width="5.83565" height="5.83565" fill="#CACACA"/>
                                <rect x="17.2517" y="9.58218" width="5.83565" height="5.83565" fill="#CACACA"/>
                                <rect x="0.912109" y="17.7521" width="5.83565" height="5.83565" fill="#CACACA"/>
                                <rect x="9.08203" y="17.7521" width="5.83565" height="5.83565" fill="#CACACA"/>
                                <rect x="17.2517" y="17.7521" width="5.83565" height="5.83565" fill="#CACACA"/>
                            </svg>
                        }
                    </span>
                </span>
            </h1>
            <FeaturedBuilds builds={builds} gridNumber={gridNumber} />
        </div>
    )
}
