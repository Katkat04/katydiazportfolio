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
                    <Image src="/arrow-right.png" alt="Icon" width={24} height={24} className="rotate-320"/>
                </Link>
            </div>
            <div className="relative h-[205px] px-4 pb-2">
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
        </div>
    )
}