$(document).ready(function () {

    var table


    function addPatientVaccine(data) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "patient_vaccine",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "2612534b-9ccd-ab7e-1f73-659029967199"
            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        $.ajax(settings).done(function (response) {
         $.notify("Vaccine Record has been added successfully!", {"status":"success"});

            $('.modal.in').modal('hide')
            table.destroy();
            $('#datatable4 tbody').empty(); // empty in case the columns change
            getPatientVaccine()
        });

    }

    function deletePatientVaccine(id) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "patient_vaccine/" + id,
            "method": "DELETE",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "28ea8360-5af0-1d11-e595-485a109760f2"
            }
        }

swal({
    title: "Are you sure?",
    text: "You will not be able to recover this data",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false
}, function() {
 $.ajax(settings).done(function (response) {
   swal("Deleted!", "Vaccine Record has been cancelled.", "success");
            table.destroy();
            $('#datatable4 tbody').empty(); // empty in case the columns change
            getPatientVaccine()
        });


});

    }



    function getPatientVaccine() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "patient_vaccine",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {

        for(i=0;i<response.length;i++){
        response[i].pat_fullname=response[i].pat_first_name+" "+response[i].pat_last_name
        }



            table = $('#datatable4').DataTable({
                "bDestroy": true,
                'paging': true, // Table pagination
                'ordering': true, // Column ordering
                'info': true, // Bottom left status text
                aaData: response,
                   "aaSorting": [],
                aoColumns: [
                    {
                        mData: 'pat_fullname'
                    },
                    {
                        mData: 'pat_vaccine'
                    },
                    {
                        mData: 'pat_vaccine_date'
                    },
                    {
                        mRender: function (o) {
                            return '<button class="btn-xs btn btn-danger delete-btn" type="button" style="border-radius:0%;">Remove</button>';
                        }
                    }
        ]
            });
            $('#datatable4 tbody').on('click', '.delete-btn', function () {
                var data = table.row($(this).parents('tr')).data();
                console.log(data)
                deletePatientVaccine(data.app_id)

            });


        });


    }




    $("#addpatient").click(function () {

        $('#myModal').modal().one('shown.bs.modal', function (e) {

     $("#patient_select").html(patientSelect)

      $(".form_datetime").datetimepicker({
         format: 'yyyy-mm-dd hh:ii:ss',
         startDate:new Date(),
        initialDate: new Date()
    });
            $("#savethepatient").off("click").on("click", function(e) {


            var instance = $('#detailform').parsley();
            instance.validate()
                    if(instance.isValid()){
                jsondata = $('#detailform').serializeJSON();
                addPatientVaccine(jsondata)
                }

            })

        })



    })
var patientSelect=""
  function getPatient() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "patient",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
         for(i=0;i<response.length;i++){
          response[i].pat_fullname=response[i].pat_first_name+" "+response[i].pat_last_name
        patientSelect +="<option value="+response[i].pat_id+">"+response[i].pat_fullname+"</option>"
        }

                })
        }

getPatient()
getPatientVaccine()
})