import {
  hashRandomIdentifier,
  hashString,
  hashToIdentifier,
  longHash,
  hashRandomLinkName,
  hashToClassName
} from "./hash.utils";
import { isNotNil, isEqual } from "../predicates/predicates";

const { floor, random } = Math;

const _MAX_INT = Number.MAX_SAFE_INTEGER;

describe("hash.utils", () => {
  const CSS_REGEXP = /-?[_a-zA-Z]+[_a-zA-Z0-9-]*/;

  const ALPHABET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  function randomString(aLen: number): string {
    const data: string[] = [];
    for (let i = 0; i < aLen; ++i) {
      data.push(ALPHABET[Math.floor(Math.random() * ALPHABET.length)]);
    }
    return data.join("");
  }

  function assertNoClash(aLeft: string, aRight: string) {
    const h1 = hashString(longHash(), aLeft);
    const h2 = hashString(longHash(), aRight);

    expect(h1).not.toEqual(h2);
  }

  it("should generate unique strings", () => {
    const reg: Record<number, string> = {};

    for (let i = 0; i < 10; ++i) {
      const len = Math.floor(Math.random() * 100) + 10;
      const s = randomString(len);
      const h = hashString(longHash(), s);
      // validate
      const old = reg[h];
      if (isNotNil(old) && !isEqual(s, old)) {
        console.error("hash collision", s, old);
        expect(old).toEqual(s);
      }
      reg[h] = s;
    }
  });

  it("should generate unique names", () => {
    assertNoClash("Poppins, sans-serif", "Raleway, sans-serif");
    assertNoClash("Arvo, serif", "Lora, serif");
  });

  it("should generate a valid css class name", () => {
    for (let i = 0; i < 100; ++i) {
      const name = hashToClassName(floor(random() * _MAX_INT));
      expect(CSS_REGEXP.test(name)).toBeTruthy();
    }
  });

  it("should be able to create random link names", () => {
    const ident = {};

    for (let i = 0; i < 100; ++i) {
      const id = hashRandomLinkName();
      expect(ident[id]).toBeFalsy();
      ident[id] = id;
    }
  });

  it("should be able to create random identifiers", () => {
    const ident = {};

    for (let i = 0; i < 100; ++i) {
      const id = hashRandomIdentifier();
      expect(ident[id]).toBeFalsy();
      ident[id] = id;
    }
  });

  it("should hash a string", () => {
    const h1 = hashString(longHash(), "This is a test");
    const h2 = hashString(longHash(), "This is a test");
    const h3 = hashString(longHash(), "This is  a test");

    expect(h1).toEqual(h2);
    expect(h2).not.toEqual(h3);
  });

  it("should produce a nice identifier", () => {
    const url1 =
      "http://my7-stage.digitalexperience.ibm.com/api/3d531a58-f7e5-4eec-bdf7-40cc8df26154/delivery/v1/search";

    const h1 = hashString(longHash(), url1);
    const i1 = hashToIdentifier(h1);

    const url2 =
      "http://my7-stage.digitalexperience.ibm.com/api/b37ca3b8-f924-44b9-a8e5-ea7d505b2aa4/delivery/v1/search";

    const h2 = hashString(longHash(), url2);
    const i2 = hashToIdentifier(h2);

    expect(i1).not.toBeNull();
    expect(i2).not.toBeNull();
    expect(i1).not.toEqual(i2);
  });
});
