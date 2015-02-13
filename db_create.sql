DROP SCHEMA IF EXISTS "explicate" CASCADE;
CREATE SCHEMA "explicate";
SET SEARCH_PATH TO "explicate";

-- BEGIN TRANSACTION;

CREATE TABLE "P#P" ("id" integer primary key, "text" text);
CREATE TABLE "P" ("id" integer primary key, "P" integer REFERENCES "P#P");

CREATE TABLE "Citation#Citation" ("id" integer primary key, "url" text);
CREATE TABLE "Citation" ("id" integer primary key, "Citation" integer REFERENCES "Citation#Citation");

-- COMMIT;
