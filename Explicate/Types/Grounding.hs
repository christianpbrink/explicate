{-# LANGUAGE Arrows #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE TemplateHaskell #-}

module Explicate.Types.Grounding where

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

 
--data  Grounding
--    = Grounding {
--      p :: P
--    , basis :: Basis
--    }


