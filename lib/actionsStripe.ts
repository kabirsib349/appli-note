"use server";

import {stripe, getStripe} from "@/lib/stripe";
import {getUser} from "@/lib/actionsUser";
import {prisma} from "@/lib/db";
import next, { redirect } from "next/navigation";

export const getDataStripeUser = async(userId: string)=>{
    const data = await prisma.subscription.findUnique({
        where: {
            userId: userId
        },
        select: {
            status: true,
            user: {
                select: {
                    stripeCustomerId: true
                }
            }
        }
    })
    return data;
}

export const createSubscription = async()=>{
    const user = await getUser();
    const dbUser = await prisma.user.findUnique({
        where: {
            id: user?.id
        },
        select: {
            stripeCustomerId: true
        }
    })
    const subscriptionUrl = await getStripe({
        customerId: dbUser?.stripeCustomerId as string,
        domainUrl: process.env.NEXTAUTH_URL as string,
        priceId: process.env.STRIPE_PRICE_ID as string
    })
    return redirect(subscriptionUrl);
}

export const createCustomerPortal=async()=>{
    const user = await getUser();
    const session = await stripe.billingPortal.sessions.create({
        customer: user?.stripeCustomerId as string,
        return_url: `${process.env.NEXTAUTH_URL}/dashboard/payment`
    })
    return redirect(session.url);
}