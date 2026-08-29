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
            stripeCustomerId: true,
            email: true,
            name: true
        }
    })

    let stripeCustomerId = dbUser?.stripeCustomerId;

    if (!stripeCustomerId) {
        const stripeCustomer = await stripe.customers.create({
            email: dbUser?.email as string,
            name: dbUser?.name as string
        });
        stripeCustomerId = stripeCustomer.id;

        await prisma.user.update({
            where: { id: user?.id as string },
            data: { stripeCustomerId },
        });
    }

    let subscriptionUrl;
    try {
        subscriptionUrl = await getStripe({
            customerId: stripeCustomerId as string,
            domainUrl: process.env.NEXTAUTH_URL as string,
            priceId: process.env.STRIPE_PRICE_ID as string
        })
    } catch (error) {
        console.error("Erreur lors de la création de la session Stripe:", error);
        throw new Error("Impossible de créer la session Stripe. Vérifiez le STRIPE_PRICE_ID dans .env.production");
    }

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