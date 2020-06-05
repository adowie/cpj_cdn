
function cname_lookup(customername) {
	if(customername.length == 0) {
		// Hide the suggestion box.
		$('#customername').val("");	
		$('#customer_address').val("");
		$('#city').val("");
		$('#Telephone').val("");
		$('#customer_parish').val("");
		$('#customernumber').val("");
		$('#fax_number').val("");
		$('#customer_email').val("");
		$('#invoice_batchno').val("");
		$('#product_invoice').val("");
		$('#owner').val("");
		$('#valid_id').val("");
		$('#suggestions3').hide();
	} else {
				
		$.post("listing/c_name_listing.php", {queryString: ""+customername+""}, function(data){
			if(data.length >0) {
				$('#suggestions1').show();
				$('#autoSuggestionsList1').html(data);
			}
		});
	}
} // lookup

function fill_c_details(thisValue,AddressValue,CityValue,TeleValue,ParishValue,CustIDValue,CustFax,CustEmail) {
	
	$('#customername').val(thisValue);	
	$('#customer_address').val(AddressValue);
	$('#city').val(CityValue);
	$('#Telephone').val(TeleValue);
	$('#customer_parish').val(ParishValue);
	$('#customernumber').val(CustIDValue);
	$('#valid_id').val(CustIDValue);
	$('#fax_number').val(CustFax);
	$('#customer_email').val(CustEmail);
	setTimeout("$('#suggestions1').hide();", 200);
	//$("#target").load("functions/customer_items.php?id="+CustIDValue+"&case=0",function(){$.getScript("js/jquery-1.9.1.min.js");$.getScript("js/custom.js");});
	$("#target").load("functions/customer_items.php?id="+CustIDValue+"&case=0");
}


function cid_lookup(customernumber) {
	if(customernumber.length == 0) {
		// Hide the suggestion box.
		$('#customername').val("");	
		$('#customer_address').val("");
		$('#city').val("");
		$('#Telephone').val("");
		$('#customer_parish').val("");
		$('#customernumber').val("");
		$('#fax_number').val("");
		$('#customer_email').val("");
		$('#invoice_batchno').val("");
		$('#product_invoice').val("");
		$('#owner').val("");
		$('#valid_id').val("");
		$('#suggestions3').hide();
	} else {
		$.post("listing/c_id_listing.php", {queryString: ""+customernumber+""}, function(data){
			if(data.length >0) {
				$('#suggestions2').show();
				$('#autoSuggestionsList2').html(data);
			}
		});
	}
} // lookup

function fill_cid_details(thisValue,AddressValue,CityValue,TeleValue,ParishValue,CustIDValue,CustFax,CustEmail) {
	$('#customername').val(thisValue);	
	$('#customer_address').val(AddressValue);
	$('#city').val(CityValue);
	$('#Telephone').val(TeleValue);
	$('#customer_parish').val(ParishValue);
	$('#customernumber').val(CustIDValue);
	$('#valid_id').val(CustIDValue);
	$('#fax_number').val(CustFax);
	$('#customer_email').val(CustEmail);
	setTimeout("$('#suggestions2').hide();", 200);
	//alert(CustIDValue);
	$("#target").load("functions/customer_items.php?id="+CustIDValue+"&case=0");
}

function fill_cid_details_hide(){setTimeout("$('#suggestions2').hide();", 200);}

function cinvoice(invoice,customernumber,report_products){
	//alert(customernumber);
	if(invoice.length == 0) {
		//alert("Empty");
		$('#invoice_batchno').val("");
		$('#owner').val("");
		$("#target").load("functions/customer_items.php?id="+customernumber+"&case=0");
	}
	else
	{
//alert(customernumber);
		$.post("listing/invoice_listing.php", {invoice: ""+invoice+"",custnmbr: ""+customernumber+"",products: ""+report_products+""}, function(data){
			if(data.length >0) {
				$('#suggestions_Inv').show();
				$('#autoSuggestionsList_Inv').html(data);
			}
		});
	}
}

function fill_products(thisValue,invoice_batch,report_products,status){
	$('#product_invoice').val(thisValue);
	$('#invoice_batchno').val(invoice_batch);
	setTimeout("$('#suggestions_Inv').hide();", 200);
	//alert(report_products);
	//var multipleValues = $("#report_products").val() || [];
	//if(multipleValues.length <= 0){
	//$("#target").load("functions/customer_items.php?id="+thisValue+"&case=1",function(){$.getScript("js/jquery-1.9.1.min.js");$.getScript("js/custom.js");});
	$("#target").load("functions/customer_items.php?id="+thisValue+"&case=1&status="+status);
	//}
	//$("#target").load("includes/jquery.php");
	$('#owner').val("0");
}

function guess_invoice(thisValue){
//var return_val;
var multipleValues = $("#report_products").val() || [];
var number_choices = $("#report_products option:selected").length;
var cust_id = $('#customernumber').val();
if(($('#owner').val() == "" &&  number_choices >= 1) || ($('#owner').val() == "1" &&  number_choices >= 1) )
{
	//alert(number_choices);
	//$.get("functions/guess_invoice_batch.php?id="+multipleValues,{},function(data){$("#result").html(data);});
	$("#invoice_batchno").val(showGetResult("functions/guess_invoice_batch.php?cust="+cust_id+"&id="+multipleValues));
	$('#product_invoice').val(showGetResult("functions/guess_invoice.php?cust="+cust_id+"&id="+multipleValues));
	$('#owner').val("1");
}


}

function showGetResult(scriptUrl)
{
     var result = null;
     //var scriptUrl = "somefile.php?name=" + name;
     $.ajax({
        url: scriptUrl,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        } 
     });
     return result;
}


function populate_Emp(thisValue){

	//alert("IN");
if(thisValue.length == 0) {
		// Hide the suggestion box.
		$('#employee_number').val("");	
		$('#suggestions_Emp').hide();
	} else {
		$.post("listing/employees.php", {queryString: ""+thisValue+""}, function(data){
			if(data.length >0) {
				$('#suggestions_Emp').show();
				$('#autoSuggestionsList_Emp').html(data);
			}
		});
	}

}

function fill_emp_id(thisValue,number)
{
	$('#employee_name').val(thisValue);
	$('#employee_number').val(number);
	setTimeout("$('#suggestions_Emp').hide();", 200);
}


function populate_Rec(thisValue){

	//alert("IN");
if(thisValue.length == 0) {
		// Hide the suggestion box.
		$('#rec_Name_email').val("");
		$('#rec_Name_id').val("");	
		$('#suggestions_Rec').hide();
	} else {
		$.post("listing/personel_pull.php", {queryString: ""+thisValue+"",cases: "0"}, function(data){
			if(data.length >0) {
				$('#suggestions_Rec').show();
				$('#autoSuggestionsList_Rec').html(data);
			}
		});
	}

}

function fill_reciever(thisValue,email,id_num){
	$('#rec_Name').val(thisValue);
	$('#rec_Name_email').val(email);
	$('#rec_Name_id').val(id_num);
	setTimeout("$('#suggestions_Rec').hide();", 200);
}

function fill_reciever_hide(){setTimeout("$('#suggestions_Rec').hide();", 200);}

function populate_Matt(thisValue){

	//alert("IN");
if(thisValue.length == 0) {
		// Hide the suggestion box.
		$('#matt_Name_email').val("");
		$('#matt_Name_id').val("");	
		$('#suggestions_Matt').hide();
	} else {
		$.post("listing/personel_pull.php", {queryString: ""+thisValue+"",cases: "1"}, function(data){
			if(data.length >0) {
				$('#suggestions_Matt').show();
				$('#autoSuggestionsList_Matt').html(data);
			}
		});
	}

}

function fill_matter(thisValue,email,id_num){
	$('#matt_Name').val(thisValue);
	$('#matt_Name_email').val(email);
	$('#matt_Name_id').val(id_num);
	setTimeout("$('#suggestions_Matt').hide();", 200);
}

function populate_Act(thisValue){

	//alert("IN");
if(thisValue.length == 0) {
		// Hide the suggestion box.
		$('#act_Name_email').val("");
		$('#act_Name_id').val("");	
		$('#suggestions_Act').hide();
	} else {
		$.post("listing/personel_pull.php", {queryString: ""+thisValue+"",cases: "2"}, function(data){
			if(data.length >0) {
				$('#suggestions_Act').show();
				$('#autoSuggestionsList_Act').html(data);
			}
		});
	}

}

function fill_act(thisValue,email,id_num){
	$('#act_Name').val(thisValue);
	$('#act_Name_email').val(email);
	$('#act_Name_id').val(id_num);
	setTimeout("$('#suggestions_Act').hide();", 200);
}

function iseenotes(){
	$.post("functions/update_seen_notice.php");
	//alert("Click");
     $.post("functions/pull_system_notification.php",function(data){
    if(data.length >0) {
        $('#system_notes').html(data);
    }
},"html");
}


function hideSubmit(thisValue){
	$("#submit_fourth_straight").hide();
}
function showSubmit(thisValue){
	$("#submit_fourth_straight").show();
}

function showActionDetails(thisValue){
	$('#ifcaseclose').show();
}

function hideActionDetails(thisValue){
	$('#ifcaseclose').hide();
}


function showresult(id,CMD){

	//alert("IN IT");

	if(id.length == 0) {

		alert("No Result Available");
	}
	else
	{
		$.get("functions/viewdetails.php",{id: ""+id+"",cmd:""+CMD+""},function(data){
	    if(data.length >0) {
	        $('#search_results').html(data);
	    }
		},"html");
		
		$('#first_step_dashboard').slideUp();
	    $('#second_step_dashboard').slideDown();		
	}



    //alert(ID);
}

function hideresults(){
	$('#search_results').html("");
	$('#first_step_dashboard_deep').html("");
	$('#second_step_dashboard').slideUp();
    $('#first_step_dashboard').slideDown();

}
function showresultagain(){
	$('#second_step_dashboard_deep').slideUp();
	$('#first_step_dashboard_deep').slideDown();		
}

function detailinfo(report,transaction)
{

	if(report.length == 0) {

		alert("No Result Available");
	}
	else
	{
		$.get("functions/viewalldetail.php",{id: ""+report+"",trans:""+transaction+""},function(data){
	    if(data.length >0) {
	        $('#search_results_details').html(data);
	    }
		},"html");
		
		$('#first_step_dashboard_deep').slideUp();
	    $('#second_step_dashboard_deep').slideDown();		
	}
	
}

function showCloseForQueryANDCcmpliment(thisValue)
{
	if((thisValue == 2) || (thisValue == 1)){

	   $('#showCloseForQueryANDCcmpliment').css('display','block');

	   $('#report_close_compliment_query_1').attr('checked', true);
	   $('#uniform-report_close_compliment_query_0 span').removeClass('checked');
	   $('#uniform-report_close_compliment_query_1 span').addClass('checked');
	}
	else
	{
		$('#showCloseForQueryANDCcmpliment').css('display','none');
		$("#submit_third").show();
		$("#submit_query_compiment").hide();
		$('#submit_back_query_compiment').hide();

		$('#report_close_compliment_query_1').attr('checked', true);
		$('#uniform-report_close_compliment_query_0 span').removeClass('checked');
		$('#uniform-report_close_compliment_query_1 span').addClass('checked');
	}
}

function saveComplimentQuery(thisValue)
{
	if(thisValue == "Yes")
	{
		$("#submit_third").hide();
		$("#submit_query_compiment").show();
	}
	else
	{
		
		$("#submit_third").show();
		$("#submit_query_compiment").hide();
		$("#submit_back_query_compiment").hide();

		
	}
	
}


function report_id_lookup(report_id) {
	if(report_id.length == 0) {
		// Hide the suggestion box.
		$('#appendedInputButtonsPhone').val("");	
		$('#suggestionsreportid').hide();
	} else {
				
		$.post("listing/report_id_listing.php", {queryString: ""+report_id+""}, function(data){
			if(data.length >0) {
				$('#suggestionsreportid').show();
				$('#autoSuggestionsreportid').html(data);
			}
		});
	}
} // lookup


function fill_report_id(report_id,true_id)
{
	$('#appendedInputButtonsPhone').val(report_id);
	$('#valid_search_id').val(true_id);
	setTimeout("$('#suggestionsreportid').hide();", 200);
}


function report_id_des_lookup(report_id) {
	if(report_id.length == 0) {
		// Hide the suggestion box.
		$('#appendedInputButtons').val("");	
		$('#suggestions_reportid').hide();
	} else {
				
		$.post("listing/report_ids_listing.php", {queryString: ""+report_id+""}, function(data){
			if(data.length >0) {
				$('#suggestions_reportid').show();
				$('#autoSuggestions_reportid').html(data);
			}
		});
	}
} // lookup


function fill_reports_id(report_id,true_id)
{
	$('#appendedInputButtons').val(report_id);
	$('#valid_search_id').val(true_id);
	setTimeout("$('#suggestions_reportid').hide();", 200);
}

function searchview(thisValue,rep)
{
    var report_id = thisValue;
    if(report_id.length > 5)
    {	
    	$('#appendedInputButtonsPhone').val(""+rep);
        $('#appendedInputButtons').val(""+rep);
        $('#valid_search_id').val(report_id);
        var true_value = report_id;
        $("#loader_search").show();

        $.get("functions/search_by_id.php?id="+true_value+"&showcode=0",function(data){
            if(data.length >0) {
                $('#search_results').html(data);
                $("#loader_search").hide();
            }
        },"html");
    }
}






