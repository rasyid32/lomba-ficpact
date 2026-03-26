import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Gunakan offset manual untuk menggeser waktu UTC menjadi WIB (UTC+7)
    // agar sinkron antara server Vercel dan lokal.
    const now = new Date();
    // Offset WIB adalah +7 jam dari UTC
    const offset = 7 * 60 * 60 * 1000; 
    const cNow = new Date(now.getTime() + offset);

    // Buat objek 'today' (jam 00:00:00 WIB)
    const today = new Date(Date.UTC(cNow.getUTCFullYear(), cNow.getUTCMonth(), cNow.getUTCDate(), 0, 0, 0));
    // Reset kembali ke UTC dengan mengurangkan offset, karena database menyimpan dalam UTC
    const todayUTC = new Date(today.getTime() - offset);

    const tomorrowUTC = new Date(todayUTC.getTime() + 24 * 60 * 60 * 1000);

    let dailyCase = await db.dailyCase.findFirst({
      where: {
        date: {
          gte: todayUTC,
          lt: tomorrowUTC
        }
      },
      include: {
        chapter: {
          select: {
            id: true,
            title: true,
            description: true,
            content: true,
            difficulty: true
          }
        }
      }
    });

    // If no daily case for today, or if it lacks questionData, create/update one
    const questionObj = {
      question: "Berdasarkan materi kelas 10, tentukan himpunan penyelesaian dari pertidaksamaan linear berikut:\n\n$$3(x - 2) + 4 \\le 5x - 6$$",
      options: ["x \\ge 2", "x \\le 2", "x \\ge 4", "x \\le -4"],
      correctIndex: 0,
      hint: "Kalikan ke dalam kurung, lalu pindahkan semua variabel x ke satu sisi dan konstanta ke sisi lain."
    };

    if (!dailyCase) {
      const randomChapter = await db.chapter.findFirst({
        where: { category: 'KELAS_10' },
        orderBy: { createdAt: 'desc' }
      });

      if (randomChapter) {
        dailyCase = await db.dailyCase.create({
          data: {
            date: todayUTC,
            chapterId: randomChapter.id,
            xpReward: 200,
            coinReward: 100,
            questionData: JSON.stringify(questionObj)
          },
          include: {
            chapter: {
              select: {
                id: true, title: true, description: true, content: true, difficulty: true
              }
            }
          }
        });
      }
    } else if (!dailyCase.questionData) {
      dailyCase = await db.dailyCase.update({
        where: { id: dailyCase.id },
        data: { questionData: JSON.stringify(questionObj) },
        include: {
          chapter: {
            select: {
              id: true, title: true, description: true, content: true, difficulty: true
            }
          }
        }
      });
    }

    return NextResponse.json(dailyCase);
  } catch (error) {
    console.error('Get daily case error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
