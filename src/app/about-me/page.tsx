import ImagesAside from "@/src/components/about-me/ImagesAside"

export default function AboutMe(){
    return(
        <section className="min-h-screen max-w-[1440px] mx-auto">
            <div className="flex flex-row gap-8">
                <div className="flex">
                    <ImagesAside />
                </div>
                <div>
                    <h3>Hola hola</h3>
                </div>
            </div>
        </section>
    )
}