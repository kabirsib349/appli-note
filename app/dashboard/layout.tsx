import { getUser } from "@/lib/actionsUser";
import ButtonSignOut from "../components/ButtonSignOut";
import DashboardNav from "../components/DashboardNav";
import { ToastContainer } from 'react-toastify';
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db"

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const user = await getUser();
    if (!user) {
        return <div>Veillez vous connecter</div>
    }
    if (!user?.stripeCustomerId) {
        const stripeCustomer = await stripe.customers.create({
            email: user?.email as string
        })
        await prisma.user.update({
            where: {
                id: user.id as string
            },
            data: {
                stripeCustomerId: stripeCustomer.id
            }
        })
    }
    return (
        <section className="max-w-[1200px] mx-auto md:flex md:items-center md:gap-4 w-full h-screen mt-2 p-2">
            <DashboardNav />
            <div className="w-full h-full">
                <ButtonSignOut />
                {children}
                <ToastContainer />
            </div>
        </section>
    );
}