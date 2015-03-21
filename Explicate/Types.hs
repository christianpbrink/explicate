{-# LANGUAGE GADTs, TypeFamilies, TemplateHaskell, QuasiQuotes, FlexibleInstances #-}
module Explicate.Types where

import Control.Monad.IO.Class (liftIO)
import Data.Text

import Database.Groundhog
import Database.Groundhog.TH
import Database.Groundhog.Postgresql


data P
   = P {
     proposition :: Text
   }
  deriving (Show, Eq, Ord)

data PGRef a = PGRef Integer
data Stored a :: { ref :: PGRef a, val :: a }
data Citation 
   = Citation { 
      url     :: Text
--    , snippet :: (Maybe Text)
    }

data Basis
   = Cite Citation
   | Expl Explanation

data Grounding
   = Grounding (Stored P) (Stored Basis)

--data ExplanationAtom
--   = AtomText Text 
--   | AtomRef (Stored P)

data Explanation 
   = Explanation {
     explanation :: Text
   } -- [ExplanationAtom]

mkPersist defaultCodegenConfig [groundhog|
- entity: P
- entity: Citation
- entity: Basis
- entity: Grounding
- entity: ExplanationAtom
- entity: Explanation
|]

initDB :: IO ()
initDB = withPostgresqlConn "dbname='explicate' user='explicate' password='explicate'" $ runDbConn $ runMigration $ do
    migrate (undefined :: P)
    migrate (undefined :: Citation)
    migrate (undefined :: Basis)
    migrate (undefined :: Grounding)
    migrate (undefined :: ExplanationAtom)
    migrate (undefined :: Explanation)
