{-# LANGUAGE Arrows #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE TemplateHaskell #-}

module Explicate.Types.Basis where

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

import           Explicate.Types.Citation
import           Explicate.Types.Explanation

data Basis' a b c = Basis a b c

-- To be used/developed next session:
data RealBasis
   = RealExpl (Maybe Int) ExplanationMaybeId
   | RealCite (Maybe Int) CitationMaybeId

type BasisMaybeId       = Basis' (Maybe Int) (Maybe Int) (Maybe Int)
type Basis              = Basis'        Int  (Maybe Int) (Maybe Int)
type BasisColumnMaybeId = Basis' (Maybe (Column PGInt4)) (Column (Nullable PGInt4)) (Column (Nullable PGInt4))
type BasisColumn        = Basis'       ((Column PGInt4)) (Column (Nullable PGInt4)) (Column (Nullable PGInt4))

$(makeAdaptorAndInstance "pBasis" ''Basis')

table_Basis :: Table BasisColumnMaybeId BasisColumn
table_Basis = Table "\"Basis\"" (pBasis $ Basis (optional "id")
                                                (required "fk_Explanation")
                                                (required "fk_Citation")
                                )

runQuery_Basis :: PGS.Connection
                  -> Query BasisColumn
                  -> IO [Basis]
runQuery_Basis = runQuery 

runInsert_Basis :: PGS.Connection -> Table BasisColumnMaybeId BasisColumn -> BasisColumnMaybeId -> IO Int64
runInsert_Basis = runInsert

query_Basis = queryTable table_Basis
