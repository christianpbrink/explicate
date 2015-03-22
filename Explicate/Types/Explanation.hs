{-# LANGUAGE Arrows #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE TemplateHaskell #-}

module Explicate.Types.Explanation where

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

data  Explanation' a b
    = Explanation {
      explanationId :: a
    , explanation :: b
    } -- [ExplanationAtom]
  deriving (Show, Eq, Read, Ord)

type ExplanationMaybeId       = Explanation' (Maybe Int) Text
type Explanation              = Explanation' Int Text
type ExplanationColumnMaybeId = Explanation' (Maybe (Column PGInt4)) (Column PGText)
type ExplanationColumn        = Explanation' (Column PGInt4) (Column PGText)
$(makeAdaptorAndInstance "pExplanation" ''Explanation')

table_Explanation :: Table ExplanationColumnMaybeId ExplanationColumn
table_Explanation = Table "\"Explanation\"" (pExplanation $ Explanation (optional "id")
                                                                        (required "explanation"))  

runQuery_Explanation :: PGS.Connection
                     -> Query ExplanationColumn
                     -> IO [Explanation]
runQuery_Explanation = runQuery 

runInsert_Explanation :: PGS.Connection -> Table ExplanationColumnMaybeId ExplanationColumn -> ExplanationColumnMaybeId -> IO Int64
runInsert_Explanation = runInsert

query_Explanation = queryTable table_Explanation

--data ExplanationAtom
--   = AtomText Text 
--   | AtomRef (Stored P)

