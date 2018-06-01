All scripts are stored in /src. Jsx files are in scripts/, css files are in /styles.

Run gulp to compile any changes made the source code. The output file will be called bundle.js, and is located in /dist/scripts. Drag this file over to the corresponding folder on agoquality-tmp to overwrite the current script on the web server.

Folder hierarchy structure is like this:
	actions: folder for performing certain actions (like loading data). Unlikely that this will ever need to be modified. If this does need to be modified, read some documentation
		about React-Redux.
	constants: Just variable names, no need to ever touch this folder.
	components: Contains source code for rendering certain components in TRAAS, such as dropdowns. Definitely possible to have errors/bugs.
	containers: Containers for most TRAAS Components. FormContainer is where the entire addendum form is rendered.
	utils: No need to touch this. Contains some utility functions for creating reducers.
	reducers: Contains files that map states to the global store. (See React-Redux). Unlikely this will ever need to be modified. Basically each action will call the reducer to set a state in the store.
	views: Renders the main routes of TRAAS, such as /inprogress, /finalized, etc. Also possible to have errors here.
	
Main file is App.jsx.

git repository is on J:\Metrology\TRAAS.

To install to your own computer, run git clone J:\Metrology\Traas on your target directory. Node/Npm may also need to be installed. In that case, run npm install in the target directory to install of the required packages.

Server-side code is located at data/secure/TRAAS, and var/www/html/TRAAS. Index.php is the html file that renders the entire page. (Shouldn't ever need to change this)

Common errors you might face:
Syntax Error (Unexpected End of Input) - Just recompile, means that something got cut off during compilation.
Did you forget to export ... component? - A lot of times, this is the difference between import test from 'test' and import { test } from 'test. Has to do with default exports. Use {} when importing a non default export.

The debug console is really useful for debugging! If there's any errors, you can always email me at dillonhu@ucla.edu