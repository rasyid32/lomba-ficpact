import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { extractToken, verifyToken } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unwrappedParams = await params;
    const authHeader = req.headers.get('Authorization');
    const token = extractToken(authHeader);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const latestSubmission = await db.submission.findFirst({
      where: {
        userId: payload.id,
        chapterId: unwrappedParams.id,
        language: 'quiz',
      },
      orderBy: { createdAt: 'desc' }
    });

    // Check if user already got a perfect score before (reward already claimed)
    const previousPerfect = await db.submission.findFirst({
      where: {
        userId: payload.id,
        chapterId: unwrappedParams.id,
        language: 'quiz',
        status: 'ACCEPTED'
      }
    });
    const rewardClaimed = !!previousPerfect;

    if (!latestSubmission) {
      return NextResponse.json({ canAttempt: true, cooldownRemaining: 0, rewardClaimed });
    }

    if (latestSubmission.status === 'REJECTED') {
      const timeDiff = Date.now() - new Date(latestSubmission.createdAt).getTime();
      const cooldownMs = 30 * 60 * 1000;
      if (timeDiff < cooldownMs) {
        return NextResponse.json({ canAttempt: false, cooldownRemaining: cooldownMs - timeDiff, rewardClaimed });
      }
    }

    return NextResponse.json({ canAttempt: true, cooldownRemaining: 0, rewardClaimed });
  } catch (error) {
    console.error('Quiz status error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
