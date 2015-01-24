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

gimmeSomeData :: IO ()
gimmeSomeData = withPostgresqlConn "dbname='explicate' user='explicate' password='explicate'" $ runDbConn $ do 
    let p0_expl0_atom0_p = P "There is lots of nitrogen in the atmosphere"
    key_p0_expl0_atom0_p <- insert p0_expl0_atom0_p 
    let p0_expl0_atom0 = AtomRef key_p0_expl0_atom0_p
    key_p0_expl0_atom0 <- insert p0_expl0_atom0
    
    let p0_expl0_atom1 = AtomText " and "
    key_p0_expl0_atom1 <- insert p0_expl0_atom1
    
    let p0_expl0_atom2_p = P "When there is lots of nitrogen in an atmosphere it looks blue"
    key_p0_expl0_atom2_p <- insert p0_expl0_atom2_p 
    let p0_expl0_atom2 = AtomRef key_p0_expl0_atom2_p
    key_p0_expl0_atom2 <- insert p0_expl0_atom2

    let grounding_p1 = Grounding key_p0_expl0_atom2_p (Cite (Citation "http://news.google.com"))
    key_grounding_p1 <- insert grounding_p1
    
    let p0_expl0 = Explanation [p0_expl0_atom0, p0_expl0_atom1, p0_expl0_atom2]
    key_p0_expl0 <- insert p0_expl0
    
    let p0 = P "The sky is blue because of nitrogen levels in the atmosphere."
    key_p0 <- insert p0
    let grounding_p0 = Grounding key_p0 (Expl p0_expl0)
    key_grounding_p0 <- insert grounding_p0

    return ()
