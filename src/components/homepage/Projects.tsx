import ProjectCard from "../shared/ProjectCard";
import Link from "next/link";

export default function Projects(){
    return(
        <section className="relative bg-[#000000] text-white w-full">
            <div className="flex flex-col gap-4  max-w-[1440px] px-8 py-10 mx-auto items-center">
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="text-[40px]">Featured projects</h1>
                </div>
                <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                </div>
            </div>
        </section>
    )
}