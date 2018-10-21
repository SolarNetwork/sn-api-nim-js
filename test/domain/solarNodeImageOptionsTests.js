/* eslint-env node */

import test from "ava";

import SolarNodeImageOptions from "domain/SolarNodeImageOptions";

test("domain:solarNodeImageOptions:create:empty", t => {
  const obj = new SolarNodeImageOptions();
  t.truthy(obj);
});

test("domain:solarNodeImageOptions:create:args", t => {
  const env = { a: "b" };
  const params = { c: "d" };
  const obj = new SolarNodeImageOptions(env, params, false);
  t.deepEqual(obj.environment, env);
  t.deepEqual(obj.parameters, params);
  t.is(obj.verbose, false);
});

test("domain:solarNodeImageOptions:mutate", t => {
  const env = { a: "b" };
  const params = { c: "d" };
  const obj = new SolarNodeImageOptions(env, params, false);

  obj.verbose = true;
  t.is(obj.verbose, true);
});

test("domain:solarNodeImageOptions:fromJsonEncoding", t => {
  const json = JSON.parse(require("fs").readFileSync("./test/domain/image-options-01.json"));
  const obj = SolarNodeImageOptions.fromJsonEncoding(json);
  t.truthy(obj);
  t.deepEqual(obj.environment, {
    profile: "development",
    number: 42
  });
  t.deepEqual(obj.parameters, {
    format: "raw"
  });
  t.is(obj.verbose, true);
});

test("domain:solarNodeImageOptions:toJsonEncoding", t => {
  const env = { a: "b" };
  const params = { c: "d" };
  const obj = new SolarNodeImageOptions(env, params, false);
  const json = obj.toJsonEncoding();
  t.is(json, '{"environment":{"a":"b"},"parameters":{"c":"d"},"verbose":false}');
});
