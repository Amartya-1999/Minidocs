import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const owned = await prisma.document.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        owner: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const shared = await prisma.document.findMany({
      where: {
        shares: {
          some: {
            userId,
          },
        },
        NOT: {
          ownerId: userId,
        },
      },
      include: {
        owner: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ owned, shared });
  } catch (error) {
    console.error("GET /api/documents error:", error);
    return NextResponse.json(
      { error: "Failed to load documents" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const ownerId = body.ownerId;
    const title = body.title?.trim() || "Untitled Document";

    if (!ownerId) {
      return NextResponse.json({ error: "Missing ownerId" }, { status: 400 });
    }

    const document = await prisma.document.create({
      data: {
        title,
        ownerId,
        contentHtml: "<p>Start writing...</p>",
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("POST /api/documents error:", error);
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    );
  }
}