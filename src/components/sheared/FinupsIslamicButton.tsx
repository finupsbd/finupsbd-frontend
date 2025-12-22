"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"


const FinupsIslamicButton = () => {

    const path = usePathname()
    console.log(path)

    if (path === '/finups-islamic') {
        return (
            <Button className={`${path === '/finups-islamic'&& "bg-red-600 hover:first-letter:bg-red-400"}`}>
                <Link href={'/'}> Finups General</Link>
            </Button>
        )
    }


    if (path === '/') {
        return (
            <Button>
                <Link href={'/finups-islamic'}> Finups Islamic</Link>
            </Button>

        )
    }

}

export default FinupsIslamicButton
