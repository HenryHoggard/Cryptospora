if (isset($_GET['cache.txt']))
   {
     if (unlink('FOLDER_PATH' . $_GET['cache.txt']))
     {
       echo 'Deleted';
     }
   }