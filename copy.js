$(function(){
    //original field values
    var field_values = {
            //id        :  value
            'customername'  : 'Customer Name',
            'city'  : 'City/Town',
            'customer_address'  : ' '
    };


    //inputfocus
    $('input#customername').inputfocus({ value: field_values['customername'] });
    $('input#city').inputfocus({ value: field_values['city'] });
    $('input#customer_address').inputfocus({ value: field_values['customer_address'] });


    //reset progress bar
    $('#progress').css('width','0');
    $('#progress_text').html('0% Complete');

    //first_step
    $('form').submit(function(){ return false; });
    $('#submit_first').click(function(){
        //remove classes
        $('#first_step input').removeClass('error').removeClass('valid');

        //ckeck if inputs aren't empty
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
        var fields = $('#first_step input[type=text],');
        var error = 0;
        fields.each(function(){
            var value = $(this).val();
            //if( value.length<4 || value==field_values[$(this).attr('id')] || ( $(this).attr('id')=='customer_email' && !emailPattern.test(value) ) ) {
            if( value.length<4 || value==field_values[$(this).attr('id')]) {
                $(this).addClass('error');
                $(this).effect("shake", { times:3 }, 50);
                
                error++;
            } else {
                $(this).addClass('valid');
            }
        });
        if(!error) {
            //update progress bar
            $('#progress_text').html('20% Complete');
            $('#progress').css('width','113px');
            
            //slide steps
            $('#first_step').slideUp();
            $('#second_step').slideDown();                  
        } 
        
    });


    $('#submit_second').click(function(){
        //remove classes
        $('#second_step input').removeClass('error').removeClass('valid');

/*
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
        var fields = $('#second_step input[type=text]');
        var error = 0;
        fields.each(function(){
            var value = $(this).val();
            if( value.length<1 || value==field_values[$(this).attr('id')] || ( $(this).attr('id')=='email' && !emailPattern.test(value) ) ) {
                $(this).addClass('error');
                $(this).effect("shake", { times:3 }, 50);
                
                error++;
            } else {
                $(this).addClass('valid');
            }
        });

        if(!error) {
                //update progress bar
*/                $('#progress_text').html('40% Complete');
                $('#progress').css('width','226px');
                
                //slide steps
                $('#second_step').slideUp();
                $('#third_step').slideDown();     
 /*       } else return false;
*/
    });


    $('#submit_third').click(function(){
        //update progress bar
        $('#progress_text').html('60% Complete');
        $('#progress').css('width','339px');

        //prepare the fourth step
        /*var fields = new Array(
            $('#username').val(),
            $('#password').val(),
            $('#email').val(),
            $('#firstname').val() + ' ' + $('#lastname').val(),
            $('#age').val(),
            $('#gender').val(),
            $('#country').val()                       
        );
        var tr = $('#fourth_step tr');
        tr.each(function(){
            //alert( fields[$(this).index()] )
            $(this).children('td:nth-child(2)').html(fields[$(this).index()]);
        });
            */    
        //slide steps
        $('#third_step').slideUp();
        $('#fourth_step').slideDown();            
    });


    $('#submit_fourth').click(function(){
        //send information to server
        //alert('Data sent');
        $('#progress_text').html('80% Complete');
        $('#progress').css('width','339px');
        //slide steps
        $('#fourth_step').slideUp();
        $('#fifth_step').slideDown(); 
    });

    $('#submit_fifth').click(function(){
        //send information to server
        //alert('Data sent');
        $('#progress_text').html('100% Complete');
        $('#progress').css('width','339px');
        //slide steps
        $('#fifth_step').slideUp();
        $('#six_step').slideDown(); 
    });

    $('#submit_six').click(function(){
        //send information to server
        alert('Data sent');

    });


    $('#submit_back_first').click(function(){
        $('#second_step').slideUp();
        $('#first_step').slideDown(); 
        
        //reset progress bar
        $('#progress').css('width','0');
        $('#progress_text').html('0% Complete'); 
    })

    $('#submit_back_second').click(function(){
        $('#third_step').slideUp();
        $('#second_step').slideDown(); 
        
        //reset progress bar
        $('#progress').css('width','0');
        $('#progress_text').html('20% Complete'); 
    })

    $('#submit_back_third').click(function(){
        $('#fourth_step').slideUp();
        $('#third_step').slideDown(); 
        
        //reset progress bar
        $('#progress').css('width','0');
        $('#progress_text').html('40% Complete'); 
    })

    $('#submit_back_fourth').click(function(){
        $('#fifth_step').slideUp();
        $('#fourth_step').slideDown(); 
        
        //reset progress bar
        $('#progress').css('width','0');
        $('#progress_text').html('60% Complete'); 
    })

    $('#submit_back_fifth').click(function(){
        $('#six_step').slideUp();
        $('#fifth_step').slideDown(); 
        
        //reset progress bar
        $('#progress').css('width','0');
        $('#progress_text').html('80% Complete'); 
    })

});