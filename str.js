var strUtils = (function() {
	var templateCache = {};
	var formatRegEx = /\{([^}]+)\}/g;

	return {
		format: function(s, args) {
			return s.replace(formatRegEx, function(_, match){ return args[match]; }); 
		}, 
		template: function tmpl(template, data) {
			var fn = !/\W/.test(template) ?
			  templateCache[template] = templateCache[template] ||
				tmpl(template) :
			  new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +
				"with(obj){p.push('" +
				template
				  .replace(/[\r\t\n]/g, "")
				  .split("{!").join("\t")
				  .replace(/((^|!})[^\t]*)'/g, "$1\r")
				  .replace(/\t=(.*?)!}/g, "',$1,'")
				  .split("\t").join("');")
				  .split("!}").join("p.push('")
				  .split("\r").join("\\'")
			  + "');}return p.join('');");
			return data ? fn( data ) : fn;
		}
	};
})();
if (typeof module !== undefined)
	module.exports = strUtils;
