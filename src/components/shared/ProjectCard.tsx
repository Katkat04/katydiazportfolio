import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
    name: string;
    link: string;
    image: string;
}

export default function ProjectCard({ name, link, image }: ProjectCardProps){
    return(
        <div className="cursor-pointer flex flex-col project-card w-full md:hover:scale-105 transition-transform duration-300">
            <div className="flex flex-row justify-between">
                <h2 className="text-[24px] leading-none">{name}</h2>
                <Link href={link} target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 28 28">
                    <rect x="5" y="6" width="3" height="3" fill="currentColor"/>
                    <rect x="8" y="9" width="3" height="3" fill="currentColor"/>
                    <rect x="11" y="12" width="3" height="3" fill="currentColor"/>
                    <rect x="14" y="9" width="3" height="3" fill="currentColor"/>
                    <rect x="17" y="6" width="3" height="3" fill="currentColor"/>

                    <rect x="17" y="17" width="3" height="3" fill="currentColor"/>
                    <rect x="14" y="14" width="3" height="3" fill="currentColor"/>
                    <rect x="11" y="11" width="3" height="3" fill="currentColor"/>
                    <rect x="8" y="14" width="3" height="3" fill="currentColor"/>
                    <rect x="5" y="17" width="3" height="3" fill="currentColor"/>
                </svg>
                </Link>
            </div>
            <div className="relative h-[205px] px-4 pb-2">
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
        </div>
    )
}