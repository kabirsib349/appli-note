import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {prisma} from "@/lib/db";
import { headers } from "next/headers";

export async function POST(req: Request) {
    const body= await req.text();
    const signature= (await headers()).get("Stripe-signature") as string;
    let event: Stripe.Event;
    try{
        event=stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    }catch(error: unknown){
        return new Response("Erreur webhook Stripe",{status:400});
    };
    
    const session = event.data.object as Stripe.Checkout.Session;
    if(event.type==="checkout.session.completed"){
        const subscription = (await stripe.subscriptions.retrieve(session.subscription as string)) as Stripe.Subscription;
        const customerId = String(session.customer);
        const user = await prisma.user.findUnique({
            where: {stripeCustomerId: customerId}
        });
        if(!user){
            throw new Error("Utilisateur inexistant")
        }
        await prisma.subscription.create({
            data: {
                stripeSubscriptionId: subscription.id,
                interval: String(subscription.items.data[0].plan.interval),
                planId: subscription.items.data[0].plan.id,
                currentPeriodStart: subscription.items.data[0].current_period_start,
                currentPeriodEnd: subscription.items.data[0].current_period_end,
                userId: user.id,
                status: subscription.status
            }
        })
    }else if(event.type==="invoice.payment_succeeded"){
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        await prisma.subscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                planId: subscription.items.data[0].plan.id,
                currentPeriodStart: subscription.items.data[0].current_period_start,
                currentPeriodEnd: subscription.items.data[0].current_period_end,
                status: subscription.status
            }
        })
    }
    return new Response(null,{status: 200});
}