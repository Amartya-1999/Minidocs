import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isDocumentOwner } from "@/lib/access";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const ownerId = body.ownerId;
    const email = body.email?.trim().toLowerCase();

    if (!ownerId || !email) {
      return NextResponse.json(
        { error: "Missing ownerId or email" },
        { status: 400 }
      );
    }

    const isOwner = await isDocumentOwner(id, ownerId);

    if (!isOwner) {
      return NextResponse.json(
        { error: "Only the document owner can share this document" },
        { status: 403 }
      );
    }

    const recipient = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!recipient) {
      return NextResponse.json(
        { error: "No seeded user found with that email" },
        { status: 404 }
      );
    }

    if (recipient.id === ownerId) {
      return NextResponse.json(
        { error: "You cannot share a document with yourself" },
        { status: 400 }
      );
    }

    const share = await prisma.documentShare.upsert({
      where: {
        documentId_userId: {
          documentId: id,
          userId: recipient.id,
        },
      },
      update: {},
      create: {
        documentId: id,
        userId: recipient.id,
      },
    });

    return NextResponse.json(share, { status: 201 });
  } catch (error) {
    console.error("POST /api/documents/[id]/share error:", error);
    return NextResponse.json(
      { error: "Failed to share document" },
      { status: 500 }
    );
  }
}