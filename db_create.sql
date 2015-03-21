DROP SCHEMA IF EXISTS "public" CASCADE;
CREATE SCHEMA "public";
SET SEARCH_PATH TO "public";

-- BEGIN TRANSACTION;

CREATE TABLE "P#P" ("id" integer primary key, "proposition" text);
CREATE TABLE "P" ("id" integer primary key, "P" integer REFERENCES "P#P");

CREATE TABLE "Citation#Citation" ("id" integer primary key, "url" text);
CREATE TABLE "Citation" ("id" integer primary key, "Citation" integer REFERENCES "Citation#Citation");

CREATE TABLE "Explanation#Explanation" ("id" integer primary key
                           ,"explanation" text);
CREATE TABLE "Explanation" ("id" integer primary key
                           ,"Explanation" integer REFERENCES "Explanation#Explanation");

CREATE TABLE "Basis#Expl" ("id" integer primary key
                          ,"fk_Explanation" integer REFERENCES "Explanation");
CREATE TABLE "Basis#Cite" ("id" integer primary key
                          ,"fk_Citation" integer REFERENCES "Citation");
CREATE TABLE "Basis" ("id" integer primary key
                     ,"Cite" integer REFERENCES "Basis#Cite"
                     ,"Expl" integer REFERENCES "Basis#Expl");

CREATE TABLE "Grounding" ("id" integer primary key
                         ,"fk_P" integer REFERENCES "P"
                         ,"fk_Basis" integer REFERENCES "Basis")

-- COMMIT;
