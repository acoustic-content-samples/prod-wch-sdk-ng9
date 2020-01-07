import { AuthoringContentItem } from "@acoustic-content-sdk/api";
import {
  getPath,
  isArray,
  jsonParse,
  parsePath
} from "@acoustic-content-sdk/utils";
import { readFileSync } from "fs";
import { join } from "path";
import { v4 } from "uuid";

import { ASSET_BASE } from "../utils/assets";
import { createUpdater } from "./update";

describe("update", () => {
  const ASSETS = join(ASSET_BASE, "updater");

  it("should detect idempotent updates", () => {
    // original document
    const filename = join(
      ASSETS,
      "data",
      "content",
      "3cd38fe2-5ce7-46b9-8591-bb489d9b31df_cmd.json"
    );
    const src = jsonParse<AuthoringContentItem>(
      readFileSync(filename, "utf-8")
    );
    const acc = "elements.backgroundColor.value.colorCode.value";
    const up = createUpdater(src);

    const orig = getPath<string>(up.get(), parsePath(acc));

    // make an idempotent update
    up.set(acc, orig);

    // check the result
    const updated = getPath<string>(up.get(), parsePath(acc));
    expect(orig).toBe(updated);

    // should not clone the object
    expect(up.get()).toBe(src);
  });

  it("should add an item to the end of an array", () => {
    // original document
    const filename = join(
      ASSETS,
      "data",
      "content",
      "3cd38fe2-5ce7-46b9-8591-bb489d9b31df_cmd.json"
    );
    const src = jsonParse<AuthoringContentItem>(
      readFileSync(filename, "utf-8")
    );
    // construct an updater
    const acc = "elements.rows.values[1].cells.values[0].content.values";
    const up = createUpdater(src);

    const newValue = { text: "abc" };

    const newJson = up.add(acc, newValue);
    expect(newJson).not.toBe(src);

    const path1 = parsePath(acc);

    const newValues = getPath<any[]>(newJson, path1);
    expect(isArray(newValues)).toBeTruthy();

    const oldValues = getPath<any[]>(src, path1);
    expect(isArray(oldValues)).toBeTruthy();
    expect(oldValues).not.toBe(newValues);

    expect(newValues.length).toEqual(oldValues.length + 1);

    expect(newValues[newValues.length - 1]).toEqual(newValue);
  });

  it("should be able to update an array", () => {
    // original document
    const filename = join(
      ASSETS,
      "data",
      "content",
      "3cd38fe2-5ce7-46b9-8591-bb489d9b31df_cmd.json"
    );
    const src = jsonParse<AuthoringContentItem>(
      readFileSync(filename, "utf-8")
    );
    // construct an updater
    const acc = "elements.rows.values[1].cells.values[0].content.values[0]";
    const up = createUpdater(src);

    const newJson = up.add(acc, { text: "abc" });
    expect(newJson).not.toBe(src);

    const acc1 = "elements.rows.values[1].cells.values[0].content.values";
    const path1 = parsePath(acc1);

    const newValues = getPath<any[]>(newJson, path1);
    expect(isArray(newValues)).toBeTruthy();

    const oldValues = getPath<any[]>(src, path1);
    expect(isArray(oldValues)).toBeTruthy();
    expect(oldValues).not.toBe(newValues);

    expect(newValues.length).toEqual(oldValues.length + 1);
  });

  it("should be able to make multiple modifications", () => {
    // original document
    const filename = join(
      ASSETS,
      "data",
      "content",
      "3cd38fe2-5ce7-46b9-8591-bb489d9b31df_cmd.json"
    );
    const src = jsonParse<AuthoringContentItem>(
      readFileSync(filename, "utf-8")
    );
    // construct an updater
    const acc =
      "elements.rows.values[1].cells.values[0].content.values[0].text.value.linkColor.value.colorCode.value";
    const up = createUpdater(src);

    const newValue = "red";
    const newJson = up.set(acc, newValue);
    expect(newJson).not.toBe(src);

    // some sanity check
    const path = parsePath(acc);

    // check the values
    const updatedVale = getPath(newJson, path);
    const oldValue = getPath(src, path);
    expect(updatedVale).not.toEqual(oldValue);
    expect(updatedVale).toEqual(newValue);

    // test some types along the path
    const acc1 = "elements.rows.values[1].cells.values[0].content.values";
    const path1 = parsePath(acc1);
    expect(isArray(getPath(newJson, path1))).toBeTruthy();
    expect(isArray(getPath(src, path1))).toBeTruthy();

    // next mod
    const acc2 = "selectedLayouts[0].layout.id";
    const path2 = parsePath(acc2);

    const newId = v4();
    const newJson2 = up.set(acc2, newId);
    expect(newJson2).toBe(newJson);

    // check the values
    const updatedVale2 = getPath(newJson, path2);
    const oldValue2 = getPath(src, path2);
    expect(updatedVale2).not.toEqual(oldValue2);
    expect(updatedVale2).toEqual(newId);
  });

  it("should update a simple item", () => {
    // original document
    const filename = join(
      ASSETS,
      "data",
      "content",
      "3cd38fe2-5ce7-46b9-8591-bb489d9b31df_cmd.json"
    );
    const src = jsonParse<AuthoringContentItem>(
      readFileSync(filename, "utf-8")
    );
    // construct an updater
    const acc =
      "elements.rows.values[1].cells.values[0].content.values[0].text.value.linkColor.value.colorCode.value";
    const up = createUpdater(src);

    const newValue = "red";
    const newJson = up.set(acc, newValue);

    // some sanity check
    const path = parsePath(acc);

    // check the values
    const updatedVale = getPath(newJson, path);
    const oldValue = getPath(src, path);
    expect(updatedVale).not.toEqual(oldValue);
    expect(updatedVale).toEqual(newValue);

    // test some types along the path
    const acc1 = "elements.rows.values[1].cells.values[0].content.values";
    const path1 = parsePath(acc1);
    expect(isArray(getPath(newJson, path1))).toBeTruthy();
    expect(isArray(getPath(src, path1))).toBeTruthy();
  });
});
