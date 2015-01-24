{-# LANGUAGE OverloadedStrings #-}

import Explicate.Types

import Snap
import Snap.Extras.JSON
import Snap.Util.FileServe

import Database.Groundhog
import Database.Groundhog.TH
import Database.Groundhog.Postgresql

main = quickHttpServe $ 
   ifTop (sendFile "index.html") <|>
   route [
    ("static", serveDirectory "static")
   ,("foo", foo)
   ]

foo :: Snap ()
foo = writeJSON True
