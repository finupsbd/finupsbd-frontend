import Footer from "@/components/sheared/Footer";
import Header from "@/components/sheared/Header";

export default function FinupsIslamicLayout({ children, }: { children: React.ReactNode }) {

    return <section>
        <Header />
        {children}
        <Footer />
    </section>
}