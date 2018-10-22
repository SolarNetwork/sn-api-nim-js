/* eslint-env node */

import test from "ava";

import SolarNodeImageReceipt from "domain/SolarNodeImageReceipt";
import SolarNodeImageInfo from "domain/SolarNodeImageInfo";
import { start } from "repl";

test("domain:solarNodeImageReceipt:create:empty", t => {
  const obj = new SolarNodeImageReceipt();
  t.truthy(obj);
});

test("domain:solarNodeImageReceipt:create:args", t => {
  const id = "a";
  const baseImageId = "b";
  const createdDate = new Date("2018-01-01T10:11:12.123");
  const started = true;
  const done = true;
  const cancelled = false;
  const percentComplete = 1.0;
  const message = "c";
  const startedDate = new Date("2018-01-01T10:11:12.234");
  const completedDate = new Date("2018-01-01T10:11:12.345");
  const imageInfo = new SolarNodeImageInfo("d");
  const downloadUrl = "http://e";

  const obj = new SolarNodeImageReceipt(
    id,
    baseImageId,
    createdDate,
    started,
    done,
    cancelled,
    percentComplete,
    message,
    startedDate,
    completedDate,
    imageInfo,
    downloadUrl
  );
  t.is(obj.id, id);
  t.is(obj.baseImageId, baseImageId);
  t.is(obj.createdDate, createdDate);
  t.is(obj.started, started);
  t.is(obj.done, done);
  t.is(obj.cancelled, cancelled);
  t.is(obj.percentComplete, percentComplete);
  t.is(obj.message, message);
  t.is(obj.startedDate, startedDate);
  t.is(obj.completedDate, completedDate);
  t.is(obj.imageInfo, imageInfo);
  t.is(obj.downloadUrl, downloadUrl);
});

test("domain:solarNodeImageReceipt:mutate", t => {
  const id = "a";
  const baseImageId = "b";
  const createdDate = new Date("2018-01-01T10:11:12.123");
  const started = false;
  const done = false;
  const cancelled = false;
  const percentComplete = 0.0;
  const message = "c";
  const obj = new SolarNodeImageReceipt(
    id,
    baseImageId,
    createdDate,
    started,
    done,
    cancelled,
    percentComplete,
    message
  );

  t.throws(() => {
    obj.id = "d";
  }, TypeError);
  t.is(obj.id, id);
});

test("domain:solarNodeImageReceipt:fromJsonEncoding", t => {
  const json = JSON.parse(require("fs").readFileSync("./test/domain/image-receipt-01.json"));
  const obj = SolarNodeImageReceipt.fromJsonEncoding(json);
  t.truthy(obj);
  t.is(obj.id, "a261cde3-de46-4cd9-b600-86b6bbf6e17a");
  t.is(obj.baseImageId, "solarnode-deb9-pi-1GB-20180814");
  t.deepEqual(obj.createdDate, new Date(1534282936009));
  t.is(obj.started, true);
  t.is(obj.done, false);
  t.is(obj.cancelled, false);
  t.is(obj.percentComplete, 0.0);
  t.is(obj.message, "Uncompressing source image");
  t.deepEqual(obj.startedDate, new Date(1534282936011));
});

test("domain:solarNodeImageReceipt:toJsonEncoding", t => {
  const id = "a";
  const baseImageId = "b";
  const createdDate = new Date(1534282936009);
  const started = true;
  const done = true;
  const cancelled = false;
  const percentComplete = 1;
  const message = "c";
  const startedDate = new Date(1534282936011);
  const completedDate = new Date(1534299936009);
  const imageInfo = new SolarNodeImageInfo("d");
  const downloadUrl = "http://e";
  const obj = new SolarNodeImageReceipt(
    id,
    baseImageId,
    createdDate,
    started,
    done,
    cancelled,
    percentComplete,
    message,
    startedDate,
    completedDate,
    imageInfo,
    downloadUrl
  );
  const json = obj.toJsonEncoding();
  t.is(
    json,
    '{"id":"a","baseImageId":"b","createdDate":1534282936009,' +
      '"started":true,"done":true,"cancelled":false,' +
      '"percentComplete":1,"message":"c","startedDate":1534282936011,' +
      '"completedDate":1534299936009,"imageInfo":{"id":"d"},"downloadUrl":"http://e"}'
  );
});
