$(function(){

    //$('form').submit(function(){ return false; });

    $("#submit_access").click(function(){
      //form.submit();
      //alert("submit");
      $( "#validation" ).submit();
      //var str = $('form').serialize();
      //console.log("welcome.php?"+str);
        //$.post("welcome.php?"+str);

    });

    $("#forgot_submit_access").click(function(){
        /*var str = $('form').serialize();

        console.log("password.php?"+str);

        $.post("password.php?"+str,function(data){          
        });*/
        $( "#forgot_form" ).submit();
    });

   
    //adding span12 to all listed input fields
    //var span12 = 'span12';
    var field_values_clear = {
            //id        :  value
            '#customernumber' : '',
            '#customername' : '',
            '#city' : '',
            '#customer_parish' : '',
            '#Telephone' : '',
            '#customer_email' : '',
            '#fax_number' : '',
            '#report_priority' : '',
            '#cc_users_email' : '',
            //Product Information
            '#Department' : '',
            '#statuscomplaint' : '',
            '#report_products' : '',
            '#product_invoice' : '',
            '#product_ph' : '',
            '#product_batchno' : '',
            '#product_brix' : '',
            '#fileInput' : '',
            '#employee_name' : '',
            '#employee_number' : '',
            //Received Information
            '#rec_Name' : '',
            '#investigation' : '',
            '#rec_Date' : '',
            '#rec_Time' : '',
            '#rec_Details' : '',
            //Matter Information
            '#matt_Name' : '',
            '#matt_Date' : '',
            '#matt_Time' : '',
            '#matt_ToTake' : '',
            //Action Information
            '#act_Name' : '',
            '#act_Date' : '',
            '#act_Time' : '',
            '#act_Remedy' : '',
            '#act_Remedy_preventitive_action' : ''
    };
    var fields_clear = $('#addinfile input[type=text], #addinfile select, #addinfile input[type=time]');
    fields_clear.each(function(){
        $(this).addClass('span12');
    });


	//s$('.alert.alert-error').css('display','none');
	$('#Department_chzn').css('width','100%');
    $('#employee_name_chzn').css('width','100%');
    $('#report_products_verify').css('width','90%');
	$('#report_products_chzn').css('width','100%');
	$('#cc_users_email_chzn').css('width','100%');
	$('.chzn-drop').css('width','99%');
	$('.chzn-search input[type=text]').css('width','87%');
	$('.chzn-results').css('width','97%');
	
	$('#uniform-fileInput').css('width','100%');
	$('.cleditorMain').css('width','100%');

    //$('#navbar').affix();

    $(".control-group textarea").css('width','100%');
    $(".control-group textarea").css('height','127');

     $(".control-group iframe").css('width','100%');
    //$('.control-group textarea').attr('style','');

    
    //original field values
    var field_values = {
            //id        :  value
            'customername'  : '',
            'city'  : '',
            'customer_parish'  : '',
            'customernumber'  : '',
            'Department' : '0',
            'rec_Name'  : '',
            'rec_Date'  : '',
            'rec_Time'  : '',
            'matt_Name'  : '',
            'matt_Date'  : '',
            'matt_Time'  : '',
            'act_Name' : '',
            'act_Date' : '',
            'act_Time' : ''

    };



    //alert("in");
    //inputfocus
    //$('input#customername').inputfocus({ value: field_values['customername'] });
    //$('input#city').inputfocus({ value: field_values['city'] });
    //$('input#customer_address').inputfocus({ value: field_values['customer_address'] });
    //$('input#rec_Name').inputfocus({ value: field_values['rec_Name'] });

   
	
    // tooltip demo
	$('a').tooltip('hide')
	//$('a').tooltip('show')

    //reset progress bar
    $('#add-step').css('width','0%');
    $('#add-step').html('0% Completed');

    //first_step
    //$('form').submit(function(){ return false; });
    //Customer Information
    $('#submit_first').click(function(){
        //remove classes
        $('#first_step input').removeClass('error').removeClass('valid');
        var fields = $('#first_step input[type=text]');
        var error = 0;

        //Creatung New Customers
        if(($('#valid_id').val() == "") && $('#customername').val() != "")
        {
            var r = confirm("You are about to create a new customer, are you sure about this?");
            if (r==true)
            {
                var str = $("form").serialize();

                $.post("functions/create_new_user.php?"+str,function(data){
                    if(data.length >0) {
                        $('#valid_id').val(data);
                        $('#customernumber').val(data);
                        $("#target").load("functions/customer_items.php?id="+data+"&case=0");
                    }
                },"html");



            }
            else
            {
                $('#customername').addClass('error');
                $('#first_step .alert.alert-error').css('display','block');
                $('#first_step .alert.alert-error').val("Please select a Customer Name from the list provided or contact the Administrator");
                $('#customername').effect("shake", { times:3 }, 50);
                error++;
            }
        }

        //ckeck if inputs aren't empty

        fields.each(function(){
            var value = $(this).val();
            //if( value.length<4 || value==field_values[$(this).attr('id')] || ( $(this).attr('id')=='customer_email' && !emailPattern.test(value) ) ) {
            if( value.length<4 && value==field_values[$(this).attr('id')]) {
                $(this).addClass('error');
                $('#first_step .alert.alert-error').css('display','block');
                $(this).effect("shake", { times:3 }, 50);
                
                error++;
            } else {
                $(this).addClass('valid');
            }
        });


        if(!error) {

            $('#first_step .alert.alert-error').css('display','none');
            //update progress bar
            $('.bar').html('20% Completed');
            $('.bar').css('width','20%');
            
            //slide steps
            $('#first_step').slideUp();
            $('#second_step').slideDown();
                 
        }else return false;
        
    });

    //Product Information
    $('#submit_second').click(function(){
        //remove classes
        $('#second_step input').removeClass('error').removeClass('valid');

        var fields = $('#second_step select');
        var error = 0;
        fields.each(function(){
            var value = $(this).val() || [];
            //alert(value);
            if( value.length<4 && value==field_values[$(this).attr('id')]) {
                
                $(this).addClass('error');
                $('#second_step .alert.alert-error').css('display','block');
                //$(this).effect("shake", { times:3 }, 50);
                error++;
            } else {
                $(this).addClass('valid');
            }
         });

        if($('#employee_name').val() != "" && $('#employee_number').val() == "")
        {
            $('#employee_name').addClass('error');
            $('#second_step .alert.alert-error').css('display','block');
            $('#employee_name').effect("shake", { times:3 }, 50);
            error++;
        }

        if(!error) {

            $('#second_step .alert.alert-error').css('display','none');
            //update progress bar
			$('.bar').html('40% Completed');
            $('.bar').css('width','40%');
            
            //slide steps
            $('#second_step').slideUp();
            $('#third_step').slideDown(); 

            }else return false;    
    });

    //Recieved Information
    $('#submit_third').click(function(){
        //remove classes
        $('#third_step input').removeClass('error').removeClass('valid');

        //ckeck if inputs aren't empty
        var fields = $('#third_step input[type=text],#third_step input[type=time]');
        var error = 0;
        fields.each(function(){
            var value = $(this).val();
            //if( value.length<4 || value==field_values[$(this).attr('id')] || ( $(this).attr('id')=='customer_email' && !emailPattern.test(value) ) ) {
            if( value.length<4 && value==field_values[$(this).attr('id')]) {
                $(this).addClass('error');
                $('#third_step .alert.alert-error').css('display','block');
                $(this).effect("shake", { times:3 }, 50);
                
                error++;
            } else {
                $(this).addClass('valid');
            }
        });

        if ($('#rec_Details').val() == '' || $('#rec_Details').val() == '<br>' || removeSps($('#rec_Details').val()).length < 10){
             $('#rec_Details').addClass('error');
             $('#third_step .alert.alert-error').css('display','block');
             $('#third_step .alert.alert-error').html("Please enter report details!");  
            error++;
        } else {
            //$('#rec_Details').addClass('valid');
        }

        /*if(!$("#rec_Time").val().match(/(1[012]|0[1-9]):[0-5][0-9](\\s)?(?i)(am|pm)/)) {
        // Do stuff to show things about things being invalid.
        return false;
        }*/

        //Check Reciever Information
        if(!error) {

            $('#third_step .alert.alert-error').css('display','none');
            //update progress bar
			$('.bar').html('60% Completed');
            $('.bar').css('width','60%');
            //slide steps
            $('#third_step').slideUp();
            $('#fourth_step').slideDown();                    
        }else return false;
        

         
    });
    
    //Save Queries or Complements
    $('#submit_query_compiment').click(function(){
        //remove classes
        $('#third_step input').removeClass('error').removeClass('valid');

        //ckeck if inputs aren't empty
        var fields = $('#third_step input[type=text],#third_step input[type=time]');
        var error = 0;
        fields.each(function(){
            var value = $(this).val();
            //if( value.length<4 || value==field_values[$(this).attr('id')] || ( $(this).attr('id')=='customer_email' && !emailPattern.test(value) ) ) {
            if( value.length<4 && value==field_values[$(this).attr('id')]) {
                $(this).addClass('error');
                $('#third_step .alert.alert-error').css('display','block');
                $(this).effect("shake", { times:3 }, 50);
                
                error++;
            } else {
                $(this).addClass('valid');
            }
        });

        if(removeSps($('#rec_Details').val()).length < 40)
        {
            $('#rec_Details').addClass('error');
            $('#third_step .alert.alert-error').text("Recieved Details is not detailed enough. 40+ Characters are expected!");
            $('#third_step .alert.alert-error').css('display','block');
            error++;
        }
        
        if(!error) {

            all_pull();

            $('#third_step .alert.alert-error').css('display','none');
            //update progress bar
            $('.bar').html('100% Completed');
            $('.bar').css('width','100%');

            $('#submit_back_fifth').hide();
            $('#submit_back_fourth_straight').hide();
            $('#submit_back_query_compiment').show();

            //slide steps
            $('#third_step').slideUp();
            $('#six_step').slideDown();                    
        }else return false;
        

         
    });

    //Matter Referring
    $('#submit_fourth').click(function(){
        //remove classes
        $('#fourth_step input').removeClass('error').removeClass('valid');        

        //ckeck if inputs aren't empty
        var fields = $('#fourth_step input[type=text],#fourth_step input[type=time]');
        var error = 0;
        fields.each(function(){
            var value = $(this).val();
            //if( value.length<4 || value==field_values[$(this).attr('id')] || ( $(this).attr('id')=='customer_email' && !emailPattern.test(value) ) ) {
            if( value.length<4 && value==field_values[$(this).attr('id')]) {
                $(this).addClass('error');
                $('#fourth_step .alert.alert-error').css('display','block');
                $(this).effect("shake", { times:3 }, 50);
                
                error++;
            } else {
                $(this).addClass('valid');
            }
        });


        if($('#matt_Name_id').val() == "")
        {
            $('#matt_Name_id').addClass('error');
            $('#fourth_step .alert.alert-error').css('display','block');
            $('#matt_Name_id').effect("shake", { times:3 }, 50);
            error++;
        }

        //alert($("input[type='radio'][name='report_emails']:checked").val());
        //alert($('#matt_ToTake').val());
        
        if($("input[type='radio'][name='report_emails']:checked").val() == "No")
        {
            if ($('#matt_ToTake').val() == '' || $('#matt_ToTake').val() == '<br>' || removeSps($('#matt_ToTake').val()).length < 40){
             $('#matt_ToTake').addClass('error');             
             $('#fourth_step .alert.alert-error').text("Because you opted not to send an email, you are required to enter the recommended action!");
             $('#fourth_step .alert.alert-error').css('display','block');
            error++;
             } else { }
        }

        if(!error) {
            
            $('#fourth_step .alert.alert-error').css('display','none');
            $('#submit_back_fifth').show();
            $('#submit_back_fourth_straight').hide();

             //update progress bar
			$('.bar').html('80% Completed');
            $('.bar').css('width','80%');
            //slide steps
            $('#fourth_step').slideUp();
            $('#fifth_step').slideDown();                  
        }else return false;        

    });

    $('#submit_fourth_straight').click(function(){

        //remove classes
        $('#fourth_step input').removeClass('error').removeClass('valid');        

        //ckeck if inputs aren't empty
        var fields = $('#fourth_step input[type=text]');
        var error = 0;
        fields.each(function(){
            var value = $(this).val();
            //if( value.length<4 || value==field_values[$(this).attr('id')] || ( $(this).attr('id')=='customer_email' && !emailPattern.test(value) ) ) {
            if( value.length<4 && value==field_values[$(this).attr('id')]) {
                $(this).addClass('error');
                $('#fourth_step .alert.alert-error').css('display','block');
                $(this).effect("shake", { times:3 }, 50);
                
                error++;
            } else {
                $(this).addClass('valid');
            }
        });

        if($('#matt_Name_id').val() == "")
        {
            $('#matt_Name_id').addClass('error');
            $('#fourth_step .alert.alert-error').css('display','block');
            $('#matt_Name_id').effect("shake", { times:3 }, 50);
            error++;
        }

        if($("input[type='radio'][name='report_emails']:checked").val() == "No")
        {
            if ($('#matt_ToTake').val() == '' || $('#matt_ToTake').val() == '<br>' || removeSps($('#matt_ToTake').val()).length < 40){
             $('#matt_ToTake').addClass('error');             
             $('#fourth_step .alert.alert-error').text("Because you opted not to send an email, you are required to enter the recommended action!");
             $('#fourth_step .alert.alert-error').css('display','block');
            error++;
             } else { }
        }

        if(!error) {

            //Test if Action was used
            if(action_test() == true)
            {
                //prepare the fourth step
                all_pull();
            

            $('#fourth_step .alert.alert-error').css('display','none');
            $('#submit_back_fifth').hide();
            $('#submit_back_fourth_straight').show();
             //update progress bar
            $('.bar').html('100% Completed');
            $('.bar').css('width','100%');
            //slide steps
            $('#fourth_step').slideUp();
            $('#six_step').slideDown(); 

            }

            //alert(action_test());

        }else return false; 


    });

    $('#submit_fifth').click(function(){

        //remove class
        $('#fifth_step input').removeClass('error').removeClass('valid');
        //ckeck if inputs aren't empty
        var fields = $('#fifth_step input[type=text],#fifth_step input[type=time]');
        var error = 0;

        if($("input[type='radio'][name='report_emails']:checked").val() == "No")
        {
            if($('#act_Name').val() == ''){$('#act_Name').val("-");}
            
            if (($('#act_Remedy').val() == '' || $('#act_Remedy').val() == '<br>' || removeSps($('#act_Remedy').val()).length < 40) ){
             $('#matt_ToTake').addClass('error');             
             $('#fifth_step .alert.alert-error').text("Because you opted not to send an email, you are required to enter the corrective action!");
             $('#fifth_step .alert.alert-error').css('display','block');
            error++;
             } else { }
        }  

        //alert($('#act_Name_id').val());
                //Validation
        if($('#act_Name').val() != "")
        {
            if($('#act_Name_id').val() == "")
            {
                    $('#act_Name').addClass('error');
                    $('#fifth_step .alert.alert-error').css('display','block');
                    $('#act_Name').effect("shake", { times:3 }, 50);
                    error++;
            }
            else
            {

                    fields.each(function(){
                    var value = $(this).val();
                    //if( value.length<4 || value==field_values[$(this).attr('id')] || ( $(this).attr('id')=='customer_email' && !emailPattern.test(value) ) ) {
                    if( value.length<4 && value==field_values[$(this).attr('id')]) {
                        $(this).addClass('error');
                        $('#fifth_step .alert.alert-error').css('display','block');
                        $(this).effect("shake", { times:3 }, 50);
                        
                        error++;
                    } else {
                        $(this).addClass('valid');
                    }
                });   
            }

        }

        if(!error) {
            all_pull();
            $('#fifth_step .alert.alert-error').css('display','none');
    		$('.bar').html('100% Completed');
    		$('.bar').css('width','100%');
            //slide steps
            $('#fifth_step').slideUp();
            $('#six_step').slideDown(); 
        }

    });

    $('#submit_six').click(function(){
        //send information to server
        //alert('Data sent');
        var str = $("form").serialize();
        //$('#result').text(str);

        
        $.post("functions/processing_data.php?"+str,function(data){
            if(data.length >0) {
                $('#processing').html(data);
                hideLoader();
            }
        },"html");

        $('#six_step').slideUp();
        $('#seven_step').slideDown(); 

    });

    $('#submit_six_update').click(function(){
        //send information to server
        //alert('Data sent');
        var str = $("form").serialize();
        //$('#result').text(str);

        
        $.post("functions/processing_data_update.php?"+str,function(data){
            if(data.length >0) {
                $('#processing').html(data);
                hideLoader();
                //Back to Dashboard
            }
        },"html");

        $('#six_step').slideUp();
        $('#seven_step').slideDown(); 

    });


    $('#submit_back_first').click(function(){
        $('#second_step').slideUp();
        $('#first_step').slideDown(); 
        
        //reset progress bar
		$('.bar').html('0% Completed');
		$('.bar').css('width','0%');
 
    })

    $('#submit_back_second').click(function(){
        $('#third_step').slideUp();
        $('#second_step').slideDown(); 
        
        //reset progress bar
		$('.bar').html('20% Completed');
		$('.bar').css('width','20%');
 
    })

    $('#submit_back_third').click(function(){
        $('#fourth_step').slideUp();
        $('#third_step').slideDown(); 
        
        //reset progress bar
		$('.bar').html('40% Completed');
		$('.bar').css('width','40%');
 
    })

    $('#submit_back_query_compiment').click(function(){
        $('#six_step').slideUp();
        $('#third_step').slideDown(); 
        
        //reset progress bar
        $('.bar').html('40% Completed');
        $('.bar').css('width','40%');
 
    })

    $('#submit_back_fourth').click(function(){
        $('#fifth_step').slideUp();
        $('#fourth_step').slideDown(); 
        
        //reset progress bar
		$('.bar').html('60% Completed');
		$('.bar').css('width','60%');
 
    })

    $('#submit_back_fifth').click(function(){
        $('#six_step').slideUp();
        $('#fifth_step').slideDown(); 
        
        //reset progress bar
		$('.bar').html('80% Completed');
		$('.bar').css('width','80%');
 
    })

    $('#submit_back_fourth_straight').click(function(){
        $('#six_step').slideUp();
        $('#fourth_step').slideDown(); 
        
        //reset progress bar
        $('.bar').html('60% Completed');
        $('.bar').css('width','60%');
 
    })

    $('#submit_back_six').click(function(){
        $('#seven_step').slideUp();
        $('#six_step').slideDown(); 
        
        //reset progress bar
        //$('.bar').html('60% Completed');
        //$('.bar').css('width','60%');
 
    })

    function all_pull(){

      var priority =$('input:radio[name=report_priority]:checked').val();

        var str = $("form").serialize();
        //$('#result').text(str);

        
        $.post("functions/report_summary.php?"+str,function(data){
            if(data.length >0) {
                $('#result').html(data);
            }
        },"html");

    }

    function action_test(){

        var fields = $('#fifth_step input[type=text],#fifth_step input[type=time]');
        var error = 0;  

        if($('#act_Name').val() != "")
        {
            if($('#act_Name_id').val() == "")
            {
                return false;

                $('#act_Name').addClass('error');
                $('#fifth_step .alert.alert-error').css('display','block');
                $('#act_Name').effect("shake", { times:3 }, 50);
                error++;
                
                $('#fifth_step .alert.alert-error').css('display','none');
                $('#submit_back_fifth').show();
                $('#submit_back_fourth_straight').hide();

                 //update progress bar
                $('.bar').html('80% Completed');
                $('.bar').css('width','80%');
                //slide steps
                $('#fourth_step').slideUp();
                $('#fifth_step').slideDown(); 

                        
            }
            else
            {

                    fields.each(function(){
                    var value = $(this).val();
                    //if( value.length<4 || value==field_values[$(this).attr('id')] || ( $(this).attr('id')=='customer_email' && !emailPattern.test(value) ) ) {
                    if( value.length<4 && value==field_values[$(this).attr('id')]) {
                        return false;
                        $(this).addClass('error');
                        $('#fifth_step .alert.alert-error').css('display','block');
                        $(this).effect("shake", { times:3 }, 50);
                        
                        error++;
                        

                        $('#fifth_step .alert.alert-error').css('display','none');
                        $('#submit_back_fifth').show();
                        $('#submit_back_fourth_straight').hide();

                         //update progress bar
                        $('.bar').html('80% Completed');
                        $('.bar').css('width','80%');
                        //slide steps
                        $('#fourth_step').slideUp();
                        $('#fifth_step').slideDown();  

                        

                    } else {
                        $(this).addClass('valid');
                        //return true;
                    }
                });   
            }

        }else{return true;}

    }

    function hideLoader()
    {
        $("#loader").hide();

            var timer = window.setInterval(function() {
                //$('#form')[0].reset();
                //$('form').trigger('reset');
                //window.location.href = 'file_report.php';
                $('.bar').html('0% Completed');
                $('.bar').css('width','0%');
                $('#seven_step').slideUp();
                $('#six_step').slideUp(); 
                $('#fifth_step').slideUp(); 
                $('#fourth_step').slideUp(); 
                $('#third_step').slideUp(); 
                $('#second_step').slideUp(); 
                $('#first_step').slideDown(); 
                $('#processing').html("");
                formReset("file_report.php");
                $("#loader").show();
                window.clearInterval(timer);
            }, 5000);

            
    }

    //$('#system_notes').click(iseenotes());



    //Dashboard
    //$('#first_step_dashboard').click(function(){

            //$('#first_step_dashboard').slideUp();
            //$('#second_step_dashboard').slideDown();

    //});

    $('#submit_verified_version_zero').click(function(){

        $('#ifcaseclose input').removeClass('error').removeClass('valid');
        //Check Matter Fields, user might also refer to someone else
         var error = 0;
         var save_code = 0;
        if($('#reported_case').val() == 1)
        {
            if($("input[type='radio'][name='report_closed']:checked").val() == "No")
            {

                //Action User was set
                if(removeSps($('#matt_ToTake').val()).length < 40)
                {
                    $('#verify_error .alert.alert-error').text("Recommended Action is not detailed enough. 40+ Characters are expected!");
                    $('#verify_error .alert.alert-error').css('display','block');
                    error++;
                    return false;
                }

                if($('#act_Name_id').val() == ""){
                    $('#act_Name').addClass('error');
                    $('#verify_error .alert.alert-error').text("Oh Snap! Correct fields highlighted in red and try submitting again.");
                    $('#verify_error .alert.alert-error').css('display','block');
                    $('#act_Name').effect("shake", { times:3 }, 50);
                    error++;
                    return false;
                }

                if($('#act_Date').val() == "")
                {
                    $('#act_Date').addClass('error');
                    $('#verify_error .alert.alert-error').text("Oh Snap! Correct fields highlighted in red and try submitting again.");
                    $('#verify_error .alert.alert-error').css('display','block');
                    $('#act_Date').effect("shake", { times:3 }, 50);
                    error++;
                    return false;
                }

                if($('#act_Time').val() == "")
                {
                    $('#act_Time').addClass('error');
                    $('#verify_error .alert.alert-error').text("Oh Snap! Correct fields highlighted in red and try submitting again.");
                    $('#verify_error .alert.alert-error').css('display','block');
                    $('#act_Time').effect("shake", { times:3 }, 50);
                    error++;
                    return false;
                }

                if($('#act_Name_id').val() == $('#matt_Name_id').val())
                {
                    if(removeSps($('#act_Remedy').val()).length < 40)
                    {
                        $('#act_Remedy').addClass('error');
                        $('#verify_error .alert.alert-error').text("Since, you've refer Action to be take to yourself might as well go ahead and fill out the Corrective Action ");
                        $('#verify_error .alert.alert-error').css('display','block');
                        error++;
                        return false; 
                    }

                }

                save_code = "0";/*Save with Action reference present*/

            }   
            else
            {
                //Case was closed
                //Action User was set
                if(removeSps($('#matt_ToTake').val()).length < 40)
                {
                    $('#verify_error .alert.alert-error').text("Recommended Action is not detailed enough. 40+ Characters are expected!");
                    $('#verify_error .alert.alert-error').css('display','block');
                    error++;
                }

                save_code = "1";/*Save Case Closed*/

            } 
        }
        else
        {

            //Action User was set
            if(removeSps($('#matt_ToTake').val()).length < 40)
            {
                $('#verify_error .alert.alert-error').text("Recommended Action is not detailed enough. 40+ Characters are expected!");
                $('#verify_error .alert.alert-error').css('display','block');
                error++;
            }

            save_code = "2";/*Save Matter Only*/
        }

        if(!error)
        {
            //send information
            $('#verify_error .alert.alert-error').css('display','none');
            sendVerifiedForProcessing(save_code);

        }else return false; 


    });
   
    $('#submit_verified_version_one').click(function(){
        //alert("Version 1");
        //Check Action Fields
        var error = 0;
        var save_code = 0;
        //Action set
        if(removeSps($('#act_Remedy').val()).length < 40)
        {
            $('#verify_error .alert.alert-error').text("Corrective Action is not detailed enough. 40+ Characters are expected!");
            $('#verify_error .alert.alert-error').css('display','block');
            error++;

        }

        if(!error)
        {
            save_code = "3";/*Save Action Only*/
            //send information
            $('#verify_error .alert.alert-error').css('display','none');
            sendVerifiedForProcessing(save_code);
        }else return false; 

    });

    $('#submit_verified_version_two').click(function(){
        //Check All Fields, user was tagged in both
        var error = 0;
        var save_code = 0;
        //Matter set
        if(removeSps($('#matt_ToTake').val()).length < 40)
        {
            $('#verify_error .alert.alert-error').text("Recommended Action is not detailed enough. 40+ Characters are expected!");
            $('#verify_error .alert.alert-error').css('display','block');
            error++;
        }

        //Action set
        if($('#act_Remedy').val().length < 40)
        {
            $('#verify_error .alert.alert-error').text("Corrective Action is not detailed enough. 40+ Characters are expected!");
            $('#verify_error .alert.alert-error').css('display','block');
            error++;
        }

        if(!error)
        {
            //send information
            save_code = "4";/*Save Action and Matter, they were previoucly set by logger*/
            $('#verify_error .alert.alert-error').css('display','none');
            sendVerifiedForProcessing(save_code);
        }else return false; 

    });

    function removeSps(string) {
        
        return string.replace(/&nbsp;/g, '');
    }

    function sendVerifiedForProcessing(code)
    {
        var str = $("form").serialize();
        $("#loader").show();
        $('#verify_form').slideUp();
        $('#verify_form_results').slideDown(); 

        $.get("functions/processing_verified_data.php?"+str+"&save_code="+code,function(data){
            if(data.length >0) {
                $('#verify_form_results').html(data);
                $("#loader").hide();
                CloseWindow();
            }
        },"html");
                //alert("OUT");
        //CloseWindow();

    }

    function CloseWindow()
    {
        $("#loader").hide();
        var timer = window.setInterval(function() {

                $('#verify_form_results').html("");
                
                 window.close();
                window.clearInterval(timer);
            }, 10000);
    }

    $('#submit_quick_search').click(function(){

        var report_id = $('#appendedInputButtons').val();
        if(removeSps(report_id).length > 5)
        {
            $('#appendedInputButtonsPhone').val(""+report_id);
            var true_value = $('#valid_search_id').val();
            $("#loader_search").show();

            $.get("functions/search_by_id.php?id="+true_value+"&showcode=0",function(data){
                if(data.length >0) {
                    $('#search_results').html(data);
                    $("#loader_search").hide();
                }
            },"html");
        }
    });

    $('#submit_quick_search_phone').click(function(){

        var report_id = $('#appendedInputButtonsPhone').val();
        if(removeSps(report_id).length > 5)
        {
            $('#appendedInputButtons').val(""+report_id);
            var true_value = $('#valid_search_id').val();
            $("#loader_search").show();

            $.get("functions/search_by_id.php?id="+true_value+"&showcode=0",function(data){
                if(data.length >0) {
                    $('#search_results').html(data);
                    $("#loader_search").hide();
                }
            },"html");
        }
    });


    $('#submit_search_default').click(function(){
         $('#search_results').html("");
        var str = $("form").serialize();
        $("#loader_search").show();
            $.get("functions/search_by_id.php?"+str+"&showcode=1",function(data){
                if(data.length >0) {
                    $('#search_results').html(data);
                    $("#loader_search").hide();
                }
            },"html");
    });
    //----------------------INSIDE VERIFICATION

    function sendVerifiedForProcessing_inside(code)
    {
        var str = $("form").serialize();
        $("#verify_form_results_inside").show();
        $('#verify_form').slideUp();
        $('#verify_form_results_inside').slideDown(); 
        $.get("functions/processing_verified_data.php?"+str+"&save_code="+code,function(data){
            if(data.length >0) {
                //$('#verify_form_results_inside').html(data);
                $("#verify_form_results_inside").hide();
                $('#verify_form_results_inside_value').html(data);
                redirect("previewMyReport.php");

            }
        },"html");

    }

        $('#submit_verified_version_zero_inside').click(function(){

        $('#ifcaseclose input').removeClass('error').removeClass('valid');
        //Check Matter Fields, user might also refer to someone else
         var error = 0;
         var save_code = 0;
        if($('#reported_case').val() == 1)
        {
            if($("input[type='radio'][name='report_closed']:checked").val() == "No")
            {

                //Action User was set
                if(removeSps($('#matt_ToTake').val()).length < 40)
                {
                    $('#verify_error .alert.alert-error').text("Recommended Action is not detailed enough. 40+ Characters are expected!");
                    $('#verify_error .alert.alert-error').css('display','block');
                    error++;
                    return false;
                }

                if($('#act_Name_id').val() == ""){
                    $('#act_Name').addClass('error');
                    $('#verify_error .alert.alert-error').text("Oh Snap! Correct fields highlighted in red and try submitting again.");
                    $('#verify_error .alert.alert-error').css('display','block');
                    $('#act_Name').effect("shake", { times:3 }, 50);
                    error++;
                    return false;
                }

                if($('#act_Date').val() == "")
                {
                    $('#act_Date').addClass('error');
                    $('#verify_error .alert.alert-error').text("Oh Snap! Correct fields highlighted in red and try submitting again.");
                    $('#verify_error .alert.alert-error').css('display','block');
                    $('#act_Date').effect("shake", { times:3 }, 50);
                    error++;
                    return false;
                }

                if($('#act_Time').val() == "")
                {
                    $('#act_Time').addClass('error');
                    $('#verify_error .alert.alert-error').text("Oh Snap! Correct fields highlighted in red and try submitting again.");
                    $('#verify_error .alert.alert-error').css('display','block');
                    $('#act_Time').effect("shake", { times:3 }, 50);
                    error++;
                    return false;
                }

                if($('#act_Name_id').val() == $('#matt_Name_id').val())
                {
                    if(removeSps($('#act_Remedy').val()).length < 40)
                    {
                        $('#act_Remedy').addClass('error');
                        $('#verify_error .alert.alert-error').text("Since, you've refer Action to be take to yourself might as well go ahead and fill out the Corrective Action ");
                        $('#verify_error .alert.alert-error').css('display','block');
                        error++;
                        return false; 
                    }

                }

                save_code = "0";/*Save with Action reference present*/

            }   
            else
            {
                //Case was closed
                //Action User was set
                if(removeSps($('#matt_ToTake').val()).length < 40)
                {
                    $('#verify_error .alert.alert-error').text("Recommended Action is not detailed enough. 40+ Characters are expected!");
                    $('#verify_error .alert.alert-error').css('display','block');
                    error++;
                }

                save_code = "1";/*Save Case Closed*/

            } 
        }
        else
        {

            //Action User was set
            if(removeSps($('#matt_ToTake').val()).length < 40)
            {
                $('#verify_error .alert.alert-error').text("Recommended Action is not detailed enough. 40+ Characters are expected!");
                $('#verify_error .alert.alert-error').css('display','block');
                error++;
            }

            save_code = "2";/*Save Matter Only*/
        }

        if(!error)
        {
            //send information
            $('#verify_error .alert.alert-error').css('display','none');
            sendVerifiedForProcessing_inside(save_code);

        }else return false; 


    });
   
    $('#submit_verified_version_one_inside').click(function(){
        //alert("Version 1");
        //Check Action Fields
        var error = 0;
        var save_code = 0;
        //Action set
        if(removeSps($('#act_Remedy').val()).length < 40)
        {
            $('#verify_error .alert.alert-error').text("Corrective Action is not detailed enough. 40+ Characters are expected!");
            $('#verify_error .alert.alert-error').css('display','block');
            error++;

        }

        if(!error)
        {
            save_code = "3";/*Save Action Only*/
            //send information
            $('#verify_error .alert.alert-error').css('display','none');
            sendVerifiedForProcessing_inside(save_code);
        }else return false; 

    });

    $('#submit_verified_version_two_inside').click(function(){
        //Check All Fields, user was tagged in both
        var error = 0;
        var save_code = 0;
        //Matter set
        if(removeSps($('#matt_ToTake').val()).length < 40)
        {
            $('#verify_error .alert.alert-error').text("Recommended Action is not detailed enough. 40+ Characters are expected!");
            $('#verify_error .alert.alert-error').css('display','block');
            error++;
        }

        //Action set
        if($('#act_Remedy').val().length < 40)
        {
            $('#verify_error .alert.alert-error').text("Corrective Action is not detailed enough. 40+ Characters are expected!");
            $('#verify_error .alert.alert-error').css('display','block');
            error++;
        }

        if(!error)
        {
            //send information
            save_code = "4";/*Save Action and Matter, they were previoucly set by logger*/
            $('#verify_error .alert.alert-error').css('display','none');
            sendVerifiedForProcessing_inside(save_code);
        }else return false; 

    });


    function redirect(url)
    {
                var timer = window.setInterval(function() {
                    window.location.href = url;
                window.clearInterval(timer);
            }, 10000);
    }

    function formReset(url)
    {
         window.location.href = url;
    }
});