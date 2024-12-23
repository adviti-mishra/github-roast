"use client";

import { Navbar, NavbarBrand } from "@nextui-org/react";
import { FireEmoji } from "./FireEmoji";
import { useRouter } from "next/navigation";

export default function CustomNavbar() {
    const router = useRouter();

    return (
        <Navbar maxWidth="full" className="pt-6 absolute">
            <NavbarBrand>
                <div className="flex flex-row items-center hover:cursor-pointer text-4xl space-x-2" onClick={() => router.push("/")}>
                    <FireEmoji />
                    <p className="font-black">Git Roasted</p>
                </div>
            </NavbarBrand>
        </Navbar>
    )
}