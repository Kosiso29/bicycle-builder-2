'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectionTabs from "@/app/components/selection-tabs";
import Accessory from "@/app/components/accessory";
import Inventory from "@/app/components/inventory";

export default function Components() {
    const [tabSelectionState, setTabSelectionState] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("tab") === "accessory") {
            setTabSelectionState("accessory");
        } else {
            setTabSelectionState("inventory");
        }
    }, [searchParams])

    useEffect(() => {
        const params = new URLSearchParams();
        if (tabSelectionState === "accessory") {
            params.set("tab", "accessory");
            router.push(`${pathname}?${params.toString()}`);
        } else {
            router.push(`${pathname}`);
        }
    }, [tabSelectionState, pathname, router])

    return (
        <div>
            <SelectionTabs indexArray={["inventory", "accessory"]} value={tabSelectionState || false} updateSelectionLevel={setTabSelectionState} />
            { tabSelectionState === "inventory" && <Inventory /> }
            { tabSelectionState === "accessory" && <Accessory /> }
        </div>
    );
}