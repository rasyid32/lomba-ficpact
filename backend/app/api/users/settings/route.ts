import { NextRequest, NextResponse } from 'next/server';
import { extractToken, verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';
import * as bcrypt from 'bcryptjs';

export async function PUT(request: NextRequest) {
  try {
    const token = extractToken(request.headers.get('Authorization'));
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const payload = verifyToken(token);
    if (!payload || !payload.id) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    
    const user = { id: payload.id };

    const data = await request.json();
    const { fullName, bio, activeTitle, darkThemeEnabled, oldPassword, newPassword } = data;

    const dbUser = await db.user.findUnique({ where: { id: user.id } });
    if (!dbUser) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Handle password change
    if (oldPassword && newPassword) {
      const isValid = await bcrypt.compare(oldPassword, dbUser.password);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid old password' }, { status: 400 });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
      return NextResponse.json({ success: true, message: 'Password updated successfully' });
    }

    // Handle Profile / Customization update
    const updateData: any = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (bio !== undefined) updateData.bio = bio;
    
    if (activeTitle !== undefined) {
      // If setting a title, ensure ownership
      if (activeTitle) {
        const titlePurchase = await db.purchase.findFirst({
          where: {
            userId: user.id,
            item: { name: activeTitle, category: 'TITLE' }
          }
        });
        if (!titlePurchase) {
          return NextResponse.json({ error: 'Title not unlocked' }, { status: 403 });
        }
      }
      updateData.activeTitle = activeTitle || null;
    }
    
    // For darkTheme, ensure they own it if trying to enable
    if (darkThemeEnabled !== undefined) {
      if (darkThemeEnabled === true) {
        const purchase = await db.purchase.findFirst({
          where: {
            userId: user.id,
            item: { name: 'Dark Theme' }
          }
        });
        if (!purchase) {
          return NextResponse.json({ error: 'Dark Theme not unlocked' }, { status: 403 });
        }
      }
      updateData.darkThemeEnabled = darkThemeEnabled;
    }

    const updated = await db.user.update({
      where: { id: user.id },
      data: updateData,
      select: { 
        id: true, email: true, username: true, fullName: true, bio: true, 
        darkThemeEnabled: true, activeTitle: true 
      }
    });

    return NextResponse.json({ success: true, user: updated });

  } catch (error: any) {
    console.error('Settings error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
