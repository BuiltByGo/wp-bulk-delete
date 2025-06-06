(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	jQuery(document).ready(function(){
		jQuery('.delete_all_datepicker').datepicker({
			changeMonth: true,
			changeYear: true,
			dateFormat: 'yy-mm-dd'
		});
	});

	// Delete posts form handle.
	jQuery(document).ready(function() {
	    jQuery('#delete_posts_submit').on( 'click', function() {
			if(jQuery('input[name="delete_time"]:checked').val() === "scheduled"){
				jQuery("#delete_posts_form").attr('action', wpBulkDeleteData.siteUrl + '/wp-admin/admin-post.php');
				jQuery("#delete_posts_form").submit();
				return;
			}
	        var deleteform = jQuery("#delete_posts_form").serialize();
	        var data = {
	            'action': 'delete_posts_count',
	            'form': deleteform
			};
	        jQuery(".spinner").addClass("is-active");
	        jQuery.post(ajaxurl, data, function(response) {
	            if( response != '' ){
	                var response = jQuery.parseJSON( response );
	                if( response.status == 0 ){
	                    jQuery(".delete_notice").html('<div class="notice wpbd-notice notice-error is-dismissible"><p><strong>' + response.messages + '</strong></p></div>');
	                } else if( response.status == 2 ){
	                    jQuery(".delete_notice").html('<div class="notice wpbd-notice notice-success is-dismissible"><p><strong>' + response.messages + '</strong></p></div>');
	                    jQuery("html, body").animate({ scrollTop: 0 }, "slow");
	                } else if( response.status == 1 ){
	                    if ( confirm(  response.post_count + ' posts will be delete. Would you like to proceed further?'  ) ){
	                        jQuery("#delete_posts_form").submit(); 
	                    } 
	                }
	            }
	            jQuery(".spinner").removeClass("is-active");
	        });    
	    });
	});

	// Render Dynamic taxomony.
	jQuery(document).ready(function() {
	    jQuery('#delete_post_type').on( 'change', function() {
	    	var post_type = jQuery(this).val();
	        var data = {
	            'action': 'render_taxonomy_by_posttype',
	            'post_type': post_type
	        };

	        var taxomony_space = jQuery('.post_taxonomy');
	        jQuery('.taxo_terms_title').html('');
	        jQuery('.post_taxo_terms').html('');
	        taxomony_space.html('<span class="spinner is-active" style="float: none;"></span>');
	        // send ajax request.
	        jQuery.post(ajaxurl, data, function(response) {
	            if( response != '' ){
	            	taxomony_space.html( response );
	            }else{
	            	taxomony_space.html( '' );
	            }	            
	        });    
	    });                    
	});

	// Render Dynamic Terms.
	jQuery(document).ready(function() {
	    jQuery(document).on( 'change', '.post_taxonomy_radio', function() {

	    	var post_taxomony = jQuery(this).val();
	    	var xt_taxonomy_title = jQuery(this).attr( 'title' );
			jQuery('.taxo_terms_title').html( xt_taxonomy_title + ':');
	        var data = {
	            'action': 'render_terms_by_taxonomy',
	            'post_taxomony': post_taxomony
	        };

	        var terms_space = jQuery('.post_taxo_terms');
	        terms_space.html('<span class="spinner is-active" style="float: none;"></span>');
	        // send ajax request.
	        jQuery.post(ajaxurl, data, function(response) {
	            if( response != '' ){
	            	terms_space.html( response );
	            	jQuery(".taxonomy_terms_select").chosen({placeholder_text_multiple:"Select "+xt_taxonomy_title });
	            }else{
	            	terms_space.html( '' );
	            }	            
	        });    
	    });
		
		jQuery(document).on( 'change', '.taxonomy_terms_select', function() {
			if (jQuery(this).val().length > 0) {
				jQuery("#delete_selected_category_section").show();
			} else {
				jQuery("#delete_selected_category_section").hide();
			}
		});
	});


	// Delete users form handle.
	jQuery(document).ready(function() {
	    jQuery('#delete_users_submit').on( 'click', function() {
			if(jQuery('input[name="delete_time"]:checked').val() === "scheduled"){
				jQuery("#delete_users_form").attr('action', wpBulkDeleteData.siteUrl + '/wp-admin/admin-post.php');
				jQuery("#delete_users_form").submit();
				return;
			}
	        var deleteuserform = jQuery("#delete_users_form").serialize();
	        var data = {
	            'action': 'delete_users_count',
	            'form': deleteuserform
	        };
	        jQuery(".spinner").addClass("is-active");
	        jQuery.post(ajaxurl, data, function(response) {
	            if( response != '' ){
	                var response = jQuery.parseJSON( response );
	                if( response.status == 0 ){
	                    jQuery(".delete_notice").html('<div class="notice wpbd-notice notice-error is-dismissible"><p><strong>' + response.messages + '</strong></p></div>');
	                } else if( response.status == 2 ){
	                    jQuery(".delete_notice").html('<div class="notice wpbd-notice notice-success is-dismissible"><p><strong>' + response.messages + '</strong></p></div>');
	                    jQuery("html, body").animate({ scrollTop: 0 }, "slow");
	                } else if( response.status == 1 ){
	                    if ( confirm(  response.post_count + ' users will be delete. Would you like to proceed further?'  ) ){
	                        jQuery("#delete_users_form").submit();    
	                    } 
	                }
	            }
	            jQuery(".spinner").removeClass("is-active");
	        });    
	    });                    
	});

	// Delete comments form handle.
	jQuery(document).ready(function() {
	    jQuery('#delete_comments_submit').on( 'click', function() {
			if(jQuery('input[name="delete_time"]:checked').val() === "scheduled"){
				jQuery("#delete_comments_form").attr('action', wpBulkDeleteData.siteUrl + '/wp-admin/admin-post.php');
				jQuery("#delete_comments_form").submit();
				return;
			}
	        var deletecommentform = jQuery("#delete_comments_form").serialize();
	        var data = {
	            'action': 'delete_comments_count',
	            'form': deletecommentform
	        };
	        jQuery(".spinner").addClass("is-active");
	        jQuery.post(ajaxurl, data, function(response) {
	            if( response != '' ){
	                var response = jQuery.parseJSON( response );
	                if( response.status == 0 ){
	                    jQuery(".delete_notice").html('<div class="notice wpbd-notice notice-error is-dismissible"><p><strong>' + response.messages + '</strong></p></div>');
	                } else if( response.status == 2 ){
	                    jQuery(".delete_notice").html('<div class="notice wpbd-notice notice-success is-dismissible"><p><strong>' + response.messages + '</strong></p></div>');
	                    jQuery("html, body").animate({ scrollTop: 0 }, "slow");
	                } else if( response.status == 1 ){
	                    if ( confirm(  response.post_count + ' comments will be delete. Would you like to proceed further?'  ) ){
	                        jQuery("#delete_comments_form").submit();    
	                    } 
	                }
	            }
	            jQuery(".spinner").removeClass("is-active");
	        });    
	    });                    
	});

	jQuery(document).ready(function(){
		jQuery('#with_custom_query').on('change', function(){
			if( jQuery('#with_custom_query').is(':checked') ){
				jQuery('input[name="delete_type"][value="permenant"]').prop('checked',true);
				jQuery('input[name=delete_type][value="trash"]').prop("disabled",true);
			}else{
				jQuery('input[name=delete_type][value="trash"]').prop("disabled",false);
			}
		});
		jQuery("#with_custom_query").trigger("checked");
	});

	// Delete meta form handle.
	jQuery(document).ready(function() {
	    jQuery('#delete_meta_submit').on( 'click', function() {
			if(jQuery('input[name="delete_time"]:checked').val() === "scheduled"){
				jQuery("#delete_meta_form").submit();
				return;
			}
	        var metaform = jQuery("#delete_meta_form").serialize();
	        var data = {
	            'action': 'delete_meta_count',
	            'form': metaform
	        };
	        jQuery(".spinner").addClass("is-active");
	        jQuery.post(ajaxurl, data, function(response) {
	            if( response != '' ){
	                var response = jQuery.parseJSON( response );
	                if( response.status == 0 ){
	                    jQuery(".delete_notice").html('<div class="notice wpbd-notice wpbd-notice notice-error is-dismissible"><p><strong>' + response.messages + '</strong></p></div>');
	                } else if( response.status == 2 ){
	                    jQuery(".delete_notice").html('<div class="notice wpbd-notice wpbd-notice notice-success is-dismissible"><p><strong>' + response.messages + '</strong></p></div>');
	                    jQuery("html, body").animate({ scrollTop: 0 }, "slow");
	                } else if( response.status == 1 ){
	                    if ( confirm(  response.post_count + ' meta will be delete. Would you like to proceed further?'  ) ){
	                        jQuery("#delete_meta_form").submit();    
	                    } 
	                }
	            }
	            jQuery(".spinner").removeClass("is-active");
	        });    
	    });                    
	});


	// Delete meta form handle.
	jQuery(document).ready(function() {
	    jQuery('#delete_terms_submit').on( 'click', function() {
	        var termform = jQuery("#delete_terms_form").serialize();
	        var data = {
	            'action': 'delete_terms_count',
	            'form': termform
	        };
	        jQuery(".spinner").addClass("is-active");
	        jQuery.post(ajaxurl, data, function(response) {
	            if( response != '' ){
	                var response = jQuery.parseJSON( response );
	                if( response.status == 0 ){
	                    jQuery(".delete_notice").html('<div class="notice wpbd-notice notice-error is-dismissible"><p><strong>' + response.messages + '</strong></p></div>');
	                } else if( response.status == 2 ){
	                    jQuery(".delete_notice").html('<div class="notice wpbd-notice notice-success is-dismissible"><p><strong>' + response.messages + '</strong></p></div>');
	                    jQuery("html, body").animate({ scrollTop: 0 }, "slow");
	                } else if( response.status == 1 ){
	                    if ( confirm(  response.post_count + ' Terms will be delete. Would you like to proceed further?'  ) ){
	                        jQuery("#delete_terms_form").submit();    
	                    } 
	                }
	            }
	            jQuery(".spinner").removeClass("is-active");
	        });    
	    });                    
	});

	// 
	jQuery(document).ready(function(){
		jQuery(".wpbd_global_multiple_select").chosen({ 
			max_selected_options: 100, 
			placeholder_text_multiple: "Select Multiple options...", 
			width : '100%', 
			clearAll: true 
		});
	});	

	// Render Dynamic post dropdown.
	jQuery(document).ready(function() {
	    jQuery('#meta_post_type').on( 'change', function() {
	    	var post_type = jQuery(this).val();
	        var data = {
	            'action': 'render_postdropdown_by_posttype',
	            'post_type': post_type
	        };

	        var postdropdown_space = jQuery('.postdropdown_space');
	        postdropdown_space.html('<span class="spinner is-active" style="float: none;"></span>');
	        // send ajax request.
	        jQuery.post(ajaxurl, data, function(response) {
	            if( response != '' ){
	            	postdropdown_space.html( response );
	            	jQuery(".post_for_meta").chosen({placeholder_text_multiple:"Select posts"});
	            }else{
	            	postdropdown_space.html( '' );
	            }	            
	        });    
		});
		
		jQuery('.date_type').on( 'change', function() {
	    	var date_type = jQuery(this).val();
	        if( date_type === 'custom_date' ){
				jQuery(".wpbd_date_days").hide();
				jQuery(".wpbd_custom_interval").show();
				jQuery(".wpbd_date_range").hide();
			}else if( date_type === 'within_last' || date_type === 'older_than' ){
				jQuery(".wpbd_custom_interval").hide();
				jQuery(".wpbd_date_days").show();
				jQuery(".wpbd_date_range").hide();
			}else{
				jQuery(".wpbd_custom_interval").hide();
				jQuery(".wpbd_date_days").hide();
				jQuery(".wpbd_date_range").show();
			}
		});

		jQuery('.mdate_type').on( 'change', function() {
	    	var mdate_type = jQuery(this).val();
	        if( mdate_type === 'mcustom_date'){
				jQuery(".mwpbd_date_days").hide();
				jQuery(".mwpbd_custom_interval").show();
			}else{
				jQuery(".mwpbd_custom_interval").hide();
				jQuery(".mwpbd_date_days").show();
			}
		});

		jQuery(".wpbd_schedule_name_wrap").show();
	});

	jQuery(document).ready(function(){
		jQuery('.delete_all_datetimepicker').datetimepicker({
			dateFormat: 'yy-mm-dd', 
			timeFormat: 'HH:mm:ss'
		});
	});

	jQuery(document).ready(function(){
		jQuery("#user_who_has_no_order").change(function() {
			if (jQuery(this).is(":checked")) {
				jQuery("#delete_user_roles_multiple").val(['customer']).trigger("chosen:updated");
			} else {
				jQuery("#delete_user_roles_multiple").trigger("chosen:updated");
			}
		});

		jQuery( "#delete_user_roles_multiple" ).change(function() {
			//here get chosent it's value
			if( jQuery('#user_who_has_no_order').is(":checked") ){
				var selectedRoles = jQuery(this).val();
				console.log( selectedRoles );
				if (selectedRoles && selectedRoles.length > 0) {
					var hasOtherRoles = selectedRoles.some(role => role !== "customer");
		
					if (hasOtherRoles) {
						alert('The "User Who Has No Order" option only works with the Customer role.');
						jQuery(this).val(['customer']).trigger("chosen:updated");
					}
				}
			}
		});

		jQuery('.wpbd-collapsible').on('click', function() {
			jQuery(this).toggleClass('wpbd-active');
			jQuery(this).next('.wpbd-collapse-content').slideToggle();
		});

		jQuery('.header.toggles').on('click', function() {
			var content = jQuery(this).next('.content');
			var svgIcon = jQuery(this).find('.wpbd-caret');
			var isExpanded = content.attr('aria-expanded') === 'true';
	
			// Toggle the content visibility
			content.slideToggle();
	
			// Update the aria-expanded attribute
			content.attr('aria-expanded', !isExpanded);
	
			// Toggle the rotated class on the SVG
			svgIcon.toggleClass('rotated');
		});

		jQuery('#select_all').change(function() {
            var isChecked = jQuery(this).is(':checked');
            jQuery('.cleanup_post_type').prop('checked', isChecked);
        });
	});

})( jQuery );


