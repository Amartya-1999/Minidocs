import { prisma } from "./prisma";

export async function canAccessDocument(documentId: string, userId: string) {
  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      OR: [
        { ownerId: userId },
        {
          shares: {
            some: {
              userId,
            },
          },
        },
      ],
    },
  });

  return Boolean(document);
}

export async function isDocumentOwner(documentId: string, userId: string) {
  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      ownerId: userId,
    },
  });

  return Boolean(document);
}