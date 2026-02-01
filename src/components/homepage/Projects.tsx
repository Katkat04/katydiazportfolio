import ProjectCard from "../shared/ProjectCard";
import Link from "next/link";

export default function Projects(){
    return(
        <section className="relative bg-[#000000] text-white max-w-[1440px] lg:px-8 lg:py-12">
            <div className="flex flex-col gap-4 items-center">
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="text-[40px]">Featured projects</h1>
                    <Link href="/projects" className="text-[24px] flex flex-row items-center gap-1 hover:text-[#858aeb]">
                        See more
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <rect x="8" y="6" width="3" height="3" fill="currentColor"/>
                            <rect x="10" y="8" width="3" height="3" fill="currentColor"/>
                            <rect x="12" y="10" width="3" height="3" fill="currentColor"/>
                            
                            <rect x="14" y="11" width="3" height="3" fill="currentColor"/>
                            
                            <rect x="12" y="12" width="3" height="3" fill="currentColor"/>
                            <rect x="10" y="14" width="3" height="3" fill="currentColor"/>
                            <rect x="8" y="16" width="3" height="3" fill="currentColor"/>
                        </svg>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                </div>
            </div>
        </section>
    )
}