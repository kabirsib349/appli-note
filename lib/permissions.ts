import { prisma } from "@/lib/db";

/**
 * Vérifie si un utilisateur a le droit d'accéder aux fonctionnalités Premium.
 * Un utilisateur a les droits s'il est Admin ou s'il possède un abonnement actif.
 * 
 * @param userId - L'ID de l'utilisateur à vérifier
 * @returns true si l'utilisateur est Premium ou Admin, false sinon
 */
export const isPremiumOrAdmin = async (userId: string): Promise<boolean> => {
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscriptions: true, // On récupère ses abonnements en même temps
    },
  });

  if (!user) return false;

  // 1. Si le flag Admin est activé, on lui donne tout de suite accès
  if (user.isAdmin) return true;

  // 2. Sinon, on vérifie s'il possède un abonnement actif (ou en période d'essai)
  const hasActiveSubscription = user.subscriptions.some(
    (sub) => sub.status === "active" || sub.status === "trialing"
  );

  return hasActiveSubscription;
};

