'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectionTabs from "@/app/components/selection-tabs";
import Accessory from "@/app/components/accessory";
import Inventory from "@/app/components/inventory";
import AdminBuilds from "@/app/components/admin-builds";
import Products from "@/app/components/products";

export default function Components() {
    const [tabSelectionState, setTabSelectionState] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("tab") === "accessory") {
            setTabSelectionState("accessory");
        } else if (searchParams.get("tab") === "builds") {
            setTabSelectionState("builds");
        } else if (searchParams.get("tab") === "inventory") {
            setTabSelectionState("inventory");
        } else {
            setTabSelectionState("products");
        }
    }, [searchParams])

    useEffect(() => {
        const params = new URLSearchParams();
        if (tabSelectionState === "accessory") {
            params.set("tab", "accessory");
            router.push(`${pathname}?${params.toString()}`);
        } else if (tabSelectionState === "builds") {
            params.set("tab", "builds");
            router.push(`${pathname}?${params.toString()}`);
        } else if (tabSelectionState === "inventory") {
            params.set("tab", "inventory");
            router.push(`${pathname}?${params.toString()}`);
        } else {
            router.push(`${pathname}`);
        }
    }, [tabSelectionState, pathname, router])

    return (
        <div>
            <SelectionTabs indexArray={["products", "inventory", "accessory", "builds"]} value={tabSelectionState || false} updateSelectionLevel={setTabSelectionState} />
            { tabSelectionState === "products" && <Products /> }
            { tabSelectionState === "inventory" && <Inventory /> }
            { tabSelectionState === "accessory" && <Accessory /> }
            { tabSelectionState === "builds" && <AdminBuilds /> }
        </div>
    );
}