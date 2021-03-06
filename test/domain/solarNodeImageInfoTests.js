/* eslint-env node */

import test from "ava";

import SolarNodeImageInfo from "domain/SolarNodeImageInfo";

test("domain:solarNodeImageInfo:create:empty", t => {
  const obj = new SolarNodeImageInfo();
  t.truthy(obj);
});

test("domain:solarNodeImageInfo:create:args", t => {
  const obj = new SolarNodeImageInfo("a", "b", 1, "c", 2);
  t.is(obj.id, "a");
  t.is(obj.sha256, "b");
  t.is(obj.contentLength, 1);
  t.is(obj.uncompressedSha256, "c");
  t.is(obj.uncompressedContentLength, 2);
});

test("domain:solarNodeImageInfo:mutate", t => {
  const obj = new SolarNodeImageInfo("a", "b", 1, "c", 2);
  t.throws(() => {
    obj.id = "d";
  }, TypeError);
  t.is(obj.id, "a");
});

test("domain:solarNodeImageInfo:fromJsonEncoding", t => {
  const json = JSON.parse(require("fs").readFileSync("./test/domain/list-base-images-01.json"));
  const obj = SolarNodeImageInfo.fromJsonEncoding(json.data[0]);
  t.truthy(obj);
  t.is(obj.id, "solarnode-deb9-pi-1GB-20180814");
  t.is(obj.sha256, "812754afb3e490c588e33b0865fe4c203d5a26d3ee9c2dd9072de6a2de91c235");
  t.is(obj.contentLength, 287363168);
  t.is(obj.uncompressedSha256, "4d5867d96659c6dca078f05f054c6a40a67f18fa638d5c5d997d1da5480cdd2c");
  t.is(obj.uncompressedContentLength, 998244352);
});

test("domain:solarNodeImageInfo:toJsonEncoding", t => {
  const obj = new SolarNodeImageInfo("a", "b", 1, "c", 2);
  const json = obj.toJsonEncoding();
  t.is(
    json,
    '{"id":"a","sha256":"b","contentLength":1,"uncompressedSha256":"c","uncompressedContentLength":2}'
  );
});

test("domain:solarNodeImageInfo:compareById", t => {
  const json = JSON.parse(require("fs").readFileSync("./test/domain/list-base-images-01.json"));
  json.data.sort(SolarNodeImageInfo.compareById);
  const ids = json.data.map(d => {
    return d.id;
  });
  t.deepEqual(
    ids,
    [
      "solarkiosk-deb9-pi-1GB-20180510",
      "solarkiosk-DEB10-pi-1GB-20170510",
      "solarkiosk-deb10-pi-1GB-20180510",
      "solarnode-deb8-ebox3300mx-1GB-20171107",
      "SOLARNODE-deb8-ebox3300mx-1GB-20171212",
      "solarnode-deb8-pi-1GB-20171107",
      "solarnode-deb8-pi-1GB-20171108",
      "solarnode-deb9-pi-1GB-20180814",
      "solarnode-deb9-pi-1GB-20181017"
    ],
    "IDs sorted case-insensitively, with natural numbers (9 before 10)"
  );
});

test("domain:solarNodeImageInfo:hasId:empty", t => {
  const image = new SolarNodeImageInfo();
  t.is(image.hasId(""), false);
});

test("domain:solarNodeImageInfo:hasId:emptyArg", t => {
  const image = new SolarNodeImageInfo("foo");
  t.is(image.hasId(), false);
});

test("domain:solarNodeImageInfo:hasId:no", t => {
  const image = new SolarNodeImageInfo("foo");
  t.is(image.hasId("bar"), false);
});

test("domain:solarNodeImageInfo:hasId:yes:exact", t => {
  const image = new SolarNodeImageInfo("foo");
  t.is(image.hasId("foo"), true);
});

test("domain:solarNodeImageInfo:hasId:yes:caseInsensitive", t => {
  const image = new SolarNodeImageInfo("foo");
  t.is(image.hasId("FoO"), true);
});

test("domain:solarNodeImageInfo:idComponentGroups", t => {
  const json = JSON.parse(require("fs").readFileSync("./test/domain/list-base-images-01.json"));
  const result = SolarNodeImageInfo.idComponentGroups(json.data);
  const rawResult = JSON.parse(JSON.stringify(result));
  t.deepEqual(
    rawResult,
    JSON.parse(require("fs").readFileSync("./test/domain/id-component-groups-01.json"))
  );
});

test("domain:solarNodeImageInfo:displayNameForComponent:empty", t => {
  const image = new SolarNodeImageInfo();
  t.is(image.displayNameForComponent(), "");
});

test("domain:solarNodeImageInfo:displayNameForComponent:singleComponent", t => {
  const image = new SolarNodeImageInfo("foobar");
  t.is(image.displayNameForComponent(), "foobar");
});

test("domain:solarNodeImageInfo:displayNameForComponent:multiComponents", t => {
  const image = new SolarNodeImageInfo("foo-bar");
  t.is(image.displayNameForComponent(), "bar");
});

test("domain:solarNodeImageInfo:displayNameForComponent:dateComponent", t => {
  const image = new SolarNodeImageInfo("foo-bar-20181019");
  t.is(image.displayNameForComponent(), "2018-10-19");
});
