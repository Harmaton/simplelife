'use server'

import { db } from '@/lib/db';
import { nanoid } from 'nanoid';

export async function generateReferralLink(userId: string): Promise<string> {
  // Check if the user already has a referral link
  let referral = await db.referral.findUnique({
    where: { userId: userId },
  });

  if (!referral) {
    // If not, create a new referral record
    const uniqueId = nanoid(10); // Generate a unique 10-character ID
    referral = await db.referral.create({
      data: {
        userId: userId,
        link: uniqueId,
      },
    });
  }

  // Construct the full referral URL
  const baseUrl = 'https://simplelifeofficial.com/signup?ref=';
  const referralLink = baseUrl + referral.link;

  return referralLink;
}
