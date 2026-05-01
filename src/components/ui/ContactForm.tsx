export default function ContactForm() {
    return (
        <form className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="p-2 border border-gray-300 rounded" />
            <input type="email" placeholder="Your Email" className="p-2 border border-gray-300 rounded" />
            <textarea placeholder="Your Message" className="p-2 border border-gray-300 rounded" rows={4} />
            <button type="submit" className="bg-[#ffd509] text-black p-2 rounded">Send Message</button>
        </form>
    );
}