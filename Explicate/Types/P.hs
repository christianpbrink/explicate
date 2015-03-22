{-# LANGUAGE Arrows #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE TemplateHaskell #-}

module Explicate.Types.P where

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

data  P' a b
    = P { 
      pId :: a
    , proposition :: b
    }
    deriving (Show, Eq, Ord)

data PId' a = PId a
$(makeAdaptorAndInstance "pPId" ''PId')

--type PId       = PId' Int
--type PIdColumn = PId' (Column PGInt4)

type PMaybeId       = P' (Maybe Int)   Text
type P              = P'       (Int)   Text
type PColumnMaybeId = P' (Maybe (Column PGInt4)) (Column PGText)
type PColumn        = P'        (Column PGInt4)  (Column PGText)

$(makeAdaptorAndInstance "pP" ''P')

table_P :: Table PColumnMaybeId PColumn
table_P = Table "\"P\"" (pP $ P (optional "id") 
                                (required "proposition"))

query_P = queryTable table_P

runQuery_P :: PGS.Connection
           -> Query PColumn
           -> IO [P]
runQuery_P = runQuery 

runInsert_P :: PGS.Connection -> Table PColumnMaybeId PColumn -> PColumnMaybeId -> IO Int64
runInsert_P = runInsert
