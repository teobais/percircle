jQuery(document).ready(function () {

	//Identify by data attribute
  var dataPercircles = jQuery( "div[data-percircle]" );
	//Identify by id, ensuring we don't percircle divs identified above
	var idPercircles = jQuery( "div[id$='circle']" ).not( "[data-percircle]" );

  jQuery.each( dataPercircles, function(){
		var percentage = $(this).data( "percircle" );
		render( this, percentage )
	});

	jQuery.each( idPercircles, function(){
		var classes = this.className.split( /\s+/ );
		var percentageClass = classes.filter(function( value ){
			return value.match( /^p\d+/ );
		});

		if( percentageClass.length > 0 ){
			var percentage = percentageClass[0].substring(1);
			render( this, percentage );
		}
	});

	function render( node, percentage ){
		var rotationMultiplier = 3.6;
		var rotationDegrees = rotationMultiplier * percentage;
		jQuery( node ).find( '.bar' ).css({
			'-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
			'-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
			'-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
			'-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
			'transform'         : 'rotate(' + rotationDegrees + 'deg)'
		});
	}
});
