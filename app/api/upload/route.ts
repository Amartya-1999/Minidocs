import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const ownerId = formData.get("ownerId") as string | null;

    if (!ownerId) {
      return NextResponse.json({ error: "Missing ownerId" }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const fileName = file.name;
    const lowerName = fileName.toLowerCase();

    const isSupported = lowerName.endsWith(".txt") || lowerName.endsWith(".md");

    if (!isSupported) {
      return NextResponse.json(
        { error: "Only .txt and .md files are supported" },
        { status: 400 }
      );
    }

    const text = await file.text();

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Uploaded file is empty" },
        { status: 400 }
      );
    }

    const title = fileName.replace(/\.(txt|md)$/i, "");

    const html = `<p>${escapeHtml(text).replaceAll("\n", "<br />")}</p>`;

    const document = await prisma.document.create({
      data: {
        title,
        contentHtml: html,
        ownerId,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}