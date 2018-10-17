import test from "ava";

import { NimUrlHelper, NimPathKey } from "net/NimUrlHelperMixin";

test("net:nimUrlHelperMixin:create", t => {
  const helper = new NimUrlHelper();
  t.truthy(helper);
});

test("net:nimUrlHelperMixin:baseUrl", t => {
  const helper = new NimUrlHelper();
  t.is(
    helper.baseUrl(),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1"
  );
});

test("net:nimUrlHelperMixin:baseUrl:customEnvironment", t => {
  const env = {};
  env[NimPathKey] = "/foonim";
  env["host"] = "nim.example.com";
  env["port"] = 443;
  const helper = new NimUrlHelper(env);
  t.is(helper.baseUrl(), "https://nim.example.com/foonim/api/v1");
});

test("net:nimUrlHelperMixin:sessionKey:none", t => {
  const helper = new NimUrlHelper();
  t.is(helper.nimSessionKey, undefined);
});

test("net:nimUrlHelperMixin:sessionKey:accessors", t => {
  const helper = new NimUrlHelper();
  helper.nimSessionKey = "foobar";
  t.is(helper.nimSessionKey, "foobar");
});

test("net:nimUrlHelperMixin:pingUrl", t => {
  const helper = new NimUrlHelper();
  t.is(
    helper.pingUrl(),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/ping"
  );
});

test("net:nimUrlHelperMixin:authorizeSessionUrl", t => {
  const helper = new NimUrlHelper();
  t.is(
    helper.authorizeSessionUrl(),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/authorize"
  );
});

test("net:nimUrlHelperMixin:listBaseImagesUrl", t => {
  const helper = new NimUrlHelper();
  t.is(
    helper.listBaseImagesUrl(),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/infos"
  );
});

test("net:nimUrlHelperMixin:createImageUrl:empty", t => {
  const helper = new NimUrlHelper();
  t.is(
    helper.createImageUrl(),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/create/undefined/undefined"
  );
});

test("net:nimUrlHelperMixin:createImageUrl:arg", t => {
  const helper = new NimUrlHelper();
  t.is(
    helper.createImageUrl("foo", "bar"),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/create/foo/bar"
  );
});

test("net:nimUrlHelperMixin:createImageUrl:prop", t => {
  const helper = new NimUrlHelper();
  helper.nimSessionKey = "sess-key";
  t.is(
    helper.createImageUrl("foo"),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/create/foo/sess-key"
  );
});

test("net:nimUrlHelperMixin:createImageUrl:argOverridesProp", t => {
  const helper = new NimUrlHelper();
  helper.nimSessionKey = "sess-key";
  t.is(
    helper.createImageUrl("foo", "bar"),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/create/foo/bar"
  );
});

test("net:nimUrlHelperMixin:createImageReceiptUrl:empty", t => {
  const helper = new NimUrlHelper();
  t.is(
    helper.createImageReceiptUrl(),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/receipt/undefined/undefined"
  );
});

test("net:nimUrlHelperMixin:createImageReceiptUrl:arg", t => {
  const helper = new NimUrlHelper();
  t.is(
    helper.createImageReceiptUrl("foo", "bar"),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/receipt/foo/bar"
  );
});

test("net:nimUrlHelperMixin:createImageReceiptUrl:prop", t => {
  const helper = new NimUrlHelper();
  helper.nimSessionKey = "sess-key";
  t.is(
    helper.createImageReceiptUrl("foo"),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/receipt/foo/sess-key"
  );
});

test("net:nimUrlHelperMixin:createImageReceiptUrl:argOverridesProp", t => {
  const helper = new NimUrlHelper();
  helper.sessionKey = "sess-key";
  t.is(
    helper.createImageReceiptUrl("foo", "bar"),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/receipt/foo/bar"
  );
});

test("net:nimUrlHelperMixin:downloadImageUrl:empty", t => {
  const helper = new NimUrlHelper();
  t.is(
    helper.downloadImageUrl(),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/undefined/undefined"
  );
});

test("net:nimUrlHelperMixin:downloadImageUrl:arg", t => {
  const helper = new NimUrlHelper();
  t.is(
    helper.downloadImageUrl("foo", "bar"),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/foo/bar"
  );
});

test("net:nimUrlHelperMixin:downloadImageUrl:prop", t => {
  const helper = new NimUrlHelper();
  helper.nimSessionKey = "sess-key";
  t.is(
    helper.downloadImageUrl("foo"),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/foo/sess-key"
  );
});

test("net:nimUrlHelperMixin:downloadImageUrl:argOverridesProp", t => {
  const helper = new NimUrlHelper();
  helper.sessionKey = "sess-key";
  t.is(
    helper.downloadImageUrl("foo", "bar"),
    "https://apps.solarnetwork.net/solarnode-image-maker/api/v1/images/foo/bar"
  );
});
