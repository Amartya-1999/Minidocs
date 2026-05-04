import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { canAccessDocument } from "@/lib/access";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const allowed = await canAccessDocument(id, userId);

    if (!allowed) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const document = await prisma.document.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
        shares: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error("GET /api/documents/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to load document" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const userId = body.userId;
    const title = body.title?.trim();
    const contentHtml = body.contentHtml ?? "";

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const allowed = await canAccessDocument(id, userId);

    if (!allowed) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const document = await prisma.document.update({
      where: {
        id,
      },
      data: {
        title,
        contentHtml,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("PATCH /api/documents/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update document" },
      { status: 500 }
    );
  }
}