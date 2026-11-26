import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";
import { fetchAndParseBsvGz } from "./bsv-parser.ts";

describe("fetchAndParseBsvGz", () => {
  it("parses a valid BSV1 gzipped replay buffer", async () => {
    // 16-byte header + 2 frames (16 bytes) = 32 bytes
    const buf = new ArrayBuffer(32);
    const view = new DataView(buf);
    // Magic "BSV1"
    view.setUint8(0, "B".charCodeAt(0));
    view.setUint8(1, "S".charCodeAt(0));
    view.setUint8(2, "V".charCodeAt(0));
    view.setUint8(3, "1".charCodeAt(0));
    // rom_crc32
    view.setUint32(4, 0x12345678, true);
    // state_size = 0
    view.setUint32(8, 0, true);
    // reserved = 0
    view.setUint32(12, 0, true);
    // Frame 0: P1 = 0x0001
    view.setUint16(16, 0x0001, true);
    // Frame 1: P1 = 0x0002
    view.setUint16(24, 0x0002, true);

    const gz = gzipSync(Buffer.from(buf));
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      new Response(gz, {
        status: 200,
        headers: { "Content-Type": "application/gzip" },
      });

    try {
      const parsed = await fetchAndParseBsvGz("https://example.com/test.bsv.gz");
      assert.equal(parsed.romCrc32, 0x12345678);
      assert.equal(parsed.totalFrames, 2);
      assert.equal(parsed.frames[0], 0x0001);
      assert.equal(parsed.frames[4], 0x0002);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("rejects invalid magic header", async () => {
    const buf = new ArrayBuffer(16);
    const view = new DataView(buf);
    view.setUint8(0, "N".charCodeAt(0));
    view.setUint8(1, "O".charCodeAt(0));
    view.setUint8(2, "P".charCodeAt(0));
    view.setUint8(3, "E".charCodeAt(0));

    const gz = gzipSync(Buffer.from(buf));
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response(gz, { status: 200 });

    try {
      await assert.rejects(
        () => fetchAndParseBsvGz("https://example.com/bad.bsv.gz"),
        /Cabecera BSV1 inválida/
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
