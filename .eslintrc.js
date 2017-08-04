module.exports = {
    "extends": "airbnb",
	"rules": {	
	"linebreak-style": 0,
	"indent": 2,
	"no-mutable-exports" : 0,
	},
	"env": {
        "browser": true,
        "node": true
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ]
};