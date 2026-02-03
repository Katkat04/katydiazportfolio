import Image from "next/image";

export default function ProjectCard(){
    return(
        <div className="flex flex-col project-card w-full">
            <div className="flex flex-row justify-between">
                <h2 className="text-[24px] leading-none">Ganaagro Yishaq</h2>
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
            </div>
            <div className="relative h-[205px] px-4 pb-2">
                <Image src="/pimage.png" alt="Project Image" fill className="object-cover" />
            </div>
        </div>
    )
}