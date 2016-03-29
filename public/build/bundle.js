(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],2:[function(require,module,exports){
/*! mockjs 02-06-2015 22:03:43 */
/*! src/mock-prefix.js */
/*!
    Mock - 模拟请求 & 模拟数据
    https://github.com/nuysoft/Mock
    墨智 nuysoft@gmail.com
*/
(function(undefined) {
    var Mock = {
        version: "0.1.9",
        _mocked: {}
    };
    /*! src/util.js */
    var Util = function() {
        var Util = {};
        Util.extend = function extend() {
            var target = arguments[0] || {}, i = 1, length = arguments.length, options, name, src, copy, clone;
            if (length === 1) {
                target = this;
                i = 0;
            }
            for (;i < length; i++) {
                options = arguments[i];
                if (!options) continue;
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) continue;
                    if (copy === undefined) continue;
                    if (Util.isArray(copy) || Util.isObject(copy)) {
                        if (Util.isArray(copy)) clone = src && Util.isArray(src) ? src : [];
                        if (Util.isObject(copy)) clone = src && Util.isObject(src) ? src : {};
                        target[name] = Util.extend(clone, copy);
                    } else {
                        target[name] = copy;
                    }
                }
            }
            return target;
        };
        Util.each = function each(obj, iterator, context) {
            var i, key;
            if (this.type(obj) === "number") {
                for (i = 0; i < obj; i++) {
                    iterator(i, i);
                }
            } else if (obj.length === +obj.length) {
                for (i = 0; i < obj.length; i++) {
                    if (iterator.call(context, obj[i], i, obj) === false) break;
                }
            } else {
                for (key in obj) {
                    if (iterator.call(context, obj[key], key, obj) === false) break;
                }
            }
        };
        Util.type = function type(obj) {
            return obj === null || obj === undefined ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
        };
        Util.each("String Object Array RegExp Function".split(" "), function(value) {
            Util["is" + value] = function(obj) {
                return Util.type(obj) === value.toLowerCase();
            };
        });
        Util.isObjectOrArray = function(value) {
            return Util.isObject(value) || Util.isArray(value);
        };
        Util.isNumeric = function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        };
        Util.keys = function(obj) {
            var keys = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) keys.push(key);
            }
            return keys;
        };
        Util.values = function(obj) {
            var values = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) values.push(obj[key]);
            }
            return values;
        };
        Util.heredoc = function heredoc(fn) {
            return fn.toString().replace(/^[^\/]+\/\*!?/, "").replace(/\*\/[^\/]+$/, "").replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
        };
        Util.noop = function() {};
        return Util;
    }();
    /*! src/random.js */
    var Random = function() {
        var Random = {
            extend: Util.extend
        };
        Random.extend({
            "boolean": function(min, max, cur) {
                if (cur !== undefined) {
                    min = typeof min !== "undefined" && !isNaN(min) ? parseInt(min, 10) : 1;
                    max = typeof max !== "undefined" && !isNaN(max) ? parseInt(max, 10) : 1;
                    return Math.random() > 1 / (min + max) * min ? !cur : cur;
                }
                return Math.random() >= .5;
            },
            bool: function(min, max, cur) {
                return this.boolean(min, max, cur);
            },
            natural: function(min, max) {
                min = typeof min !== "undefined" ? parseInt(min, 10) : 0;
                max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
                return Math.round(Math.random() * (max - min)) + min;
            },
            integer: function(min, max) {
                min = typeof min !== "undefined" ? parseInt(min, 10) : -9007199254740992;
                max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
                return Math.round(Math.random() * (max - min)) + min;
            },
            "int": function(min, max) {
                return this.integer(min, max);
            },
            "float": function(min, max, dmin, dmax) {
                dmin = dmin === undefined ? 0 : dmin;
                dmin = Math.max(Math.min(dmin, 17), 0);
                dmax = dmax === undefined ? 17 : dmax;
                dmax = Math.max(Math.min(dmax, 17), 0);
                var ret = this.integer(min, max) + ".";
                for (var i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
                    ret += this.character("number");
                }
                return parseFloat(ret, 10);
            },
            character: function(pool) {
                var pools = {
                    lower: "abcdefghijklmnopqrstuvwxyz",
                    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                    number: "0123456789",
                    symbol: "!@#$%^&*()[]"
                };
                pools.alpha = pools.lower + pools.upper;
                pools["undefined"] = pools.lower + pools.upper + pools.number + pools.symbol;
                pool = pools[("" + pool).toLowerCase()] || pool;
                return pool.charAt(Random.natural(0, pool.length - 1));
            },
            "char": function(pool) {
                return this.character(pool);
            },
            string: function(pool, min, max) {
                var length;
                if (arguments.length === 3) {
                    length = Random.natural(min, max);
                }
                if (arguments.length === 2) {
                    if (typeof arguments[0] === "string") {
                        length = min;
                    } else {
                        length = Random.natural(pool, min);
                        pool = undefined;
                    }
                }
                if (arguments.length === 1) {
                    length = pool;
                    pool = undefined;
                }
                if (arguments.length === 0) {
                    length = Random.natural(3, 7);
                }
                var text = "";
                for (var i = 0; i < length; i++) {
                    text += Random.character(pool);
                }
                return text;
            },
            str: function(pool, min, max) {
                return this.string(pool, min, max);
            },
            range: function(start, stop, step) {
                if (arguments.length <= 1) {
                    stop = start || 0;
                    start = 0;
                }
                step = arguments[2] || 1;
                start = +start, stop = +stop, step = +step;
                var len = Math.max(Math.ceil((stop - start) / step), 0);
                var idx = 0;
                var range = new Array(len);
                while (idx < len) {
                    range[idx++] = start;
                    start += step;
                }
                return range;
            }
        });
        Random.extend({
            patternLetters: {
                yyyy: "getFullYear",
                yy: function(date) {
                    return ("" + date.getFullYear()).slice(2);
                },
                y: "yy",
                MM: function(date) {
                    var m = date.getMonth() + 1;
                    return m < 10 ? "0" + m : m;
                },
                M: function(date) {
                    return date.getMonth() + 1;
                },
                dd: function(date) {
                    var d = date.getDate();
                    return d < 10 ? "0" + d : d;
                },
                d: "getDate",
                HH: function(date) {
                    var h = date.getHours();
                    return h < 10 ? "0" + h : h;
                },
                H: "getHours",
                hh: function(date) {
                    var h = date.getHours() % 12;
                    return h < 10 ? "0" + h : h;
                },
                h: function(date) {
                    return date.getHours() % 12;
                },
                mm: function(date) {
                    var m = date.getMinutes();
                    return m < 10 ? "0" + m : m;
                },
                m: "getMinutes",
                ss: function(date) {
                    var s = date.getSeconds();
                    return s < 10 ? "0" + s : s;
                },
                s: "getSeconds",
                SS: function(date) {
                    var ms = date.getMilliseconds();
                    return ms < 10 && "00" + ms || ms < 100 && "0" + ms || ms;
                },
                S: "getMilliseconds",
                A: function(date) {
                    return date.getHours() < 12 ? "AM" : "PM";
                },
                a: function(date) {
                    return date.getHours() < 12 ? "am" : "pm";
                },
                T: "getTime"
            }
        });
        Random.extend({
            rformat: new RegExp(function() {
                var re = [];
                for (var i in Random.patternLetters) re.push(i);
                return "(" + re.join("|") + ")";
            }(), "g"),
            format: function(date, format) {
                var patternLetters = Random.patternLetters, rformat = Random.rformat;
                return format.replace(rformat, function($0, flag) {
                    return typeof patternLetters[flag] === "function" ? patternLetters[flag](date) : patternLetters[flag] in patternLetters ? arguments.callee($0, patternLetters[flag]) : date[patternLetters[flag]]();
                });
            },
            randomDate: function(min, max) {
                min = min === undefined ? new Date(0) : min;
                max = max === undefined ? new Date() : max;
                return new Date(Math.random() * (max.getTime() - min.getTime()));
            },
            date: function(format) {
                format = format || "yyyy-MM-dd";
                return this.format(this.randomDate(), format);
            },
            time: function(format) {
                format = format || "HH:mm:ss";
                return this.format(this.randomDate(), format);
            },
            datetime: function(format) {
                format = format || "yyyy-MM-dd HH:mm:ss";
                return this.format(this.randomDate(), format);
            },
            now: function(unit, format) {
                if (arguments.length === 1) {
                    if (!/year|month|week|day|hour|minute|second|week/.test(unit)) {
                        format = unit;
                        unit = "";
                    }
                }
                unit = (unit || "").toLowerCase();
                format = format || "yyyy-MM-dd HH:mm:ss";
                var date = new Date();
                switch (unit) {
                  case "year":
                    date.setMonth(0);

                  case "month":
                    date.setDate(1);

                  case "week":
                  case "day":
                    date.setHours(0);

                  case "hour":
                    date.setMinutes(0);

                  case "minute":
                    date.setSeconds(0);

                  case "second":
                    date.setMilliseconds(0);
                }
                switch (unit) {
                  case "week":
                    date.setDate(date.getDate() - date.getDay());
                }
                return this.format(date, format);
            }
        });
        Random.extend({
            ad_size: [ "300x250", "250x250", "240x400", "336x280", "180x150", "720x300", "468x60", "234x60", "88x31", "120x90", "120x60", "120x240", "125x125", "728x90", "160x600", "120x600", "300x600" ],
            screen_size: [ "320x200", "320x240", "640x480", "800x480", "800x480", "1024x600", "1024x768", "1280x800", "1440x900", "1920x1200", "2560x1600" ],
            video_size: [ "720x480", "768x576", "1280x720", "1920x1080" ],
            image: function(size, background, foreground, format, text) {
                if (arguments.length === 4) {
                    text = format;
                    format = undefined;
                }
                if (arguments.length === 3) {
                    text = foreground;
                    foreground = undefined;
                }
                if (!size) size = this.pick(this.ad_size);
                if (background && ~background.indexOf("#")) background = background.slice(1);
                if (foreground && ~foreground.indexOf("#")) foreground = foreground.slice(1);
                return "http://dummyimage.com/" + size + (background ? "/" + background : "") + (foreground ? "/" + foreground : "") + (format ? "." + format : "") + (text ? "&text=" + text : "");
            },
            img: function() {
                return this.image.apply(this, arguments);
            }
        });
        Random.extend({
            brandColors: {
                "4ormat": "#fb0a2a",
                "500px": "#02adea",
                "About.me (blue)": "#00405d",
                "About.me (yellow)": "#ffcc33",
                Addvocate: "#ff6138",
                Adobe: "#ff0000",
                Aim: "#fcd20b",
                Amazon: "#e47911",
                Android: "#a4c639",
                "Angie's List": "#7fbb00",
                AOL: "#0060a3",
                Atlassian: "#003366",
                Behance: "#053eff",
                "Big Cartel": "#97b538",
                bitly: "#ee6123",
                Blogger: "#fc4f08",
                Boeing: "#0039a6",
                "Booking.com": "#003580",
                Carbonmade: "#613854",
                Cheddar: "#ff7243",
                "Code School": "#3d4944",
                Delicious: "#205cc0",
                Dell: "#3287c1",
                Designmoo: "#e54a4f",
                Deviantart: "#4e6252",
                "Designer News": "#2d72da",
                Devour: "#fd0001",
                DEWALT: "#febd17",
                "Disqus (blue)": "#59a3fc",
                "Disqus (orange)": "#db7132",
                Dribbble: "#ea4c89",
                Dropbox: "#3d9ae8",
                Drupal: "#0c76ab",
                Dunked: "#2a323a",
                eBay: "#89c507",
                Ember: "#f05e1b",
                Engadget: "#00bdf6",
                Envato: "#528036",
                Etsy: "#eb6d20",
                Evernote: "#5ba525",
                "Fab.com": "#dd0017",
                Facebook: "#3b5998",
                Firefox: "#e66000",
                "Flickr (blue)": "#0063dc",
                "Flickr (pink)": "#ff0084",
                Forrst: "#5b9a68",
                Foursquare: "#25a0ca",
                Garmin: "#007cc3",
                GetGlue: "#2d75a2",
                Gimmebar: "#f70078",
                GitHub: "#171515",
                "Google Blue": "#0140ca",
                "Google Green": "#16a61e",
                "Google Red": "#dd1812",
                "Google Yellow": "#fcca03",
                "Google+": "#dd4b39",
                Grooveshark: "#f77f00",
                Groupon: "#82b548",
                "Hacker News": "#ff6600",
                HelloWallet: "#0085ca",
                "Heroku (light)": "#c7c5e6",
                "Heroku (dark)": "#6567a5",
                HootSuite: "#003366",
                Houzz: "#73ba37",
                HTML5: "#ec6231",
                IKEA: "#ffcc33",
                IMDb: "#f3ce13",
                Instagram: "#3f729b",
                Intel: "#0071c5",
                Intuit: "#365ebf",
                Kickstarter: "#76cc1e",
                kippt: "#e03500",
                Kodery: "#00af81",
                LastFM: "#c3000d",
                LinkedIn: "#0e76a8",
                Livestream: "#cf0005",
                Lumo: "#576396",
                Mixpanel: "#a086d3",
                Meetup: "#e51937",
                Nokia: "#183693",
                NVIDIA: "#76b900",
                Opera: "#cc0f16",
                Path: "#e41f11",
                "PayPal (dark)": "#1e477a",
                "PayPal (light)": "#3b7bbf",
                Pinboard: "#0000e6",
                Pinterest: "#c8232c",
                PlayStation: "#665cbe",
                Pocket: "#ee4056",
                Prezi: "#318bff",
                Pusha: "#0f71b4",
                Quora: "#a82400",
                "QUOTE.fm": "#66ceff",
                Rdio: "#008fd5",
                Readability: "#9c0000",
                "Red Hat": "#cc0000",
                Resource: "#7eb400",
                Rockpack: "#0ba6ab",
                Roon: "#62b0d9",
                RSS: "#ee802f",
                Salesforce: "#1798c1",
                Samsung: "#0c4da2",
                Shopify: "#96bf48",
                Skype: "#00aff0",
                Snagajob: "#f47a20",
                Softonic: "#008ace",
                SoundCloud: "#ff7700",
                "Space Box": "#f86960",
                Spotify: "#81b71a",
                Sprint: "#fee100",
                Squarespace: "#121212",
                StackOverflow: "#ef8236",
                Staples: "#cc0000",
                "Status Chart": "#d7584f",
                Stripe: "#008cdd",
                StudyBlue: "#00afe1",
                StumbleUpon: "#f74425",
                "T-Mobile": "#ea0a8e",
                Technorati: "#40a800",
                "The Next Web": "#ef4423",
                Treehouse: "#5cb868",
                Trulia: "#5eab1f",
                Tumblr: "#34526f",
                "Twitch.tv": "#6441a5",
                Twitter: "#00acee",
                TYPO3: "#ff8700",
                Ubuntu: "#dd4814",
                Ustream: "#3388ff",
                Verizon: "#ef1d1d",
                Vimeo: "#86c9ef",
                Vine: "#00a478",
                Virb: "#06afd8",
                "Virgin Media": "#cc0000",
                Wooga: "#5b009c",
                "WordPress (blue)": "#21759b",
                "WordPress (orange)": "#d54e21",
                "WordPress (grey)": "#464646",
                Wunderlist: "#2b88d9",
                XBOX: "#9bc848",
                XING: "#126567",
                "Yahoo!": "#720e9e",
                Yandex: "#ffcc00",
                Yelp: "#c41200",
                YouTube: "#c4302b",
                Zalongo: "#5498dc",
                Zendesk: "#78a300",
                Zerply: "#9dcc7a",
                Zootool: "#5e8b1d"
            },
            brands: function() {
                var brands = [];
                for (var b in this.brandColors) {
                    brands.push(b);
                }
                return brands;
            },
            dataImage: function(size, text) {
                var canvas = typeof document !== "undefined" && document.createElement("canvas"), ctx = canvas && canvas.getContext && canvas.getContext("2d");
                if (!canvas || !ctx) return "";
                if (!size) size = this.pick(this.ad_size);
                text = text !== undefined ? text : size;
                size = size.split("x");
                var width = parseInt(size[0], 10), height = parseInt(size[1], 10), background = this.brandColors[this.pick(this.brands())], foreground = "#FFF", text_height = 14, font = "sans-serif";
                canvas.width = width;
                canvas.height = height;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = background;
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = foreground;
                ctx.font = "bold " + text_height + "px " + font;
                ctx.fillText(text, width / 2, height / 2, width);
                return canvas.toDataURL("image/png");
            }
        });
        Random.extend({
            color: function() {
                var colour = Math.floor(Math.random() * (16 * 16 * 16 * 16 * 16 * 16 - 1)).toString(16);
                colour = "#" + ("000000" + colour).slice(-6);
                return colour;
            }
        });
        Random.extend({
            capitalize: function(word) {
                return (word + "").charAt(0).toUpperCase() + (word + "").substr(1);
            },
            upper: function(str) {
                return (str + "").toUpperCase();
            },
            lower: function(str) {
                return (str + "").toLowerCase();
            },
            pick: function(arr) {
                arr = arr || [];
                return arr[this.natural(0, arr.length - 1)];
            },
            shuffle: function(arr) {
                arr = arr || [];
                var old = arr.slice(0), result = [], index = 0, length = old.length;
                for (var i = 0; i < length; i++) {
                    index = this.natural(0, old.length - 1);
                    result.push(old[index]);
                    old.splice(index, 1);
                }
                return result;
            }
        });
        Random.extend({
            paragraph: function(min, max) {
                var len;
                if (arguments.length === 0) len = Random.natural(3, 7);
                if (arguments.length === 1) len = max = min;
                if (arguments.length === 2) {
                    min = parseInt(min, 10);
                    max = parseInt(max, 10);
                    len = Random.natural(min, max);
                }
                var arr = [];
                for (var i = 0; i < len; i++) {
                    arr.push(Random.sentence());
                }
                return arr.join(" ");
            },
            sentence: function(min, max) {
                var len;
                if (arguments.length === 0) len = Random.natural(12, 18);
                if (arguments.length === 1) len = max = min;
                if (arguments.length === 2) {
                    min = parseInt(min, 10);
                    max = parseInt(max, 10);
                    len = Random.natural(min, max);
                }
                var arr = [];
                for (var i = 0; i < len; i++) {
                    arr.push(Random.word());
                }
                return Random.capitalize(arr.join(" ")) + ".";
            },
            word: function(min, max) {
                var len;
                if (arguments.length === 0) len = Random.natural(3, 10);
                if (arguments.length === 1) len = max = min;
                if (arguments.length === 2) {
                    min = parseInt(min, 10);
                    max = parseInt(max, 10);
                    len = Random.natural(min, max);
                }
                var result = "";
                for (var i = 0; i < len; i++) {
                    result += Random.character("lower");
                }
                return result;
            },
            title: function(min, max) {
                var len, result = [];
                if (arguments.length === 0) len = Random.natural(3, 7);
                if (arguments.length === 1) len = max = min;
                if (arguments.length === 2) {
                    min = parseInt(min, 10);
                    max = parseInt(max, 10);
                    len = Random.natural(min, max);
                }
                for (var i = 0; i < len; i++) {
                    result.push(this.capitalize(this.word()));
                }
                return result.join(" ");
            }
        });
        Random.extend({
            first: function() {
                var names = [ "James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric" ].concat([ "Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna" ]);
                return this.pick(names);
            },
            last: function() {
                var names = [ "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen" ];
                return this.pick(names);
            },
            name: function(middle) {
                return this.first() + " " + (middle ? this.first() + " " : "") + this.last();
            },
            chineseName: function(count) {
                var surnames = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐".split("");
                var forenames = "贵福生龙元全国胜学祥才发武新利清飞彬富顺信子杰涛昌成康星光天达安岩中茂进林有坚和彪博绍功松善厚庆磊民友裕河哲江超浩亮政谦亨奇固之轮翰朗伯宏言若鸣朋斌梁栋维启克伦翔旭鹏月莺媛艳瑞凡佳嘉琼勤珍贞莉桂娣叶璧璐娅琦晶妍茜秋珊莎锦黛青倩婷姣婉娴瑾颖露瑶怡婵雁蓓".split("");
                if (typeof count !== "number") {
                    count = Math.random() > .66 ? 2 : 3;
                }
                var surname = this.pick(surnames);
                var forename = "";
                count = count - 1;
                for (var i = 0; i < count; i++) {
                    forename += this.pick(forenames);
                }
                return surname + forename;
            },
            cname: function(count) {
                return this.chineseName(count);
            }
        });
        Random.extend({
            url: function() {
                return "http://" + this.domain() + "/" + this.word();
            },
            domain: function(tld) {
                return this.word() + "." + (tld || this.tld());
            },
            email: function(domain) {
                return this.character("lower") + "." + this.last().toLowerCase() + "@" + this.last().toLowerCase() + "." + this.tld();
            },
            ip: function() {
                return this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255);
            },
            tlds: [ "com", "org", "edu", "gov", "co.uk", "net", "io" ],
            tld: function() {
                return this.pick(this.tlds);
            }
        });
        Random.extend({
            areas: [ "东北", "华北", "华东", "华中", "华南", "西南", "西北" ],
            area: function() {
                return this.pick(this.areas);
            },
            regions: [ "110000 北京市", "120000 天津市", "130000 河北省", "140000 山西省", "150000 内蒙古自治区", "210000 辽宁省", "220000 吉林省", "230000 黑龙江省", "310000 上海市", "320000 江苏省", "330000 浙江省", "340000 安徽省", "350000 福建省", "360000 江西省", "370000 山东省", "410000 河南省", "420000 湖北省", "430000 湖南省", "440000 广东省", "450000 广西壮族自治区", "460000 海南省", "500000 重庆市", "510000 四川省", "520000 贵州省", "530000 云南省", "540000 西藏自治区", "610000 陕西省", "620000 甘肃省", "630000 青海省", "640000 宁夏回族自治区", "650000 新疆维吾尔自治区", "650000 新疆维吾尔自治区", "710000 台湾省", "810000 香港特别行政区", "820000 澳门特别行政区" ],
            region: function() {
                return this.pick(this.regions).split(" ")[1];
            },
            address: function() {},
            city: function() {},
            phone: function() {},
            areacode: function() {},
            street: function() {},
            street_suffixes: function() {},
            street_suffix: function() {},
            states: function() {},
            state: function() {},
            zip: function(len) {
                var zip = "";
                for (var i = 0; i < (len || 6); i++) zip += this.natural(0, 9);
                return zip;
            }
        });
        Random.extend({
            todo: function() {
                return "todo";
            }
        });
        Random.extend({
            d4: function() {
                return this.natural(1, 4);
            },
            d6: function() {
                return this.natural(1, 6);
            },
            d8: function() {
                return this.natural(1, 8);
            },
            d12: function() {
                return this.natural(1, 12);
            },
            d20: function() {
                return this.natural(1, 20);
            },
            d100: function() {
                return this.natural(1, 100);
            },
            guid: function() {
                var pool = "ABCDEF1234567890", guid = this.string(pool, 8) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 12);
                return guid;
            },
            id: function() {
                var id, sum = 0, rank = [ "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2" ], last = [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ];
                id = this.pick(this.regions).split(" ")[0] + this.date("yyyyMMdd") + this.string("number", 3);
                for (var i = 0; i < id.length; i++) {
                    sum += id[i] * rank[i];
                }
                id += last[sum % 11];
                return id;
            },
            autoIncrementInteger: 0,
            increment: function(step) {
                return this.autoIncrementInteger += +step || 1;
            },
            inc: function(step) {
                return this.increment(step);
            }
        });
        return Random;
    }();
    /*! src/mock.js */
    var rkey = /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/, rrange = /([\+\-]?\d+)-?([\+\-]?\d+)?/, rplaceholder = /\\*@([^@#%&()\?\s\/\.]+)(?:\((.*?)\))?/g;
    Mock.extend = Util.extend;
    Mock.mock = function(rurl, rtype, template) {
        if (arguments.length === 1) {
            return Handle.gen(rurl);
        }
        if (arguments.length === 2) {
            template = rtype;
            rtype = undefined;
        }
        Mock._mocked[rurl + (rtype || "")] = {
            rurl: rurl,
            rtype: rtype,
            template: template
        };
        return Mock;
    };
    var Handle = {
        extend: Util.extend
    };
    Handle.rule = function(name) {
        name = (name || "") + "";
        var parameters = (name || "").match(rkey), range = parameters && parameters[3] && parameters[3].match(rrange), min = range && parseInt(range[1], 10), max = range && parseInt(range[2], 10), count = range ? !range[2] && parseInt(range[1], 10) || Random.integer(min, max) : 1, decimal = parameters && parameters[4] && parameters[4].match(rrange), dmin = decimal && parseInt(decimal[1], 10), dmax = decimal && parseInt(decimal[2], 10), dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random.integer(dmin, dmax) : 0, point = parameters && parameters[4];
        return {
            parameters: parameters,
            range: range,
            min: min,
            max: max,
            count: count,
            decimal: decimal,
            dmin: dmin,
            dmax: dmax,
            dcount: dcount,
            point: point
        };
    };
    Handle.gen = function(template, name, context) {
        name = name = (name || "") + "";
        context = context || {};
        context = {
            path: context.path || [],
            templatePath: context.templatePath || [],
            currentContext: context.currentContext,
            templateCurrentContext: context.templateCurrentContext || template,
            root: context.root,
            templateRoot: context.templateRoot
        };
        var rule = Handle.rule(name);
        var type = Util.type(template);
        if (Handle[type]) {
            return Handle[type]({
                type: type,
                template: template,
                name: name,
                parsedName: name ? name.replace(rkey, "$1") : name,
                rule: rule,
                context: context
            });
        }
        return template;
    };
    Handle.extend({
        array: function(options) {
            var result = [], i, j;
            if (!options.rule.parameters) {
                for (i = 0; i < options.template.length; i++) {
                    options.context.path.push(i);
                    result.push(Handle.gen(options.template[i], i, {
                        currentContext: result,
                        templateCurrentContext: options.template,
                        path: options.context.path
                    }));
                    options.context.path.pop();
                }
            } else {
                if (options.rule.count === 1 && options.template.length > 1) {
                    options.context.path.push(options.name);
                    result = Random.pick(Handle.gen(options.template, undefined, {
                        currentContext: result,
                        templateCurrentContext: options.template,
                        path: options.context.path
                    }));
                    options.context.path.pop();
                } else {
                    for (i = 0; i < options.rule.count; i++) {
                        j = 0;
                        do {
                            result.push(Handle.gen(options.template[j++]));
                        } while (j < options.template.length);
                    }
                }
            }
            return result;
        },
        object: function(options) {
            var result = {}, keys, fnKeys, key, parsedKey, inc, i;
            if (options.rule.min) {
                keys = Util.keys(options.template);
                keys = Random.shuffle(keys);
                keys = keys.slice(0, options.rule.count);
                for (i = 0; i < keys.length; i++) {
                    key = keys[i];
                    parsedKey = key.replace(rkey, "$1");
                    options.context.path.push(parsedKey);
                    result[parsedKey] = Handle.gen(options.template[key], key, {
                        currentContext: result,
                        templateCurrentContext: options.template,
                        path: options.context.path
                    });
                    options.context.path.pop();
                }
            } else {
                keys = [];
                fnKeys = [];
                for (key in options.template) {
                    (typeof options.template[key] === "function" ? fnKeys : keys).push(key);
                }
                keys = keys.concat(fnKeys);
                for (i = 0; i < keys.length; i++) {
                    key = keys[i];
                    parsedKey = key.replace(rkey, "$1");
                    options.context.path.push(parsedKey);
                    result[parsedKey] = Handle.gen(options.template[key], key, {
                        currentContext: result,
                        templateCurrentContext: options.template,
                        path: options.context.path
                    });
                    options.context.path.pop();
                    inc = key.match(rkey);
                    if (inc && inc[2] && Util.type(options.template[key]) === "number") {
                        options.template[key] += parseInt(inc[2], 10);
                    }
                }
            }
            return result;
        },
        number: function(options) {
            var result, parts, i;
            if (options.rule.point) {
                options.template += "";
                parts = options.template.split(".");
                parts[0] = options.rule.range ? options.rule.count : parts[0];
                parts[1] = (parts[1] || "").slice(0, options.rule.dcount);
                for (i = 0; parts[1].length < options.rule.dcount; i++) {
                    parts[1] += Random.character("number");
                }
                result = parseFloat(parts.join("."), 10);
            } else {
                result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template;
            }
            return result;
        },
        "boolean": function(options) {
            var result;
            result = options.rule.parameters ? Random.bool(options.rule.min, options.rule.max, options.template) : options.template;
            return result;
        },
        string: function(options) {
            var result = "", i, placeholders, ph, phed;
            if (options.template.length) {
                for (i = 0; i < options.rule.count; i++) {
                    result += options.template;
                }
                placeholders = result.match(rplaceholder) || [];
                for (i = 0; i < placeholders.length; i++) {
                    ph = placeholders[i];
                    if (/^\\/.test(ph)) {
                        placeholders.splice(i--, 1);
                        continue;
                    }
                    phed = Handle.placeholder(ph, options.context.currentContext, options.context.templateCurrentContext);
                    if (placeholders.length === 1 && ph === result && typeof phed !== typeof result) {
                        result = phed;
                        break;
                    }
                    result = result.replace(ph, phed);
                }
            } else {
                result = options.rule.range ? Random.string(options.rule.count) : options.template;
            }
            return result;
        },
        "function": function(options) {
            return options.template.call(options.context.currentContext);
        }
    });
    Handle.extend({
        _all: function() {
            var re = {};
            for (var key in Random) re[key.toLowerCase()] = key;
            return re;
        },
        placeholder: function(placeholder, obj, templateContext) {
            rplaceholder.exec("");
            var parts = rplaceholder.exec(placeholder), key = parts && parts[1], lkey = key && key.toLowerCase(), okey = this._all()[lkey], params = parts && parts[2] || "";
            try {
                params = eval("(function(){ return [].splice.call(arguments, 0 ) })(" + params + ")");
            } catch (error) {
                params = parts[2].split(/,\s*/);
            }
            if (obj && key in obj) return obj[key];
            if (templateContext && typeof templateContext === "object" && key in templateContext && placeholder !== templateContext[key]) {
                templateContext[key] = Handle.gen(templateContext[key], key, {
                    currentContext: obj,
                    templateCurrentContext: templateContext
                });
                return templateContext[key];
            }
            if (!(key in Random) && !(lkey in Random) && !(okey in Random)) return placeholder;
            for (var i = 0; i < params.length; i++) {
                rplaceholder.exec("");
                if (rplaceholder.test(params[i])) {
                    params[i] = Handle.placeholder(params[i], obj);
                }
            }
            var handle = Random[key] || Random[lkey] || Random[okey];
            switch (Util.type(handle)) {
              case "array":
                return Random.pick(handle);

              case "function":
                var re = handle.apply(Random, params);
                if (re === undefined) re = "";
                return re;
            }
        }
    });
    /*! src/mockjax.js */
    function find(options) {
        for (var sUrlType in Mock._mocked) {
            var item = Mock._mocked[sUrlType];
            if ((!item.rurl || match(item.rurl, options.url)) && (!item.rtype || match(item.rtype, options.type.toLowerCase()))) {
                return item;
            }
        }
        function match(expected, actual) {
            if (Util.type(expected) === "string") {
                return expected === actual;
            }
            if (Util.type(expected) === "regexp") {
                return expected.test(actual);
            }
        }
    }
    function convert(item, options) {
        return Util.isFunction(item.template) ? item.template(options) : Mock.mock(item.template);
    }
    Mock.mockjax = function mockjax(jQuery) {
        function mockxhr() {
            return {
                readyState: 4,
                status: 200,
                statusText: "",
                open: jQuery.noop,
                send: function() {
                    if (this.onload) this.onload();
                },
                setRequestHeader: jQuery.noop,
                getAllResponseHeaders: jQuery.noop,
                getResponseHeader: jQuery.noop,
                statusCode: jQuery.noop,
                abort: jQuery.noop
            };
        }
        function prefilter(options, originalOptions, jqXHR) {
            var item = find(options);
            if (item) {
                options.dataFilter = options.converters["text json"] = options.converters["text jsonp"] = options.converters["text script"] = options.converters["script json"] = function() {
                    return convert(item, options);
                };
                options.xhr = mockxhr;
                if (originalOptions.dataType !== "script") return "json";
            }
        }
        jQuery.ajaxPrefilter("json jsonp script", prefilter);
        return Mock;
    };
    if (typeof jQuery != "undefined") Mock.mockjax(jQuery);
    if (typeof Zepto != "undefined") {
        Mock.mockjax = function(Zepto) {
            var __original_ajax = Zepto.ajax;
            var xhr = {
                readyState: 4,
                responseText: "",
                responseXML: null,
                state: 2,
                status: 200,
                statusText: "success",
                timeoutTimer: null
            };
            Zepto.ajax = function(options) {
                var item = find(options);
                if (item) {
                    var data = Mock.mock(item.template);
                    if (options.success) options.success(data, xhr, options);
                    if (options.complete) options.complete(xhr.status, xhr, options);
                    return xhr;
                }
                return __original_ajax.call(Zepto, options);
            };
        };
        Mock.mockjax(Zepto);
    }
    if (typeof KISSY != "undefined" && KISSY.add) {
        Mock.mockjax = function mockjax(KISSY) {
            var _original_ajax = KISSY.io;
            var xhr = {
                readyState: 4,
                responseText: "",
                responseXML: null,
                state: 2,
                status: 200,
                statusText: "success",
                timeoutTimer: null
            };
            KISSY.io = function(options) {
                var item = find(options);
                if (item) {
                    var data = Mock.mock(item.template);
                    if (options.success) options.success(data, xhr, options);
                    if (options.complete) options.complete(xhr.status, xhr, options);
                    return xhr;
                }
                return _original_ajax.apply(this, arguments);
            };
            for (var name in _original_ajax) {
                KISSY.io[name] = _original_ajax[name];
            }
        };
    }
    /*! src/expose.js */
    Mock.Util = Util;
    Mock.Random = Random;
    Mock.heredoc = Util.heredoc;
    if (typeof module === "object" && module.exports) {
        module.exports = Mock;
    } else if (typeof define === "function" && define.amd) {
        define("mock", [], function() {
            return Mock;
        });
        define("mockjs", [], function() {
            return Mock;
        });
    } else if (typeof define === "function" && define.cmd) {
        define(function() {
            return Mock;
        });
    }
    this.Mock = Mock;
    this.Random = Random;
    if (typeof KISSY != "undefined") {
        Util.each([ "mock", "components/mock/", "mock/dist/mock", "gallery/Mock/0.1.9/" ], function register(name) {
            KISSY.add(name, function(S) {
                Mock.mockjax(S);
                return Mock;
            }, {
                requires: [ "ajax" ]
            });
        });
    }
    /*! src/mock4tpl.js */
    (function(undefined) {
        var Mock4Tpl = {
            version: "0.0.1"
        };
        if (!this.Mock) module.exports = Mock4Tpl;
        Mock.tpl = function(input, options, helpers, partials) {
            return Mock4Tpl.mock(input, options, helpers, partials);
        };
        Mock.parse = function(input) {
            return Handlebars.parse(input);
        };
        Mock4Tpl.mock = function(input, options, helpers, partials) {
            helpers = helpers ? Util.extend({}, helpers, Handlebars.helpers) : Handlebars.helpers;
            partials = partials ? Util.extend({}, partials, Handlebars.partials) : Handlebars.partials;
            return Handle.gen(input, null, options, helpers, partials);
        };
        var Handle = {
            debug: Mock4Tpl.debug || false,
            extend: Util.extend
        };
        Handle.gen = function(node, context, options, helpers, partials) {
            if (Util.isString(node)) {
                var ast = Handlebars.parse(node);
                options = Handle.parseOptions(node, options);
                var data = Handle.gen(ast, context, options, helpers, partials);
                return data;
            }
            context = context || [ {} ];
            options = options || {};
            if (this[node.type] === Util.noop) return;
            options.__path = options.__path || [];
            if (Mock4Tpl.debug || Handle.debug) {
                console.log();
                console.group("[" + node.type + "]", JSON.stringify(node));
                console.log("[options]", options.__path.length, JSON.stringify(options));
            }
            var preLength = options.__path.length;
            this[node.type](node, context, options, helpers, partials);
            options.__path.splice(preLength);
            if (Mock4Tpl.debug || Handle.debug) {
                console.groupEnd();
            }
            return context[context.length - 1];
        };
        Handle.parseOptions = function(input, options) {
            var rComment = /<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g;
            var comments = input.match(rComment), ret = {}, i, ma, option;
            for (i = 0; comments && i < comments.length; i++) {
                rComment.lastIndex = 0;
                ma = rComment.exec(comments[i]);
                if (ma) {
                    option = new Function("return " + ma[1]);
                    option = option();
                    Util.extend(ret, option);
                }
            }
            return Util.extend(ret, options);
        };
        Handle.val = function(name, options, context, def) {
            if (name !== options.__path[options.__path.length - 1]) throw new Error(name + "!==" + options.__path);
            if (Mock4Tpl.debug || Handle.debug) console.log("[options]", name, options.__path);
            if (def !== undefined) def = Mock.mock(def);
            if (options) {
                var mocked = Mock.mock(options);
                if (Util.isString(mocked)) return mocked;
                if (name in mocked) {
                    return mocked[name];
                }
            }
            if (Util.isArray(context[0])) return {};
            return def !== undefined ? def : name || Random.word();
        };
        Handle.program = function(node, context, options, helpers, partials) {
            for (var i = 0; i < node.statements.length; i++) {
                this.gen(node.statements[i], context, options, helpers, partials);
            }
        };
        Handle.mustache = function(node, context, options, helpers, partials) {
            var i, currentContext = context[0], contextLength = context.length;
            if (Util.type(currentContext) === "array") {
                currentContext.push({});
                currentContext = currentContext[currentContext.length - 1];
                context.unshift(currentContext);
            }
            if (node.isHelper || helpers && helpers[node.id.string]) {
                if (node.params.length === 0) {} else {
                    for (i = 0; i < node.params.length; i++) {
                        this.gen(node.params[i], context, options, helpers, partials);
                    }
                }
                if (node.hash) this.gen(node.hash, context, options, helpers, partials);
            } else {
                this.gen(node.id, context, options, helpers, partials);
            }
            if (context.length > contextLength) context.splice(0, context.length - contextLength);
        };
        Handle.block = function(node, context, options, helpers, partials) {
            var parts = node.mustache.id.parts, i, len, cur, val, type, currentContext = context[0], contextLength = context.length;
            if (node.inverse) {}
            if (node.mustache.isHelper || helpers && helpers[node.mustache.id.string]) {
                type = parts[0];
                val = (Helpers[type] || Helpers.custom).apply(this, arguments);
                currentContext = context[0];
            } else {
                for (i = 0; i < parts.length; i++) {
                    options.__path.push(parts[i]);
                    cur = parts[i];
                    val = this.val(cur, options, context, {});
                    currentContext[cur] = Util.isArray(val) && [] || val;
                    type = Util.type(currentContext[cur]);
                    if (type === "object" || type === "array") {
                        currentContext = currentContext[cur];
                        context.unshift(currentContext);
                    }
                }
            }
            if (node.program) {
                if (Util.type(currentContext) === "array") {
                    len = val.length || Random.integer(3, 7);
                    for (i = 0; i < len; i++) {
                        currentContext.push(typeof val[i] !== "undefined" ? val[i] : {});
                        options.__path.push("[]");
                        context.unshift(currentContext[currentContext.length - 1]);
                        this.gen(node.program, context, options, helpers, partials);
                        options.__path.pop();
                        context.shift();
                    }
                } else this.gen(node.program, context, options, helpers, partials);
            }
            if (context.length > contextLength) context.splice(0, context.length - contextLength);
        };
        Handle.hash = function(node, context, options, helpers, partials) {
            var pairs = node.pairs, pair, i, j;
            for (i = 0; i < pairs.length; i++) {
                pair = pairs[i];
                for (j = 1; j < pair.length; j++) {
                    this.gen(pair[j], context, options, helpers, partials);
                }
            }
        };
        Handle.ID = function(node, context, options) {
            var parts = node.parts, i, len, cur, prev, def, val, type, valType, preOptions, currentContext = context[node.depth], contextLength = context.length;
            if (Util.isArray(currentContext)) currentContext = context[node.depth + 1];
            if (!parts.length) {} else {
                for (i = 0, len = parts.length; i < len; i++) {
                    options.__path.push(parts[i]);
                    cur = parts[i];
                    prev = parts[i - 1];
                    preOptions = options[prev];
                    def = i === len - 1 ? currentContext[cur] : {};
                    val = this.val(cur, options, context, def);
                    type = Util.type(currentContext[cur]);
                    valType = Util.type(val);
                    if (type === "undefined") {
                        if (i < len - 1 && valType !== "object" && valType !== "array") {
                            currentContext[cur] = {};
                        } else {
                            currentContext[cur] = Util.isArray(val) && [] || val;
                        }
                    } else {
                        if (i < len - 1 && type !== "object" && type !== "array") {
                            currentContext[cur] = Util.isArray(val) && [] || {};
                        }
                    }
                    type = Util.type(currentContext[cur]);
                    if (type === "object" || type === "array") {
                        currentContext = currentContext[cur];
                        context.unshift(currentContext);
                    }
                }
            }
            if (context.length > contextLength) context.splice(0, context.length - contextLength);
        };
        Handle.partial = function(node, context, options, helpers, partials) {
            var name = node.partialName.name, partial = partials && partials[name], contextLength = context.length;
            if (partial) Handle.gen(partial, context, options, helpers, partials);
            if (context.length > contextLength) context.splice(0, context.length - contextLength);
        };
        Handle.content = Util.noop;
        Handle.PARTIAL_NAME = Util.noop;
        Handle.DATA = Util.noop;
        Handle.STRING = Util.noop;
        Handle.INTEGER = Util.noop;
        Handle.BOOLEAN = Util.noop;
        Handle.comment = Util.noop;
        var Helpers = {};
        Helpers.each = function(node, context, options) {
            var i, len, cur, val, parts, def, type, currentContext = context[0];
            parts = node.mustache.params[0].parts;
            for (i = 0, len = parts.length; i < len; i++) {
                options.__path.push(parts[i]);
                cur = parts[i];
                def = i === len - 1 ? [] : {};
                val = this.val(cur, options, context, def);
                currentContext[cur] = Util.isArray(val) && [] || val;
                type = Util.type(currentContext[cur]);
                if (type === "object" || type === "array") {
                    currentContext = currentContext[cur];
                    context.unshift(currentContext);
                }
            }
            return val;
        };
        Helpers["if"] = Helpers.unless = function(node, context, options) {
            var params = node.mustache.params, i, j, cur, val, parts, def, type, currentContext = context[0];
            for (i = 0; i < params.length; i++) {
                parts = params[i].parts;
                for (j = 0; j < parts.length; j++) {
                    if (i === 0) options.__path.push(parts[j]);
                    cur = parts[j];
                    def = j === parts.length - 1 ? "@BOOL(2,1,true)" : {};
                    val = this.val(cur, options, context, def);
                    if (j === parts.length - 1) {
                        val = val === "true" ? true : val === "false" ? false : val;
                    }
                    currentContext[cur] = Util.isArray(val) ? [] : val;
                    type = Util.type(currentContext[cur]);
                    if (type === "object" || type === "array") {
                        currentContext = currentContext[cur];
                        context.unshift(currentContext);
                    }
                }
            }
            return val;
        };
        Helpers["with"] = function(node, context, options) {
            var i, cur, val, parts, def, currentContext = context[0];
            parts = node.mustache.params[0].parts;
            for (i = 0; i < parts.length; i++) {
                options.__path.push(parts[i]);
                cur = parts[i];
                def = {};
                val = this.val(cur, options, context, def);
                currentContext = currentContext[cur] = val;
                context.unshift(currentContext);
            }
            return val;
        };
        Helpers.log = function() {};
        Helpers.custom = function(node, context, options) {
            var i, len, cur, val, parts, def, type, currentContext = context[0];
            if (node.mustache.params.length === 0) {
                return;
                options.__path.push(node.mustache.id.string);
                cur = node.mustache.id.string;
                def = "@BOOL(2,1,true)";
                val = this.val(cur, options, context, def);
                currentContext[cur] = Util.isArray(val) && [] || val;
                type = Util.type(currentContext[cur]);
                if (type === "object" || type === "array") {
                    currentContext = currentContext[cur];
                    context.unshift(currentContext);
                }
            } else {
                parts = node.mustache.params[0].parts;
                for (i = 0, len = parts.length; i < len; i++) {
                    options.__path.push(parts[i]);
                    cur = parts[i];
                    def = i === len - 1 ? [] : {};
                    val = this.val(cur, options, context, def);
                    currentContext[cur] = Util.isArray(val) && [] || val;
                    type = Util.type(currentContext[cur]);
                    if (type === "object" || type === "array") {
                        currentContext = currentContext[cur];
                        context.unshift(currentContext);
                    }
                }
            }
            return val;
        };
    }).call(this);
    /*! src/mock4xtpl.js */
    (function(undefined) {
        if (typeof KISSY === "undefined") return;
        var Mock4XTpl = {
            debug: false
        };
        var XTemplate;
        KISSY.use("xtemplate", function(S, T) {
            XTemplate = T;
        });
        if (!this.Mock) module.exports = Mock4XTpl;
        Mock.xtpl = function(input, options, helpers, partials) {
            return Mock4XTpl.mock(input, options, helpers, partials);
        };
        Mock.xparse = function(input) {
            return XTemplate.compiler.parse(input);
        };
        Mock4XTpl.mock = function(input, options, helpers, partials) {
            helpers = helpers ? Util.extend({}, helpers, XTemplate.RunTime.commands) : XTemplate.RunTime.commands;
            partials = partials ? Util.extend({}, partials, XTemplate.RunTime.subTpls) : XTemplate.RunTime.subTpls;
            return this.gen(input, null, options, helpers, partials, {});
        };
        Mock4XTpl.parse = function(input) {
            return XTemplate.compiler.parse(input);
        };
        Mock4XTpl.gen = function(node, context, options, helpers, partials, other) {
            if (typeof node === "string") {
                if (Mock4XTpl.debug) {
                    console.log("[tpl    ]\n", node);
                }
                var ast = this.parse(node);
                options = this.parseOptions(node, options);
                var data = this.gen(ast, context, options, helpers, partials, other);
                return data;
            }
            context = context || [ {} ];
            options = options || {};
            node.type = node.type;
            if (this[node.type] === Util.noop) return;
            options.__path = options.__path || [];
            if (Mock4XTpl.debug) {
                console.log();
                console.group("[" + node.type + "]", JSON.stringify(node));
                console.log("[context]", "[before]", context.length, JSON.stringify(context));
                console.log("[options]", "[before]", options.__path.length, JSON.stringify(options));
                console.log("[other  ]", "[before]", JSON.stringify(other));
            }
            var preLength = options.__path.length;
            this[node.type](node, context, options, helpers, partials, other);
            if (Mock4XTpl.debug) {
                console.log("[__path ]", "[after ]", options.__path);
            }
            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context)) {
                options.__path.splice(preLength);
            }
            if (Mock4XTpl.debug) {
                console.log("[context]", "[after ]", context.length, JSON.stringify(context));
                console.groupEnd();
            }
            return context[context.length - 1];
        };
        Mock4XTpl.parseOptions = function(input, options) {
            var rComment = /<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g;
            var comments = input.match(rComment), ret = {}, i, ma, option;
            for (i = 0; comments && i < comments.length; i++) {
                rComment.lastIndex = 0;
                ma = rComment.exec(comments[i]);
                if (ma) {
                    option = new Function("return " + ma[1]);
                    option = option();
                    Util.extend(ret, option);
                }
            }
            return Util.extend(ret, options);
        };
        Mock4XTpl.parseVal = function(expr, object) {
            function queryArray(prop, context) {
                if (typeof context === "object" && prop in context) return [ context[prop] ];
                var ret = [];
                for (var i = 0; i < context.length; i++) {
                    ret.push.apply(ret, query(prop, [ context[i] ]));
                }
                return ret;
            }
            function queryObject(prop, context) {
                if (typeof context === "object" && prop in context) return [ context[prop] ];
                var ret = [];
                for (var key in context) {
                    ret.push.apply(ret, query(prop, [ context[key] ]));
                }
                return ret;
            }
            function query(prop, set) {
                var ret = [];
                for (var i = 0; i < set.length; i++) {
                    if (typeof set[i] !== "object") continue;
                    if (prop in set[i]) ret.push(set[i][prop]); else {
                        ret.push.apply(ret, Util.isArray(set[i]) ? queryArray(prop, set[i]) : queryObject(prop, set[i]));
                    }
                }
                return ret;
            }
            function parse(expr, context) {
                var parts = typeof expr === "string" ? expr.split(".") : expr.slice(0), set = [ context ];
                while (parts.length) {
                    set = query(parts.shift(), set);
                }
                return set;
            }
            return parse(expr, object);
        };
        Mock4XTpl.val = function(name, options, context, def) {
            if (name !== options.__path[options.__path.length - 1]) throw new Error(name + "!==" + options.__path);
            if (def !== undefined) def = Mock.mock(def);
            if (options) {
                var mocked = Mock.mock(options);
                if (Util.isString(mocked)) return mocked;
                var ret = Mock4XTpl.parseVal(options.__path, mocked);
                if (ret.length > 0) return ret[0];
                if (name in mocked) {
                    return mocked[name];
                }
            }
            if (Util.isArray(context[0])) return {};
            return def !== undefined ? def : name;
        };
        Mock4XTpl.program = function(node, context, options, helpers, partials, other) {
            for (var i = 0; i < node.statements.length; i++) {
                this.gen(node.statements[i], context, options, helpers, partials, other);
            }
            for (var j = 0; node.inverse && j < node.inverse.length; j++) {
                this.gen(node.inverse[j], context, options, helpers, partials, other);
            }
        };
        Mock4XTpl.block = function(node, context, options, helpers, partials, other) {
            var contextLength = context.length;
            this.gen(node.tpl, context, options, helpers, partials, Util.extend({}, other, {
                def: {},
                hold: true
            }));
            var currentContext = context[0], mocked, i, len;
            if (Util.type(currentContext) === "array") {
                mocked = this.val(options.__path[options.__path.length - 1], options, context);
                len = mocked && mocked.length || Random.integer(3, 7);
                for (i = 0; i < len; i++) {
                    currentContext.push(mocked && mocked[i] !== undefined ? mocked[i] : {});
                    options.__path.push(i);
                    context.unshift(currentContext[currentContext.length - 1]);
                    this.gen(node.program, context, options, helpers, partials, other);
                    options.__path.pop();
                    context.shift();
                }
            } else this.gen(node.program, context, options, helpers, partials, other);
            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context)) {
                context.splice(0, context.length - contextLength);
            }
        };
        Mock4XTpl.tpl = function(node, context, options, helpers, partials, other) {
            if (node.params && node.params.length) {
                other = Util.extend({}, other, {
                    def: {
                        each: [],
                        "if": "@BOOL(2,1,true)",
                        unless: "@BOOL(2,1,false)",
                        "with": {}
                    }[node.path.string],
                    hold: {
                        each: true,
                        "if": function(_, __, ___, name, value) {
                            return typeof value === "object";
                        },
                        unless: function(_, __, ___, name, value) {
                            return typeof value === "object";
                        },
                        "with": true,
                        include: false
                    }[node.path.string]
                });
                for (var i = 0, input; i < node.params.length; i++) {
                    if (node.path.string === "include") {
                        input = partials && partials[node.params[i].value];
                    } else input = node.params[i];
                    if (input) this.gen(input, context, options, helpers, partials, other);
                }
                if (node.hash) {
                    this.gen(node.hash, context, options, helpers, partials, other);
                }
            } else {
                this.gen(node.path, context, options, helpers, partials, other);
            }
        };
        Mock4XTpl.tplExpression = function(node, context, options, helpers, partials, other) {
            this.gen(node.expression, context, options, helpers, partials, other);
        };
        Mock4XTpl.content = Util.noop;
        Mock4XTpl.unaryExpression = Util.noop;
        Mock4XTpl.multiplicativeExpression = Mock4XTpl.additiveExpression = function(node, context, options, helpers, partials, other) {
            this.gen(node.op1, context, options, helpers, partials, Util.extend({}, other, {
                def: function() {
                    return node.op2.type === "number" ? node.op2.value.indexOf(".") > -1 ? Random.float(-Math.pow(10, 10), Math.pow(10, 10), 1, Math.pow(10, 6)) : Random.integer() : undefined;
                }()
            }));
            this.gen(node.op2, context, options, helpers, partials, Util.extend({}, other, {
                def: function() {
                    return node.op1.type === "number" ? node.op1.value.indexOf(".") > -1 ? Random.float(-Math.pow(10, 10), Math.pow(10, 10), 1, Math.pow(10, 6)) : Random.integer() : undefined;
                }()
            }));
        };
        Mock4XTpl.relationalExpression = function(node, context, options, helpers, partials, other) {
            this.gen(node.op1, context, options, helpers, partials, other);
            this.gen(node.op2, context, options, helpers, partials, other);
        };
        Mock4XTpl.equalityExpression = Util.noop;
        Mock4XTpl.conditionalAndExpression = Util.noop;
        Mock4XTpl.conditionalOrExpression = Util.noop;
        Mock4XTpl.string = Util.noop;
        Mock4XTpl.number = Util.noop;
        Mock4XTpl.boolean = Util.noop;
        Mock4XTpl.hash = function(node, context, options, helpers, partials, other) {
            var pairs = node.value, key;
            for (key in pairs) {
                this.gen(pairs[key], context, options, helpers, partials, other);
            }
        };
        Mock4XTpl.id = function(node, context, options, helpers, partials, other) {
            var contextLength = context.length;
            var parts = node.parts, currentContext = context[node.depth], i, len, cur, def, val;
            function fix(currentContext, index, length, name, val) {
                var type = Util.type(currentContext[name]), valType = Util.type(val);
                val = val === "true" ? true : val === "false" ? false : val;
                if (type === "undefined") {
                    if (index < length - 1 && !Util.isObjectOrArray(val)) {
                        currentContext[name] = {};
                    } else {
                        currentContext[name] = Util.isArray(val) && [] || val;
                    }
                } else {
                    if (index < length - 1 && type !== "object" && type !== "array") {
                        currentContext[name] = Util.isArray(val) && [] || {};
                    } else {
                        if (type !== "object" && type !== "array" && valType !== "object" && valType !== "array") {
                            currentContext[name] = val;
                        }
                    }
                }
                return currentContext[name];
            }
            if (Util.isArray(currentContext)) currentContext = context[node.depth + 1];
            for (i = 0, len = parts.length; i < len; i++) {
                if (i === 0 && parts[i] === "this") continue;
                if (/^(xindex|xcount|xkey)$/.test(parts[i])) continue;
                if (i === 0 && len === 1 && parts[i] in helpers) continue;
                options.__path.push(parts[i]);
                cur = parts[i];
                def = i === len - 1 ? other.def !== undefined ? other.def : context[0][cur] : {};
                val = this.val(cur, options, context, def);
                if (Mock4XTpl.debug) {
                    console.log("[def    ]", JSON.stringify(def));
                    console.log("[val    ]", JSON.stringify(val));
                }
                val = fix(currentContext, i, len, cur, val);
                if (Util.isObjectOrArray(currentContext[cur])) {
                    context.unshift(currentContext = currentContext[cur]);
                }
            }
            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context, cur, val)) {
                context.splice(0, context.length - contextLength);
            }
        };
    }).call(this);
}).call(this);
},{}],3:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
 *     on objects.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  function Bar () {}
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
    arr.constructor = Bar
    return arr.foo() === 42 && // typed array instances can be augmented
        arr.constructor === Bar && // constructor can be set
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  this.length = 0
  this.parent = undefined

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    array.byteLength
    that = Buffer._augment(new Uint8Array(array))
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
    that._isBuffer = true
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

// `get` is deprecated
Buffer.prototype.get = function get (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` is deprecated
Buffer.prototype.set = function set (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), targetStart)
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function _augment (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array set method before overwriting
  arr._set = arr.set

  // deprecated
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.indexOf = BP.indexOf
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUIntLE = BP.readUIntLE
  arr.readUIntBE = BP.readUIntBE
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readIntLE = BP.readIntLE
  arr.readIntBE = BP.readIntBE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUIntLE = BP.writeUIntLE
  arr.writeUIntBE = BP.writeUIntBE
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeIntLE = BP.writeIntLE
  arr.writeIntBE = BP.writeIntBE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

},{"base64-js":4,"ieee754":5,"is-array":6}],4:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],5:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],6:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],7:[function(require,module,exports){
require('./filter/filter');
require('./directive/directive');
require('./service/service');



var app = angular.module('app', ['ui.bootstrap','ui.router', 'filter', 'directive', 'service', 'pascalprecht.translate']);

app.config(require('./routes'));

app.config(['$translateProvider','growlProvider', function ($translateProvider,growlProvider) {

  growlProvider.globalTimeToLive(1000);

  $translateProvider.translations('language', window.language);

  $translateProvider.preferredLanguage('language');
}]);

angular.bootstrap(document, ['app']);
},{"./directive/directive":15,"./filter/filter":25,"./routes":28,"./service/service":30}],8:[function(require,module,exports){
(function (Buffer){
/**
 * Created by lihui on 14-7-31.
 */

var $ = require('jquery');


module.exports = ['$scope', '$stateParams', '$http', '$filter', '$modal', 'json2Data', 'growl', function ($scope, $stateParams, $http, $filter, $modal, json2Data, growl) {

  angular.extend($scope, {
    data: {
      interfaceType: 'GET',
      requiredParameters: [],
      responseParameters: []
    },
    render: function () {
      $http.post('/load', {url: $stateParams.url}).then(function (data) {
        data.data.lazyLoad = !!data.data.lazyLoad && data.data.lazyLoad == 'yes' ? 'yes' : 'no';
        angular.extend($scope, {data: data.data});
//        $scope.data.responseParametersType = true;
      });

    },
    addRequiredParameters: function () {
      $scope.data.requiredParameters.push({
        name: '',
        required: true,
        remark: '',
        nameVerify: 'name_' + Date.parse(new Date()),
        ruleVerify: 'rule_' + Date.parse(new Date())
      });
    },
    removeRequiredParameters: function (i) {
      $scope.data.requiredParameters.splice(i, 1);
    },
    addResponseParameters: function (id) {
      var _id = id + '00';
      var _length = _id.length;
      if ($scope.data && $scope.data.responseParameters) {
        angular.forEach($scope.data.responseParameters, function (o, i) {
          if (o.id.length === _id.length && id == o.id.substr(0, o.id.length - 2)) {
            if (parseInt(_id) < parseInt(o.id)) {
              _id = o.id;
            }
          }
        });


        _id = parseInt(_id) + 1;
        _id = ('' + _id).length % 2 == 0 ? '' + _id : '0' + _id;

        var _array = [];
        var _i = 2;
        while (_id.length - _i > 0) {
          angular.forEach($scope.data.responseParameters, function (o, i) {
            if (_id.substr(0, _id.length - _i) == o.id && o.kind == 'array(object)') {
              _array.push(o.id);
            }
          });
          _i += 2;
        }
      } else {
        $scope.data.responseParameters = [];
      }


      id = id == '00' ? '00' + _id : _id;

      while (id.length < _length) {
        id = '0' + id;
      }

      $scope.data.responseParameters.push({
        id: id,
        kind: 'string',
        name: '--',
        rule: '--',
        array: _array,
        nameVerify: 'name_' + Date.parse(new Date()),
        ruleVerify: 'rule_' + Date.parse(new Date())
      });
    },
    removeResponseParameters: function (i) {
      $scope.data.responseParameters = $filter('orderBy')($scope.data.responseParameters, 'id');
      $scope.data.responseParameters.splice(i, 1);
    },
    submit: function () {
      $('[json2html]').html();
      $http.post('/modify', angular.fromJson($scope.data)).then(function () {
        window.location.href = '/';
      });
    },
    used: function () {
      $('[json2html]').html();
      $http.post('/modify', angular.fromJson($scope.data)).then(function () {
        growl.addSuccessMessage(window.language.SUCCESS);
      });
    },
    //打开窗口
    openWin: function () {
      var modalInstance = $modal.open({
        template: Buffer("PGZvcm0gbmFtZT0iaW1wb3J0IiByb2xlPSJmb3JtIiBub3ZhbGlkYXRlPSJub3ZhbGlkYXRlIj4KICAgIDxkaXYgY2xhc3M9Im1vZGFsLWJvZHkiIHN0eWxlPSJwYWRkaW5nOiAwOyI+CiAgICAgICAgPGRpdiBuZy1qc29uZWRpdG9yIG5nLW1vZGVsPSJqc29uIiBvcHRpb25zPSJvcHRpb25zIiBzdHlsZT0id2lkdGg6IDc5OHB4OyBoZWlnaHQ6IDUwMHB4OyI+PC9kaXY+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9Im1vZGFsLWZvb3RlciIgc3R5bGU9Im1hcmdpbi10b3A6MDsgIj4KICAgICAgICA8YnV0dG9uIG5nLWNsaWNrPSJpbXBvcnRSZXNwb25zZVBhcmFtZXRlcnMoanNvbikiIG5nLWRpc2FibGVkPSJlcnJvckpzb24iIGNsYXNzPSJidG4gYnRuLXByaW1hcnkiPnt7J1NVQk1JVCd8dHJhbnNsYXRlfX08L2J1dHRvbj4KICAgIDwvZGl2Pgo8L2Zvcm0+","base64"),
        controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
          $scope.json = {};
          $scope.options = {
            mode: 'code',
            change: function (error) {
              $scope.errorJson = !!error;
            }
          };
          $scope.importResponseParameters = function (json) {
            $modalInstance.close(json);
          }
        }]
      });

      modalInstance.result.then(function (json) {
        var reData = [];
        var _id = 0;
        angular.forEach(json, function (o, i) {
          json2Data(i, o, _id, [], reData);
          _id += 1;
        });
        $scope.data.responseParameters = reData;
      });

    }
  });
  $scope.render();

}];
}).call(this,require("buffer").Buffer)
},{"buffer":3,"jquery":1}],9:[function(require,module,exports){
(function (Buffer){
/**
 * Created by lihui on 14-7-30.
 */


module.exports = ['$scope', '$state', '$http', '$modal', '$filter', '$timeout', 'json2Data', 'config','growl', '$confirm',function ($scope, $state, $http, $modal, $filter, $timeout, json2Data, config,growl,$confirm) {

  angular.extend($scope, {
    interfaceSuffix: config.interfaceSuffix,
    data: {},
    recordData: {
      requiredParameters: []
    },
    suc: false,
    render: function () {
      $http.post('/getList', {url: '/console/domain/list.json'}).then(function (data) {
        if (data.data.data.length) {
          angular.forEach(data.data.data, function (o) {
            o.urlFilter = $filter('url')(o.url);
          })
        }
        if (data.data.log.length) {
          angular.forEach(data.data.log, function (o) {
            o.urlFilter = $filter('url')(o.url);
          });
        }
        angular.extend($scope, data.data);
      });
    },
    add: function () {
      $http.post('/add', {
        interfaceType: "GET",
        requiredParameters: [],
        responseParameters: [],
        reqError: [],
        docError: [],
        interfaceUrl: $scope.url
      }).then(function (data) {
        $state.go('detail', {url: $filter('url')($scope.url)});
      });
    },
    del: function (url) {
      $confirm({
        text: window.language['MAIN-DELETE-CONTENT'],
        title:window.language.DELETE,
        ok:window.language.SUBMIT,
        cancel:window.language.CANCEL
      }).then(function() {
          $http.post('/del', {
            interfaceUrl: url
          }).then(function (data) {
            $scope.render();
            growl.addSuccessMessage(window.language.SUCCESS);
          });
        });
    },
    checkGitBook:function(){
      $http.post('/gitbook').then(function (data) {
        if(data.data.code == 200){
          growl.addSuccessMessage(window.language['SUCCESS']);
        }else{
          $modal.open({
            template: '<div class="modal-header"><h3>'+window.language['GITBOOK-UNINSTALL']+'</h3></div> <div class="modal-body">'+window.language['GITBOOK-UNINSTALL-CONTENT']+'</div>'
          });
        }
      });
    },
    changeLazy: function (url) {

      $http.post('/changeLazy', {
        interfaceUrl: url
      }).then(function (data) {
        angular.forEach($scope.data, function (o) {
          if (o.url == url) {
            return o.lazyLoad = !o.lazyLoad;
          }
        });
      });
    },
    changeUrl: function (url) {
      var modalInstance = $modal.open({
        template: Buffer("PGZvcm0gY2xhc3M9ImZvcm0taG9yaXpvbnRhbCIgbmFtZT0iaW1wb3J0IiByb2xlPSJmb3JtIiBub3ZhbGlkYXRlPSJub3ZhbGlkYXRlIj4KICAgIDxkaXYgY2xhc3M9Im1vZGFsLWhlYWRlciI+CiAgICAgICAgPGg1Pnt7J01BSU4tTElTVC1DSEFOR0UnfHRyYW5zbGF0ZX19PC9oNT4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0ibW9kYWwtYm9keSI+CiAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCI+CiAgICAgICAgICAgIDxsYWJlbCBmb3I9ImlucHV0RW1haWwzIiBjbGFzcz0iY29sLXNtLTQgY29udHJvbC1sYWJlbCI+e3snREVUQUlMLVVSTCd8dHJhbnNsYXRlfX3vvJo8L2xhYmVsPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wtc20tOCI+CiAgICAgICAgICAgICAgICA8cCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+e3t1cmx9fTwvcD4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCI+CiAgICAgICAgICAgIDxsYWJlbCBmb3I9ImlucHV0RW1haWwzIiBjbGFzcz0iY29sLXNtLTQgY29udHJvbC1sYWJlbCI+e3snREVUQUlMLVVSTC1ORVcnfHRyYW5zbGF0ZX1977yaPC9sYWJlbD4KICAgICAgICAgICAgPGRpdiBjbGFzcz0iY29sLXNtLTgiPgogICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9Im5ld1VybCIgY2FuLWFkZD0iZGF0YSIgaW50ZXJmYWNlLXN1ZmZpeD0ie3tpbnRlcmZhY2VTdWZmaXh9fSIgbmctbW9kZWw9Im5ld1VybCIgY2xhc3M9ImZvcm0tY29udHJvbCIgPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJmb3JtLWdyb3VwIj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0iY29sLXNtLTggY29sLXNtLW9mZnNldC00IHRleHQtZGFuZ2VyIiAgbmctaWY9ImltcG9ydC5uZXdVcmwuJGVycm9yLmlzT0siID4KICAgICAgICAgICAgICB7eydNQUlOLUFERC1FWFBMQU5BVElPTid8dHJhbnNsYXRlOid7aW50ZXJmYWNlU3VmZml4OmludGVyZmFjZVN1ZmZpeH0nfX0KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbC1zbS04IGNvbC1zbS1vZmZzZXQtNCB0ZXh0LWRhbmdlciIgIG5nLWlmPSJpbXBvcnQubmV3VXJsLiRlcnJvci5pc09ubHkiID4KICAgICAgICAgICAgICAge3snRVJST1ItQUxSRUFEWS1FWElTVFMnfHRyYW5zbGF0ZX19CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC1mb290ZXIiPgogICAgICAgIDxidXR0b24gbmctY2xpY2s9ImNoYW5nZShuZXdVcmwpIiBuZy1kaXNhYmxlZD0iaW1wb3J0LiRpbnZhbGlkIiBjbGFzcz0iYnRuIGJ0bi1wcmltYXJ5Ij57eydTVUJNSVQnfHRyYW5zbGF0ZX19PC9idXR0b24+CiAgICA8L2Rpdj4KPC9mb3JtPg==","base64"),
        resolve: {
          data: function () {
            return {
              config: $scope.data,
              interfaceSuffix: $scope.interfaceSuffix
            };
          },
          url: function () {
            return url;
          }
        },
        controller: ['$scope', '$modalInstance', 'data', 'url', function ($scope, $modalInstance, data, url) {
          angular.extend($scope, {
            url: url,
            data: data.config,
            interfaceSuffix: data.interfaceSuffix,
            change: function (newUrl) {
              $http.post('/changeUrl', {
                url: $scope.url,
                newUrl: newUrl
              }).then(function (data) {
                $modalInstance.close(true);
              });
            }
          });
        }]
      });

      modalInstance.result.then(function (reData) {
        if (reData) {
          $scope.render();
        }
      });
    },
    record: {
      requiredParameters: [],
      addRequiredParameter: function () {
        $scope.recordData.requiredParameters.push({
          key: '',
          value: ''
        });
      },
      removeRequiredParameter: function (i) {
        $scope.recordData.requiredParameters.splice(i, 1);
      },
      submitRecord: function () {
        $http.post('/recordUrl', $scope.recordData).then(function (data) {
          var modalInstance = $modal.open({
            template: Buffer("PGRpdiBjbGFzcz0ibW9kYWwtaGVhZGVyIj4KICAgIDxmb3JtIG5vdmFsaWRhdGU9Im5vdmFsaWRhdGUiIG5hbWU9ImZvcm0iIHJvbGU9ImZvcm0iIGNsYXNzPSJuYXZiYXItZm9ybSI+CgogICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwIj4KICAgICAgICAgICAgPGlucHV0IHR5cGU9InRleHQiIG5nLXJlcXVpcmVkPSJ0cnVlIiBuYW1lPSJ1cmwiIGludGVyZmFjZS1zdWZmaXg9Int7ZGF0YS5pbnRlcmZhY2VTdWZmaXh9fSIgbmctbW9kZWw9ImRhdGEudXJsIiBjYW4tYWRkPSJkYXRhIgogICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkPSJpIGZvciBpIGluIGRhdGEucGF0aCB8IGZpbHRlcjokdmlld1ZhbHVlIgogICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9Int7J01BSU4tQURELUVYUExBTkFUSU9OJ3x0cmFuc2xhdGU6J3tpbnRlcmZhY2VTdWZmaXg6aW50ZXJmYWNlU3VmZml4fSd9fSIgY2xhc3M9ImZvcm0tY29udHJvbCIvPgogICAgICAgICAgICA8c3BhbiBjbGFzcz0iaW5wdXQtZ3JvdXAtYnRuIj4KICAgICAgICAgICAgICAgIDxidXR0b24gbmctZGlzYWJsZWQ9ImZvcm0uJGludmFsaWQiIG5nLWNsaWNrPSJyZWNvcmQoKSIgY2xhc3M9ImJ0biBidG4tZGVmYXVsdCBidG4tc3VjY2VzcyI+e3snUkVDT1JEJ3x0cmFuc2xhdGV9fTwvYnV0dG9uPgogICAgICAgICAgICA8L3NwYW4+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPHAgbmctaWY9ImZvcm0udXJsLiRlcnJvci5pc09LIiBjbGFzcz0idGV4dC1kYW5nZXIiIHN0eWxlPSIgbWFyZ2luLXRvcDogMTBweDsgIj4KICAgICAgICAgIHt7J01BSU4tQURELUVYUExBTkFUSU9OJ3x0cmFuc2xhdGU6J3tpbnRlcmZhY2VTdWZmaXg6aW50ZXJmYWNlU3VmZml4fSd9fTwvcD4KCiAgICAgICAgPHAgbmctaWY9ImZvcm0udXJsLiRlcnJvci5pc09ubHkiIGNsYXNzPSJ0ZXh0LWRhbmdlciIgc3R5bGU9IiBtYXJnaW4tdG9wOiAxMHB4OyAiPnt7J0VSUk9SLUFMUkVBRFktRVhJU1RTJ3x0cmFuc2xhdGV9fTwvcD4KICAgIDwvZm9ybT4KPC9kaXY+CjxkaXYgY2xhc3M9Im1vZGFsLWJvZHkiPgogICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCI+CiAgICAgICAgPGxhYmVsPnt7J0RFVEFJTC1VUkwnfHRyYW5zbGF0ZX19PC9sYWJlbD4KCiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siIG5nLWJpbmQ9ImRhdGEuaW50ZXJmYWNlVXJsIj48L3A+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZvcm0tZ3JvdXAiPgogICAgICAgIDxsYWJlbD57eydERVRBSUwtVFlQRSd8dHJhbnNsYXRlfX08L2xhYmVsPgoKICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayIgbmctYmluZD0iZGF0YS5pbnRlcmZhY2VUeXBlIj48L3A+CiAgICA8L2Rpdj4KCiAgICA8bGFiZWw+e3snREVUQUlMLVJFUVVFU1QtUEFSQU1FVEVSUyd8dHJhbnNsYXRlfX08L2xhYmVsPgoKICAgIDx1bD4KICAgICAgICA8bGkgbmctcmVwZWF0PSJpIGluIGRhdGEucmVxdWlyZWRQYXJhbWV0ZXJzIj4KICAgICAgICAgICAgPHN0cm9uZyBuZy1iaW5kPSJpLmtleSI+PC9zdHJvbmc+CiAgICAgICAgICAgIDxzcGFuPjo8L3NwYW4+CiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJ0ZXh0LW11dGVkIiBuZy1iaW5kPSJpLnZhbHVlIj48L3NwYW4+CiAgICAgICAgPC9saT4KICAgIDwvdWw+CgogICAgPGxhYmVsPnt7J0RFVEFJTC1SRVRVUk4tSU5URVJGQUNFJ3x0cmFuc2xhdGV9fTwvbGFiZWw+CgogICAgPGRpdiBjbGFzcz0id2VsbCB3ZWxsLXNtIiBqc29uLWZvcm1hdD0iZGF0YS5yZXNwb25zZVBhcmFtZXRlcnMiIHN0eWxlPSJtYXJnaW4tYm90dG9tOiAwOyI+CiAgICA8L2Rpdj4KCjwvZGl2Pgo=","base64"),
            resolve: {
              data: function () {
                $scope.recordData.responseParameters = data.data;
                $scope.recordData.path = $scope.path;

                $scope.recordData.interfaceSuffix = $scope.interfaceSuffix;
                return $scope.recordData;
              }
            },
            controller: ['$scope', '$modalInstance', 'data' , function ($scope, $modalInstance, data) {
              angular.extend($scope, {
                data: data,
                record: function () {
                  var _requiredParameters = [];
                  angular.forEach($scope.data.requiredParameters, function (o, i) {
                    _requiredParameters.push({
                      name: o.key,
                      remark: o.value,
                      nameVerify: "name_" + i,
                      ruleVerify: "rule_" + i,
                      required: true
                    })
                  });

                  var _responseParameters = [];
                  var _id = 0;
                  angular.forEach($scope.data.responseParameters, function (o, i) {
                    json2Data(i, o, _id, [], _responseParameters);
                    _id += 1;
                  });

                  $http.post('/add', {
                    interfaceType: $scope.data.interfaceType,
                    requiredParameters: _requiredParameters,
                    responseParameters: _responseParameters,
                    reqError: [],
                    docError: [],
                    interfaceUrl: $scope.data.url
                  }).then(function (data) {
                    $state.go('detail', {url: $filter('url')($scope.data.url)});
                    $modalInstance.close();
                  });
                }
              });
            }]
          });
        });
      }
    }
  });

  $scope.render();


}];
}).call(this,require("buffer").Buffer)
},{"buffer":3}],10:[function(require,module,exports){
/**
 * angular-growl - v0.4.0 - 2013-11-19
 * https://github.com/marcorinck/angular-growl
 * Copyright (c) 2013 Marco Rinck; Licensed MIT
 */
angular.module('angular-growl', []);
angular.module('angular-growl').directive('growl', [
  '$rootScope',
  function ($rootScope) {
    'use strict';
    return {
      restrict: 'A',
      template: '<div class="growl">' + '\t<div class="growl-item alert" ng-repeat="message in messages" ng-class="computeClasses(message)">' + '\t\t<button type="button" class="close" ng-click="deleteMessage(message)">&times;</button>' + '       <div ng-switch="message.enableHtml">' + '           <div ng-switch-when="true" ng-bind-html="message.text"></div>' + '           <div ng-switch-default ng-bind="message.text"></div>' + '       </div>' + '\t</div>' + '</div>',
      replace: false,
      scope: true,
      controller: [
        '$scope',
        '$timeout',
        'growl',
        function ($scope, $timeout, growl) {
          var onlyUnique = growl.onlyUnique();
          $scope.messages = [];
          function addMessage(message) {
            $scope.messages.push(message);
            if (message.ttl && message.ttl !== -1) {
              $timeout(function () {
                $scope.deleteMessage(message);
              }, message.ttl);
            }
          }
          $rootScope.$on('growlMessage', function (event, message) {
            var found;
            if (onlyUnique) {
              angular.forEach($scope.messages, function (msg) {
                if (message.text === msg.text && message.severity === msg.severity) {
                  found = true;
                }
              });
              if (!found) {
                addMessage(message);
              }
            } else {
              addMessage(message);
            }
          });
          $scope.deleteMessage = function (message) {
            var index = $scope.messages.indexOf(message);
            if (index > -1) {
              $scope.messages.splice(index, 1);
            }
          };
          $scope.computeClasses = function (message) {
            return {
              'alert-success': message.severity === 'success',
              'alert-error': message.severity === 'error',
              'alert-danger': message.severity === 'error',
              'alert-info': message.severity === 'info',
              'alert-warning': message.severity === 'warn'
            };
          };
        }
      ]
    };
  }
]);
angular.module('angular-growl').provider('growl', function () {
  'use strict';
  var _ttl = null, _enableHtml = false, _messagesKey = 'messages', _messageTextKey = 'text', _messageSeverityKey = 'severity', _onlyUniqueMessages = true;
  this.globalTimeToLive = function (ttl) {
    _ttl = ttl;
  };
  this.globalEnableHtml = function (enableHtml) {
    _enableHtml = enableHtml;
  };
  this.messagesKey = function (messagesKey) {
    _messagesKey = messagesKey;
  };
  this.messageTextKey = function (messageTextKey) {
    _messageTextKey = messageTextKey;
  };
  this.messageSeverityKey = function (messageSeverityKey) {
    _messageSeverityKey = messageSeverityKey;
  };
  this.onlyUniqueMessages = function (onlyUniqueMessages) {
    _onlyUniqueMessages = onlyUniqueMessages;
  };
  this.serverMessagesInterceptor = [
    '$q',
    'growl',
    function ($q, growl) {
      function checkResponse(response) {
        if (response.data[_messagesKey] && response.data[_messagesKey].length > 0) {
          growl.addServerMessages(response.data[_messagesKey]);
        }
      }
      function success(response) {
        checkResponse(response);
        return response;
      }
      function error(response) {
        checkResponse(response);
        return $q.reject(response);
      }
      return function (promise) {
        return promise.then(success, error);
      };
    }
  ];
  this.$get = [
    '$rootScope',
    '$filter',
    function ($rootScope, $filter) {
      var translate;
      try {
        translate = $filter('translate');
      } catch (e) {
      }
      function broadcastMessage(message) {
        if (translate) {
          message.text = translate(message.text);
        }
        $rootScope.$broadcast('growlMessage', message);
      }
      function sendMessage(text, config, severity) {
        var _config = config || {}, message;
        message = {
          text: text,
          severity: severity,
          ttl: _config.ttl || _ttl,
          enableHtml: _config.enableHtml || _enableHtml
        };
        broadcastMessage(message);
      }
      function addWarnMessage(text, config) {
        sendMessage(text, config, 'warn');
      }
      function addErrorMessage(text, config) {
        sendMessage(text, config, 'error');
      }
      function addInfoMessage(text, config) {
        sendMessage(text, config, 'info');
      }
      function addSuccessMessage(text, config) {
        sendMessage(text, config, 'success');
      }
      function addServerMessages(messages) {
        var i, message, severity, length;
        length = messages.length;
        for (i = 0; i < length; i++) {
          message = messages[i];
          if (message[_messageTextKey] && message[_messageSeverityKey]) {
            switch (message[_messageSeverityKey]) {
              case 'warn':
                severity = 'warn';
                break;
              case 'success':
                severity = 'success';
                break;
              case 'info':
                severity = 'info';
                break;
              case 'error':
                severity = 'error';
                break;
            }
            sendMessage(message[_messageTextKey], undefined, severity);
          }
        }
      }
      function onlyUnique() {
        return _onlyUniqueMessages;
      }
      return {
        addWarnMessage: addWarnMessage,
        addErrorMessage: addErrorMessage,
        addInfoMessage: addInfoMessage,
        addSuccessMessage: addSuccessMessage,
        addServerMessages: addServerMessages,
        onlyUnique: onlyUnique
      };
    }
  ];
});
},{}],11:[function(require,module,exports){
/*
 * angular-confirm
 * http://schlogen.github.io/angular-confirm/
 * Version: 1.1.0 - 2015-14-07
 * License: Apache
 */
angular.module('angular-confirm', ['ui.bootstrap'])
  .controller('ConfirmModalController', ['$scope', '$modalInstance', 'data', function ($scope, $modalInstance, data) {
    $scope.data = angular.copy(data);

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  }])
  .value('$confirmModalDefaults', {
    template: '<div class="modal-header"><h3 class="modal-title">{{data.title}}</h3></div>' +
      '<div class="modal-body">{{data.text}}</div>' +
      '<div class="modal-footer">' +
      '<button class="btn btn-primary" ng-click="ok()">{{data.ok}}</button>' +
      '<button class="btn btn-default" ng-click="cancel()">{{data.cancel}}</button>' +
      '</div>',
    controller: 'ConfirmModalController',
    defaultLabels: {
      title: 'Confirm',
      ok: 'OK',
      cancel: 'Cancel'
    }
  })
  .factory('$confirm', ['$modal', '$confirmModalDefaults', function ($modal, $confirmModalDefaults) {
    return function (data, settings) {
      settings = angular.extend($confirmModalDefaults, (settings || {}));

      data = angular.extend({}, settings.defaultLabels, data || {});

      if ('templateUrl' in settings && 'template' in settings) {
        delete settings.template;
      }

      settings.resolve = {
        data: function () {
          return data;
        }
      };

      return $modal.open(settings).result;
    };
  }])
  .directive('confirm', ['$confirm', function ($confirm) {
    return {
      priority: 1,
      restrict: 'A',
      scope: {
        confirmIf: "=",
        ngClick: '&',
        confirm: '@',
        confirmSettings: "=",
        confirmTitle: '@',
        confirmOk: '@',
        confirmCancel: '@'
      },
      link: function (scope, element, attrs) {


        element.unbind("click").bind("click", function ($event) {

          $event.preventDefault();

          if (angular.isUndefined(scope.confirmIf) || scope.confirmIf) {

            var data = {text: scope.confirm};
            if (scope.confirmTitle) {
              data.title = scope.confirmTitle;
            }
            if (scope.confirmOk) {
              data.ok = scope.confirmOk;
            }
            if (scope.confirmCancel) {
              data.cancel = scope.confirmCancel;
            }
            $confirm(data, scope.confirmSettings || {}).then(scope.ngClick);
          } else {

            scope.$apply(scope.ngClick);
          }
        });

      }
    }
  }]);

},{}],12:[function(require,module,exports){

module.exports = function() {
    return {
        restrict: 'A',
        require:'ngModel',
        link: function($scope, $el, $attr, $ctrl) {

            $scope.$watch($attr.ngModel,function(inputValue){
                if(angular.isArray(inputValue)){
                    $ctrl.$setViewValue(angular.toJson(inputValue));
                    $ctrl.$render();
                }
            });

        }
    }
}

},{}],13:[function(require,module,exports){
/**
 * Created by lihui on 14-9-10.
 * 验证新接口是否验证通过
 */

module.exports = function() {
  return {
    restrict: 'A',
    require:'ngModel',
    scope:{
      canAdd:'='
    },
    link: function($scope, $el, $attr, $ctrl) {
      $ctrl.$parsers.push(function(val){
        if(val){
          val = val.trim();
          if(!!!val.indexOf('/') && val.indexOf($attr.interfaceSuffix) == val.length - $attr.interfaceSuffix.length && val.indexOf('//') == -1){
            $ctrl.$setValidity('isOK',true);
          }else{
            $ctrl.$setValidity('isOK',false);
          }
          var isOnly = true;
          if($scope.canAdd.length){
            angular.forEach($scope.canAdd,function(o){
              if(o.url === val){
                isOnly = false;
              }
            });
          }
          $ctrl.$setValidity('isOnly',isOnly);
        }else{
          $ctrl.$setValidity('isOK',true);
        }
        return val;
      });
    }
  }
}
},{}],14:[function(require,module,exports){
/**
 * Created by lihui on 14-7-31.
 */

module.exports = function() {
    return {
        scope:{
            canRemove:'=',
            listId:'@'
        },
        link: function($scope, $el) {
            $scope.$watch('canRemove',function(data){
                var _isShow = true;
                angular.forEach(data,function(o,i){
                    if(o.id.substr(0, o.id.length-2) == $scope.listId){
                        return _isShow = false;
                    }
                });
                if(!_isShow){
                    $el.addClass('remove-hide');
                }else{
                    $el.removeClass('remove-hide');
                }
            },true);
        }
    }
}
},{}],15:[function(require,module,exports){
/**
 * Created by lihui on 14-7-31.
 */

require('./angluar-growl');
require('./angular-confirm');
require('./ng-jsoneditor');

module.exports = angular.module('directive', ['angular-growl','angular-confirm','ng.jsoneditor'])
    .directive('dyName', require('./dyName'))
    .directive('canRemove', require('./canRemove'))
    .directive('json2html', require('./json2html'))
    .directive('mockjs', require('./mockjs'))
    .directive('canAdd', require('./canAdd'))
    .directive('symbolFilter', require('./symbolFilter'))
    .directive('jsonVerify', require('./jsonVerify'))
    .directive('isJson', require('./isJson'))
    .directive('jsonFormat', require('./jsonFormat'))
    .directive('array2str', require('./array2str'));

},{"./angluar-growl":10,"./angular-confirm":11,"./array2str":12,"./canAdd":13,"./canRemove":14,"./dyName":16,"./isJson":17,"./json2html":18,"./jsonFormat":19,"./jsonVerify":20,"./mockjs":21,"./ng-jsoneditor":22,"./symbolFilter":23}],16:[function(require,module,exports){
/**
 * Created by lihui on 14-7-31.
 */

module.exports = function() {
    return {
        require: "ngModel",
        link: function($scope, el, iAttrs, ngModelCtr) {
            var formController;
            ngModelCtr.$name = $scope.$eval(iAttrs.dyName);
            formController = el.controller('form') || {
                $addControl: angular.noop
            };
            formController.$addControl(ngModelCtr);
            return $scope.$on('$destroy', function() {
                return formController.$removeControl(ngModelCtr);
            });
        }
    };
}

},{}],17:[function(require,module,exports){
/**
 * Created by lihui on 15-1-26.
 */


module.exports = function () {
  return {
    require: 'ngModel',
    link: function ($scope, $el, $attr, $ctrl) {
      $scope.$watch($attr.ngModel,function(newValue){
        if(newValue){
          try{
             JSON.parse(newValue)
            $ctrl.$setValidity('isjson', true);
          }catch (e){
            $ctrl.$setValidity('isjson', false);
          }
        }
      });
    }
  }
}

},{}],18:[function(require,module,exports){
/**
 * Created by lihui on 14-7-31.
 */

var Mock = require('mockjs');
var $ = require('jquery');
module.exports = function() {

    // 格式化 除去数组中的注释 只保留第一个
    var remarkFormat = function(json,isFrist){
      var _reJson = {};
        //加上这句，不然会把[]变成{}
        if(angular.isArray(json)){
            _reJson = [];
        }
      angular.forEach(json,function(o,i){
        if(angular.isArray(o) && o.length){
          var _reArray = [];
           angular.forEach(o,function(oo,ii){
             if(angular.isObject(oo)){
                oo = remarkFormat(oo,isFrist && !!!ii);
             }
             _reArray.push(oo);
           });
           if(!isFrist){
             _reJson[i.split('//')[0]] = _reArray;
           }else{
             _reJson[i] = _reArray;
           }
        }else if(angular.isObject(o)){
          _reJson[i] = remarkFormat(o,true);
        }else{
           if(!isFrist && angular.isString(i)){
             _reJson[i.split('//')[0]] = o;
           }else{
             _reJson[i] = o;
           }
        }
      });
      return _reJson;
    }


    return {
        scope:{
            json2html:'='
        },
        link: function($scope, $el) {

            function syntaxHighlight(json) {
                json = remarkFormat(json,true);

                if (typeof json != 'string') {
                    json = JSON.stringify(json, undefined, 100);
                }
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g,'<br/>').replace(/\s/g,"&nbsp;");
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            match = match.split('//');
                            if(match.length == 2){
                              return '<span remark="'+match[1]+'" style="color: #97089C;">' + match[0] + '":</span>';
                            }else{
                              return '<span style="color: #97089C;">' + match[0] + '</span>';
                            }

                        } else {
                            return '<span style="color: #129C22;">' + match + '</span>';
                        }
                    } else if (/true|false/.test(match)) {
                       return '<span style="color: #0A0A80;">' + match + '</span>';
                    } else if (/null/.test(match)) {
                       return '<span style="color: #070EB1;">' + match + '</span>';
                    }else{
                       return '<span style="color: #003BF7;">' + match + '</span>';
                    }

                });
            }

            function response2json(hashObj){
                var json = {};
                angular.forEach(hashObj,function(v,k){
                    var l = 2;
                    var _js = 'json';
                    while (l < k.length) {
                        _js+='["'+v.id.substr(0,l)+'"]' ;
                        if(v.array && v.array.length){
                            angular.forEach(v.array,function(o,i){
                                if(v.id.substr(0,l)== o){
                                    _js+='[0]';
                                }
                            });
                        }
                        l += 2;
                    }
                    var _o = {};
                    if(v.kind === 'number'){
                        _o[v.id] = parseInt(v.rule);
                        if(!_o[v.id]){
                            v.rule = 0;
                        }
                    }else if(v.kind === 'boolean'){
                        _o[v.id] = v.rule == 'true' || v.rule  ? true : false;
                        v.rule = _o[v.id] ? true : false;
                    }else if(v.kind === 'object'){
                        _o[v.id] = {};
                    }else if(v.kind === 'array(object)'){
                        _o[v.id] = [{}];
                    }else if(v.kind === 'string'){
                        try {
                          _o[v.id] = Mock.mock(v.rule.toString());
                        }
                        catch (e) {
                          _o[v.id]='不符合mock规范'
                        }
                    }else if(v.kind === 'mock'){
                        try {
                            _o[v.id] = eval(v.rule);
                        }
                        catch (e) {
                            _o[v.id]='不符合mock规范'
                        }
                    }
                    if(k.length > 2){
                        //如果是个简单的对象
                        if(hashObj[k.substr(0, k.length-2)].kind == 'object'){
                            eval(_js +'=angular.extend('+_js+',_o,true);');
                            //如果是一个数组
                        }else if(hashObj[k.substr(0, k.length-2)].kind == 'array(object)'){
                            var _arr =[];
                            eval('_arr ='+ _js+';');
                            if(angular.isArray(_arr)){
                                eval('angular.extend('+_js+'[0],_o,true);');
                            }else if(angular.isObject(_arr)){
                                eval('angular.extend('+_js+',_o,true);');
                            }
                        }
                    }else{
                        eval(_js +'=angular.extend('+_js+',_o);');
                    }
                });

                json =  angular.fromJson(angular.toJson(json).replace(/\"(\d+)\"/g,function(key){

                    if(hashObj[key.replace(/\"/g,'')]){
                        if(hashObj[key.replace(/\"/g,'')].remark){
                          return '"'+hashObj[key.replace(/\"/g,'')].name + '//'+ hashObj[key.replace(/\"/g,'')].remark + '"';
                        }else{
                          return '"'+hashObj[key.replace(/\"/g,'')].name + '"';
                        }
                    }else{
                        return key;
                    }
                }));
                return json;
            }

            $scope.$watch('json2html',function(to){
                if(to){
                    var hashObj = {};
                    angular.forEach(to,function(o,i){
                        hashObj[o.id] = o;
                    });
                    $el.html(syntaxHighlight(Mock.mock(response2json(hashObj))));
                    angular.forEach($("[remark]"),function(o){
                        var _e = $(o);
                        var _brs = _e.nextAll('br');
                        if(_brs.length){
                          $(_brs[0]).before('&nbsp;&nbsp;&nbsp;<span style=" color: #999333;font-weight: normal;">//&nbsp;'+_e.attr('remark')+'</span>');
                        }
                    });
                }
            },true);

        }
    };
}
},{"jquery":1,"mockjs":2}],19:[function(require,module,exports){
/**
 * Created by lihui on 15-1-22.
 *
 * 格式化 json
 *
 */


/**
 * Created by lihui on 14-7-31.
 */


var $ = require('jquery');
module.exports = function () {


  return {
    scope: {
      jsonFormat: '='
    },
    link: function ($scope, $el) {

      function syntaxHighlight(json) {

        if (typeof json != 'string') {
          json = JSON.stringify(json, undefined, 100);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>').replace(/\s/g, "&nbsp;");
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              match = match.split('//');
              if (match.length == 2) {
                return '<span remark="' + match[1] + '" style="color: #97089C;">' + match[0] + '":</span>';
              } else {
                return '<span style="color: #97089C;">' + match[0] + '</span>';
              }

            } else {
              return '<span style="color: #129C22;">' + match + '</span>';
            }
          } else if (/true|false/.test(match)) {
            return '<span style="color: #0A0A80;">' + match + '</span>';
          } else if (/null/.test(match)) {
            return '<span style="color: #070EB1;">' + match + '</span>';
          } else {
            return '<span style="color: #003BF7;">' + match + '</span>';
          }

        });
      }


      $scope.$watch('jsonFormat', function (to) {
        if (to) {
          if (typeof to == 'string') {
            try {
              JSON.parse(to);
            } catch (e) {
              return $el.html('<span style="color: red;">内容不是一个JSON数据！</span>');
            }
          }
          $el.html(syntaxHighlight(to));
        }
      });

    }
  };
}
},{"jquery":1}],20:[function(require,module,exports){
/**
 * Created by lihui on 14-9-11.
 */



module.exports = function() {
  return {
    restrict: 'A',
    require:'ngModel',
    link: function($scope, $el, $attr, $ctrl) {
      $ctrl.$parsers.push(function(val){
        try{
          JSON.parse(val);
          $ctrl.$setValidity('json',true);
        }catch(e){
          $ctrl.$setValidity('json',false);
        }
        return val;
      });
    }
  }
}
},{}],21:[function(require,module,exports){
/**
 * Created by lihui on 14-7-31.
 */

module.exports = function() {
    return {
        scope:{
            mockjs:'='
        },
        link: function($scope, $el) {
            $scope.$watch('mockjs',function(){
                $el.html(Mock.mock($scope.mockjs));
            });
        }
    };
}
},{}],22:[function(require,module,exports){



(function () {
    var module = angular.module('ng.jsoneditor', []);
    module.constant('ngJsoneditorConfig', {});

    module.directive('ngJsoneditor', ['ngJsoneditorConfig', '$timeout', function (ngJsoneditorConfig, $timeout) {
        var defaults = ngJsoneditorConfig || {};

        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {'options': '=', 'ngJsoneditor': '=', 'preferText': '='},
            link: function ($scope, element, attrs, ngModel) {
                var debounceTo, debounceFrom;
                var editor;
                var internalTrigger = false;

                if (!angular.isDefined(window.JSONEditor)) {
                    throw new Error("Please add the jsoneditor.js script first!");
                }

                function _createEditor(options) {
                    var settings = angular.extend({}, defaults, options);
                    var theOptions = angular.extend({}, settings, {
                        change: function () {
                            if (typeof debounceTo !== 'undefined') {
                                $timeout.cancel(debounceTo);
                            }

                            debounceTo = $timeout(function () {
                                if (editor) {
                                    internalTrigger = true;
                                    var error = undefined;
                                    try {
                                        ngModel.$setViewValue($scope.preferText === true ? editor.getText() : editor.get());
                                    } catch (err) {
                                        error = err;
                                    }

                                    if (settings && settings.hasOwnProperty('change')) {
                                        settings.change(error);
                                    }
                                }
                            }, settings.timeout || 100);
                        }
                    });

                    element.html('');

                    var instance = new JSONEditor(element[0], theOptions);

                    if ($scope.ngJsoneditor instanceof Function) {
                        $timeout(function () { $scope.ngJsoneditor(instance);});
                    }

                    return instance;
                }

                $scope.$watch('options', function (newValue, oldValue) {
                    for (var k in newValue) {
                        if (newValue.hasOwnProperty(k)) {
                            var v = newValue[k];

                            if (newValue[k] !== oldValue[k]) {
                                if (k === 'mode') {
                                    editor.setMode(v);
                                } else if (k === 'name') {
                                    editor.setName(v);
                                } else { //other settings cannot be changed without re-creating the JsonEditor
                                    editor = _createEditor(newValue);
                                    $scope.updateJsonEditor();
                                    return;
                                }
                            }
                        }
                    }
                }, true);

                $scope.$on('$destroy', function () {
                    //remove jsoneditor?
                });

                $scope.updateJsonEditor = function (newValue) {
                    if (internalTrigger) {
                        //ignore if called by $setViewValue (after debounceTo)
                        internalTrigger = false;
                        return;
                    }

                    if (typeof debounceFrom !== 'undefined') {
                        $timeout.cancel(debounceFrom);
                    }

                    debounceFrom = $timeout(function () {
                        if (($scope.preferText === true) && !angular.isObject(ngModel.$viewValue)) {
                            editor.setText(ngModel.$viewValue || '{}');
                        } else {
                            editor.set(ngModel.$viewValue || {});
                        }
                    }, $scope.options.timeout || 100);
                };

                editor = _createEditor($scope.options);

                if ($scope.options.hasOwnProperty('expanded')) {
                    $timeout($scope.options.expanded ? function () {editor.expandAll()} : function () {editor.collapseAll()}, ($scope.options.timeout || 100) + 100);
                }

                ngModel.$render = $scope.updateJsonEditor;
                $scope.$watch(function () { return ngModel.$modelValue; }, $scope.updateJsonEditor, true); //if someone changes ng-model from outside
            }
        };
    }]);
})();
},{}],23:[function(require,module,exports){
/**
 * Created by lihui on 14-9-16.
 */
module.exports = function() {
  return {
    restrict: 'A',
    require:'ngModel',
    link: function($scope, $el, $attr, $ctrl) {
      $ctrl.$parsers.push(function(val){
        var transformedInput;
        if (val === void 0) {
          return;
        }
        transformedInput = val.replace(/[\/<>"']/g,'');
        if (transformedInput !== val) {
          $ctrl.$setViewValue(transformedInput);
          $ctrl.$render();
        }
        return transformedInput;
      });
    }
  }
}
},{}],24:[function(require,module,exports){
/**
 * Created by lihui on 14-7-30.
 */

module.exports = function(){
    return function(val){
        return val.replace(/database/g,'');
    }
}
},{}],25:[function(require,module,exports){
/**
 * Created by lihui on 14-7-30.
 */

module.exports = angular.module('filter', [])
    .filter('url', require('./url'))
    .filter('database',require('./database'))
    .filter('toArray',require('./toArray'))

},{"./database":24,"./toArray":26,"./url":27}],26:[function(require,module,exports){
/**
 * Created by lihui on 15-9-10.
 */

module.exports =  function () {
  return function (obj, addKey) {
    if (!angular.isObject(obj)) return obj;
    if (addKey === false) {
      return Object.keys(obj).map(function (key) {
        return obj[key];
      });
    } else {
      return Object.keys(obj).map(function (key) {
        var value = obj[key];
        return angular.isObject(value) ?
          Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
        { $key: key, $value: value };
      });
    }
  }
}
},{}],27:[function(require,module,exports){
/**
 * Created by lihui on 14-7-30.
 */

module.exports = function(){
    return function(val){
        return val.replace(/\//g,'&');
    }
}

},{}],28:[function(require,module,exports){
(function (Buffer){
/**
 * Created by lihui on 14-7-30.
 */

module.exports = ['$stateProvider', '$urlRouterProvider', '$provide', function ($stateProvider, $urlRouterProvider, $provide) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('list', {
      url: "/",
      template: Buffer("PGRpdj4KICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgPGRpdiBjbGFzcz0iY29sLW1kLTciPgogICAgICA8ZGl2IGNsYXNzPSJwYW5lbCBwYW5lbC1pbmZvIj4KICAgICAgICA8ZGl2IGNsYXNzPSJwYW5lbC1oZWFkaW5nIGNsZWFyZml4Ij4KICAgICAgICAgIDxoNiBjbGFzcz0icGFuZWwtdGl0bGUgcHVsbC1sZWZ0Ij57eydNQUlOLUxJU1QtVElUTEUnfHRyYW5zbGF0ZX19PC9oNj4KICAgICAgICAgIDxhIG5nLWNsaWNrPSJjaGVja0dpdEJvb2soKSIgdG9vbHRpcD0iR2l0Qm9vayIgdG9vbHRpcC1wbGFjZW1lbnQ9ImJvdHRvbSIgY2xhc3M9ImJ0biBidG4tZGVmYXVsdCBidG4tc20gYnRuLXhzIHB1bGwtcmlnaHQiPgogICAgICAgICAgICA8c3BhbiBjbGFzcz0iZ2x5cGhpY29uIGdseXBoaWNvbi1ib29rIj48L3NwYW4+CiAgICAgICAgICA8L2E+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0icGFuZWwtYm9keSI+CiAgICAgICAgICA8ZGl2IHN0eWxlPSIgcG9zaXRpb246IHJlbGF0aXZlOyAiIGNsYXNzPSJmb3JtLWdyb3VwIGhhcy1mZWVkYmFjayI+CiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBuZy1tb2RlbD0ianNvblBhdGgiIHBsYWNlaG9sZGVyPSJ7eydNQUlOLUxJU1QtRmlsdGVyJ3x0cmFuc2xhdGV9fSIgdHlwZWFoZWFkPSJpIGZvciBpIGluIHBhdGggfCBmaWx0ZXI6JHZpZXdWYWx1ZSIgY2xhc3M9ImZvcm0tY29udHJvbCIvPgogICAgICAgICAgICA8c3BhbiBzdHlsZT0idG9wOiAwOyAiIGNsYXNzPSJnbHlwaGljb24gZ2x5cGhpY29uLXNlYXJjaCBmb3JtLWNvbnRyb2wtZmVlZGJhY2siPjwvc3Bhbj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPGRpdiBzdHlsZT0iYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNlZWU7ICIgY2xhc3M9InJvdyI+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC04Ij4KICAgICAgICAgICAgICA8aDU+UEFUSDwvaDU+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMiI+CiAgICAgICAgICAgICAgPGg1Pnt7J01BSU4tTElTVC1ERUxBWSd8dHJhbnNsYXRlfX0KICAgICAgICAgICAgICAgIDxzcGFuIHRvb2x0aXA9Int7J01BSU4tTElTVC1ERUxBWS1FWFBMQU5BVElPTid8dHJhbnNsYXRlfX0iIHN0eWxlPSJtYXJnaW4tbGVmdDogMnB4OyIgY2xhc3M9ImdseXBoaWNvbiBnbHlwaGljb24tcXVlc3Rpb24tc2lnbiB0ZXh0LW11dGVkIj48L3NwYW4+CiAgICAgICAgICAgICAgPC9oNT4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgICAgICAgICA8aDU+e3snTUFJTi1MSVNULU9QRVJBVElORyd8dHJhbnNsYXRlfX0KICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9IiBtYXgtaGVpZ2h0OiA0MDBweDsgb3ZlcmZsb3cteTogYXV0bzsgIiBjbGFzcz0icm93Ij48L2Rpdj4KICAgICAgICAgICAgICA8L2g1PgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTEyIj4KICAgICAgICAgICAgICA8ZGl2IG5nLXJlcGVhdD0iaSBpbiBkYXRhfCB0b0FycmF5OmZhbHNlIHwgZmlsdGVyOiBqc29uUGF0aCAiIHN0eWxlPSJwYWRkaW5nOjEwcHggMDsiIGNsYXNzPSJyb3ciPgogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTgiPgogICAgICAgICAgICAgICAgICA8YSBuZy1iaW5kPSJpLnVybHxkYXRhYmFzZSIgdWktc3JlZj0iZGV0YWlsKHt1cmw6aS51cmxGaWx0ZXJ9KSIgY2xhc3M9InRleHQtZXJyb3IiPjwvYT4KICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImxhYmVsIGxhYmVsLWluZm8iIG5nLWlmPSIhaS5pc0pzb25wIj5KU09OPC9zcGFuPgogICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ibGFiZWwgbGFiZWwtc3VjY2VzcyIgbmctaWY9ImkuaXNKc29ucCI+SlNPTlA8L3NwYW4+CiAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBuZy1pZj0iIWkubGF6eUxvYWQiIGNsYXNzPSJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIiBuZy1jbGljaz0iY2hhbmdlTGF6eShpLnVybCkiPgogICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJ0ZXh0LXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi1leHBhbmQiPjwvc3Bhbj4KICAgICAgICAgICAgICAgICAgPC9idXR0b24+CiAgICAgICAgICAgICAgICAgIDxidXR0b24gbmctaWY9ImkubGF6eUxvYWQiIGNsYXNzPSJidG4gYnRuLXdhcm5pbmcgYnRuLXhzIiAgbmctY2xpY2s9ImNoYW5nZUxhenkoaS51cmwpIj4KICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0iZ2x5cGhpY29uIGdseXBoaWNvbi1yZWNvcmQiPjwvc3Bhbj4KICAgICAgICAgICAgICAgICAgPC9idXR0b24+CiAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBuZy1jbGljaz0iZGVsKGkudXJsKSIgY2xhc3M9ImJ0biBidG4tZGVmYXVsdCBidG4teHMiPgogICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPSJjdXJzb3I6cG9pbnRlcjsiIHRvb2x0aXA9Int7J0RFTEVURSd8dHJhbnNsYXRlfX0iIGNsYXNzPSJ0ZXh0LWRhbmdlciBnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZSI+PC9zcGFuPgogICAgICAgICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBuZy1jbGljaz0iY2hhbmdlVXJsKGkudXJsKSIgY2xhc3M9ImJ0biBidG4tZGVmYXVsdCBidG4teHMiPgogICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPSJjdXJzb3I6cG9pbnRlcjsiIHRvb2x0aXA9Int7J01BSU4tTElTVC1DSEFOR0UnfHRyYW5zbGF0ZX19IiBjbGFzcz0iZ2x5cGhpY29uIGdseXBoaWNvbi1sb2ctb3V0Ij48L3NwYW4+CiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPgogICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMTIiPgogICAgICAgICAgICAgICAgICA8c21hbGwgY2xhc3M9InRleHQtbXV0ZWQiPnt7aS5ub3RlfX08L3NtYWxsPgogICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0iY29sLW1kLTUiPgogICAgICA8ZGl2IGNsYXNzPSJwYW5lbCBwYW5lbC1pbmZvIGNsZWFyZml4Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJwYW5lbC1oZWFkaW5nIj4KICAgICAgICAgIDxoNiBjbGFzcz0icGFuZWwtdGl0bGUiPnt7J01BSU4tQURELVRJVExFJ3x0cmFuc2xhdGV9fQogICAgICAgICAgICA8c3BhbiB0b29sdGlwLXBsYWNlbWVudD0iYm90dG9tIiB0b29sdGlwPSJ7eydNQUlOLUFERC1USVRMRS1FWFBMQU5BVElPTid8dHJhbnNsYXRlOid7aW50ZXJmYWNlU3VmZml4OmludGVyZmFjZVN1ZmZpeH0nfX0iIGNsYXNzPSJnbHlwaGljb24gZ2x5cGhpY29uLXF1ZXN0aW9uLXNpZ24iPjwvc3Bhbj4KICAgICAgICAgIDwvaDY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0icGFuZWwtYm9keSI+CiAgICAgICAgICA8Zm9ybSBub3ZhbGlkYXRlPSJub3ZhbGlkYXRlIiBuYW1lPSJmb3JtIiByb2xlPSJmb3JtIiBjbGFzcz0ibmF2YmFyLWZvcm0iPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9InRleHQiIG5nLXJlcXVpcmVkPSJ0cnVlIiBuYW1lPSJ1cmwiIG5nLW1vZGVsPSJ1cmwiIGludGVyZmFjZS1zdWZmaXg9Int7aW50ZXJmYWNlU3VmZml4fX0iIGNhbi1hZGQ9ImRhdGEiIHR5cGVhaGVhZD0iaSBmb3IgaSBpbiBwYXRoIHwgZmlsdGVyOiR2aWV3VmFsdWUiIHBsYWNlaG9sZGVyPSJ7eydNQUlOLUFERC1FWFBMQU5BVElPTid8dHJhbnNsYXRlOid7aW50ZXJmYWNlU3VmZml4OmludGVyZmFjZVN1ZmZpeH0nfX0iIGNsYXNzPSJmb3JtLWNvbnRyb2wiLz4KICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0iaW5wdXQtZ3JvdXAtYnRuIj4KICAgICAgICAgICAgICAgIDxidXR0b24gbmctZGlzYWJsZWQ9ImZvcm0uJGludmFsaWQiIG5nLWNsaWNrPSJhZGQoKSIgY2xhc3M9ImJ0biBidG4tZGVmYXVsdCBidG4tc3VjY2VzcyI+CiAgICAgICAgICAgICAgICAgIHt7J0FERCd8dHJhbnNsYXRlfX0KICAgICAgICAgICAgICAgIDwvYnV0dG9uPgogICAgICAgICAgICAgIDwvc3Bhbj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDxwIG5nLWlmPSJmb3JtLnVybC4kZXJyb3IuaXNPSyIgY2xhc3M9InRleHQtZGFuZ2VyIiBzdHlsZT0iIG1hcmdpbi10b3A6IDEwcHg7ICI+e3snTUFJTi1BREQtRVhQTEFOQVRJT04nfHRyYW5zbGF0ZTone2ludGVyZmFjZVN1ZmZpeDppbnRlcmZhY2VTdWZmaXh9J319PC9wPgogICAgICAgICAgICA8cCBuZy1pZj0iZm9ybS51cmwuJGVycm9yLmlzT25seSIgY2xhc3M9InRleHQtZGFuZ2VyIiBzdHlsZT0iIG1hcmdpbi10b3A6IDEwcHg7ICI+e3snRVJST1ItQUxSRUFEWS1FWElTVFMnfHRyYW5zbGF0ZX19PC9wPgogICAgICAgICAgPC9mb3JtPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KCiAgICAgIDxkaXYgY2xhc3M9InBhbmVsIHBhbmVsLWluZm8gY2xlYXJmaXgiPgogICAgICAgIDxkaXYgY2xhc3M9InBhbmVsLWhlYWRpbmciPgogICAgICAgICAgPGg2IGNsYXNzPSJwYW5lbC10aXRsZSI+e3snTUFJTi1SRUNPUkQtVElUTEUnfHRyYW5zbGF0ZX19CiAgICAgICAgICAgIDxzcGFuIHRvb2x0aXAtcGxhY2VtZW50PSJib3R0b20iIHRvb2x0aXA9Int7J01BSU4tUkVDT1JELVRJVExFLUVYUExBTkFUSU9OJ3x0cmFuc2xhdGV9fSAiIGNsYXNzPSJnbHlwaGljb24gZ2x5cGhpY29uLXF1ZXN0aW9uLXNpZ24iPjwvc3Bhbj4KICAgICAgICAgIDwvaDY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0icGFuZWwtYm9keSI+CiAgICAgICAgICA8Zm9ybSBub3ZhbGlkYXRlPSJub3ZhbGlkYXRlIiBuYW1lPSJyZWNvcmRGb3JtIiByb2xlPSJyZWNvcmRGb3JtIiBjbGFzcz0iZm9ybS1ob3Jpem9udGFsIj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCI+CiAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiIHN0eWxlPSJwYWRkaW5nOiAwIDE1cHg7Ij4KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWJ0biBkcm9wZG93biI+CiAgICAgICAgICAgICAgICAgIDxidXR0b24gbmctaW5pdD0icmVjb3JkRGF0YS5pbnRlcmZhY2VUeXBlPSdHRVQnICIgdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZSI+e3tyZWNvcmREYXRhLmludGVyZmFjZVR5cGV9fQogICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJjYXJldCI+PC9zcGFuPgogICAgICAgICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPSJkcm9wZG93bi1tZW51IiByb2xlPSJtZW51Ij4KICAgICAgICAgICAgICAgICAgICA8bGk+PGEgbmctY2xpY2s9InJlY29yZERhdGEuaW50ZXJmYWNlVHlwZT0nUE9TVCciIGhyZWY9IiMiPlBPU1Q8L2E+PC9saT4KICAgICAgICAgICAgICAgICAgICA8bGk+PGEgbmctY2xpY2s9InJlY29yZERhdGEuaW50ZXJmYWNlVHlwZT0nR0VUJyIgaHJlZj0iIyI+R0VUPC9hPjwvbGk+CiAgICAgICAgICAgICAgICAgIDwvdWw+CiAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBuZy1yZXF1aXJlZD0idHJ1ZSIgcGxhY2Vob2xkZXI9Int7J01BSU4tUkVDT1JELVVSTC1FWFBMQU5BVElPTid8dHJhbnNsYXRlfX0iIG5nLW1vZGVsPSJyZWNvcmREYXRhLmludGVyZmFjZVVybCIgY2xhc3M9ImZvcm0tY29udHJvbCI+CiAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJmb3JtLWdyb3VwIj4KICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wtc20tMTIiPgogICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9InRleHQiIGNsYXNzPSJmb3JtLWNvbnRyb2wgIiBuZy1tb2RlbD0icmVjb3JkRGF0YS5jb29raWUiIHBsYWNlaG9sZGVyPSJDb29raWUoe3snT1BUSU9OQUwnfHRyYW5zbGF0ZX19KSI+CiAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8aDY+e3snUEFSQU1FVEVSUyd8dHJhbnNsYXRlfX0KICAgICAgICAgICAgICA8YSB0b29sdGlwPSJ7eydBREQnfHRyYW5zbGF0ZX19IiBuZy1jbGljaz0icmVjb3JkLmFkZFJlcXVpcmVkUGFyYW1ldGVyKCkiICBjbGFzcz0iYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBidG4teHMgcHVsbC1yaWdodCBuZy1zY29wZSI+CiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0iZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzIj48L3NwYW4+CiAgICAgICAgICAgICAgPC9hPgogICAgICAgICAgICA8L2g2PgoKICAgICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCIgbmctcmVwZWF0PSJpIGluIHJlY29yZERhdGEucmVxdWlyZWRQYXJhbWV0ZXJzIj4KCiAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iY29sLXNtLTQiPgogICAgICAgICAgICAgICAgPGlucHV0IG5nLW1vZGVsPSJpLmtleSIgY2xhc3M9ImZvcm0tY29udHJvbCIgcGxhY2Vob2xkZXI9IktleSIgbmctcmVxdWlyZWQ9InRydWUiPgogICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbC1zbS02Ij4KICAgICAgICAgICAgICAgIDxpbnB1dCBuZy1tb2RlbD0iaS52YWx1ZSIgY2xhc3M9ImZvcm0tY29udHJvbCIgcGxhY2Vob2xkZXI9IlZhbHVlIiBuZy1yZXF1aXJlZD0idHJ1ZSI+CiAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iY29sLXNtLTIgY29udHJvbC1sYWJlbCI+CiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIj4KICAgICAgICAgICAgICAgICAgPHNwYW4gbmctY2xpY2s9InJlY29yZC5yZW1vdmVSZXF1aXJlZFBhcmFtZXRlcigpIiBzdHlsZT0iY3Vyc29yOnBvaW50ZXI7IiAgdG9vbHRpcD0ie3snREVMRVRFJ3x0cmFuc2xhdGV9fSIgY2xhc3M9InRleHQtZGFuZ2VyIGdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlIG5nLXNjb3BlIj48L3NwYW4+CiAgICAgICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDxocj4KICAgICAgICAgICAgPGEgbmctY2xpY2s9InJlY29yZC5zdWJtaXRSZWNvcmQoKSIgbmctZGlzYWJsZWQ9InJlY29yZEZvcm0uJGludmFsaWQiIGNsYXNzPSJidG4gYnRuLXN1Y2Nlc3MiPnt7J1JFQ09SRCd8dHJhbnNsYXRlfX08L2E+CiAgICAgICAgICA8L2Zvcm0+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKCiAgICAgIDxkaXYgY2xhc3M9InBhbmVsIHBhbmVsLWRhbmdlciBjbGVhcmZpeCI+CiAgICAgICAgPGRpdiBjbGFzcz0icGFuZWwtaGVhZGluZyI+CiAgICAgICAgICA8aDYgY2xhc3M9InBhbmVsLXRpdGxlIj4KICAgICAgICAgICAge3snTUFJTi1FUlJPUi1MT0ctVElUTEUnfHRyYW5zbGF0ZX19CiAgICAgICAgICAgIDxzcGFuIHRvb2x0aXA9IiB7eydNQUlOLUVSUk9SLUxPRy1USVRMRS1FWFBMQU5BVElPTid8dHJhbnNsYXRlfX0iIHN0eWxlPSJtYXJnaW4tbGVmdDogMnB4OyIgY2xhc3M9ImdseXBoaWNvbiBnbHlwaGljb24tcXVlc3Rpb24tc2lnbiB0ZXh0LW11dGVkIj48L3NwYW4+CiAgICAgICAgICA8L2g2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9InBhbmVsLWJvZHkiPgogICAgICAgICAgPGFjY29yZGlvbiBjbG9zZS1vdGhlcnM9InRydWUiPgogICAgICAgICAgICA8YWNjb3JkaW9uLWdyb3VwIG5nLXJlcGVhdD0iaSBpbiBsb2cgfCBvcmRlckJ5OiAnLW10aW1lJyI+CiAgICAgICAgICAgICAgPGFjY29yZGlvbi1oZWFkaW5nPgogICAgICAgICAgICAgICAge3tpLnVybH19CiAgICAgICAgICAgICAgICA8YSBjbGFzcz0iYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBwdWxsLXJpZ2h0IiB1aS1zcmVmPSJkZXRhaWwoe3VybDppLnVybEZpbHRlcn0pIj4KICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImdseXBoaWNvbiBnbHlwaGljb24tZWRpdCB0ZXh0LWluZm8iIG5nLWNsYXNzPSJ7J3RleHQtd2FybmluZyc6aS5kb2NFcnJvci5sZW5ndGgsJ3RleHQtZGFuZ2VyJzppLnJlcUVycm9yLmxlbmd0aH0iPjwvc3Bhbj4KICAgICAgICAgICAgICAgIDwvYT4KICAgICAgICAgICAgICA8L2FjY29yZGlvbi1oZWFkaW5nPgoKICAgICAgICAgICAgICA8cCBuZy1pZj0iaS5tZXRob2RFcnJvciIgY2xhc3M9InRleHQtaW5mbyI+e3tpLm1ldGhvZEVycm9yfX08L3A+CgogICAgICAgICAgICAgIDxkaXYgbmctaWY9ImkucmVxRXJyb3IubGVuZ3RoIj4KICAgICAgICAgICAgICAgIDxwIGNsYXNzPSJ0ZXh0LWRhbmdlciIgbmctcmVwZWF0PSJpaSBpbiBpLnJlcUVycm9yIj57e2lpfX08L3A+CiAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgPGRpdiBuZy1pZj0iaS5kb2NFcnJvci5sZW5ndGgiPgogICAgICAgICAgICAgICAgPHAgY2xhc3M9InRleHQtd2FybmluZyIgbmctcmVwZWF0PSJpaSBpbiBpLmRvY0Vycm9yIj57e2lpfX08L3A+CiAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDwvYWNjb3JkaW9uLWdyb3VwPgogICAgICAgICAgPC9hY2NvcmRpb24+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+CjwvZGl2Pgo8ZGl2IGdyb3dsPjwvZGl2Pg==","base64"),
      controller: require('./controller/main.js')
    })
    .state('detail', {
      url: "/detail/:url",
      template: Buffer("PGZvcm0gbmFtZT0iYWRkRm9ybSIgcm9sZT0iZm9ybSIgbm92YWxpZGF0ZT0ibm92YWxpZGF0ZSIgY2xhc3M9ImZvcm0taG9yaXpvbnRhbCI+Cgo8ZGl2IGNsYXNzPSJyb3ciIHN0eWxlPSJwYWRkaW5nLWJvdHRvbTogNTRweDsiPgo8ZGl2IGNsYXNzPSJjb2wtbWQtNyI+CiAgPGRpdiBjbGFzcz0icGFuZWwgcGFuZWwtaW5mbyBjbGVhcmZpeCI+CiAgICA8ZGl2IGNsYXNzPSJwYW5lbC1oZWFkaW5nIj4KICAgICAgPGg2IGNsYXNzPSJwYW5lbC10aXRsZSI+e3snREVUQUlMLVRJVExFJ3x0cmFuc2xhdGV9fTwvaDY+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InBhbmVsLWJvZHkiPgoKICAgICAgPGRpdiBuZy1jbGFzcz0ieydoYXMtZXJyb3InOmFkZEZvcm0uaW50ZXJmYWNlVXJsLiRkaXJ0eSAmYW1wOyZhbXA7IGFkZEZvcm0uaW50ZXJmYWNlVXJsLiRpbnZhbGlkfSIKICAgICAgICAgICBjbGFzcz0iZm9ybS1ncm91cCBoYXMtZmVlZGJhY2siPgogICAgICAgIDxsYWJlbCBjbGFzcz0iY29sLXNtLTMgY29udHJvbC1sYWJlbCI+e3snREVUQUlMLVVSTCd8dHJhbnNsYXRlfX3vvJo8L2xhYmVsPgoKICAgICAgICA8ZGl2IGNsYXNzPSJjb2wtc20tOSBmb3JtLWNvbnRyb2wtc3RhdGljIj4KICAgICAgICAgIDxzcGFuIGNsYXNzPSIgdGV4dC1pbmZvIiBuZy1iaW5kPSJkYXRhLmludGVyZmFjZVVybCI+IDwvc3Bhbj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CgoKICAgICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCBoYXMtZmVlZGJhY2siPgogICAgICAgIDxsYWJlbCBjbGFzcz0iY29sLXNtLTMgY29udHJvbC1sYWJlbCI+e3snREVUQUlMLUxBWlktTE9BRCd8dHJhbnNsYXRlfX3vvJo8L2xhYmVsPgoKICAgICAgICA8ZGl2IGNsYXNzPSJjb2wtc20tOSI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9InJhZGlvLWlubGluZSI+CiAgICAgICAgICAgIDxpbnB1dCBuZy1tb2RlbD0iZGF0YS5sYXp5TG9hZCIgdHlwZT0icmFkaW8iIHZhbHVlPSJubyIvPjxzcGFuPk5PPC9zcGFuPgogICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0icmFkaW8taW5saW5lIj4KICAgICAgICAgICAgPGlucHV0IG5nLW1vZGVsPSJkYXRhLmxhenlMb2FkIiB0eXBlPSJyYWRpbyIgdmFsdWU9InllcyIvPjxzcGFuPllFUzwvc3Bhbj4KICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKICAgICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJjb2wtc20tMyBjb250cm9sLWxhYmVsIj57eydERVRBSUwtVFlQRSd8dHJhbnNsYXRlfX3vvJo8L2xhYmVsPgoKICAgICAgICA8ZGl2IGNsYXNzPSJjb2wtc20tOSI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9InJhZGlvLWlubGluZSI+CiAgICAgICAgICAgIDxpbnB1dCBuZy1tb2RlbD0iZGF0YS5pbnRlcmZhY2VUeXBlIiB0eXBlPSJyYWRpbyIgbmFtZT0iaW50ZXJmYWNlVHlwZSIgdmFsdWU9IkdFVCIvPjxzcGFuPkdFVDwvc3Bhbj4KICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9InJhZGlvLWlubGluZSI+CiAgICAgICAgICAgIDxpbnB1dCBuZy1tb2RlbD0iZGF0YS5pbnRlcmZhY2VUeXBlIiB0eXBlPSJyYWRpbyIgbmFtZT0iaW50ZXJmYWNlVHlwZSIgdmFsdWU9IlBPU1QiLz48c3Bhbj5QT1NUPC9zcGFuPgogICAgICAgICAgPC9sYWJlbD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CgogICAgICA8ZGl2IGNsYXNzPSJmb3JtLWdyb3VwIj4KICAgICAgICA8bGFiZWwgY2xhc3M9ImNvbC1zbS0zIGNvbnRyb2wtbGFiZWwiPmpzb25w77yaPC9sYWJlbD4KCiAgICAgICAgPGRpdiBjbGFzcz0iY29sLXNtLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJjaGVja2JveC1pbmxpbmUiPgogICAgICAgICAgICA8aW5wdXQgbmctbW9kZWw9ImRhdGEuaXNKc29ucCIgdHlwZT0iY2hlY2tib3giIG5hbWU9ImlzSnNvbnAiLz48c3Bhbj57eydERVRBSUwtSlNPTlAnfHRyYW5zbGF0ZX19PC9zcGFuPgogICAgICAgICAgPC9sYWJlbD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wtc20tNiI+CiAgICAgICAgICA8aW5wdXQgY2xhc3M9ImZvcm0tY29udHJvbCIgbmctbW9kZWw9ImRhdGEuanNvbnBDYWxsYmFjayIgbmctcmVxdWlyZWQ9InRydWUiIG5nLWlmPSJkYXRhLmlzSnNvbnAiIHBsYWNlaG9sZGVyPSJqc29ucENhbGxiYWNrIi8+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKCiAgICAgIDxkaXYgbmctY2xhc3M9InsnaGFzLWVycm9yJzphZGRGb3JtLmludGVyZmFjZU5hbWUuJGRpcnR5ICZhbXA7JmFtcDsgYWRkRm9ybS5pbnRlcmZhY2VOYW1lLiRpbnZhbGlkfSIKICAgICAgICAgICBjbGFzcz0iZm9ybS1ncm91cCBoYXMtZmVlZGJhY2siPgogICAgICAgIDxsYWJlbCBjbGFzcz0iY29sLXNtLTMgY29udHJvbC1sYWJlbCI+e3snREVUQUlMLVJFTUFSSyd8dHJhbnNsYXRlfX3vvJo8L2xhYmVsPgoKICAgICAgICA8ZGl2IGNsYXNzPSJjb2wtc20tOSI+CiAgICAgICAgICA8aW5wdXQgbmctbW9kZWw9ImRhdGEuaW50ZXJmYWNlTmFtZSIgbmFtZT0iaW50ZXJmYWNlTmFtZSIgcGxhY2Vob2xkZXI9Int7J1JFUVVJUkVEJ3x0cmFuc2xhdGV9fSIgbmctcmVxdWlyZWQ9InRydWUiCiAgICAgICAgICAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIvPjxzcGFuCiAgICAgICAgICBuZy1pZj0iYWRkRm9ybS5pbnRlcmZhY2VOYW1lLiRkaXJ0eSAmYW1wOyZhbXA7IGFkZEZvcm0uaW50ZXJmYWNlTmFtZS4kaW52YWxpZCIgdG9vbHRpcD0ie3snUkVRVUlSRUQnfHRyYW5zbGF0ZX19IgogICAgICAgICAgY2xhc3M9ImdseXBoaWNvbiBnbHlwaGljb24tZXhjbGFtYXRpb24tc2lnbiBmb3JtLWNvbnRyb2wtZmVlZGJhY2siPjwvc3Bhbj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CgogICAgPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0icGFuZWwgcGFuZWwtaW5mbyI+CiAgICA8ZGl2IGNsYXNzPSJwYW5lbC1oZWFkaW5nIGNsZWFyZml4Ij4KICAgICAgPGg2IGNsYXNzPSJwYW5lbC10aXRsZSBwdWxsLWxlZnQiPnt7J0RFVEFJTC1SRVFVRVNULVBBUkFNRVRFUlMnfHRyYW5zbGF0ZX19PC9oNj4KICAgICAgPGEgbmctY2xpY2s9ImFkZFJlcXVpcmVkUGFyYW1ldGVycygpIiB0b29sdGlwPSJ7eydBREQnfHRyYW5zbGF0ZX19IiBjbGFzcz0iYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBidG4teHMgcHVsbC1yaWdodCI+CiAgICAgICAgPHNwYW4gY2xhc3M9ImdseXBoaWNvbiBnbHlwaGljb24tcGx1cyI+PC9zcGFuPgogICAgICA8L2E+CiAgICA8L2Rpdj4KICAgIDx0YWJsZSBjbGFzcz0idGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGVMaXN0Ij4KICAgICAgPHRoZWFkPgogICAgICA8dHI+CiAgICAgICAgPHRoIHN0eWxlPSJ3aWR0aDogNDRweDsiPnt7J1JFUVVJUkVEJ3x0cmFuc2xhdGV9fTwvdGg+CiAgICAgICAgPHRoPnt7J0RFVEFJTC1QQVJBTUVURVJTLU5BTUUnfHRyYW5zbGF0ZX19PC90aD4KICAgICAgICA8dGg+e3snREVUQUlMLVJFTUFSSyd8dHJhbnNsYXRlfX08L3RoPgogICAgICAgIDx0aCB3aWR0aD0iNDUiPnt7J09QRVJBVElORyd8dHJhbnNsYXRlfX08L3RoPgogICAgICA8L3RyPgogICAgICA8L3RoZWFkPgogICAgICA8dGJvZHk+CiAgICAgIDx0ciBuZy1yZXBlYXQ9ImkgaW4gZGF0YS5yZXF1aXJlZFBhcmFtZXRlcnMiPgogICAgICAgIDx0ZCBzdHlsZT0iIHRleHQtYWxpZ246IGNlbnRlcjsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgIj4KICAgICAgICAgIDxpbnB1dCAgc3R5bGU9ImhlaWdodDogYXV0bzt3aWR0aDogYXV0bztmbG9hdDogbm9uZTsiIHR5cGU9ImNoZWNrYm94IiBuZy1tb2RlbD0iaS5yZXF1aXJlZCI+CiAgICAgICAgPC90ZD4KICAgICAgICA8dGQgbmctY2xhc3M9InsnaGFzLWVycm9yJzphZGRGb3JtW2kubmFtZVZlcmlmeV0uJGRpcnR5ICZhbXA7JmFtcDsgYWRkRm9ybVtpLm5hbWVWZXJpZnldLiRpbnZhbGlkfSIKICAgICAgICAgICAgY2xhc3M9ImZvcm0tZ3JvdXAgaGFzLWZlZWRiYWNrIj4KICAgICAgICAgIDxpbnB1dCBuZy1tb2RlbD0iaS5uYW1lIiBkeS1uYW1lPSJpLm5hbWVWZXJpZnkiIHBsYWNlaG9sZGVyPSJ7eydSRVFVSVJFRCd8dHJhbnNsYXRlfX0iIG5nLXJlcXVpcmVkPSJ0cnVlIgogICAgICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiLz4KICAgICAgICAgICAgICA8c3BhbiBuZy1pZj0iYWRkRm9ybVtpLm5hbWVWZXJpZnldLiRkaXJ0eSAmYW1wOyZhbXA7IGFkZEZvcm1baS5uYW1lVmVyaWZ5XS4kaW52YWxpZCIgdG9vbHRpcD0ie3snUkVRVUlSRUQnfHRyYW5zbGF0ZX19IgogICAgICAgICAgICAgICAgICAgIGNsYXNzPSJnbHlwaGljb24gZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ24gZm9ybS1jb250cm9sLWZlZWRiYWNrIj48L3NwYW4+CiAgICAgICAgPC90ZD4KICAgICAgICA8dGQ+CiAgICAgICAgICA8aW5wdXQgc3ltYm9sLWZpbHRlciBuZy1tb2RlbD0iaS5yZW1hcmsiIGNsYXNzPSJmb3JtLWNvbnRyb2wiLz4KICAgICAgICA8L3RkPgogICAgICAgIDx0ZCBhbGlnbj0iY2VudGVyIj4KICAgICAgICAgIDxhIG5nLWNsaWNrPSJyZW1vdmVSZXF1aXJlZFBhcmFtZXRlcnMoJGluZGV4KSIgdG9vbHRpcD0ie3snREVMRVRFJ3x0cmFuc2xhdGV9fSIgc3R5bGU9Im1hcmdpbi10b3A6IDNweDsiIGNsYXNzPSJidG4gYnRuLXNtIGdseXBoaWNvbiBnbHlwaGljb24tbWludXMgdGV4dC1kYW5nZXIiPjwvYT4KICAgICAgICA8L3RkPgogICAgICA8L3RyPgogICAgICA8L3Rib2R5PgogICAgPC90YWJsZT4KICA8L2Rpdj4KICA8dGFic2V0IGp1c3RpZmllZD0idHJ1ZSI+CiAgICA8dGFiIGhlYWRpbmc9Int7J0RFVEFJTC1SRVRVUk4tRFlOQU1JQy1JTlRFUkZBQ0UnfHRyYW5zbGF0ZX19IiBzZWxlY3Q9ImRhdGEucmVzcG9uc2VQYXJhbWV0ZXJzVHlwZT1mYWxzZSI+CgogICAgICA8ZGl2IGNsYXNzPSJjbGVhcmZpeCIgc3R5bGU9ImJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlM2UzZTM7cGFkZGluZzogMTBweDtib3JkZXItbGVmdDogMXB4IHNvbGlkICNlM2UzZTM7Ij4KICAgICAgICA8YSBuZy1jbGljaz0iYWRkUmVzcG9uc2VQYXJhbWV0ZXJzKCcnKSIgdG9vbHRpcD0ie3snQUREJ3x0cmFuc2xhdGV9fSIgY2xhc3M9ImJ0biBidG4tZGVmYXVsdCBidG4tc20gYnRuLXhzIHB1bGwtcmlnaHQiPgogICAgICAgICAgPHNwYW4gY2xhc3M9ImdseXBoaWNvbiBnbHlwaGljb24tcGx1cyI+PC9zcGFuPgogICAgICAgIDwvYT4KICAgICAgICA8YSBuZy1jbGljaz0ib3BlbldpbigpIiB0b29sdGlwPSJ7eydJTVBPUlQnfHRyYW5zbGF0ZX19IiBzdHlsZT0ibWFyZ2luLXJpZ2h0OjEwcHg7IgogICAgICAgICAgIGNsYXNzPSJidG4gYnRuLWRlZmF1bHQgYnRuLXNtIGJ0bi14cyBwdWxsLXJpZ2h0Ij4KICAgICAgICAgIDxzcGFuIGNsYXNzPSJnbHlwaGljb24gZ2x5cGhpY29uLWltcG9ydCI+PC9zcGFuPgogICAgICAgIDwvYT4KICAgICAgPC9kaXY+CiAgICAgIDx0YWJsZSBjbGFzcz0idGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGVMaXN0Ij4KICAgICAgICA8dGhlYWQ+CiAgICAgICAgPHRyPgogICAgICAgICAgPHRoPnt7J0RFVEFJTC1QQVJBTUVURVJTLU5BTUUnfHRyYW5zbGF0ZX19PC90aD4KICAgICAgICAgIDx0aD57eydWQVJJQVRJT04tTEFXJ3x0cmFuc2xhdGV9fTwvdGg+CiAgICAgICAgICA8dGggd2lkdGg9IjEyMCI+e3snVFlQRSd8dHJhbnNsYXRlfX08L3RoPgogICAgICAgICAgPHRoPnt7J0RFVEFJTC1SRU1BUksnfHRyYW5zbGF0ZX19PC90aD4KICAgICAgICAgIDx0aCB3aWR0aD0iNDUiPnt7J09QRVJBVElORyd8dHJhbnNsYXRlfX08L3RoPgogICAgICAgIDwvdHI+CiAgICAgICAgPC90aGVhZD4KICAgICAgICA8dGJvZHkgdmFsaWduPSJiYXNlbGluZSI+CiAgICAgICAgPHRyIG5nLXJlcGVhdD0iaSBpbiBkYXRhLnJlc3BvbnNlUGFyYW1ldGVycyB8IG9yZGVyQnkgOiAnaWQnICIgY2FuLXJlbW92ZT0iZGF0YS5yZXNwb25zZVBhcmFtZXRlcnMiCiAgICAgICAgICAgIGxpc3QtaWQ9Int7aS5pZH19Ij4KICAgICAgICAgIDx0ZCBuZy1jbGFzcz0ieydoYXMtZXJyb3InOmFkZEZvcm1baS5uYW1lVmVyaWZ5XS4kZGlydHkgJmFtcDsmYW1wOyBhZGRGb3JtW2kubmFtZVZlcmlmeV0uJGludmFsaWR9IgogICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWdyb3VwIGhhcy1mZWVkYmFjayIgc3R5bGU9InBvc2l0aW9uOiByZWxhdGl2ZTsiPgoKICAgICAgICAgICAgPHNwYW4gbmctaWY9ImkuaWQubGVuZ3RoIT0yIiBjbGFzcz0idGV4dC1kYW5nZXIiIHN0eWxlPSJ0b3A6IDlweDtsZWZ0OiB7eyhpLmlkLmxlbmd0aC8yIC0gMSkqNn19JTtwb3NpdGlvbjogYWJzb2x1dGU7Ij4mbm90Ozwvc3Bhbj4KICAgICAgICAgICAgPGlucHV0IG5nLW1vZGVsPSJpLm5hbWUiIGR5LW5hbWU9ImkubmFtZVZlcmlmeSIgcGxhY2Vob2xkZXI9Int7J1JFUVVJUkVEJ3x0cmFuc2xhdGV9fSIgbmctcmVxdWlyZWQ9InRydWUiCiAgICAgICAgICAgICAgICAgICBjbGFzcz0iZm9ybS1jb250cm9sIiAgc3R5bGU9IndpZHRoOnt7MTAwLShpLmlkLmxlbmd0aC8yIC0gMSkqNn19JSIgLz48c3BhbgogICAgICAgICAgICBuZy1pZj0iYWRkRm9ybVtpLm5hbWVWZXJpZnldLiRkaXJ0eSAmYW1wOyZhbXA7IGFkZEZvcm1baS5uYW1lVmVyaWZ5XS4kaW52YWxpZCIgdG9vbHRpcD0ie3snUkVRVUlSRUQnfHRyYW5zbGF0ZX19IgogICAgICAgICAgICBjbGFzcz0iZ2x5cGhpY29uIGdseXBoaWNvbi1leGNsYW1hdGlvbi1zaWduIGZvcm0tY29udHJvbC1mZWVkYmFjayI+PC9zcGFuPgogICAgICAgICAgPC90ZD4KICAgICAgICAgIDx0ZCBuZy1jbGFzcz0ieydoYXMtZXJyb3InOmFkZEZvcm1baS5ydWxlVmVyaWZ5XS4kZGlydHkgJmFtcDsmYW1wOyBhZGRGb3JtW2kucnVsZVZlcmlmeV0uJGludmFsaWR9IgogICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWdyb3VwIGhhcy1mZWVkYmFjayI+PHN0cm9uZyBuZy1pZj0iaS5raW5kPT0nb2JqZWN0JyIKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9Im1hcmdpbjogNnB4IDEycHg7ZGlzcGxheTogaW5saW5lLWJsb2NrOyIKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9InRleHQtaW5mbyI+e308L3N0cm9uZz48c3Ryb25nCiAgICAgICAgICAgIG5nLWlmPSJpLmtpbmQ9PSdhcnJheShvYmplY3QpJyIgc3R5bGU9Im1hcmdpbjogNnB4IDEycHg7ZGlzcGxheTogaW5saW5lLWJsb2NrOyIKICAgICAgICAgICAgY2xhc3M9InRleHQtaW5mbyI+W3t9XTwvc3Ryb25nPgogICAgICAgICAgICA8aW5wdXQgbmctbW9kZWw9ImkucnVsZSIgYXJyYXkyc3RyIGR5LW5hbWU9ImkucnVsZVZlcmlmeSIgcGxhY2Vob2xkZXI9Int7J1JFUVVJUkVEJ3x0cmFuc2xhdGV9fSIgbmctcmVxdWlyZWQ9InRydWUiCiAgICAgICAgICAgICAgICAgICBuZy1pZj0iaS5raW5kIT0nb2JqZWN0JyZhbXA7JmFtcDsgaS5raW5kIT0nYXJyYXkob2JqZWN0KSciIGNsYXNzPSJmb3JtLWNvbnRyb2wiLz4KICAgICAgICAgICAgICAgIDxzcGFuIG5nLWlmPSJhZGRGb3JtW2kucnVsZVZlcmlmeV0uJGRpcnR5ICZhbXA7JmFtcDsgYWRkRm9ybVtpLnJ1bGVWZXJpZnldLiRpbnZhbGlkIiB0b29sdGlwPSJ7eydSRVFVSVJFRCd8dHJhbnNsYXRlfX0iCiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz0iZ2x5cGhpY29uIGdseXBoaWNvbi1leGNsYW1hdGlvbi1zaWduIGZvcm0tY29udHJvbC1mZWVkYmFjayI+PC9zcGFuPgogICAgICAgICAgPC90ZD4KICAgICAgICAgIDx0ZCBhbGlnbj0iY2VudGVyIj48c3BhbiBuZy1iaW5kPSJpLmtpbmQiIHN0eWxlPSJkaXNwbGF5Om5vbmU7bWFyZ2luLXRvcDo2cHg7IgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPSJkaXNhYmxlZC1zZWxlY3QiPjwvc3Bhbj4KICAgICAgICAgICAgPHNlbGVjdCBuZy1tb2RlbD0iaS5raW5kIiBzdHlsZT0ibWFyZ2luLXRvcDogOHB4OyI+CiAgICAgICAgICAgICAgPG9wdGlvbj5zdHJpbmc8L29wdGlvbj4KICAgICAgICAgICAgICA8b3B0aW9uPm1vY2s8L29wdGlvbj4KICAgICAgICAgICAgICA8b3B0aW9uPm9iamVjdDwvb3B0aW9uPgogICAgICAgICAgICAgIDxvcHRpb24+YXJyYXkob2JqZWN0KTwvb3B0aW9uPgogICAgICAgICAgICA8L3NlbGVjdD4KICAgICAgICAgIDwvdGQ+CiAgICAgICAgICA8dGQ+CiAgICAgICAgICAgIDxpbnB1dCBzeW1ib2wtZmlsdGVyIG5nLW1vZGVsPSJpLnJlbWFyayIgIGNsYXNzPSJmb3JtLWNvbnRyb2wiLz4KICAgICAgICAgIDwvdGQ+CiAgICAgICAgICA8dGQgYWxpZ249ImNlbnRlciI+CiAgICAgICAgICAgIDxhIG5nLWNsaWNrPSJhZGRSZXNwb25zZVBhcmFtZXRlcnMoaS5pZCkiIG5nLWlmPSJpLmtpbmQ9PSdvYmplY3QnfHxpLmtpbmQ9PSdhcnJheShvYmplY3QpJyIgdG9vbHRpcD0ie3snQUREJ3x0cmFuc2xhdGV9fSIgc3R5bGU9Im1hcmdpbi10b3A6IDNweDtwYWRkaW5nOiAxMHB4IDBweDsiICBjbGFzcz0iYnRuIGJ0bi1zbSBnbHlwaGljb24gZ2x5cGhpY29uLXBsdXMgdGV4dC1zdWNjZXNzIj48L2E+CiAgICAgICAgICAgIDxhIG5nLWNsaWNrPSJyZW1vdmVSZXNwb25zZVBhcmFtZXRlcnMoJGluZGV4KSIgdG9vbHRpcD0ie3snREVMRVRFJ3x0cmFuc2xhdGV9fSIgc3R5bGU9Im1hcmdpbi10b3A6IDNweDtwYWRkaW5nOiAxMHB4IDBweDsiIGNsYXNzPSJidG4gYnRuLXNtIGdseXBoaWNvbiBnbHlwaGljb24tbWludXMgdGV4dC1kYW5nZXIiPjwvYT4KICAgICAgICAgIDwvdGQ+CiAgICAgICAgPC90cj4KICAgICAgICA8L3Rib2R5PgogICAgICA8L3RhYmxlPgoKCiAgICA8L3RhYj4KICAgIDx0YWIgaGVhZGluZz0ie3snREVUQUlMLVJFVFVSTi1TVEFUSUMtSU5URVJGQUNFJ3x0cmFuc2xhdGV9fSIgc2VsZWN0PSJkYXRhLnJlc3BvbnNlUGFyYW1ldGVyc1R5cGU9dHJ1ZSIgYWN0aXZlPSJkYXRhLnJlc3BvbnNlUGFyYW1ldGVyc1R5cGUiPgogICAgICA8ZGl2IHN0eWxlPSJib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZTNlM2UzO2JvcmRlci1sZWZ0OiAxcHggc29saWQgI2UzZTNlMztib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UzZTNlMzsiPgogICAgICAgIDx0ZXh0YXJlYSBwbGFjZWhvbGRlcj0ie3snREVUQUlMLUZJTEwtT1VUJ3x0cmFuc2xhdGV9fSIgaXMtanNvbiBuZy1tb2RlbD0iZGF0YS5yZXNwb25zZUpzb24iCiAgICAgICAgICAgICAgICAgIHN0eWxlPSJwYWRkaW5nOiAxMHB4O3Jlc2l6ZTogdmVydGljYWw7bWluLWhlaWdodDozMDBweDtib3JkZXItY29sb3I6ICNmZmZmZmY7d2lkdGg6IDEwMCU7Ij48L3RleHRhcmVhPgogICAgICA8L2Rpdj4KICAgIDwvdGFiPgogIDwvdGFic2V0PgoKCjwvZGl2Pgo8ZGl2IGNsYXNzPSJjb2wtbWQtNSB3ZWxsIHdlbGwtc20iPgogIDxkaXYgY2xhc3M9InBhbmVsLWJvZHkiPgogICAgPGEgaHJlZj0iaHR0cDovL21vY2tqcy5jb20vZXhhbXBsZXMuaHRtbCIgdGFyZ2V0PSJfYmxhbmsiPnt7J0RFVEFJTC1NT0NLSlMtREVNTyd8dHJhbnNsYXRlfX0mZ3Q7Jmd0OzwvYT4KCiAgICA8aDY+e3snREVUQUlMLVVSTCd8dHJhbnNsYXRlfX08L2g2PgoKICAgIDxwIG5nLWJpbmQ9ImRhdGEuaW50ZXJmYWNlVXJsIiBuZy1pZj0iZGF0YS5pbnRlcmZhY2VVcmwubGVuZ3RoIiBjbGFzcz0idGV4dC1tdXRlZCI+PC9wPgogICAgPHAgbmctaWY9IiFkYXRhLmludGVyZmFjZVVybC5sZW5ndGgiIGNsYXNzPSJ0ZXh0LW11dGVkIj4tLTwvcD4KCiAgICA8aDY+e3snREVUQUlMLVRZUEUnfHRyYW5zbGF0ZX19PC9oNj4KICAgIDxwIG5nLWJpbmQ9ImRhdGEuaW50ZXJmYWNlVHlwZSIgY2xhc3M9InRleHQtbXV0ZWQiPjwvcD4KCiAgICA8aDY+e3snREVUQUlMLVJFTUFSSyd8dHJhbnNsYXRlfX08L2g2PgoKICAgIDxwIG5nLWJpbmQ9ImRhdGEuaW50ZXJmYWNlTmFtZSIgbmctaWY9ImRhdGEuaW50ZXJmYWNlTmFtZS5sZW5ndGgiIGNsYXNzPSJ0ZXh0LW11dGVkIj48L3A+CiAgICA8cCBuZy1pZj0iIWRhdGEuaW50ZXJmYWNlTmFtZS5sZW5ndGgiIGNsYXNzPSJ0ZXh0LW11dGVkIj4tLTwvcD4KCiAgICA8aDY+e3snREVUQUlMLVJFUVVFU1QtUEFSQU1FVEVSUyd8dHJhbnNsYXRlfX08L2g2PgogICAgPHVsPgogICAgICA8bGkgbmctcmVwZWF0PSJpIGluIGRhdGEucmVxdWlyZWRQYXJhbWV0ZXJzIj4KICAgICAgICA8c3Ryb25nIG5nLWlmPSJpLm5hbWUubGVuZ3RoIiBuZy1jbGFzcz0ieyd0ZXh0LW11dGVkJzohaS5yZXF1aXJlZH0iPnt7aS5uYW1lfX08L3N0cm9uZz4KICAgICAgICA8c3BhbiBuZy1pZj0iIWkubmFtZS5sZW5ndGgiPi0tPC9zcGFuPgogICAgICAgIDxzYXBuPiZuYnNwOzwvc2Fwbj4KICAgICAgICA8c3BhbiBuZy1pZj0iaS5yZW1hcmsubGVuZ3RoIiBzdHlsZT0iY29sb3I6ICM5OTkzMzM7Ij4mbmJzcDsvLyZuYnNwO3t7aS5yZW1hcmt9fTwvc3Bhbj4KICAgICAgPC9saT4KICAgIDwvdWw+CiAgICA8aDY+CiAgICAgIHt7J0RFVEFJTC1SRVRVUk4tSU5URVJGQUNFJ3x0cmFuc2xhdGV9fQogICAgPC9oNj4KCiAgICA8ZGl2IGNsYXNzPSJwYW5lbCBwYW5lbC1kZWZhdWx0Ij4KICAgICAgPGRpdiBuZy1pZj0iIWRhdGEucmVzcG9uc2VQYXJhbWV0ZXJzVHlwZSIganNvbjJodG1sPSJkYXRhLnJlc3BvbnNlUGFyYW1ldGVycyIgc3R5bGU9Im92ZXJmbG93LXk6IGF1dG87IgogICAgICAgICAgIGNsYXNzPSJwYW5lbC1ib2R5IGpzb24tcGFuZWwiPjwvZGl2PgogICAgICA8ZGl2IG5nLWlmPSJkYXRhLnJlc3BvbnNlUGFyYW1ldGVyc1R5cGUiIGpzb24tZm9ybWF0PSJkYXRhLnJlc3BvbnNlSnNvbiIgc3R5bGU9Im92ZXJmbG93LXk6IGF1dG87IgogICAgICAgICAgIGNsYXNzPSJwYW5lbC1ib2R5IGpzb24tcGFuZWwiPjwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+Cgo8L2Rpdj4KPC9kaXY+Cgo8ZGl2IGNsYXNzPSJyb3cgd2VsbCB3ZWxsLXNtIgogICAgIHN0eWxlPSIgcG9zaXRpb246IGZpeGVkOyBib3R0b206IDA7IGxlZnQ6IDA7IHJpZ2h0OiAwOyB6LWluZGV4OiA5OTk7dGV4dC1hbGlnbjogY2VudGVyO21hcmdpbi1ib3R0b206MDsiPgogIDxhIG5nLWRpc2FibGVkPSJhZGRGb3JtLiRpbnZhbGlkIiBuZy1jbGljaz0idXNlZCgpIiBjbGFzcz0iYnRuIGJ0bi1wcmltYXJ5Ij57eydBUFBMWSd8dHJhbnNsYXRlfX08L2E+CiAgPGEgc3R5bGU9Im1hcmdpbi1sZWZ0OiAxMHB4OyIgbmctZGlzYWJsZWQ9ImFkZEZvcm0uJGludmFsaWQiIG5nLWNsaWNrPSJzdWJtaXQoKSIgY2xhc3M9ImJ0biBidG4tc3VjY2VzcyI+e3snU1VCTUlUJ3x0cmFuc2xhdGV9fTwvYT4KICA8YSB1aS1zcmVmPSJsaXN0IiBzdHlsZT0ibWFyZ2luLWxlZnQ6IDEwcHg7IiBjbGFzcz0iYnRuIGJ0bi1kZWZhdWx0Ij57eydDQU5DRUwnfHRyYW5zbGF0ZX19PC9hPgo8L2Rpdj4KCjwvZm9ybT4KPGRpdiBncm93bD48L2Rpdj4KCg==","base64"),
      controller: require('./controller/detail.js')
    });

  $provide.constant('config', {
    interfaceSuffix: window.interfaceSuffix
  });


}];

}).call(this,require("buffer").Buffer)
},{"./controller/detail.js":8,"./controller/main.js":9,"buffer":3}],29:[function(require,module,exports){
/**
 *
 * @param json 需要处理的对象
 * @param id  父节点的ID
 * @param array 他的父级 如果为数组的话 将id传出数组
 * @returns {data|*}
 */


var clone = function (obj) {
  if (!angular.isObject(obj)) return obj;
  return angular.isArray(obj) ? obj.slice() : angular.extend({}, obj);
};


var json2Data = function (key, value, id, array, reData) {

  var _array = clone(array);
  if (typeof(value) === 'string') {
    reData.push({
      id: ('' + id).length % 2 != 0 ? '0' + id : id,
      kind: typeof(value),
      name: key,
      rule: value,
      array: _array,
      nameVerify: 'name_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1),
      ruleVerify: 'rule_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1)
    });
  } else if (typeof(value) === 'boolean' || typeof(value) === 'number') {
    reData.push({
      id: ('' + id).length % 2 != 0 ? '0' + id : id,
      kind: 'mock',
      name: key,
      rule: value,
      array: _array,
      nameVerify: 'name_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1),
      ruleVerify: 'rule_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1)
    });
  } else if (angular.isArray(value)) { //如果是一个数组
    id = ('' + id).length % 2 != 0 ? '0' + id : id;
    if (value.length) {
      if (angular.isArray(value[0])) { //如果是二维数组
        reData.push({
          id: id,
          kind: 'mock',
          name: key,
          rule: value,
          array: _array,
          nameVerify: 'name_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1),
          ruleVerify: 'rule_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1)
        });
      }
      else if (angular.isObject(value[0])) { //如果这是一个数组对象的话
        reData.push({
          id: id,
          kind: 'array(object)',
          name: key,
          rule: '',
          array: _array,
          nameVerify: 'name_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1),
          ruleVerify: 'rule_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1)
        });
        var _id = 0;
        array.push(id);
        angular.forEach(value[0], function (o, i) {
          _id = parseInt(_id);
          _id = 1 + _id;
          _id = ('' + _id ).length % 2 != 0 ? '0' + _id : _id;
          json2Data(i, o, id + _id, array, reData);
        });
      } else { //如果这是一个简单的数组的话
        var _rule = '[';
        angular.forEach(value, function (o, i) {
          if (typeof(o) === 'string') {
            _rule += '"' + o + '"';
          } else {
            _rule += o;
          }
          if (i !== value.length - 1) {
            _rule += ',';
          }
        });
        _rule += ']';
        reData.push({
          id: id,
          kind: 'mock',
          name: key,
          rule: _rule,
          array: _array,
          nameVerify: 'name_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1),
          ruleVerify: 'rule_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1)
        });
      }
    } else { //如果是一个空数组
      reData.push({
        id: id,
        kind: 'mock',
        name: key,
        rule: "[]",
        array: _array,
        nameVerify: 'name_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1),
        ruleVerify: 'rule_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1)
      });
    }
  } else if (angular.isObject(value)) { //这不是一个空对象
    id = ('' + id).length % 2 != 0 ? '0' + id : id;
    reData.push({
      id: id,
      kind: 'object',
      name: key,
      rule: "",
      array: _array,
      nameVerify: 'name_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1),
      ruleVerify: 'rule_' + Date.parse(new Date()) + Math.floor(Math.random()*1000+1)
    });
    var _id = 0;
    angular.forEach(value, function (o, i) {
      _id = parseInt(_id);
      _id = 1 + _id;
      _id = ('' + _id ).length % 2 != 0 ? '0' + _id : _id;
      json2Data(i, o, id + _id, array, reData);
    });
  }
};


module.exports = json2Data;

},{}],30:[function(require,module,exports){
/**
 * Created by lihui on 15-1-22.
 */


module.exports = angular.module('service', [])
  .factory('json2Data', function () {
    return  require('./json2Data')
  });
},{"./json2Data":29}]},{},[7]);
