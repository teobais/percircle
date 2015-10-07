jQuery(document).ready(function () {

	//Identify by data attribute
	var dataPercircles = jQuery( "div[data-percircle]" );

	jQuery.each( dataPercircles, function(){
		var percentage = jQuery( this ).data( "percircle" );
    if( percentage > 50 ){
			jQuery( this ).addClass( 'exceed' );
		}
		render( this, percentage )
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
