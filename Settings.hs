{-# LANGUAGE OverloadedStrings #-}

module Settings where

import qualified Database.PostgreSQL.Simple as PGS

conn = PGS.connectPostgreSQL "host='localhost' port=5432 dbname='explicate' user='explicate' password='explicate'"
