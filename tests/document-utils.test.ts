import { describe, expect, it } from "vitest";
import {
  escapeHtml,
  isSupportedUploadFile,
  plainTextToHtml,
  titleFromFileName,
} from "@/lib/document-utils";

describe("document upload utilities", () => {
  it("allows only .txt and .md uploads", () => {
    expect(isSupportedUploadFile("notes.txt")).toBe(true);
    expect(isSupportedUploadFile("README.md")).toBe(true);
    expect(isSupportedUploadFile("resume.pdf")).toBe(false);
    expect(isSupportedUploadFile("image.png")).toBe(false);
  });

  it("creates clean titles from supported file names", () => {
    expect(titleFromFileName("meeting-notes.txt")).toBe("meeting-notes");
    expect(titleFromFileName("product-spec.md")).toBe("product-spec");
  });

  it("escapes unsafe HTML before storing uploaded text as document HTML", () => {
    const input = "<script>alert('xss')</script>";
    expect(escapeHtml(input)).toBe("&lt;script&gt;alert('xss')&lt;/script&gt;");
  });

  it("converts plain text into simple preserved HTML", () => {
    const html = plainTextToHtml("Line 1\nLine 2");
    expect(html).toBe("<p>Line 1<br />Line 2</p>");
  });
});