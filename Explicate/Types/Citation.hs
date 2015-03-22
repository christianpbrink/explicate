{-# LANGUAGE Arrows #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE TemplateHaskell #-}

module Explicate.Types.Citation where

import Control.Monad.IO.Class (liftIO)
import Data.Text

import           Prelude hiding (sum)
import           Opaleye 
import           Data.Int
import           Data.Profunctor.Product (p2, p3)
import           Data.Profunctor.Product.Default (Default)
import           Data.Profunctor.Product.TH (makeAdaptorAndInstance)
import           Data.Time.Calendar (Day)
import           Control.Arrow (returnA, (<<<))
import qualified Database.PostgreSQL.Simple as PGS

data  Citation' a b
    = Citation { 
      citationId :: a
    , url :: b
--    , snippet :: (Maybe Text)
    } 
    deriving (Show, Read, Eq, Ord)

data CitationId' a = CitationId a
$(makeAdaptorAndInstance "pCitationId" ''CitationId')

type CitationMaybeId       = Citation' (Maybe Int) Text
type Citation              = Citation' Int Text
type CitationColumnMaybeId = Citation' (Maybe (Column PGInt4)) (Column PGText)
type CitationColumn        = Citation' ((Column PGInt4)) (Column PGText)

$(makeAdaptorAndInstance "pCitation" ''Citation')

table_Citation :: Table CitationColumnMaybeId CitationColumn
table_Citation = Table "\"Citation\"" (pCitation $ Citation (optional "id")
                                                            (required "url"))

runQuery_Citation :: PGS.Connection
                  -> Query CitationColumn
                  -> IO [Citation]
runQuery_Citation = runQuery 

runInsert_Citation :: PGS.Connection -> Table CitationColumnMaybeId CitationColumn -> CitationColumnMaybeId -> IO Int64
runInsert_Citation = runInsert

query_Citation = queryTable table_Citation
