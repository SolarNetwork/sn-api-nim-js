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
  const fs = require("fs");
  const data = fs.readFileSync("./test/domain/list-base-images-01.json");
  const json = JSON.parse(data);
  const obj = SolarNodeImageInfo.fromJsonEncoding(json.data[0]);
  t.truthy(obj);
  t.is(obj.id, "solarnode-deb9-pi-1GB-20180814");
  t.is(
    obj.sha256,
    "812754afb3e490c588e33b0865fe4c203d5a26d3ee9c2dd9072de6a2de91c235"
  );
  t.is(obj.contentLength, 287363168);
  t.is(
    obj.uncompressedSha256,
    "4d5867d96659c6dca078f05f054c6a40a67f18fa638d5c5d997d1da5480cdd2c"
  );
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
