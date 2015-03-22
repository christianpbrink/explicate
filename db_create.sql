DROP SCHEMA IF EXISTS "public" CASCADE;
CREATE SCHEMA "public";
SET SEARCH_PATH TO "public";

-- BEGIN TRANSACTION;

CREATE TABLE "P" ( "id" bigserial primary key 
                 , "proposition" text
                 );

CREATE TABLE "Citation" ("id" bigserial primary key, "url" text);

CREATE TABLE "Explanation" ("id" bigserial primary key
                           ,"explanation" text);

CREATE TABLE "Basis" ("id" bigserial primary key
                     ,"fk_Explanation" integer REFERENCES "Explanation"
                     ,"fk_Citation"    integer REFERENCES "Citation"
                     );

CREATE TABLE "Grounding" ("id" bigserial primary key
                         ,"fk_P" integer REFERENCES "P"
                         ,"fk_Basis" integer REFERENCES "Basis")

-- COMMIT;
