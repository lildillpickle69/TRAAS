<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>
        <link rel="stylesheet" type = "text/css" href="https://fonts.googleapis.com/css?family=Quicksand">
        <link rel = "stylesheet" type = "text/css" href = "./dist/styles/components/stylesheet.min.css">
        <link rel = "stylesheet" type = "text/css" href = "./semantic/dist/semantic.min.css">
        <link rel = "stylesheet" type = "text/css" href = "./dist/styles/components/blueprint.css">
        <link rel = "stylesheet" type = "text/css" href = "./dist/styles/components/blueprint-icons.css">
        <link rel = "stylesheet" type = "text/css" href = "./dist/styles/components/blueprint-datetime.css">
        <link rel = "stylesheet" type = "text/css" href = "./node_modules/react-dates/lib/css/_datepicker.css">
        <link rel = "stylesheet" type = "text/css" href = "./node_modules/react-select/dist/react-select.min.css">
        <link rel = "stylesheet" type = "text/css" href = "./node_modules/react-virtualized/styles.css">
        <link rel = "stylesheet" type = "text/css" href = "./node_modules/react-virtualized-select/styles.css">
        <title> 
            Technical Reports Addendum Asset Summary
        </title>
    </head>
    <body>
        <input type="hidden" name="field_name" id="badge" value="<?php echo $_SERVER['HTTP_AEROUSER']; ?>"/>
        <main id = "main">
            <script src=<?php 
            function auto_version($file)
            {
              if(strpos($file, '/') !== 0 || !file_exists($_SERVER['DOCUMENT_ROOT'] . $file))
                return $file;
            
              $mtime = filemtime($_SERVER['DOCUMENT_ROOT'] . $file);
              return preg_replace('{\\.([^./]+)$}', ".$mtime.\$1", $file);
            }
            echo auto_version("/TRAAS/dist/scripts/bundle.js"); ?>>
            </script>
            <!-- <script src="./dist/scripts/bundle.min.js"></script> -->
        </main>
        <script>
          if (typeof Promise !== "function")
          document.write('<script src="//cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.min.js"><\/script>');
        </script>
</body>
</html>