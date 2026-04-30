import ProjectCard from "../shared/ProjectCard";

const featuredProjects = [
    {
        name: "Tasqui",
        link: "https://github.com",
        image: "/proyectos/tasqui.png",
    },
    {
        name: "Mooba",
        link: "https://github.com",
        image: "/proyectos/mooba.png",
    },
    {
        name: "Thermecs",
        link: "https://github.com",
        image: "/proyectos/thermecs.png",
    },
];

export default function Projects(){
    return(
        <section className="relative bg-[#000000] text-white w-full md:pt-14">
            <div className="flex flex-col gap-4  max-w-[1440px] px-8 py-10 mx-auto items-center">
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="text-[40px]">Featured projects</h1>
                </div>
                <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            name={project.name}
                            link={project.link}
                            image={project.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}